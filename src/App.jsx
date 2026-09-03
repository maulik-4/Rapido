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
    { id: 5, name: 'Vikram B.', loc: 'Delhi NCR', text: 'Clean cars and professional captains. Made my trip to Braj very comfortable.' }
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
    <TiltCard className="relative h-[400px] lg:h-[500px] rounded-3xl bg-[#0a0a0a] border border-white/10 w-full overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
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
            Mathura Hub
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
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Delhi NCR</div>
        </div>

        <div className="absolute top-[65%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="mt-2 text-white/70 text-[10px] font-bold tracking-widest uppercase">Govardhan</div>
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
     <div className="absolute inset-0 bg-[#F4C430] opacity-10 dark:opacity-5 mix-blend-color" />
     <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] dark:from-[#0a0a0a] via-transparent to-transparent" />
     <div className="absolute inset-0 bg-gradient-to-l from-[#f8f9fa] dark:from-[#0a0a0a] via-transparent to-transparent" />
     
     <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute inset-0 drop-shadow-[0_0_50px_rgba(244,196,48,0.2)]">
       <motion.path animate={{ x: [-20, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} d="M100 400L700 400" className="stroke-gray-300 dark:stroke-[#F4C430]/30" strokeWidth="4" strokeLinecap="round" strokeDasharray="20 40" />
       <motion.path animate={{ x: [-50, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} d="M50 450L750 450" className="stroke-gray-200 dark:stroke-white/10" strokeWidth="2" strokeLinecap="round" strokeDasharray="50 100" />
       
       <g transform="translate(300, 200) skewX(-15)">
         <path d="M0 100 C 0 50, 50 0, 150 0 L 250 0 C 300 0, 350 50, 350 150 L 350 200 L 0 200 Z" className="fill-gray-200 dark:fill-[#1a1a1a]" />
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
    <section id="book" className="booking-section py-24 relative bg-[#0a0a0a] text-white overflow-hidden border-t border-white/10">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0">
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
           <p className="text-xl text-gray-400">Choose your ride, enter your destination and get an instant fare estimate.</p>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="booking-panel bg-[#151515] border border-white/10 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto relative shadow-[0_0_80px_rgba(244,196,48,0.05)]"
         >
            {bookingStatus === 'idle' ? (
              <div className="flex flex-col gap-8">
                
                {/* Ride Selector */}
                <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-4 md:grid md:grid-cols-4 md:pb-0">
                  <AnimatePresence>
                  {rides.map(ride => {
                    const isSelected = selectedRide === ride.id;
                    return (
                      <button
                        key={ride.id}
                        onClick={() => setSelectedRide(ride.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 min-w-[120px] shrink-0 ${isSelected ? 'bg-[#F4C430] border-[#F4C430] text-black shadow-[0_0_20px_rgba(244,196,48,0.3)] scale-105' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'}`}
                      >
                        <div className="mb-2">{ride.icon}</div>
                        <div className="font-bold text-lg mb-1">{ride.name}</div>
                        <div className={`text-xs font-semibold ${isSelected ? 'text-black/70' : 'text-gray-500'}`}>{ride.rate}</div>
                      </button>
                    )
                  })}
                  </AnimatePresence>
                </div>

                {/* Route Inputs */}
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute left-[23px] top-[30px] bottom-[30px] w-0.5 bg-[#F4C430]" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#222] border-2 border-[#F4C430] flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#F4C430]" />
                    </div>
                    <div className="flex-1">
                      <input type="text" value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Enter pickup location in Mathura" className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C430] transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#222] border-2 border-[#F4C430] flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-[#F4C430]" />
                    </div>
                    <div className="flex-1">
                      <input type="text" value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder="Where are you going?" className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C430] transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Date & Passengers */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex-1 bg-[#222] border border-white/10 rounded-xl px-4 py-4 flex items-center gap-3">
                    <Calendar className="text-gray-400" size={20} />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-transparent text-white outline-none [color-scheme:dark]" />
                  </div>
                  <div className="flex-1 bg-[#222] border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-400">
                      <User size={20} />
                      <span className="text-white">Passengers</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-4 text-center">{passengers}</span>
                      <button onClick={() => setPassengers(passengers + 1)} className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fare Estimate */}
                <div className="bg-[#222] border border-[#F4C430]/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="text-sm font-semibold text-[#F4C430] uppercase tracking-widest mb-1">Estimated Fare</div>
                    <div className="text-4xl font-extrabold">{currentRideInfo.est}</div>
                    <div className="text-sm text-gray-400 mt-2">No surge &middot; No hidden charges</div>
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
    <section className="relative w-full min-h-[100svh] bg-[#f8f9fa] dark:bg-[#0a0a0a] overflow-hidden flex flex-col pt-24 pb-8 lg:pt-32 transition-colors duration-500">
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
                  <a href="#book" className="btn-hover btn-fill-yellow bg-white dark:bg-[#1a1a1a] border border-gray-900 dark:border-[#F4C430] text-gray-900 dark:text-[#F4C430] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase flex items-center justify-center shadow-md dark:shadow-none">
                     Book a Ride &rarr;
                  </a>
                  <a href="#app" className="btn-hover btn-fill-dark dark:btn-fill-white bg-transparent border border-gray-900 dark:border-white text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase flex items-center justify-center">
                     Download App
                  </a>
               </div>
            </motion.div>
         </motion.div>

         {/* Vehicle Desktop Only */}
         <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ x: vehicleXDesktop }}
            className="hidden lg:flex absolute right-[-5%] top-[15%] w-[60%] xl:w-[50%] aspect-[16/10] bg-white/40 dark:bg-white/5 rounded-3xl backdrop-blur-md border border-gray-200 dark:border-white/10 items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(244,196,48,0.15)] origin-right"
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

export default function App() {
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
                <span className={`font-extrabold tracking-tight transition-all duration-700 ${isScrolled ? 'text-2xl' : 'text-3xl'}`}>
                  JSK<span className="text-[#F4C430]">GO</span>
                </span>
              </motion.div>
              
              <motion.div layout className="hidden md:flex items-center space-x-2 font-medium">
                {[
                  { name: 'Rides', href: '#rides' },
                  { name: 'Coverage', href: '#coverage' },
                  { name: 'Drive With Us', href: '#drive' },
                  { name: 'App', href: '#app' },
                  { name: 'Help', href: '#faq' }
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
                <a href="#book" className={`btn-hover btn-fill-yellow bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-full font-semibold shadow-lg shadow-black/10 ${isScrolled ? 'px-5 py-1.5 text-sm' : 'px-6 py-2.5 text-base'}`}>
                  Book Now
                </a>
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
            <a href="#rides" onClick={() => setIsMobileMenuOpen(false)}>Rides</a>
            <a href="#coverage" onClick={() => setIsMobileMenuOpen(false)}>Coverage</a>
            <a href="#drive" onClick={() => setIsMobileMenuOpen(false)}>Drive With Us</a>
            <a href="#app" onClick={() => setIsMobileMenuOpen(false)}>App</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>Help</a>
            <a href="#book" onClick={() => setIsMobileMenuOpen(false)} className="btn-hover btn-fill-dark bg-[#F4C430] w-full py-4 rounded-xl mt-auto mb-12 shadow-lg text-center">
              Book a Ride
            </a>
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
      <section id="coverage" className="coverage-section py-24 bg-[#1A1A1A] dark:bg-black text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">We Serve All of <span className="text-[#F4C430]">Braj & North India</span></h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Whether you need a quick ride across town or a comfortable outstation cab, our verified network spans across key cities and sacred towns.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {['Mathura', 'Vrindavan', 'Govardhan', 'Barsana', 'Nandgaon', 'Gokul', 'Agra', 'Delhi NCR'].map(city => (
                  <span key={city} className="bg-white/10 px-4 py-2 rounded-full font-medium text-sm border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                    {city}
                  </span>
                ))}
                <span className="bg-transparent px-4 py-2 text-[#F4C430] font-medium text-sm">
                  + 10 more cities
                </span>
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
              { title: 'Airport Transfers', desc: 'Timely trips to Agra & Delhi airports.', color: 'bg-green-100 dark:bg-green-900/30 dark:border-green-500/20' }
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
      <section id="app" className="app-section py-24 bg-[#1A1A1A] dark:bg-black text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">Your Ride.<br/>One Tap Away.</h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Download the JSKGO app for the fastest booking experience, real-time tracking, and exclusive offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://play.google.com/store/apps/details?id=com.user.jskks&hl=en_IN" target="_blank" rel="noopener noreferrer" className="btn-hover btn-fill-light bg-white text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 01-.61-.986V2.8a1.986 1.986 0 01.61-.986zM14.772 13l6.505 3.745c.983.566.983 1.488 0 2.054l-1.393.802L14.772 13zm-1.01-1l-9.155-9.155L19.884 4.4l-6.122 3.6zm.968-.95l5.106-2.94-1.393-.802c-.983-.566-2.58-.566-3.563 0l-6.282 3.615 6.132 6.132z"/></svg>
                  <div className="text-left leading-tight">
                    <div className="text-xs opacity-70 font-medium">Download for</div>
                    <div className="text-lg">Customer App — Android</div>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.driver.jskks&hl=en_IN" target="_blank" rel="noopener noreferrer" className="btn-hover btn-fill-light bg-white text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3">
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
              <button className="text-lg font-bold flex items-center gap-2 text-[#1A1A1A] dark:text-white hover:text-[#F4C430] dark:hover:text-[#F4C430] transition-colors">
                Contact Support <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG / EDITORIAL */}
      <section id="editorial" className="py-24 bg-gray-50 dark:bg-[#181818] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-extrabold text-[#1A1A1A] dark:text-white">Travel Smart in Mathura</h2>
            <button className="hidden md:flex font-bold hover:text-[#F4C430] dark:text-white dark:hover:text-[#F4C430] items-center gap-2 transition-colors">
              View All Posts <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Best Time to Visit Mathura & Vrindavan', tag: 'GUIDE', img: 'data:image/jpeg;base64,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' },
              { title: 'Top 10 Temples in Vrindavan', tag: 'CULTURE', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZb0BQm7bv1S15m3cBlkxY1MtVeSYH8_8L5wPDhF-Km-WJ7I_RnC_gnSG&s=10' },
              { title: 'Mathura to Agra Cab Guide', tag: 'TRAVEL', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800' },
              { title: 'Travel During Holi in Mathura', tag: 'FESTIVALS', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9pho6nSYbiXs469E9NsyhlmjiI-_9H8JVua7HiCqfA&s=10' }
            ].map((post, i) => (
              <TiltCard key={i} className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group cursor-pointer hover:shadow-xl dark:hover:shadow-white/5 transition-shadow duration-300">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-[#F4C430] tracking-wider mb-3">{post.tag}</div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white group-hover:text-[#F4C430] dark:group-hover:text-[#F4C430] transition-colors">{post.title}</h3>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-white dark:bg-black text-[#1A1A1A] dark:text-white text-center border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">Where are you going?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">Your next ride is just a tap away.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#book" className="btn-hover btn-fill-dark bg-[#F4C430] text-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg">
              Book a Ride
            </a>
            <a href="#app" className="btn-hover btn-fill-light bg-gray-100 dark:bg-white/10 text-[#1A1A1A] dark:text-white border border-gray-200 dark:border-white/20 px-8 py-4 rounded-xl font-bold text-lg">
              Download App
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 dark:bg-black text-[#1A1A1A] dark:text-white pt-20 pb-10 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <span className="text-4xl font-extrabold tracking-tight mb-6 block">JSK<span className="text-[#F4C430]">GO</span></span>
              <p className="text-gray-400 mb-6 max-w-sm">
Mathura's homegrown ride platform — bike taxi, auto & cab booking for the Braj region. Fast, safe, no-surge pricing.


              </p>
              <div className="flex gap-4">
                <a href="#footer" aria-label="JSKGO on LinkedIn" className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-[#F4C430] hover:text-black flex items-center justify-center transition-colors">
                  <SocialIcon type="linkedin" />
                </a>
                <a href="#footer" aria-label="JSKGO on Twitter" className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-[#F4C430] hover:text-black flex items-center justify-center transition-colors">
                  <SocialIcon type="twitter" />
                </a>
                <a href="#footer" aria-label="JSKGO on Instagram" className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-[#F4C430] hover:text-black flex items-center justify-center transition-colors">
                  <SocialIcon type="instagram" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                <li><a href="#rides" className="hover:text-black dark:hover:text-white transition-colors">Ride Types</a></li>
                <li><a href="#coverage" className="hover:text-black dark:hover:text-white transition-colors">Coverage</a></li>
                <li><a href="#drive" className="hover:text-black dark:hover:text-white transition-colors">Drive With Us</a></li>
                <li><a href="#app" className="hover:text-black dark:hover:text-white transition-colors">App</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                <li><a href="#faq" className="hover:text-black dark:hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Legal</h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-300 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 dark:text-gray-500 font-medium">
            <div>© 2025 JSKGO. All rights reserved. | Cab & Bike Taxi Booking in Mathura
</div>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE BOOK BUTTON */}
      <div className="md:hidden fixed bottom-6 inset-x-6 z-40">
        <a href="#book" className="btn-hover btn-fill-dark w-full bg-[#F4C430] text-black py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2">
          Book a Ride <ArrowRight size={20} />
        </a>
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
