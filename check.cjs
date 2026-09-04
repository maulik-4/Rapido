const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
const hashes = content.match(/href="#[^"]+"/g);
console.log(hashes);
