const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

const replacements = [
  // Navbar Book Now
  {
    from: /className={`bg-\[#1A1A1A\] dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-black dark:hover:bg-gray-200 transition-all shadow-lg shadow-black\/10 active:scale-95 (.*?)`}/g,
    to: 'className={`btn-hover btn-fill-yellow bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-full font-semibold shadow-lg shadow-black/10 $1`}'
  },
  // Mobile Menu Book a Ride
  {
    from: /className="bg-\[#F4C430\] text-black w-full py-4 rounded-xl mt-auto mb-12 shadow-lg"/g,
    to: 'className="btn-hover btn-fill-dark bg-[#F4C430] text-black w-full py-4 rounded-xl mt-auto mb-12 shadow-lg"'
  },
  // Hero Book a Ride
  {
    from: /className="bg-\[#F4C430\] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-\[#FFDF6B\] transition-colors flex items-center justify-center gap-2 shadow-xl shadow-\[#F4C430\]\/20"/g,
    to: 'className="btn-hover btn-fill-dark bg-[#F4C430] text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-[#F4C430]/20"'
  },
  // Hero Download App
  {
    from: /className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-black dark:hover:border-white transition-colors flex items-center justify-center gap-2"/g,
    to: 'className="btn-hover btn-fill-light bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"'
  },
  // Confirm & Book Instantly
  {
    from: /className="w-full bg-\[#1A1A1A\] dark:bg-\[#F4C430\] text-white dark:text-black py-4 rounded-xl font-bold text-lg hover:bg-black dark:hover:bg-\[#FFDF6B\] transition-colors flex items-center justify-center gap-2"/g,
    to: 'className="btn-hover btn-fill-yellow w-full bg-[#1A1A1A] dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"'
  },
  // Ride card popular
  {
    from: /className={`w-full py-3 rounded-xl font-bold transition-colors \$\{ride.popular \? 'bg-\[#F4C430\] text-black hover:bg-\[#FFDF6B\]' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'\}`}/g,
    to: 'className={`btn-hover w-full py-3 rounded-xl font-bold ${ride.popular ? "btn-fill-dark bg-[#F4C430] text-black" : "btn-fill-yellow bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"}`}'
  },
  // App section App Store
  {
    from: /className="bg-white text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"/g,
    to: 'className="btn-hover btn-fill-light bg-white text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3"'
  },
  // Register as Captain
  {
    from: /className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-2xl"/g,
    to: 'className="btn-hover btn-fill-yellow bg-black text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl"'
  },
  // Final CTA Book a Ride
  {
    from: /className="bg-\[#F4C430\] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-\[#FFDF6B\] transition-colors shadow-lg"/g,
    to: 'className="btn-hover btn-fill-dark bg-[#F4C430] text-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg"'
  },
  // Final CTA Download App
  {
    from: /className="bg-white\/10 text-white border border-white\/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white\/20 transition-colors"/g,
    to: 'className="btn-hover btn-fill-white bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg"'
  },
  // Sticky mobile book
  {
    from: /className="w-full bg-\[#F4C430\] text-black py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2"/g,
    to: 'className="btn-hover btn-fill-dark w-full bg-[#F4C430] text-black py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2"'
  }
];

replacements.forEach(({from, to}) => {
  content = content.replace(from, to);
});

fs.writeFileSync('src/App.jsx', content);
console.log("Updated App.jsx successfully with Node.js!");
