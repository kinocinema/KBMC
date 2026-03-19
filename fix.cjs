const fs = require('fs');
const lines = fs.readFileSync('translations.ts', 'utf8').split('\n');
const newLines = [...lines.slice(0, 1027), ...lines.slice(1491)];
fs.writeFileSync('translations.ts', newLines.join('\n'));
