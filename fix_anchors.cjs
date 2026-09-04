const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace all remaining <a href="/#...">...</a> with <Link to="/#...">...</Link>
content = content.replace(/<a href="\/(#[a-zA-Z0-9_-]+)"([^>]*)>([\s\S]*?)<\/a>/g, '<Link to="/$1"$2>$3</Link>');

// We also have <a href="#book" ...
content = content.replace(/<a href="(#[a-zA-Z0-9_-]+)"([^>]*)>([\s\S]*?)<\/a>/g, '<Link to="/$1"$2>$3</Link>');

fs.writeFileSync('src/App.jsx', content);
console.log("Replaced anchors with Links");
