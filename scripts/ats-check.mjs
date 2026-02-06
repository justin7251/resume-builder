import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const templatesDir = path.join(projectRoot, 'src', 'lib', 'templates');

const requiredSections = ['summary', 'experience', 'education', 'skills'];
const optionalSections = ['contact', 'profile'];

function readTemplates() {
  if (!fs.existsSync(templatesDir)) {
    console.error('Templates directory not found:', templatesDir);
    process.exit(1);
  }
  return fs
    .readdirSync(templatesDir)
    .filter((file) => file.endsWith('.svelte'))
    .map((file) => path.join(templatesDir, file));
}

function findSectionMatches(content, section) {
  const pattern = new RegExp(`\\b${section}\\b`, 'i');
  return pattern.test(content);
}

function findLayoutWarnings(content) {
  const warnings = [];
  if (/grid|flex/.test(content) && /w-1\/3|md:w-1\/3|w-2\/3|md:w-2\/3|grid-cols-2|grid-cols-3/.test(content)) {
    warnings.push('Uses multi-column layout; verify reading order with an ATS parser.');
  }
  if (/background|bg-/.test(content) && /gradient|bg-.*\/\d/.test(content)) {
    warnings.push('Uses decorative background styles; ensure content remains selectable.');
  }
  if (/absolute|relative/.test(content) && /absolute/.test(content)) {
    warnings.push('Uses absolute positioning; confirm text extraction order.');
  }
  return warnings;
}

function analyzeTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const name = path.basename(filePath);

  const missing = requiredSections.filter((section) => !findSectionMatches(content, section));
  const presentOptional = optionalSections.filter((section) => findSectionMatches(content, section));
  const warnings = findLayoutWarnings(content);

  return { name, missing, presentOptional, warnings };
}

const files = readTemplates();
const results = files.map(analyzeTemplate);

console.log('ATS Layout Check (heuristics)');
console.log('--------------------------------');
results.forEach((result) => {
  console.log(`\n${result.name}`);
  if (result.missing.length === 0) {
    console.log('  Sections: OK');
  } else {
    console.log(`  Missing sections: ${result.missing.join(', ')}`);
  }
  if (result.presentOptional.length > 0) {
    console.log(`  Optional sections found: ${result.presentOptional.join(', ')}`);
  }
  if (result.warnings.length > 0) {
    result.warnings.forEach((warning) => console.log(`  Warning: ${warning}`));
  } else {
    console.log('  Warnings: None');
  }
});

console.log('\nNotes:');
console.log('- This script is a heuristic check, not a certification.');
console.log('- For stronger verification, export a PDF and test with an ATS parser.');
