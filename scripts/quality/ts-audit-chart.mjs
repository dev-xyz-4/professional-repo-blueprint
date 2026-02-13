import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const args = process.argv.slice(2);

const usage = [
  'Usage:',
  '  node scripts/ts-audit-chart.mjs --project <project-dir> --target <relative-file> [--out <report-path>]',
  '',
  'Example:',
  '  node scripts/ts-audit-chart.mjs --project . --target src/components/Chart.tsx',
].join('\n');

const readArg = (name) => {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  return args[index + 1];
};

const projectDirArg = readArg('--project');
const targetRelativeArg = readArg('--target');
const outputArg = readArg('--out');

if (!projectDirArg || !targetRelativeArg) {
  console.error(usage);
  process.exit(1);
}

const repoRoot = process.cwd();
const projectRoot = path.resolve(repoRoot, projectDirArg);
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
const targetRelative = targetRelativeArg.split('/').join(path.sep);
const targetPath = path.normalize(path.join(projectRoot, targetRelative));

if (!fs.existsSync(tsconfigPath)) {
  throw new Error(`tsconfig not found: ${tsconfigPath}`);
}

if (!fs.existsSync(targetPath)) {
  throw new Error(`target file not found: ${targetPath}`);
}

const targetLabel = targetRelativeArg.replace(/[^a-zA-Z0-9._/-]/g, '').replace(/[\/]/g, '-');
const defaultOutput = path.join('docs', 'bmad', 'notes', 'ts-audits', `${new Date().toISOString().slice(0, 10)}-${targetLabel}.md`);
const outputPath = path.resolve(repoRoot, outputArg || defaultOutput);

const readResult = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
if (readResult.error) {
  throw new Error(ts.flattenDiagnosticMessageText(readResult.error.messageText, '\n'));
}

const parsed = ts.parseJsonConfigFileContent(
  readResult.config,
  ts.sys,
  projectRoot,
  undefined,
  tsconfigPath
);

const program = ts.createProgram({
  rootNames: parsed.fileNames,
  options: parsed.options,
});

const diagnostics = ts
  .getPreEmitDiagnostics(program)
  .filter((diag) => diag.category === ts.DiagnosticCategory.Error)
  .filter((diag) => diag.file && path.normalize(diag.file.fileName) === targetPath)
  .sort((a, b) => {
    const aStart = a.start ?? -1;
    const bStart = b.start ?? -1;
    if (aStart !== bStart) return aStart - bStart;
    if (a.code !== b.code) return a.code - b.code;
    const aMsg = ts.flattenDiagnosticMessageText(a.messageText, '\n');
    const bMsg = ts.flattenDiagnosticMessageText(b.messageText, '\n');
    return aMsg.localeCompare(bMsg);
  });

const normalize = (value) => value.toLowerCase();

