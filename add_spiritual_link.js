const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let updatedCount = 0;
const errors = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const isCrlf = content.includes('\r\n');
  const eol = isCrlf ? '\r\n' : '\n';

  const target = `                      <li><a href="Ammas-poojas.html">Amma's Poojas</a></li>`;
  const addition = `                      <li><a href="Ammas-spiritual-activities.html">Amma's Spiritual Activities</a></li>`;

  if (!content.includes(target)) {
    errors.push(`Target not found in ${f}`);
    return;
  }

  // Count occurrences
  const count = content.split(target).length - 1;
  if (count !== 1) {
    errors.push(`Target found ${count} times in ${f} (expected 1)`);
    return;
  }

  const newContent = content.replace(target, target + eol + addition);
  fs.writeFileSync(f, newContent, 'utf8');
  updatedCount++;
});

console.log(`Successfully updated ${updatedCount} / ${files.length} files.`);
if (errors.length > 0) {
  console.log('Errors:', errors);
}

