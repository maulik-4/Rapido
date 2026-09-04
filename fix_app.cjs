const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

content = "import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';\nimport LocomotiveScroll from 'locomotive-scroll';\n" + content;

content = content.replace('export default function App() {', 'function Home() {');

const hookToAdd = `  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => {
      locomotiveScroll.destroy();
    };
  }, []);
`;
content = content.replace('  const [bookingConfirmed, setBookingConfirmed] = useState(false);', '  const [bookingConfirmed, setBookingConfirmed] = useState(false);\n' + hookToAdd);

content = content.replace(/href="#(rides|coverage|drive|app|faq|book)"/g, 'href="/#$1"');

content = content.replace(
  /<a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms<\/a>/g,
  '<Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>'
);
content = content.replace(
  /<a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy<\/a>/g,
  '<Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>'
);
content = content.replace(
  /<a href="#" className="hover:text-black dark:hover:text-white transition-colors">Sitemap<\/a>/g,
  '<Link to="/sitemap" className="hover:text-black dark:hover:text-white transition-colors">Sitemap</Link>'
);
content = content.replace(
  /<a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service<\/a>/g,
  '<Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>'
);

const pagesCode = `
function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] pt-32 px-4 sm:px-6 lg:px-8 pb-24 text-gray-900 dark:text-gray-100 font-sans selection:bg-[#F4C430] selection:text-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 text-[#1A1A1A] dark:text-white">Terms of Service</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Last updated: September 2026</p>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>Welcome to JSKGO. By accessing or using our platform, you agree to be bound by these terms.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By downloading our app or using our services, you confirm that you accept these terms of service.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">2. User Conduct</h2>
          <p>Users are expected to behave respectfully towards captains and follow all safety guidelines.</p>
          <Link to="/" className="inline-block mt-8 text-[#F4C430] font-bold hover:underline">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] pt-32 px-4 sm:px-6 lg:px-8 pb-24 text-gray-900 dark:text-gray-100 font-sans selection:bg-[#F4C430] selection:text-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 text-[#1A1A1A] dark:text-white">Privacy Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Last updated: September 2026</p>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your data.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">1. Data Collection</h2>
          <p>We collect location data to provide rides and contact information for account management.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">2. Data Security</h2>
          <p>All personal information is encrypted and stored securely.</p>
          <Link to="/" className="inline-block mt-8 text-[#F4C430] font-bold hover:underline">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function Sitemap() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] pt-32 px-4 sm:px-6 lg:px-8 pb-24 text-gray-900 dark:text-gray-100 font-sans selection:bg-[#F4C430] selection:text-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 text-[#1A1A1A] dark:text-white">Sitemap</h1>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
          <ul className="space-y-4 text-xl font-medium">
            <li><Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Home</Link></li>
            <li><a href="/#rides" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Rides</a></li>
            <li><a href="/#coverage" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Coverage</a></li>
            <li><Link to="/terms" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </BrowserRouter>
  );
}
`;

fs.writeFileSync('src/App.jsx', content + '\n' + pagesCode);
console.log('Done fixing App.jsx');