const classifyDiagnostic = (code, message, context) => {
  const msg = normalize(message);
  const ctx = normalize(context.join('\n'));
  const combined = `${msg}\n${ctx}`;

  const architecturalSignals = [
    'state machine',
    'lifecycle',
    'persistence',
    'cache key',
    'domain model',
    'transaction',
    'reconnect',
    'scheduler',
  ];

  if (architecturalSignals.some((token) => combined.includes(token))) {
    return {
      classification: 'BMAD-TRIGGER',
      rationale: 'The error appears to touch lifecycle, domain, or cross-module contract logic.',
      fixDirection: 'Clarify intended contract/behavior in BMAD artifacts before implementation.',
    };
  }

  const minorCodes = new Set([
    2322, 2339, 2345, 2532, 2551, 2554, 2571, 2722, 2769, 7006, 6133, 18047, 18048, 18049,
  ]);

  if (minorCodes.has(code)) {
    if (msg.includes('possibly') && (msg.includes('null') || msg.includes('undefined'))) {
      return {
        classification: 'MINOR',
        rationale: 'Local null/undefined narrowing appears to be missing.',
        fixDirection: 'Add local guards or narrowing without changing behavior.',
      };
    }

    if (msg.includes('not assignable')) {
      return {
        classification: 'MINOR',
        rationale: 'Local type mismatch in existing signatures or value flow.',
        fixDirection: 'Align types and keep semantics unchanged.',
      };
    }

    if (msg.includes('does not exist on type')) {
      return {
        classification: 'MINOR',
        rationale: 'Property access likely needs union narrowing.',
        fixDirection: 'Narrow branch by discriminator/type guard before access.',
      };
    }

    if (msg.includes('implicitly has an') && msg.includes('any')) {
      return {
        classification: 'MINOR',
        rationale: 'Missing explicit local parameter typing.',
        fixDirection: 'Add explicit param typing or infer from existing contracts.',
      };
    }

    if (msg.includes('declared but its value is never read')) {
      return {
        classification: 'MINOR',
        rationale: 'Unused local declaration.',
        fixDirection: 'Remove unused declaration or wire it into existing flow.',
      };
    }

    return {
      classification: 'MINOR',
      rationale: 'Likely local typing/narrowing issue without architecture change.',
      fixDirection: 'Apply localized typing fix while preserving behavior.',
    };
  }

  return {
    classification: 'BMAD-TRIGGER',
    rationale: 'Not clearly classifiable as local typing; may imply contract/architecture change.',
    fixDirection: 'Capture options/questions in BMAD docs before coding the fix.',
  };
};

const rel = (abs) => path.relative(repoRoot, abs).split(path.sep).join('/');
const reportLines = [];
reportLines.push(`# TypeScript Error Audit - ${targetRelativeArg}`);
reportLines.push('');
reportLines.push(`- Generated by: \`node scripts/ts-audit-chart.mjs --project ${projectDirArg} --target ${targetRelativeArg}\``);
reportLines.push(`- Project root: \`${projectDirArg}\``);
reportLines.push(`- Target: \`${targetRelativeArg}\``);
reportLines.push(`- Total errors: **${diagnostics.length}**`);
reportLines.push('');

if (diagnostics.length === 0) {
  reportLines.push('No TypeScript errors found for target file.');
} else {
  diagnostics.forEach((diag, index) => {
    const file = diag.file;
    if (!file || diag.start === undefined) return;

    const message = ts.flattenDiagnosticMessageText(diag.messageText, '\n');
    const pos = file.getLineAndCharacterOfPosition(diag.start);
    const lineNo = pos.line + 1;
    const colNo = pos.character + 1;

    const src = file.text.split(/\r?\n/);
    const from = Math.max(1, lineNo - 2);
    const to = Math.min(src.length, lineNo + 2);
    const context = [];

    for (let ln = from; ln <= to; ln += 1) {
      const mark = ln === lineNo ? '>' : ' ';
      context.push(`${mark}${String(ln).padStart(5, ' ')} | ${src[ln - 1] ?? ''}`);
    }

    const { classification, rationale, fixDirection } = classifyDiagnostic(diag.code, message, context);

    reportLines.push(`## ${index + 1}. TS${diag.code}`);
    reportLines.push('');
    reportLines.push(`- TS error code: \`TS${diag.code}\``);
    reportLines.push(`- Error message: ${message}`);
    reportLines.push(`- Location: \`${rel(file.fileName)}:${lineNo}:${colNo}\``);
    reportLines.push(`- Classification: **${classification}**`);
    reportLines.push(`- Rationale: ${rationale}`);
    reportLines.push(`- Suggested fix direction: ${fixDirection}`);
    reportLines.push('- Source context (2 above, line, 2 below):');
    reportLines.push('');
    reportLines.push('```text');
    reportLines.push(...context);
    reportLines.push('```');
    reportLines.push('');
  });
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${reportLines.join('\n')}\n`, 'utf8');

console.log(
  JSON.stringify({
    output: rel(outputPath),
    total: diagnostics.length,
    target: targetRelativeArg,
  })
);
