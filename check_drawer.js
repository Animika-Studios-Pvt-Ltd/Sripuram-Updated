const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const alreadyHasSpiritualInDrawer = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const drawerIndex = content.indexOf('id="sn-drawer"');
  if (drawerIndex !== -1) {
    const drawerEnd = content.indexOf('</nav>', drawerIndex);
    const drawerContent = content.substring(drawerIndex, drawerEnd);
    if (drawerContent.includes('Ammas-spiritual-activities.html')) {
      alreadyHasSpiritualInDrawer.push(f);
    }
  }
});

console.log('Files with Ammas-spiritual-activities in drawer already:', alreadyHasSpiritualInDrawer.length);

