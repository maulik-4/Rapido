const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Fix broken <Link>...</a tags
// Find all <Link> tags, and if the closing tag is </a>, change it to </Link>
let i = 0;
while (i < content.length) {
  let linkStart = content.indexOf('<Link ', i);
  if (linkStart === -1) break;
  
  let nextA = content.indexOf('</a>', linkStart);
  let nextLink = content.indexOf('</Link>', linkStart);
  
  if (nextA !== -1 && (nextLink === -1 || nextA < nextLink)) {
    // Check if there is another <a between linkStart and nextA
    let innerA = content.indexOf('<a ', linkStart);
    if (innerA !== -1 && innerA < nextA) {
      // There is an inner <a> tag, so the </a> belongs to it. Skip.
      i = innerA + 3;
      continue;
    }
    
    // Check if there is another <Link between linkStart and nextA
    let innerLink = content.indexOf('<Link ', linkStart + 5);
    if (innerLink !== -1 && innerLink < nextA) {
        // nested link? ignore for now
    }

    content = content.slice(0, nextA) + '</Link>' + content.slice(nextA + 4);
  }
  i = linkStart + 5;
}

fs.writeFileSync('src/App.jsx', content);
console.log("Fixed broken Link closing tags");
