import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import React, { useState, useEffect } from 'react';
import { 
  MapPin,
  Navigation, 
  Calendar, 
  User, 
  CheckCircle2, 
  Star, 
  Clock, 
  ShieldCheck,
  CreditCard,
  Smartphone,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Plus,
  Minus,
  Moon,
  Sun,
  Bike,
  Car,
  CarFront
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const RIDES = [
  { id: 'bike', name: 'Bike Taxi', price: '₹3/km', min: 'Min ₹30', popular: true, desc: 'Beat the traffic instantly.', icon: '🏍️' },
  { id: 'auto', name: 'Auto', price: '₹9/km', min: 'Min ₹50', popular: false, desc: 'Perfect for everyday city rides.', icon: '🛺' },
  { id: 'cab', name: 'Cab', price: '₹12/km', min: 'Min ₹80', popular: false, desc: 'Comfortable AC rides.', icon: '🚗' },
  { id: 'suv', name: 'SUV / Innova', price: '₹16/km', min: 'Min ₹120', popular: false, desc: 'Spacious for families.', icon: '🚙' },
  { id: 'tempo', name: 'Tempo Traveller', price: '₹22/km', min: 'Min ₹300', popular: false, desc: 'Best for large groups.', icon: '🚐' },
  { id: 'airport', name: 'Airport Transfer', price: 'Fixed Rate', min: 'No hidden charges', popular: false, desc: 'Timely pickups and drops.', icon: '✈️' }
];

const FAQS = [
  { q: 'How is JSKGO different from Ola and Uber?', a: 'JSKGO is built specifically for the Braj region. We have zero surge pricing, deep local knowledge, and specialized services for temple visits and group pilgrimages.' },
  { q: 'Is JSKGO available for pilgrimage temple tours?', a: 'Yes! We offer customized packages for temple tours across Mathura, Vrindavan, Govardhan, and Barsana with experienced local captains.' },
  { q: 'Does JSKGO have surge pricing?', a: 'No surge pricing. What you see is what you pay, ensuring transparent fares at all times.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI, all major credit/debit cards, and cash payments directly to your captain.' },
  { q: 'How do I register as a captain?', a: 'Download the JSKGO Captain app, submit your documents (DL, RC, Aadhaar), and visit our onboarding center for a quick 10-minute verification.' }
];

function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' || 
        e.target.closest('a') || 
        e.target.closest('button') ||
        e.target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#F4C430] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ mixBlendMode: 'difference' }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 3 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#F4C430] rounded-full pointer-events-none z-[9998] hidden md:block opacity-60"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}

const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(244,196,48,0.15), transparent 40%)`
        }}
      />
      <div className="relative z-10 w-full h-full" style={{ transform: "translateZ(30px)" }}>
         {children}
      </div>
    </motion.div>
  );
};

const TestimonialsCarousel = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Rahul S.', loc: 'Mathura', text: 'Best ride app in the city. No more haggling with auto drivers. The transparent pricing is a game changer.' },
    { id: 2, name: 'Priya K.', loc: 'Vrindavan Visitor', text: 'Booked an Innova for our family temple tour. The driver was so polite and knew exactly where to drop us.' },
    { id: 3, name: 'Amit V.', loc: 'Agra', text: 'I use the Bike Taxi daily for my commute to the station. Always on time, always affordable.' },
    { id: 4, name: 'Neha S.', loc: 'Mathura', text: 'The app is so easy to use. My daily commute is sorted!' },
    { id: 5, name: 'Vikram B.', loc: 'Baldeo', text: 'Clean cars and professional captains. Made my trip to Braj very comfortable.' }
  ]);

  const handleNext = () => {
    setReviews(prev => {
      const newReviews = [...prev];
      const first = newReviews.shift();
      newReviews.push(first);
      return newReviews;
    });
  };

  const handlePrev = () => {
    setReviews(prev => {
      const newReviews = [...prev];
      const last = newReviews.pop();
      newReviews.unshift(last);
      return newReviews;
    });
  };

  return (
    <section className="py-24 bg-white dark:bg-[#121212] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-[#1A1A1A] dark:text-white">Loved by Locals</h2>
            <div className="flex items-center gap-2">
              <div className="flex text-[#F4C430]"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/></div>
              <span className="font-bold text-[#1A1A1A] dark:text-gray-200">4.8/5 from 2,400+ reviews</span>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-black dark:hover:border-white transition-colors">
              <ChevronRight size={24} className="rotate-180" />
            </button>
            <button onClick={handleNext} className="w-12 h-12 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 py-4">
          <AnimatePresence mode="popLayout">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex-shrink-0"
              >
                <TiltCard className="min-w-[320px] max-w-[400px] h-full bg-gray-50 dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800 p-8 rounded-2xl cursor-pointer">
                  <div className="flex text-[#F4C430] mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                  <p className="text-lg font-medium mb-6 text-[#1A1A1A] dark:text-gray-200">"{review.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A] dark:text-white">{review.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{review.loc}</div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CoverageVisual = () => {
  return (
    <TiltCard className="relative h-[400px] lg:h-[500px] rounded-3xl bg-gray-900 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 w-full overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-colors duration-300">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Heatmap Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%] w-64 h-64 bg-[#F4C430]/20 rounded-full blur-[80px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-white/10 rounded-full blur-[60px]" 
      />

      {/* Radar Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[100px] h-[100px] border border-white/5 rounded-full absolute" />
        <div className="w-[220px] h-[220px] border border-white/5 rounded-full absolute" />
        <div className="w-[340px] h-[340px] border border-[#F4C430]/10 rounded-full absolute" />
        <div className="w-[460px] h-[460px] border border-white/5 rounded-full absolute" />
      </div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0 0 4px rgba(244,196,48,0.3))' }}>
        <path d="M 50% 50% L 35% 25%" stroke="rgba(244,196,48,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 50% 50% L 75% 75%" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 50% 50% L 80% 30%" stroke="rgba(244,196,48,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 50% 50% L 20% 65%" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>

      {/* Moving Vehicles */}
      <motion.div 
        initial={{ top: '50%', left: '50%' }}
        animate={{ top: '25%', left: '35%' }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute w-2 h-2 bg-white rounded-full z-20 shadow-[0_0_10px_white]"
      />
      <motion.div 
        initial={{ top: '75%', left: '75%' }}
        animate={{ top: '50%', left: '50%' }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute w-2 h-2 bg-[#F4C430] rounded-full z-20 shadow-[0_0_10px_#F4C430]"
      />
      <motion.div 
        initial={{ top: '30%', left: '80%' }}
        animate={{ top: '50%', left: '50%' }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
        className="absolute w-2 h-2 bg-white rounded-full z-20 shadow-[0_0_10px_white]"
      />

      {/* Nodes / Labels */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-4 h-4 bg-[#F4C430] rounded-full animate-pulse shadow-[0_0_20px_#F4C430]" />
          <div className="mt-2 bg-black/80 backdrop-blur border border-white/10 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
            Mathura City
          </div>
        </div>

        <div className="absolute top-[25%] left-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Vrindavan</div>
        </div>
        
        <div className="absolute top-[75%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Agra</div>
        </div>
        
        <div className="absolute top-[30%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-[#F4C430] rounded-full shadow-[0_0_10px_#F4C430]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Baldeo</div>
        </div>

        <div className="absolute top-[65%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Govardhan</div>
        </div>

        <div className="absolute top-[18%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Barsana</div>
        </div>

        <div className="absolute top-[12%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Nandgaon</div>
        </div>

        <div className="absolute top-[82%] left-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Gokul</div>
        </div>
      </div>
      
      {/* Live Status Overlay */}
      <div className="absolute top-4 right-4 z-40 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center gap-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]" />
        <div>
          <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Network Status</div>
          <div className="text-xs font-bold text-white">412 Active Rides</div>
        </div>
      </div>
    </TiltCard>
  );
};

const VehicleVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-[#F4C430] opacity-5 dark:opacity-5 mix-blend-color" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] dark:from-[#0a0a0a] via-transparent to-transparent opacity-70" />
    <div className="absolute inset-0 bg-gradient-to-l from-[#f8f9fa] dark:from-[#0a0a0a] via-transparent to-transparent opacity-70" />
     
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_50px_rgba(244,196,48,0.2)]">
       <motion.path animate={{ x: [-20, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} d="M100 400L700 400" className="stroke-gray-300 dark:stroke-[#F4C430]/30" strokeWidth="4" strokeLinecap="round" strokeDasharray="20 40" />
       <motion.path animate={{ x: [-50, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} d="M50 450L750 450" className="stroke-gray-200 dark:stroke-white/10" strokeWidth="2" strokeLinecap="round" strokeDasharray="50 100" />
       
       <g transform="translate(300, 200) skewX(-15)">
         <path d="M0 100 C 0 50, 50 0, 150 0 L 250 0 C 300 0, 350 50, 350 150 L 350 200 L 0 200 Z" className="fill-gray-300 dark:fill-[#1a1a1a]" />
         <path d="M150 20 L 240 20 L 330 100 L 150 100 Z" className="fill-white dark:fill-[#0a0a0a] stroke-gray-300 dark:stroke-white/20" strokeWidth="4" />
         <path d="M150 5 L 250 5" stroke="#F4C430" strokeWidth="6" strokeLinecap="round" />
         
         <motion.circle animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} cx="50" cy="200" r="40" className="fill-gray-100 dark:fill-[#111] stroke-gray-400 dark:stroke-[#333]" strokeWidth="8" strokeDasharray="40 20" />
         <motion.circle animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} cx="300" cy="200" r="40" className="fill-gray-100 dark:fill-[#111] stroke-gray-400 dark:stroke-[#333]" strokeWidth="8" strokeDasharray="40 20" />
         <path d="M340 120 A 20 20 0 0 1 360 140 L 360 160 A 20 20 0 0 1 340 180 Z" fill="#F4C430" filter="url(#glow)" />
       </g>
       
       <path d="M100 340 L 300 340" stroke="#F4C430" strokeWidth="8" filter="url(#glow)" strokeLinecap="round" opacity="0.8" />
       <path d="M150 360 L 350 360" className="stroke-gray-400 dark:stroke-white" strokeWidth="4" filter="url(#glow)" strokeLinecap="round" opacity="0.4" />

       <defs>
         <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="15" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
         </filter>
       </defs>
     </svg>
  </div>
);

const BookingSection = () => {
  const [selectedRide, setSelectedRide] = useState('Bike');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [error, setError] = useState('');

  const rides = [
    { id: 'Bike', name: 'Bike', rate: 'From ₹3/km', est: '₹30–120', icon: <Bike size={24} /> },
    { id: 'Auto', name: 'Auto', rate: 'From ₹9/km', est: '₹50–200', icon: <Car size={24} /> },
    { id: 'Cab', name: 'Cab', rate: 'From ₹12/km', est: '₹80–400', icon: <Car size={24} /> },
    { id: 'Outstation', name: 'Outstation', rate: 'From ₹16/km', est: '₹300+', icon: <CarFront size={24} /> },
  ];
  
  const currentRideInfo = rides.find(r => r.id === selectedRide);

  const handleBook = () => {
    if (!pickup.trim()) return setError('Please enter a pickup location.');
    if (!dropoff.trim()) return setError('Please enter a drop-off destination.');
    if (!date) return setError('Please select a date.');
    setError('');
    setBookingStatus('confirm');
  };

  return (
    <section id="book" className="booking-section py-24 relative bg-white dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white overflow-hidden border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-black/[0.02] dark:text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0 transition-colors duration-300">
        YOUR RIDE
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
         >
           <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Where are you going?</h2>
           <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">Choose your ride, enter your destination and get an instant fare estimate.</p>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="booking-panel bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto relative shadow-[0_0_80px_rgba(244,196,48,0.05)] transition-colors duration-300"
         >
            {bookingStatus === 'idle' ? (
              <div className="flex flex-col gap-8">
                
                {/* Ride Selector */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 md:pb-0">
                  <AnimatePresence>
                  {rides.map(ride => {
                    const isSelected = selectedRide === ride.id;
                    return (
                      <button
                        key={ride.id}
                        onClick={() => setSelectedRide(ride.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 w-full ${isSelected ? 'bg-[#F4C430] border-[#F4C430] text-black shadow-[0_0_20px_rgba(244,196,48,0.3)] scale-[1.02]' : 'bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/30 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                      >
                        <div className="mb-2">{ride.icon}</div>
                        <div className="font-bold text-lg mb-1">{ride.name}</div>
                        <div className={`text-xs font-semibold ${isSelected ? 'text-black/70' : 'text-gray-500 dark:text-gray-400'}`}>{ride.rate}</div>
                      </button>
                    )
                  })}
                  </AnimatePresence>
                </div>

                {/* Route Inputs */}
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute left-[23px] top-[30px] bottom-[30px] w-0.5 bg-[#F4C430]" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#222] border-2 border-[#F4C430] flex items-center justify-center shrink-0 transition-colors">
                      <div className="w-3 h-3 rounded-full bg-[#F4C430]" />
                    </div>
                    <div className="flex-1">
                      <input type="text" value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Enter pickup location in Mathura" className="w-full bg-white dark:bg-[#222] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-[#1A1A1A] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#F4C430] transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#222] border-2 border-[#F4C430] flex items-center justify-center shrink-0 transition-colors">
                      <MapPin size={20} className="text-[#F4C430]" />
                    </div>
                    <div className="flex-1">
                      <input type="text" value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder="Where are you going?" className="w-full bg-white dark:bg-[#222] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-[#1A1A1A] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#F4C430] transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Date & Passengers */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex-1 bg-white dark:bg-[#222] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 flex items-center gap-3 transition-colors">
                    <Calendar className="text-gray-400" size={20} />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-transparent text-[#1A1A1A] dark:text-white outline-none dark:[color-scheme:dark]" />
                  </div>
                  <div className="flex-1 bg-white dark:bg-[#222] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                      <User size={20} />
                      <span className="text-[#1A1A1A] dark:text-white">Passengers</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-black/50 text-[#1A1A1A] dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-4 text-center text-[#1A1A1A] dark:text-white">{passengers}</span>
                      <button onClick={() => setPassengers(passengers + 1)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-black/50 text-[#1A1A1A] dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fare Estimate */}
                <div className="bg-white dark:bg-[#222] border border-[#F4C430]/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-[#F4C430] uppercase tracking-widest mb-1">Estimated Fare</div>
                    <div className="text-4xl font-extrabold text-[#1A1A1A] dark:text-white">{currentRideInfo.est}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">No surge &middot; No hidden charges</div>
                  </div>
                  
                  <div className="w-full md:w-auto flex flex-col gap-3 items-center">
                    <button onClick={handleBook} className="btn-hover btn-fill-yellow bg-[#F4C430] text-black w-full md:w-auto px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(244,196,48,0.2)]">
                      Confirm & Book Instantly &rarr;
                    </button>
                    {error && (
                      <span className="text-red-400 text-sm font-semibold" aria-live="polite">{error}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center" aria-live="polite">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={40} className="text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">Ride Request Ready</h3>
                <p className="text-gray-400 mb-8 max-w-md">Your {currentRideInfo.name} is ready to be booked. A captain will be assigned shortly.</p>
                
                <div className="w-full max-w-md bg-[#222] border border-white/10 rounded-xl p-6 text-left mb-8 space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-gray-400">From</span>
                    <span className="font-semibold text-right max-w-[200px] truncate">{pickup}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-gray-400">To</span>
                    <span className="font-semibold text-right max-w-[200px] truncate">{dropoff}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-gray-400">Date</span>
                    <span className="font-semibold">{date}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-gray-400">Passengers</span>
                    <span className="font-semibold">{passengers}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-400">Est. Fare</span>
                    <span className="font-bold text-[#F4C430]">{currentRideInfo.est}</span>
                  </div>
                </div>

                <button onClick={() => setBookingStatus('idle')} className="btn-hover btn-fill-yellow bg-[#F4C430] text-black w-full max-w-md px-8 py-4 rounded-xl font-bold text-lg">
                  Continue Booking &rarr;
                </button>
              </div>
            )}
         </motion.div>
      </div>
    </section>
  );
};

const EditorialHero = () => {
  const [pickup, setPickup] = useState('Mathura Junction');
  const [dropoff, setDropoff] = useState('Vrindavan');
  const [rideType, setRideType] = useState('bike');

  const rideOptions = [
    { id: 'bike', name: 'Bike', cost: '₹3/km' },
    { id: 'auto', name: 'Auto', cost: '₹5/km' },
    { id: 'cab', name: 'Cab', cost: '₹10/km' },
    { id: 'suv', name: 'SUV', cost: '₹15/km' }
  ];

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);
  const headlineY = useTransform(scrollY, [0, 500], [0, -100]);
  const vehicleXDesktop = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative w-full min-h-[100svh] bg-[#f8f9fa] dark:bg-[#0a0a0a] overflow-hidden flex flex-col pt-24 pb-8 lg:pt-32 transition-colors duration-500">
      {/* Background gradient/grain */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5 }}
         style={{ scale: heroScale, y: bgY }}
         className="absolute inset-0 z-0 pointer-events-none origin-bottom"
      >
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-[#f8f9fa] to-[#f0f2f5] dark:from-[#1a1a1a] dark:via-[#0a0a0a] dark:to-[#0a0a0a] opacity-80" />
         
         {/* Temple Silhouettes (SVG) */}
         <div className="absolute bottom-[20%] lg:bottom-[20%] right-0 w-[150%] md:w-[100%] lg:w-[70%] opacity-10 dark:opacity-20">
            <svg viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M800 300L800 150L820 100L840 150L840 300Z" className="fill-gray-400 dark:fill-[#333]"/>
              <path d="M700 300L700 180L730 130L760 180L760 300Z" className="fill-gray-500 dark:fill-[#222]"/>
              <path d="M900 300L900 200L920 170L940 200L940 300Z" className="fill-gray-300 dark:fill-[#111]"/>
              <path d="M500 300L500 220L515 190L530 220L530 300Z" className="fill-gray-400 dark:fill-[#181818]"/>
              <path d="M600 300L600 100L630 50L660 100L660 300Z" className="fill-gray-500 dark:fill-[#2a2a2a]"/>
            </svg>
         </div>
         <div className="absolute bottom-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F4C430]/30 to-transparent" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center lg:justify-between lg:flex-row mt-4 lg:mt-0">
         
         {/* Left / Center Text Column */}
         <motion.div style={{ y: headlineY }} className="w-full lg:w-1/2 flex flex-col justify-center z-20">
            {/* Labels */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-3 mb-6">
               <span className="text-gray-900 dark:text-white text-[10px] md:text-xs font-bold tracking-[0.3em]">JSKGO</span>
               <span className="w-1 h-1 bg-[#F4C430] rounded-full animate-pulse" />
               <span className="text-gray-500 dark:text-white/60 text-[10px] md:text-xs font-bold tracking-[0.3em]">MATHURA • BRAJ</span>
            </motion.div>
            
            {/* Giant Headline */}
            <h1 className="text-[17vw] md:text-[9vw] lg:text-[clamp(5rem,9vw,11rem)] font-black leading-[0.8] tracking-[-0.04em] uppercase text-gray-900 dark:text-white mb-6 lg:mb-8 mix-blend-normal dark:mix-blend-difference w-fit">
               <div className="overflow-hidden pb-2 lg:pb-4"><motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>MOVE</motion.div></div>
               <div className="overflow-hidden pb-2 lg:pb-4"><motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="text-[#F4C430]">YOUR WAY.</motion.div></div>
            </h1>
            
            {/* Vehicle Mobile Only (Stacks below headline) */}
            <div className="lg:hidden w-full relative mb-8 mt-2">
               <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0 0 0)" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="w-[110%] -ml-[5%] aspect-[4/3] bg-white/40 dark:bg-white/5 rounded-3xl backdrop-blur-md border border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(244,196,48,0.1)] relative"
               >
                  <VehicleVisual />
               </motion.div>
            </div>

            {/* Description & Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="max-w-md pointer-events-auto">
               <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-snug mb-8">
                  Bikes for the everyday.<br/>
                  Autos for the quick trip.<br/>
                  Cabs for the journey.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link to="/#book" className="btn-hover btn-fill-yellow bg-white dark:bg-[#1a1a1a] border border-gray-900 dark:border-[#F4C430] text-gray-900 dark:text-[#F4C430] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase flex items-center justify-center shadow-md dark:shadow-none">
                     Book a Ride &rarr;
                  </Link>
                  <Link to="/#app" className="btn-hover btn-fill-dark dark:btn-fill-white bg-transparent border border-gray-900 dark:border-white text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase flex items-center justify-center">
                     Download App
                  </Link>
               </div>
            </motion.div>
         </motion.div>

         {/* Vehicle Desktop Only */}
         <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ x: vehicleXDesktop }}
            className="hidden lg:flex absolute right-[-2%] top-[15%] w-[64%] xl:w-[54%] aspect-[16/10] bg-white/60 dark:bg-white/5 rounded-3xl backdrop-blur-md border border-gray-200 dark:border-white/10 items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(244,196,48,0.15)] origin-right"
         >
            <VehicleVisual />
         </motion.div>
      </div>


      
      {/* Editorial Labels */}
      <motion.div style={{ opacity }} className="hidden lg:flex absolute left-8 bottom-32 flex-col gap-12 text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-white/30 mix-blend-normal dark:mix-blend-difference pointer-events-none z-10">
         <div>MATHURA<br/>28.41° N</div>
         <div>BRAJ REGION<br/>24/7</div>
      </motion.div>
      <motion.div style={{ opacity }} className="hidden lg:flex absolute right-8 top-1/3 flex-col gap-12 text-[10px] font-bold tracking-[0.2em] text-gray-400 dark:text-white/30 text-right mix-blend-normal dark:mix-blend-difference pointer-events-none z-10">
         <div>BIKE<br/>FROM ₹3/KM</div>
         <div>200+<br/>CAPTAINS</div>
      </motion.div>
    </section>
  );
};

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const [bookingType, setBookingType] = useState('Bike');
  const [pickup, setPickup] = useState('Mathura Junction');
  const [dropoff, setDropoff] = useState('');
  const [rideDate, setRideDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    window.locomotive = locomotiveScroll;
    return () => {
      locomotiveScroll.destroy();
      delete window.locomotive;
    };
  }, []);


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#121212] text-[#1A1A1A] dark:text-gray-100 font-sans selection:bg-[#F4C430] selection:text-black transition-colors duration-300">
      <MouseFollower />
      
      {/* GOOEY FILTER DEF */}
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* NAVBAR */}
      <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-in-out flex justify-center ${isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}>
        
        {/* Glass Background Layer */}
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`transition-all duration-700 ease-in-out ${isScrolled ? 'bg-white/40 dark:bg-black/40 backdrop-blur-xl mt-4 max-w-5xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/10' : 'bg-transparent mt-0 max-w-full rounded-none w-full border-b border-transparent'}`}
            style={{ height: isScrolled ? '3.5rem' : '5rem', width: isScrolled ? '100%' : '100%' }}
          />
        </div>

        {/* Foreground Content */}
        <motion.nav 
          layout
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`w-full transition-all duration-700 ease-in-out relative ${isScrolled ? 'max-w-5xl rounded-full' : 'max-w-full rounded-none'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            
            <AnimatePresence>
              {isScrolled && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#F4C430]/20 to-transparent blur-2xl -z-10 rounded-full"
                />
              )}
            </AnimatePresence>

            <motion.div 
              layout 
              className="flex justify-between items-center transition-all duration-700 ease-in-out"
              style={{ height: isScrolled ? '3.5rem' : '5rem' }}
            >
              <motion.div layout className="flex items-center gap-2">
                <Link to="/#hero" aria-label="JSKGO home" className={`font-extrabold tracking-tight transition-all duration-700 ${isScrolled ? 'text-2xl' : 'text-3xl'}`}>
                  JSK<span className="text-[#F4C430]">GO</span>
                </Link>
              </motion.div>
              
              <motion.div layout className="hidden md:flex items-center space-x-2 font-medium">
                {[
                  { name: 'Rides', href: '#rides' },
                  { name: 'Coverage', href: '#coverage' },
                  { name: 'Drive With Us', href: '#drive' },
                  { name: 'App', href: '#app' },
                  { name: 'Help', href: '#faq' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="relative px-4 py-2 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-300 ease-out group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <div className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out shadow-sm" />
                  </a>
                ))}
              </motion.div>

              <motion.div layout className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setIsDark(!isDark)} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                </button>
                <Link to="/#book" className={`btn-hover btn-fill-yellow bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-full font-semibold shadow-lg shadow-black/10 ${isScrolled ? 'px-5 py-1.5 text-sm' : 'px-6 py-2.5 text-base'}`}>
                  Book Now
                </Link>
              </motion.div>

              <div className="md:hidden flex items-center gap-2">
                <button 
                  onClick={() => setIsDark(!isDark)} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                </button>
                <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-24 px-6 flex flex-col gap-6 text-xl font-semibold"
          >
            <Link to="/#rides" onClick={() => setIsMobileMenuOpen(false)}>Rides</Link>
            <Link to="/#coverage" onClick={() => setIsMobileMenuOpen(false)}>Coverage</Link>
            <Link to="/#drive" onClick={() => setIsMobileMenuOpen(false)}>Drive With Us</Link>
            <Link to="/#app" onClick={() => setIsMobileMenuOpen(false)}>App</Link>
            <Link to="/#faq" onClick={() => setIsMobileMenuOpen(false)}>Help</Link>
            <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link to="/#book" onClick={() => setIsMobileMenuOpen(false)} className="btn-hover btn-fill-dark bg-[#F4C430] w-full py-4 rounded-xl mt-auto mb-12 shadow-lg text-center">
              Book a Ride
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <EditorialHero />
      <BookingSection />
      {/* TRUST STATS */}
      <section className="bg-[#1A1A1A] dark:bg-black py-12 border-t border-b border-white/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="text-center px-4">
              <div className="text-3xl lg:text-4xl font-black text-white mb-1">6,500+</div>
              <div className="text-gray-400 font-medium">Happy Riders</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl lg:text-4xl font-black text-[#F4C430] mb-1">200+</div>
              <div className="text-gray-400 font-medium">Verified Captains</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl lg:text-4xl font-black text-white mb-1">3 min</div>
              <div className="text-gray-400 font-medium">Avg. Pickup</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl lg:text-4xl font-black text-white mb-1 flex justify-center items-center gap-1">4.8 <Star size={24} fill="currentColor" className="text-[#F4C430]" /></div>
              <div className="text-gray-400 font-medium">App Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* RIDE TYPES */}
      <section id="rides" className="py-24 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Choose Your Ride</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">From quick city rides to comfortable group journeys.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RIDES.map((ride) => (
              <TiltCard key={ride.id} className={`p-6 rounded-2xl border-2 transition-shadow duration-300 ${ride.popular ? 'border-[#F4C430] bg-[#F4C430]/5' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-[#1A1A1A] hover:shadow-xl dark:hover:shadow-white/5'}`}>
                {ride.popular && (
                  <div className="absolute -top-3 left-6 bg-[#F4C430] text-black text-xs font-bold px-3 py-1 rounded-full z-20">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-5xl">{ride.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1A1A1A] dark:text-white">{ride.price}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{ride.min}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{ride.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-6">{ride.desc}</p>
                <button className={`btn-hover w-full py-3 rounded-xl font-bold ${ride.popular ? "btn-fill-dark bg-[#F4C430] text-black" : "btn-fill-yellow bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"}`}>
                  Book {ride.name}
                </button>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gray-50 dark:bg-[#181818] overflow-hidden relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-[#1A1A1A] dark:text-white">Book in Under 30 Seconds</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Your next destination is just a few taps away.</p>
          </div>

          <div className="relative">
            {/* Animated Route Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0">
              <motion.div 
                className="h-full bg-[#F4C430]"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            <motion.div 
              className="grid lg:grid-cols-4 gap-8 relative z-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.4
                  }
                }
              }}
            >
              {[
                { step: '01', title: 'Open JSKGO', desc: 'Launch the app or website.' },
                { step: '02', title: 'Enter Locations', desc: 'Set your pickup and drop-off.' },
                { step: '03', title: 'Choose Ride', desc: 'Select the best vehicle for you.' },
                { step: '04', title: 'Ride & Pay', desc: 'Enjoy the trip and pay easily.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
                  }}
                  className="h-full"
                >
                  <TiltCard className="bg-white dark:bg-[#222222] p-8 rounded-2xl shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-800 relative h-full">
                    <div className="w-12 h-12 bg-[#F4C430] text-black rounded-full flex items-center justify-center font-black text-xl mb-6 mx-auto lg:mx-0">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center lg:text-left text-[#1A1A1A] dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-center lg:text-left">{item.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className="coverage-section py-24 bg-gray-50 dark:bg-black text-[#1A1A1A] dark:text-white overflow-hidden relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">We Serve <span className="text-[#F4C430]">Braj</span></h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Reliable rides across Mathura City, Vrindavan, Govardhan, Barsana, Nandgaon, Gokul, Baldeo, and Agra.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {['Mathura City', 'Vrindavan', 'Govardhan', 'Barsana', 'Nandgaon', 'Gokul', 'Baldeo', 'Agra'].map(city => (
                  <span key={city} className="bg-gray-200 dark:bg-white/10 px-4 py-2 rounded-full font-medium text-sm border border-gray-300 dark:border-white/10 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <CoverageVisual />
          </div>
        </div>
      </section>

      {/* WHY JSKGO */}
      <section className="py-24 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-12 text-[#1A1A1A] dark:text-white">Why Choose JSKGO?</h2>
              <div className="space-y-8">
                {[
                  { title: 'No Surge Pricing', desc: 'Fair, transparent fares even during peak hours and festivals. What you see is what you pay.' },
                  { title: 'Verified Captains', desc: 'Every captain goes through strict background checks for your safety and peace of mind.' },
                  { title: 'Fast Pickup', desc: 'Our smart routing ensures you get a ride in minutes, not hours.' },
                  { title: 'Built for Braj', desc: 'Local drivers who know the best routes, shortcuts, and temple timings.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center font-black text-xl shrink-0 text-gray-400 dark:text-gray-500">
                      0{i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <TiltCard className="bg-[#F4C430] rounded-3xl p-8 lg:p-12 text-black shadow-xl w-full">
              <h3 className="text-3xl font-extrabold mb-6">Our Promise</h3>
              <p className="text-xl font-medium mb-8 opacity-90 leading-relaxed">
                "We started JSKGO to bring world-class mobility to the holy region of Braj. Fast, reliable, and deeply respectful of local needs."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg">
                  <ShieldCheck size={32} className="text-[#F4C430]" />
                </div>
                <div>
                  <div className="font-bold text-lg">100% Safe & Secure</div>
                  <div className="font-medium opacity-80">24/7 Support Center</div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* LOCAL EXPERIENCE */}
      <section className="py-24 bg-gray-50 dark:bg-[#181818] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-[#1A1A1A] dark:text-white">Built for the Way You Travel in Braj</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Tailored experiences for every kind of journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Temple Visits', desc: 'Hassle-free drops near major temples.', color: 'bg-orange-100 dark:bg-orange-900/30 dark:border-orange-500/20' },
              { title: 'Daily Commutes', desc: 'Beat the traffic with quick Bike Taxis.', color: 'bg-blue-100 dark:bg-blue-900/30 dark:border-blue-500/20' },
              { title: 'Family Pilgrimage', desc: 'Spacious SUVs for your whole group.', color: 'bg-purple-100 dark:bg-purple-900/30 dark:border-purple-500/20' },
              { title: 'Airport Transfers', desc: 'Timely trips to Agra airport.', color: 'bg-green-100 dark:bg-green-900/30 dark:border-green-500/20' }
            ].map((useCase, i) => (
              <TiltCard key={i} className={`${useCase.color} rounded-2xl p-8 cursor-pointer border border-black/5 dark:border-white/5`}>
                <div className="bg-white/50 dark:bg-black/30 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-6 backdrop-blur-sm dark:text-white">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1A1A1A] dark:text-white">{useCase.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{useCase.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* APP SECTION */}
      <section id="app" className="app-section py-24 bg-gray-50 dark:bg-black text-[#1A1A1A] dark:text-white border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">Your Ride.<br/>One Tap Away.</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Download the JSKGO app for the fastest booking experience, real-time tracking, and exclusive offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.user.jskks&hl=en_IN" target="_blank" rel="noopener noreferrer" className="btn-hover btn-fill-dark dark:btn-fill-light bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 01-.61-.986V2.8a1.986 1.986 0 01.61-.986zM14.772 13l6.505 3.745c.983.566.983 1.488 0 2.054l-1.393.802L14.772 13zm-1.01-1l-9.155-9.155L19.884 4.4l-6.122 3.6zm.968-.95l5.106-2.94-1.393-.802c-.983-.566-2.58-.566-3.563 0l-6.282 3.615 6.132 6.132z"/></svg>
                  <div className="text-left leading-tight">
                    <div className="text-xs opacity-70 font-medium">Download for</div>
                    <div className="text-lg">Customer App — Android</div>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.driver.jskks&hl=en_IN" target="_blank" rel="noopener noreferrer" className="btn-hover btn-fill-dark dark:btn-fill-light bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 01-.61-.986V2.8a1.986 1.986 0 01.61-.986zM14.772 13l6.505 3.745c.983.566.983 1.488 0 2.054l-1.393.802L14.772 13zm-1.01-1l-9.155-9.155L19.884 4.4l-6.122 3.6zm.968-.95l5.106-2.94-1.393-.802c-.983-.566-2.58-.566-3.563 0l-6.282 3.615 6.132 6.132z"/></svg>
                  <div className="text-left leading-tight">
                    <div className="text-xs opacity-70 font-medium">Are you a captain?</div>
                    <div className="text-lg">Driver App — Android</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Phone Mockup CSS */}
            <div className="relative mx-auto w-full max-w-[250px] sm:max-w-[275px] lg:max-w-[295px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F4C430]/20 to-transparent blur-3xl rounded-full" />
              <div className="relative bg-white text-black rounded-[2.5rem] border-[7px] border-gray-800 shadow-2xl overflow-hidden aspect-[9/16]">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-3xl w-1/2 mx-auto z-20" />
                
                {/* App UI Mockup */}
                <div className="p-5 pt-10 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <Menu size={20} />
                    <div className="font-bold text-lg tracking-tight">JSKGO</div>
                    <div className="w-7 h-7 bg-gray-200 rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-5">Where to?</h3>
                  <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-2 mb-6">
                    <Navigation size={17} className="text-gray-500" />
                    <div className="font-semibold text-sm text-gray-500">Search destination</div>
                  </div>
                  
                  <div className="flex-1 bg-gray-100 rounded-2xl relative overflow-hidden -mx-2">
                    {/* Fake Map */}
                    <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M10,90 Q30,40 50,60 T90,10" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="4 4"/>
                    </svg>
                    
                    <div className="absolute bottom-3 inset-x-3 bg-white rounded-xl p-3 shadow-lg flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">🏍️</div>
                        <div>
                          <div className="font-bold text-sm">Bike Taxi</div>
                          <div className="text-xs text-green-600 font-semibold">2 min away</div>
                        </div>
                      </div>
                      <div className="font-bold">₹45</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPTAIN SECTION */}
      <section id="drive" className="bg-[#F4C430] py-24 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">Earn ₹25,000+/month as a JSKGO Captain</h2>
              <p className="text-xl font-medium opacity-90 mb-8">
                Be your own boss. Drive when you want, earn what you need. Zero onboarding fees and daily payouts.
              </p>
              
              <ul className="space-y-4 mb-10 font-bold text-lg">
                <li className="flex items-center gap-3"><CheckCircle2 size={24} /> Daily payouts directly to bank</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={24} /> Flexible working hours</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={24} /> 24/7 Captain Support</li>
              </ul>
              
              <button className="btn-hover btn-fill-yellow bg-black text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl">
                Register as Captain
              </button>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 text-center">
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <span className="text-6xl">👨🏽‍✈️</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Join 200+ Captains</h3>
              <p className="font-medium opacity-90 mb-6">Moving Braj forward, together.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl font-black mb-1">0%</div>
                  <div className="text-sm font-bold text-gray-700">Hidden Fees</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl font-black mb-1">10m</div>
                  <div className="text-sm font-bold text-gray-700">Onboarding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-[#1A1A1A] dark:text-white">Questions?<br/>We've got answers.</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Everything you need to know about riding and driving with JSKGO.</p>
              <a href="tel:+919634364324" className="text-lg font-bold flex items-center gap-2 text-[#1A1A1A] dark:text-white hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">
                Contact Support <ArrowRight size={20} />
              </a>
            </div>
            
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      
      {/* EDITORIAL EXPERIENCES SECTION */}
      <section id="experiences" className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-[#181818] transition-colors duration-300 overflow-hidden relative">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mb-16 md:mb-24 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] dark:text-white leading-tight mb-6">Built for the Way You Travel in Braj</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">Tailored experiences for every kind of journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6 xl:gap-10 pb-4 md:pb-20 lg:pb-32">
            {[
              {
                num: '01',
                title: 'Temple Visits',
                desc: 'Hassle-free drops near major temples.',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAV7Bx8dW_D17bIeT3X92r94b-viCOZWIrrL_kKRg6cA&s=10'
              },
              {
                num: '02',
                title: 'Daily Commutes',
                desc: 'Beat the traffic with quick Bike Taxis.',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtcwr61xBAtBAqeLDIKOtkNtMhxBScqX6SB_ne74K_hw&s=10'
              },
              {
                num: '03',
                title: 'Family Pilgrimage',
                desc: 'Spacious SUVs for your whole group.',
                img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'
                  },
              {
                num: '04',
                title: 'Airport Transfers',
                desc: 'Timely trips to Agra airport.',
                img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800'
              }
            ].map((card, index) => (
              <div 
                key={card.num} 
                className={`relative group flex flex-col ${index % 2 === 1 ? 'md:translate-y-16 lg:translate-y-24' : ''}`}
              >
                {/* Oversized Number Background */}
                <div className="absolute -top-16 -right-4 md:-top-20 md:-left-4 lg:-top-24 lg:-left-8 text-[120px] md:text-[140px] lg:text-[180px] font-black text-gray-400/25 dark:text-gray-500/20 leading-none select-none z-0 pointer-events-none transition-all duration-300">
                  {card.num}
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex-1 flex flex-col bg-white dark:bg-[#222222] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 dark:border-white/5 transition-all duration-500 group-hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative h-[250px] sm:h-[300px] md:h-[260px] lg:h-[280px] xl:h-[340px] w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] dark:text-white mb-3 tracking-tight group-hover:text-[#F4C430] dark:group-hover:text-[#F4C430] transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                    
                    {/* Arrow Button */}
                    <div className="mt-8 flex items-center justify-end">
                      <button 
                        aria-label={`Explore ${card.title}`}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[#1A1A1A] dark:text-white group-hover:bg-[#F4C430] group-hover:text-black transition-colors duration-300 shadow-sm"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white dark:bg-[#121212] transition-colors duration-300 border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-[#1A1A1A] dark:text-white">Get in Touch</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                Have a question or need assistance? Our support team is here for you around the clock.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">Office Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">Mathura, Uttar Pradesh – 281001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">Phone Support</h3>
                    <a href="tel:+919634364324" className="text-[#F4C430] hover:text-black dark:hover:text-white transition-colors font-medium text-lg">+91 96343 64324</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">Email Us</h3>
                    <a href="mailto:support@jskks.com" className="text-[#F4C430] hover:text-black dark:hover:text-white transition-colors font-medium text-lg">support@jskks.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <span className="text-2xl">🕐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-1">Working Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Available 24 hours · 7 days</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 flex items-center justify-center shadow-xl group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598282361668-967b07dbd651?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-30 dark:opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#121212] via-white/50 dark:via-[#121212]/50 to-transparent" />
               <div className="relative z-10 text-center px-6">
                 <div className="w-20 h-20 bg-[#F4C430] rounded-full mx-auto flex items-center justify-center shadow-lg mb-6 shadow-[#F4C430]/20">
                    <span className="text-3xl">📍</span>
                 </div>
                 <h3 className="text-2xl font-black text-[#1A1A1A] dark:text-white mb-2">Based in Braj</h3>
                 <p className="text-gray-700 dark:text-gray-300 font-medium max-w-sm mx-auto">Proudly serving Mathura City, Vrindavan, Govardhan, Barsana, Nandgaon, Gokul, Baldeo, and Agra with reliable, 24/7 transportation.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-white dark:bg-black text-[#1A1A1A] dark:text-white text-center border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">Where are you going?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">Your next ride is just a tap away.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/#book" className="btn-hover btn-fill-dark bg-[#F4C430] text-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg">
              Book a Ride
            </Link>
            <Link to="/#app" className="btn-hover btn-fill-light bg-gray-100 dark:bg-white/10 text-[#1A1A1A] dark:text-white border border-gray-200 dark:border-white/20 px-8 py-4 rounded-xl font-bold text-lg">
              Download App
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 dark:bg-black text-[#1A1A1A] dark:text-white pt-20 pb-10 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/#hero" aria-label="JSKGO home" className="text-4xl font-extrabold tracking-tight mb-6 block w-fit">JSK<span className="text-[#F4C430]">GO</span></Link>
              <p className="text-gray-400 mb-6 max-w-sm">
Mathura's homegrown ride platform — bike taxi, auto & cab booking for the Braj region. Fast, safe, no-surge pricing.


              </p>
              <div className="flex gap-4">
                <Link to="/#footer" aria-label="JSKGO on LinkedIn" className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-[#F4C430] hover:text-black flex items-center justify-center transition-colors">
                  <SocialIcon type="linkedin" />
                </Link>
                <Link to="/#footer" aria-label="JSKGO on Twitter" className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-[#F4C430] hover:text-black flex items-center justify-center transition-colors">
                  <SocialIcon type="twitter" />
                </Link>
                <Link to="/#footer" aria-label="JSKGO on Instagram" className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-[#F4C430] hover:text-black flex items-center justify-center transition-colors">
                  <SocialIcon type="instagram" />
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                <li><Link to="/#rides" className="hover:text-black dark:hover:text-white transition-colors">Ride Types</Link></li>
                <li><Link to="/#coverage" className="hover:text-black dark:hover:text-white transition-colors">Coverage</Link></li>
                <li><Link to="/#drive" className="hover:text-black dark:hover:text-white transition-colors">Drive With Us</Link></li>
                <li><Link to="/#app" className="hover:text-black dark:hover:text-white transition-colors">App</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                <li><Link to="/#faq" className="hover:text-black dark:hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/#contact" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Legal</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                <li><Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-black dark:hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-300 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 dark:text-gray-500 font-medium">
            <div>© 2025 JSKGO. All rights reserved. | Cab & Bike Taxi Booking in Mathura
</div>
            <div className="flex items-center gap-5">
              <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/sitemap" className="hover:text-black dark:hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BOOK BUTTON */}
      <div className="md:hidden fixed bottom-6 inset-x-6 z-40">
        <Link to="/#book" className="btn-hover btn-fill-dark w-full bg-[#F4C430] text-black py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2">
          Book a Ride <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}

function SocialIcon({ type }) {
  const paths = {
    linkedin: 'M6 8v10M6 5.5v.01M10 18v-6a4 4 0 0 1 8 0v6M10 12a4 4 0 0 1 8 0',
    twitter: 'M20 7.5a7 7 0 0 1-2 .6A3.5 3.5 0 0 0 19.5 6a7 7 0 0 1-2.2.9A3.5 3.5 0 0 0 11.3 9c0 .3 0 .5.1.8A9.9 9.9 0 0 1 4 6.6a3.5 3.5 0 0 0 1.1 4.7 3.5 3.5 0 0 1-1.6-.4 3.5 3.5 0 0 0 2.8 3.5 3.5 3.5 0 0 1-1.6.1 3.5 3.5 0 0 0 3.3 2.4A7 7 0 0 1 4 18.4 9.9 9.9 0 0 0 9.4 20c6.5 0 10-5.4 10-10v-.5c.7-.5 1.2-1.1 1.6-1.8Z',
    instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM17.5 6.5h.01'
  }

  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[type]} /></svg>
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/50">
      <button 
        className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-lg bg-white dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? <Minus size={20} className="text-[#F4C430]" /> : <Plus size={20} className="text-gray-400 dark:text-gray-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-medium"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] pt-32 px-4 sm:px-6 lg:px-8 pb-24 text-gray-900 dark:text-gray-100 font-sans selection:bg-[#F4C430] selection:text-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 text-[#1A1A1A] dark:text-white">Terms of Service</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Last Updated: January 9, 2026</p>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>These Terms of Service ("Terms") govern your access to and use of the JSKGO mobile application, website, and taxi booking and ride-sharing services (collectively, the "Services") provided by JSKKS Ji Vrindavan Services Solution Private Limited ("JSKGO", "we", "us", or "our").</p>
          <p>By accessing or using the JSKGO Platform, you agree to be bound by these Terms and our <Link to="/privacy" className="text-[#F4C430] hover:underline">Privacy Policy</Link> and <Link to="/cookies" className="text-[#F4C430] hover:underline">Cookie Policy</Link>. If you do not agree, do not use the Platform or Services.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">1. Eligibility and Accounts</h2>
          <p>You must be at least 18 years old and legally able to enter into these Terms to use the Services. You are responsible for providing accurate information, keeping your account credentials confidential, and all activity under your account. Notify us promptly if you believe your account has been used without authorization.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">2. Our Services</h2>
          <p>JSKGO provides a technology platform that connects Customers with independent third-party Captains and Vendor Partners. We facilitate bookings, communications, payments, and support. Unless expressly stated otherwise, JSKGO is not the driver or direct provider of transportation services.</p>
          <p>Service availability, vehicle types, estimated arrival times, and routes may vary by location, demand, traffic, weather, and other conditions. We do not guarantee that a Captain or vehicle will always be available.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">3. Bookings, Fares, and Payments</h2>
          <ul className="list-disc pl-6 space-y-2"><li>When you request a ride, you agree to provide correct pickup, drop-off, date, and passenger details.</li><li>Fares may be estimated before booking and can depend on distance, time, vehicle type, tolls, waiting time, and applicable taxes or fees.</li><li>Payment may be made using supported digital payment methods or cash, as shown at booking. Third-party payment processors handle payment information according to their own terms.</li><li>You authorize JSKGO or its payment processors to charge the selected payment method for amounts due.</li><li>You must not use fraudulent payment methods or dispute a valid charge without a legitimate reason.</li></ul>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">4. Cancellations and Refunds</h2>
          <p>You may cancel a booking through the Platform. A cancellation fee, waiting fee, or other applicable charge may apply where disclosed during booking or required because a Captain has already started travelling to the pickup point. Refunds, where approved, are returned through the original payment method and may be subject to payment-provider timelines.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">5. Customer Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2"><li>Be ready at the confirmed pickup location and treat Captains, other passengers, and support staff respectfully.</li><li>Follow applicable laws, traffic rules, safety instructions, and vehicle capacity limits.</li><li>Do not damage, misuse, or leave hazardous, illegal, or prohibited items in a vehicle.</li><li>Do not use the Services to harass, threaten, discriminate against, defraud, or harm another person.</li><li>Provide truthful information and do not create duplicate, impersonating, or unauthorized accounts.</li></ul>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">6. Captain and Vendor Partner Responsibilities</h2>
          <p>Captains and Vendor Partners are independent third-party service providers. They are responsible for maintaining valid licences, registrations, insurance, permits, vehicle safety, and compliance with applicable laws. Captains must provide services professionally and must not discriminate, abuse, or endanger Customers.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">7. Safety and Emergencies</h2>
          <p>Use the Platform's safety and emergency features where available. In an immediate emergency, contact local emergency services first. JSKGO may monitor rides, share relevant information, and cooperate with authorities to protect users and the public, as described in our Privacy Policy.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">8. Communications and Reviews</h2>
          <p>By using the Services, you agree to receive service-related calls, messages, emails, and notifications. You may control promotional communications through the available settings. Reviews and feedback must be honest, relevant, and free of abusive, illegal, or confidential content. You grant JSKGO a non-exclusive right to use feedback to improve the Services.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">9. Platform Use and Intellectual Property</h2>
          <p>The Platform, including its software, design, text, logos, graphics, and content, belongs to JSKGO or its licensors and is protected by applicable law. We grant you a limited, personal, non-transferable, revocable licence to use the Platform for its intended purpose. You must not copy, reverse engineer, scrape, resell, interfere with, or introduce malicious code into the Platform.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">10. Suspension and Termination</h2>
          <p>We may suspend or terminate access to an account or the Services if you breach these Terms, provide false information, create a safety or legal risk, engage in fraud or abuse, or where necessary to protect the Platform. You may stop using the Services or request account deletion as described in the Privacy Policy. Provisions that by their nature should continue will survive termination.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">11. Disclaimers and Limitation of Liability</h2>
          <p>The Services are provided on an "as available" basis. To the extent permitted by law, JSKGO does not guarantee uninterrupted, error-free, or fully accurate Services, availability of a particular Captain, or a specific journey time. Nothing in these Terms excludes liability that cannot lawfully be excluded. To the extent permitted by law, JSKGO will not be liable for indirect, incidental, special, or consequential loss arising from use of the Platform or third-party transportation services.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">12. Indemnity</h2>
          <p>To the extent permitted by law, you agree to indemnify and hold harmless JSKGO, its officers, employees, and partners from claims, losses, liabilities, and expenses arising from your breach of these Terms, misuse of the Platform, or violation of another person's rights or applicable law.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">13. Changes to These Terms</h2>
          <p>We may update these Terms from time to time. We will post the revised Terms on the Platform and update the "Last Updated" date. Your continued use of the Services after changes take effect constitutes acceptance of the revised Terms.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">14. Governing Law and Contact</h2>
          <p>These Terms are governed by the applicable laws of India. Questions about these Terms may be sent to <a href="mailto:nodaloffice@jskks.com" className="text-[#F4C430] hover:underline">nodaloffice@jskks.com</a>.</p>
          <p className="font-semibold">JSKKS Ji Vrindavan Services Solution Private Limited<br />Last Updated: January 9, 2026</p>
          <Link to="/" className="inline-block mt-8 text-[#F4C430] font-bold hover:underline">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] pt-32 px-4 sm:px-6 lg:px-8 pb-24 text-gray-900 dark:text-gray-100 font-sans selection:bg-[#F4C430] selection:text-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 text-[#1A1A1A] dark:text-white">Cookie Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Last Updated: January 9, 2026</p>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>This Cookie Policy explains how JSKKS Ji Vrindavan Services Solution Private Limited ("JSKGO", "we", "us", or "our") uses cookies and similar technologies on the JSKGO website, mobile application, and related Services.</p>
          <p>Cookies are small text files stored on your device. Similar technologies include pixel tags, web beacons, local storage, device identifiers, and software development kits. They help us remember choices, keep the Platform secure, understand usage, and improve our Services.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">1. Types of Technologies We Use</h2>
          <ul className="list-disc pl-6 space-y-2"><li><strong>Strictly necessary technologies:</strong> Support authentication, account sessions, security, fraud prevention, booking, payments, and core Platform functions. These cannot generally be disabled without affecting the Services.</li><li><strong>Preference technologies:</strong> Remember settings such as language, location choices, and display preferences.</li><li><strong>Analytics technologies:</strong> Help us understand pages viewed, features used, performance, traffic, and errors so we can improve the Platform.</li><li><strong>Marketing technologies:</strong> Help measure campaigns and provide relevant offers or advertisements where permitted. We do not sell your personal information.</li></ul>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">2. Why We Use Cookies</h2>
          <p>We use cookies and similar technologies to remember preferences and settings, authenticate your identity and maintain sessions, protect against fraud and unauthorized activity, process bookings and payments, analyze usage and measure marketing effectiveness, provide personalized content, and diagnose technical problems.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">3. Third-Party Technologies</h2>
          <p>Some service providers may place or access technologies on our behalf, including providers of hosting, analytics, mapping, payment, communications, customer support, and advertising services. Their use of information is governed by their own privacy policies and applicable agreements.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">4. Your Choices</h2>
          <p>You can manage cookies through your browser settings, delete stored cookies, restrict third-party cookies, or use device privacy controls. You can manage app permissions and reset advertising identifiers through your device settings. Disabling or deleting cookies may prevent login, booking, payment, or other features from working correctly.</p>
          <p>Where a consent tool is provided, you can change your optional cookie preferences through that tool. Strictly necessary technologies will continue to operate because they are required to provide requested Services.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">5. Retention and Privacy</h2>
          <p>Cookie and device data may be retained for different periods depending on its purpose. We retain and protect information in accordance with our <Link to="/privacy" className="text-[#F4C430] hover:underline">Privacy Policy</Link>, which explains how we collect, use, share, and protect personal information.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">6. Changes to This Policy</h2>
          <p>We may update this Cookie Policy when our technology, Services, or legal obligations change. We will post the revised Policy with a new "Last Updated" date. Please review it periodically.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">7. Contact Us</h2>
          <p>For questions about this Cookie Policy or our data practices, contact our Grievance Officer, Mohit Garg, at <a href="mailto:nodaloffice@jskks.com" className="text-[#F4C430] hover:underline">nodaloffice@jskks.com</a>.</p>
          <p className="font-semibold">JSKKS Ji Vrindavan Services Solution Private Limited<br />Last Updated: January 9, 2026</p>
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
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Last Updated: January 9, 2026</p>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>Your privacy matters to JSKKS Ji Vrindavan Services Solution Private Limited (the "Company", "we", "JSKGO", "us" or "our").</p>
          <p>This Privacy Policy ("Policy") describes how we collect, use, process, store, share, and protect your information, including personal information and sensitive personal data ("Information"), when you use the JSKGO mobile application ("JSKGO App"), our website at <a href="https://jskgo.com/" target="_blank" rel="noopener noreferrer" className="text-[#F4C430] hover:underline">jskgo.com</a> (collectively, the "JSKGO Platform"), or our taxi booking and ride-sharing services ("Services").</p>
          <p>The terms "you" and "your" refer to Captains (drivers), Customers (riders), Vendor Partners, or any other user of the JSKGO Platform and Services.</p>
          <p>Please read this Policy carefully before using the JSKGO Platform or Services. By using our Platform or Services, you agree to this Policy.</p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">1. User Acceptance and Consent</h2>
          <p>By accessing or using the JSKGO Platform or Services, you agree and consent to this Policy and the collection, use, and disclosure of your information as described herein. This includes our collection and use of location data as detailed in Section 3 below.</p>
          <p>If you do not agree with this Policy, please do not use or access the JSKGO Platform or Services.</p>
          <p>You represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All Information you provide is accurate, current, and complete.</li>
            <li>You have all necessary rights and consents to provide such Information.</li>
            <li>Your use of our Services complies with all applicable laws and regulations.</li>
            <li>If you provide information about others, you have their consent to do so.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Captains:</strong> Independent third-party drivers who provide transportation services to Customers through the JSKGO Platform.</li>
            <li><strong>Customers:</strong> Users who book rides or other transportation services through the JSKGO Platform.</li>
            <li><strong>Vendor Partners:</strong> Third-party vehicle providers who offer vehicle rentals through the JSKGO Platform.</li>
            <li><strong>Personal Information:</strong> Information that identifies or can be used to identify an individual person.</li>
            <li><strong>Location Data:</strong> Precise or approximate geographic location information derived from GPS, Wi-Fi, Bluetooth, cellular towers, or IP address.</li>
            <li><strong>Device:</strong> Any computer, mobile phone, tablet, or other electronic device used to access our Services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">3. Location Data Collection and Use</h2>
          <p><strong>IMPORTANT: Location Data Disclosure</strong></p>
          <p>We collect, use, and share your location data to provide our core taxi booking and ride services. Location access is essential for the functioning of our Services.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">3.1 What Location Data We Collect</h3>
          <p>We collect precise and approximate location data, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>GPS location:</strong> Precise geographic coordinates from your device's GPS sensor.</li>
            <li><strong>Wi-Fi and Bluetooth signals:</strong> Location information from nearby Wi-Fi networks and Bluetooth beacons.</li>
            <li><strong>Cell tower location:</strong> Approximate location based on cellular network towers.</li>
            <li><strong>IP address location:</strong> General location derived from your internet connection.</li>
            <li><strong>Address information:</strong> Pickup and drop-off locations you enter manually.</li>
          </ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">3.2 When We Collect Location Data</h3>
          <p><strong>For Customers:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>When you open the JSKGO App to show available drivers nearby.</li>
            <li>When you request a ride to match you with nearby Captains.</li>
            <li>During an active ride to track the route and provide navigation.</li>
            <li>When the app is running in the background, if you have enabled background location access.</li>
          </ul>
          <p><strong>For Captains:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>When you are online and available for ride requests.</li>
            <li>During an active ride for navigation, route tracking, and customer visibility.</li>
            <li>When the app is running in the background while you are online.</li>
            <li>For safety monitoring and ride verification purposes.</li>
          </ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">3.3 How We Use Location Data</h3>
          <p>We use your location data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Core Service Delivery:</strong> Matching Customers with nearby available Captains, calculating estimated arrival times and ride fares, providing turn-by-turn navigation to Captains, displaying real-time location of your Captain and vehicle, and optimizing pickup and drop-off locations.</li>
            <li><strong>Safety and Security:</strong> Emergency assistance and location sharing with emergency contacts, monitoring rides for safety purposes, investigating accidents, disputes, or fraudulent activities, and verifying ride completion at the correct location.</li>
            <li><strong>Service Improvement:</strong> Analyzing traffic patterns and demand in different areas, improving route suggestions and ETAs, identifying service coverage gaps, and enhancing map accuracy and point-of-interest data.</li>
            <li><strong>Customer Support:</strong> Resolving trip-related queries and disputes, verifying pickup and drop-off locations, and assisting with lost item recovery.</li>
            <li><strong>Marketing and Personalization:</strong> Service-related notifications and offers relevant to your current city or service area, personalized recommendations, and relevant content based on your location.</li>
          </ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">3.4 Location Data Sharing</h3>
          <p>We share your location data with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Captains and Customers:</strong> During a ride, we share real-time location between the Customer and assigned Captain.</li>
            <li><strong>Emergency Services:</strong> When you use emergency features or in case of safety incidents.</li>
            <li><strong>Service Providers:</strong> Third-party mapping, navigation, and analytics providers who help us deliver Services.</li>
            <li><strong>Business Partners:</strong> As necessary to provide co-branded or integrated services.</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect safety and legal rights.</li>
          </ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">3.5 Managing Location Permissions</h3>
          <p>You can control location access through your device settings:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>iOS: Settings &gt; Privacy &amp; Security &gt; Location Services &gt; JSKGO.</li>
            <li>Android: Settings &gt; Location &gt; App permissions &gt; JSKGO.</li>
          </ul>
          <p><strong>Important Note:</strong> If you disable location access, you will not be able to use our core ride booking and navigation features. Customers cannot request rides, and Captains cannot receive or complete ride requests without location services enabled.</p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">4. Other Information We Collect</h2>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">4.1 Account Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, email address, phone number.</li>
            <li>Profile photo and user ID.</li>
            <li>Postal address and saved locations (home, work, favorites).</li>
            <li>Payment information: We do not store your card or bank details. Payments are processed securely by third-party payment processors such as Stripe and Razorpay, who handle your payment information according to their own privacy policies.</li>
            <li>Government-issued identification documents (Aadhaar, PAN, Driver's License, Vehicle Registration).</li>
            <li>Date of birth and age verification.</li>
          </ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">4.2 Background Check Information (for Captains)</h3>
          <ul className="list-disc pl-6 space-y-2"><li>Driver's license and driving history.</li><li>Vehicle registration and insurance documents.</li><li>Criminal background checks, where permitted by law.</li><li>Verification photos and selfies.</li><li>Right-to-work documentation.</li></ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">4.3 Transaction and Ride Information</h3>
          <ul className="list-disc pl-6 space-y-2"><li>Ride history (date, time, pickup/drop-off locations, distance, duration).</li><li>Payment transactions and billing records.</li><li>Ratings and reviews given and received.</li><li>Communication between Customers and Captains via in-app calling or messaging.</li><li>Fare calculations and promotional code usage.</li></ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">4.4 Device and Usage Information</h3>
          <ul className="list-disc pl-6 space-y-2"><li>Device type, model, manufacturer, and operating system.</li><li>Device identifiers such as Android Advertising ID or app-generated identifiers, where permitted by law.</li><li>Mobile network information (carrier, connection type).</li><li>IP address and browser type.</li><li>App version and crash logs.</li><li>Usage patterns (features used, pages viewed, time spent).</li><li>Sensor data (accelerometer, gyroscope for detecting motion and ride quality).</li></ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">4.5 Communication Data</h3>
          <ul className="list-disc pl-6 space-y-2"><li>Customer support interactions (emails, chat transcripts, call recordings).</li><li>Call and SMS metadata when using in-app calling or messaging (timestamp, duration, but not content).</li><li>Feedback, ratings, and complaints.</li><li>Marketing preferences and communication history.</li></ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">4.6 Cookies and Similar Technologies</h3>
          <p>We use cookies, pixel tags, web beacons, and similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-2"><li>Remember your preferences and settings.</li><li>Authenticate your identity and maintain sessions.</li><li>Analyze usage patterns and measure marketing effectiveness.</li><li>Provide personalized content and advertisements.</li><li>Detect and prevent fraud.</li></ul>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">4.7 Information from Third Parties</h3>
          <ul className="list-disc pl-6 space-y-2"><li>Social media profile information, if you connect social accounts.</li><li>Payment verification from payment processors.</li><li>Identity verification from background check providers.</li><li>Marketing and analytics data from advertising partners.</li><li>Public records and databases for verification purposes.</li></ul>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">5. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Delivery:</strong> Process and fulfill ride bookings, match Customers with Captains, facilitate payment processing and billing, provide navigation and route optimization, enable in-app communication between users, and send booking confirmations, receipts, and ride updates.</li>
            <li><strong>Safety and Security:</strong> Verify identity of users, conduct background checks on Captains, monitor rides for safety purposes, detect and prevent fraud, abuse, and illegal activities, respond to emergencies and safety incidents, and investigate accidents, disputes, and insurance claims.</li>
            <li><strong>Customer Support:</strong> Respond to inquiries, complaints, and support requests; resolve disputes; assist with lost items and refund requests; and provide technical assistance.</li>
            <li><strong>Service Improvement and Analytics:</strong> Analyze usage trends and user behavior, improve app functionality and user experience, develop new features and services, conduct research and testing, and optimize pricing and demand forecasting.</li>
            <li><strong>Marketing and Communications:</strong> Send promotional offers, discounts, and announcements; provide personalized recommendations; conduct surveys; run contests, sweepstakes, and referral programs; and deliver targeted advertisements.</li>
            <li><strong>Legal and Compliance:</strong> Comply with applicable laws and regulations, respond to legal requests and court orders, enforce our terms and conditions, protect our rights, property, and safety, and maintain records for tax and accounting purposes.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">6. How We Share Your Information</h2>
          <p>We do not sell your personal information. We share your information only in the following circumstances:</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">6.1 Between Customers and Captains</h3>
          <p>During a ride, we share first name, profile photo, location, vehicle details, and contact information through anonymized in-app calling. After a ride, we share limited information for ratings, reviews, and lost item recovery.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">6.2 Service Providers and Partners</h3>
          <p>We share information with third-party service providers who help us operate our business, including payment processors, mapping and navigation providers, cloud hosting providers, analytics providers, background check providers, communication providers, customer support platforms, and marketing and advertising partners.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">6.3 Business Transfers</h3>
          <p>If JSKGO is involved in a merger, acquisition, sale of assets, bankruptcy, or reorganization, your information may be transferred as part of that transaction.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">6.4 Legal Requirements</h3>
          <p>We may disclose your information to comply with laws, regulations, court orders, or government requests; enforce our terms and conditions; protect the safety, rights, or property of JSKGO, our users, or the public; detect, prevent, or investigate fraud, security issues, or illegal activities; and respond to emergency situations.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">6.5 With Your Consent</h3>
          <p>We may share information with third parties when you explicitly consent, such as sharing your ride details with someone you designate, participating in co-branded promotions or partner programs, or connecting your account to third-party apps or services.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">6.6 Aggregated and Anonymized Data</h3>
          <p>We may share aggregated, anonymized, or de-identified data that cannot reasonably be used to identify you for research, analytics, marketing, or other business purposes.</p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">7. Data Retention</h2>
          <p>We retain your information for as long as necessary to provide our Services to you, comply with legal obligations, resolve disputes and enforce agreements, and maintain safety and security records.</p>
          <p>Typically, we retain:</p>
          <ul className="list-disc pl-6 space-y-2"><li>Account information: For the duration of your account plus 7 years after account closure.</li><li>Transaction records: For 7 years for tax and accounting purposes.</li><li>Location data: For 1 year after collection, except where longer retention is required for disputes or legal matters.</li><li>Support communications: For 3 years after resolution.</li></ul>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">8. Data Security</h2>
          <p>We implement reasonable physical, technical, and administrative safeguards to protect your information, including encryption of data in transit and at rest, secure data centers with access controls, regular security assessments and audits, employee training on data protection, and multi-factor authentication for sensitive operations.</p>
          <p>However, no system is completely secure. While we strive to protect your information, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.</p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">9. Your Rights and Choices</h2>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">9.1 Access and Update Your Information</h3>
          <p>You can access and update your account information through the JSKGO App settings. You may also contact us to request access to or correction of your personal information.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">9.2 Location Settings</h3>
          <p>You can enable or disable location services through your device settings. Note that disabling location will prevent you from using core ride booking features.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">9.3 Marketing Communications</h3>
          <p>You can opt out of promotional emails by clicking "unsubscribe" in any marketing email or updating your preferences in the app. You may continue to receive transactional messages related to your rides.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">9.4 Delete Your Account</h3>
          <p>You can request account deletion through the app or by contacting us. Upon deletion, your account will be deactivated, personal information will be deleted or anonymized, and some information may be retained as required by law or for legitimate business purposes.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">9.5 Cookie Preferences</h3>
          <p>You can manage cookie preferences through your browser settings. Disabling cookies may affect functionality.</p>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mt-6 mb-3">9.6 Data Portability</h3>
          <p>You can request a copy of your data in a structured, machine-readable format by contacting us.</p>

          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">10. Children's Privacy</h2>
          <p>Our Services are not intended for individuals under 18 years of age. We do not knowingly collect information from children. If you are under 18, do not use our Services or provide any information. If we learn we have collected information from a child under 18, we will delete it promptly.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">11. International Data Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Services, you consent to such transfers.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">12. Third-Party Services and Links</h2>
          <p>Our Platform may contain links to third-party websites, apps, or services. This Policy does not apply to third-party services. We are not responsible for their privacy practices. Please review their privacy policies before providing information.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">13. Changes to This Privacy Policy</h2>
          <p>We may update this Policy from time to time. We will notify you of material changes by posting the updated Policy on the JSKGO Platform with a new "Last Updated" date, sending an email notification to your registered email address, or displaying an in-app notification.</p>
          <p>Your continued use of our Services after changes become effective constitutes acceptance of the updated Policy. We encourage you to review this Policy periodically.</p>
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mt-8 mb-4">14. Contact Us</h2>
          <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Grievance Officer:</p>
          <ul className="list-disc pl-6 space-y-2"><li>Name: Mohit Garg</li><li>Email: <a href="mailto:nodaloffice@jskks.com" className="text-[#F4C430] hover:underline">nodaloffice@jskks.com</a></li><li>Company: JSKKS Ji Vrindavan Services Solution Private Limited</li><li>Website: <a href="https://jskgo.com/" target="_blank" rel="noopener noreferrer" className="text-[#F4C430] hover:underline">jskgo.com</a></li></ul>
          <p>We will respond to your request within 30 days of receipt.</p>
          <p className="font-semibold">JSKKS Ji Vrindavan Services Solution Private Limited<br />Last Updated: January 9, 2026<br />&copy; 2026 JSKGO. All rights reserved.</p>
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
            <li><Link to="/#rides" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Rides</Link></li>
            <li><Link to="/#coverage" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Coverage</Link></li>
            <li><Link to="/terms" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="text-gray-800 dark:text-gray-200 hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">Cookie Policy</Link></li>
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
          if (window.locomotive) {
            window.locomotive.scrollTo(element, { duration: 0, disableLerp: true, immediate: true });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
        }
      }, 50);
    } else {
      if (window.locomotive) {
        window.locomotive.scrollTo(0, { duration: 0, disableLerp: true, immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
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
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </BrowserRouter>
  );
}
