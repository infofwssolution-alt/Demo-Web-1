// Dumps the live widget source so we can see which features it supports
const res = await fetch('http://localhost:3000/widget/widget.js');
const t = await res.text();
import fs from 'fs';
fs.writeFileSync('widget-dump.js', t);
console.log('LEN', t.length);
console.log('FETCH CALLS:', t.match(/fetch\([^)]*\)/g));
console.log('IDS:', [...new Set(t.match(/id="[a-zA-Z-]+"/g) || [])].join(' '));
console.log('ENDPOINTS:', [...new Set(t.match(/\/api\/[a-zA-Z\/-]+/g) || [])].join(' '));
