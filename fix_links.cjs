const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

content = content.replace(/<a ([^>]*)href="\/(#[a-z]+)"([^>]*)>/g, '<Link $1to="/$2"$3>');

// We also need to change </a> to </Link> for those specific links.
// Let's just do it directly on the strings we know
content = content.replace(/<a href="\/(#[a-z]+)"([^>]*)>([^<]*)<\/a>/g, '<Link to="/$1"$2>$3</Link>');

// In Navbar:
content = content.replace(/<a \n                    key=\{link.name\}\n                    href=\{link.href\}/g, '<Link key={link.name} to={link.href}');

// It might be easier to just change them back to <a href="#rides"> and let the browser do default scrolling since Locomotive scroll intercepts it anyway on the same page.
// But since the user might be on /terms and clicks 'Rides', it needs to go to /#rides.
// <a href="/#rides"> is perfectly valid HTML and the browser will navigate to it. 
// A full page reload from /terms to /#rides is completely fine and literally "feels like a new page have opened".
// On the Home page, clicking it might also reload the page if it's <a href="/#rides">.
// Actually, I'll just change the Navbar array to use <a href="/#..."> instead of <Link> since that's already what they are. 

// Let's fix the `a` tags in the map:
// The map has { name: 'Rides', href: '/#rides' }
// The render is: <a key={link.name} href={link.href} ...> <span...> {link.name} </span> ... </a>
// So let's replace <a with <Link and href with to.
content = content.replace(/<a \n                    key=\{link.name\}\n                    href=\{link.href\} \n                    className="relative px-4 py-2 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 ease-out group"\n                  >\n                    <span className="relative z-10">\{link.name\}<\/span>\n                    <div className="absolute inset-0 bg-gray-100 dark:bg-white\/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out shadow-sm" \/>\n                  <\/a>/g, 
`<Link 
                    key={link.name}
                    to={link.href} 
                    className="relative px-4 py-2 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 ease-out group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out shadow-sm" />
                  </Link>`);

// Fix mobile menu:
content = content.replace(/<a href="\/(#[a-z]+)" onClick=\{([^>]+)\}>([^<]+)<\/a>/g, '<Link to="/$1" onClick={$2}>$3</Link>');

// Fix "Book a Ride" mobile:
content = content.replace(/<a href="\/#book" onClick=\{([^>]+)\} className="([^"]+)">\n              Book a Ride\n            <\/a>/g, '<Link to="/#book" onClick={$1} className="$2">\n              Book a Ride\n            </Link>');

fs.writeFileSync('src/App.jsx', content);
