const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const withPoojas = [];
const withDrawer = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('href="Ammas-poojas.html"')) {
    withPoojas.push(f);
  }
  if (content.includes('id="sn-drawer"') || content.includes('class="sn-drawer"')) {
    withDrawer.push(f);
  }
});

console.log('Total HTML files:', files.length);
console.log('Files with Ammas-poojas.html:', withPoojas.length);
console.log('Files with sn-drawer:', withDrawer.length);

// Check occurrences of Ammas-poojas.html in drawer
let inDrawerCount = 0;
withPoojas.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('<li><a href="Ammas-poojas.html">Amma\'s Poojas</a></li>') ||
      content.includes('<li><a href="Ammas-poojas.html">Amma&#39;s Poojas</a></li>')) {
    inDrawerCount++;
  }
});
console.log('Files matching exact li snippet:', inDrawerCount);

