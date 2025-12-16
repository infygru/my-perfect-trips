"use client";

import React, { useState, useEffect, useMemo, useContext } from 'react';
import { 
  MapPin, Calendar, Clock, Check, X, Phone, Mail, 
  Menu, Globe, Search, ArrowRight, Star, Plane, 
  Briefcase, FileText, ChevronDown, Facebook, Instagram, Twitter,
  Filter, User, Hotel, CreditCard, Send, ShieldCheck, ChevronRight,
  Users, Building, Music, Flag, Info, XCircle, Download, Printer
} from 'lucide-react';

/* ===================================================================
  CONFIG & DATA
  ===================================================================
*/

const LOGO_URL = "https://myperfecttrips.com/wp-content/uploads/2021/06/MPT-Png.png";
const EMAIL_TARGET = "hello@myperfecttrips.co.uk"; 

const SITE_CONFIG = {
  name: "MyPerfectTrips",
  phone: "+44 161 123 4567",
  email: EMAIL_TARGET,
  address: "Altrincham, Manchester, UK",
  socials: { fb: "#", ig: "#", x: "#" }
};

// Single Hero Image
const HERO_IMG = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070";

const ALL_SERVICES = [
  { id: 1, title: "Schengen Visa", slug: "schengen-visa", icon: <FileText className="w-8 h-8" />, desc: "Daily appointments available for Spain, France & Italy. 99% success rate.", color: "bg-blue-50 text-blue-600" },
  { id: 2, title: "Flight Booking", slug: "flight-booking", icon: <Plane className="w-8 h-8" />, desc: "Global flight ticketing with competitive corporate rates.", color: "bg-cyan-50 text-cyan-600" },
  { id: 3, title: "MICE", slug: "mice", icon: <Users className="w-8 h-8" />, desc: "Meetings, Incentives, Conferences, and Exhibitions management.", color: "bg-purple-50 text-purple-600" },
  { id: 4, title: "Event Management", slug: "event-management", icon: <Music className="w-8 h-8" />, desc: "Comprehensive planning for destination weddings and corporate events.", color: "bg-pink-50 text-pink-600" },
  { id: 5, title: "Corporate Travel", slug: "corporate-travel", icon: <Building className="w-8 h-8" />, desc: "End-to-end travel management solutions for businesses.", color: "bg-indigo-50 text-indigo-600" },
  { id: 6, title: "Hotel Booking", slug: "hotel-booking", icon: <Hotel className="w-8 h-8" />, desc: "Luxury stays, villas, and budget-friendly accommodation worldwide.", color: "bg-orange-50 text-orange-600" }
];

const PACKAGES = [
  {
    id: 101, title: "Swiss Alpine Wonder", slug: "swiss-alpine-wonder", destination: "Switzerland", price: 1299, currency: "£", duration: { days: 6, nights: 5 }, labels: ["Family", "Nature"], rating: 5,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
    overview: "Experience the majestic Alps, serene lakes, and charming villages of Switzerland. This comprehensive tour takes you through the heart of Europe's most scenic country.",
    highlights: ["Jungfraujoch excursion", "Lake Lucerne cruise", "Interlaken city tour", "Glacier Express Ride"],
    inclusions: ["5 Nights Accommodation", "Daily Breakfast", "Swiss Travel Pass", "Visa Assistance"],
    exclusions: ["International Flights", "Personal Expenses", "City Tax"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich", desc: "Private transfer to hotel. Evening exploring Old Town." },
      { day: 2, title: "Zurich to Lucerne", desc: "Train to Lucerne. Chapel Bridge tour and Lake cruise." },
      { day: 3, title: "Mount Titlis", desc: "Rotair revolving cable car to the summit." }
    ]
  },
  {
    id: 102, title: "Kerala Backwaters", slug: "kerala-backwaters", destination: "India", price: 899, currency: "£", duration: { days: 8, nights: 7 }, labels: ["Honeymoon", "Budget"], rating: 4,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
    overview: "Relax in 'God's Own Country' with houseboat stays and tea gardens.",
    highlights: ["Alleppey Houseboat", "Munnar Tea Gardens", "Kochi Fort"],
    inclusions: ["Hotels", "Breakfast", "Transfer"],
    exclusions: ["Flights", "Lunch"],
    itinerary: [{ day: 1, title: "Arrival Kochi", desc: "Pickup and transfer to Munnar." }]
  },
  {
    id: 103, title: "Paris & Disney", slug: "paris-disney", destination: "France", price: 950, currency: "£", duration: { days: 5, nights: 4 }, labels: ["Family", "Fun"], rating: 5,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    overview: "The perfect mix of culture and fun.",
    highlights: ["Eiffel Tower", "Disneyland Paris"],
    inclusions: ["Accommodation", "Park Tickets"],
    exclusions: ["Flights"],
    itinerary: [{ day: 1, title: "Bienvenue", desc: "Arrival in Paris." }]
  },
  {
    id: 104, title: "Dubai Luxury", slug: "dubai-luxury", destination: "UAE", price: 1450, currency: "£", duration: { days: 5, nights: 4 }, labels: ["Luxury", "Shopping"], rating: 5,
    image: "https://images.unsplash.com/photo-1512453979798-5ea9041848d6?auto=format&fit=crop&q=80&w=800",
    overview: "Experience the glitz and glamour of Dubai in style.",
    highlights: ["Burj Khalifa", "Desert Safari"],
    inclusions: ["5-Star Hotel", "Transfers"],
    exclusions: ["Flights", "Tips"],
    itinerary: []
  },
  {
    id: 105, title: "Bali Beach Escape", slug: "bali-escape", destination: "Indonesia", price: 750, currency: "£", duration: { days: 7, nights: 6 }, labels: ["Budget", "Beach", "Honeymoon"], rating: 4,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    overview: "Sun, sand, and serenity in the Island of Gods.",
    highlights: ["Ubud Monkey Forest", "Kuta Beach"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Flights"],
    itinerary: []
  }
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", location: "Manchester", text: "Got my Spain visa in just 5 days thanks to their daily appointment slots!", rating: 5 },
  { id: 2, name: "Rahul Verma", location: "London", text: "The Kerala package was perfectly organized. The houseboat experience was magical.", rating: 5 },
  { id: 3, name: "David Miller", location: "Leeds", text: "Great corporate travel service. They handle our entire team's logistics flawlessly.", rating: 4 }
];

const BLOG_POSTS = [
  { id: 1, title: "Top 5 Mistakes in Schengen Visa Applications", slug: "schengen-visa-mistakes", category: "Visa Tips", date: "Oct 12, 2023", readTime: "5 min", excerpt: "Avoid these common mistakes to ensure approval.", image: "https://images.unsplash.com/photo-1542452377-51cfa823c3c7?auto=format&fit=crop&q=80&w=800", content: "Content placeholder..." },
  { id: 2, title: "Best Budget Family Destinations", slug: "family-destinations", category: "Destinations", date: "Nov 05, 2023", readTime: "7 min", excerpt: "Top destinations that cater to both kids and adults.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", content: "Content placeholder..." },
  { id: 3, title: "MICE Travel Trends", slug: "mice-trends", category: "Corporate", date: "Nov 20, 2023", readTime: "6 min", excerpt: "How corporate events are evolving.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", content: "Content placeholder..." }
];

const BLOG_CATEGORIES = ["All", "Visa Tips", "Destinations", "Corporate", "News"];

/* ===================================================================
  CONTEXT & ROUTER
  ===================================================================
*/
const RouterContext = React.createContext({
  path: '/',
  params: {},
  navigate: (path: string) => {},
  isModalOpen: false,
  setModalOpen: (isOpen: boolean) => {}
});
const useRouter = () => React.useContext(RouterContext);

/* ===================================================================
  UI COMPONENTS
  ===================================================================
*/
const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "px-6 py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95";
  const styles = {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg border border-transparent",
    secondary: "bg-white text-gray-800 border border-gray-200 hover:border-blue-500 hover:text-blue-600",
    ghost: "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
  };
  return <button className={`${base} ${styles[variant as keyof typeof styles]} ${className}`} {...props}>{children}</button>;
};

const Section = ({ className = '', children, bg = 'white' }: any) => (
  <section className={`py-16 md:py-24 ${bg === 'gray' ? 'bg-gray-50' : bg === 'dark' ? 'bg-slate-900' : 'bg-white'} ${className}`}>{children}</section>
);

const Container = ({ children, className = '' }: any) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Badge = ({ children, className = '' }: any) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${className}`}>{children}</span>
);

/* ===================================================================
  MODAL & FORM COMPONENTS
  ===================================================================
*/

const EnquiryForm = () => (
  <form action={`https://formsubmit.co/${EMAIL_TARGET}`} method="POST" className="space-y-5">
    <input type="hidden" name="_subject" value="New Website Enquiry" />
    <input type="hidden" name="_template" value="table" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
        <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="text" name="name" required className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
        <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="tel" name="phone" required className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+44 7700 900000" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
        <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input type="email" name="email" required className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Service Type</label>
        <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select name="service" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option>Holiday Package</option>
              <option>Schengen Visa</option>
              <option>Flight Booking</option>
              <option>Corporate Travel</option>
            </select>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Destination</label>
          <input type="text" name="destination" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Paris" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date of Travel</label>
          <input type="date" name="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message / Requirements</label>
      <textarea rows={4} name="message" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell us about your preferences, number of passengers, etc..." />
    </div>

    <Button className="w-full justify-center text-lg shadow-xl shadow-blue-200">
        <Send className="w-5 h-5" /> Send Enquiry
    </Button>
    <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3" /> Your data is secure. We never share your info.
    </p>
  </form>
);

const EnquiryModal = () => {
  const { isModalOpen, setModalOpen } = useRouter();
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button 
          onClick={() => setModalOpen(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-2"
        >
          <XCircle className="w-8 h-8" />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Trip</h2>
          <p className="text-gray-500 mb-6">Fill out the form below and our experts will get back to you.</p>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
};

// --- Flight Search Widget (Hero Tab) ---
const SearchWidget = () => {
  const { navigate, setModalOpen } = useRouter();
  const [activeTab, setActiveTab] = useState('flights');
  const [flightData, setFlightData] = useState({ from: 'MAN', to: 'DXB', date: '' });

  const handleFlightSearch = () => {
    // Redirects to Skyscanner with query parameters
    const url = `https://www.skyscanner.net/transport/flights/${flightData.from}/${flightData.to}/${flightData.date.replace(/-/g, '').slice(2)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mt-8 animate-fade-in-up text-left">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'flights', icon: <Plane className="w-4 h-4" />, label: "Flights" },
          { id: 'packages', icon: <Globe className="w-4 h-4" />, label: "Holiday Packages" },
          { id: 'visa', icon: <FileText className="w-4 h-4" />, label: "Visa Services" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-white text-blue-900 shadow-lg' 
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-4 shadow-inner">
        {activeTab === 'flights' && (
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase">From (Code)</label>
               <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                 <MapPin className="w-5 h-5 text-blue-500" />
                 <input type="text" value={flightData.from} onChange={e => setFlightData({...flightData, from: e.target.value})} className="w-full bg-transparent outline-none text-gray-900 font-medium placeholder-gray-400" />
               </div>
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase">To (Code)</label>
               <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                 <MapPin className="w-5 h-5 text-blue-500" />
                 <input type="text" value={flightData.to} onChange={e => setFlightData({...flightData, to: e.target.value})} className="w-full bg-transparent outline-none text-gray-900 font-medium placeholder-gray-400" />
               </div>
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase">Depart</label>
               <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                 <Calendar className="w-5 h-5 text-blue-500" />
                 <input type="date" onChange={e => setFlightData({...flightData, date: e.target.value})} className="w-full bg-transparent outline-none text-gray-900 font-medium" />
               </div>
             </div>
             <Button className="w-full h-12 shadow-blue-500/50" onClick={handleFlightSearch}>Search Flights</Button>
           </div>
        )}
        
        {activeTab === 'packages' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase">Destination</label>
               <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                 <Search className="w-5 h-5 text-blue-500" />
                 <input type="text" placeholder="Where do you want to go?" className="w-full bg-transparent outline-none text-gray-900 font-medium" />
               </div>
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase">Budget</label>
               <div className="flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                 <CreditCard className="w-5 h-5 text-blue-500" />
                 <select className="w-full bg-transparent outline-none text-gray-900 font-medium">
                    <option>Any Budget</option>
                    <option>Under £500</option>
                    <option>£500 - £1000</option>
                    <option>£1000+</option>
                 </select>
               </div>
             </div>
             <Button className="w-full h-12" onClick={() => navigate('/packages')}>Explore Packages</Button>
           </div>
        )}

        {activeTab === 'visa' && (
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1">
                 <h4 className="font-bold text-gray-900">Need a Schengen Visa?</h4>
                 <p className="text-sm text-gray-500">We specialize in UK resident applications for France, Spain, Italy, Switzerland & more.</p>
              </div>
              <Button variant="secondary" onClick={() => navigate('/services/schengen-visa')}>Check Requirements</Button>
           </div>
        )}
      </div>
    </div>
  );
};

/* ===================================================================
  MAIN COMPONENTS
  ===================================================================
*/

// --- Navbar ---
const Navbar = () => {
  const { navigate, path, setModalOpen } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Packages', path: '/packages' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <Container>
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
             <img src={LOGO_URL} alt="MyPerfectTrips" className="h-14 w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  path === link.path 
                    ? 'text-blue-600 bg-blue-50' 
                    : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-cyan-300'
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              variant="primary" 
              className="ml-4 !py-2 !px-4 text-sm"
              onClick={() => setModalOpen(true)}
            >
              Enquire Now
            </Button>
          </div>

          <button 
            className={`md:hidden p-2 ${scrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium ${
                  path === link.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </button>
            ))}
            <Button className="w-full mt-4" onClick={() => { setModalOpen(true); setIsOpen(false); }}>Enquire Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Home Page ---
const HomePage = () => {
  const { navigate, setModalOpen } = useRouter();
  const [budgetTab, setBudgetTab] = useState('budget');

  const budgetPackages = useMemo(() => {
    if (budgetTab === 'budget') return PACKAGES.filter(p => p.price < 1000);
    if (budgetTab === 'luxury') return PACKAGES.filter(p => p.price >= 1000);
    if (budgetTab === 'honeymoon') return PACKAGES.filter(p => p.labels.includes('Honeymoon'));
    return PACKAGES;
  }, [budgetTab]);

  return (
    <>
      {/* Hero Section (Single Static Image) */}
      <div className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMG} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/60 to-transparent" />
        </div>
        
        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-cyan-300 text-sm font-medium mb-6 animate-fade-in-down">
             <Star className="w-4 h-4 fill-cyan-300" /> Rated 4.9/5 by Travellers
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Discover the World, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Your Way
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 font-light">
            Manchester's premier travel consultancy. From seamless Schengen visas to luxury bespoke itineraries.
          </p>

          <SearchWidget />
        </Container>
      </div>

      {/* Find Your Perfect Trip (Featured Packages) */}
      <Section>
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Trip</h2>
              <p className="text-gray-500">Trending destinations this month</p>
            </div>
            <Button variant="ghost" onClick={() => navigate('/packages')}>View All <ArrowRight className="w-4 h-4" /></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.slice(0, 3).map((pkg) => (
              <div 
                key={pkg.id} 
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                onClick={() => navigate(`/packages/${pkg.slug}`)}
              >
                <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-300 text-sm font-bold mb-1">
                        <MapPin className="w-4 h-4" /> {pkg.destination}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                      <div className="flex gap-2">
                        {pkg.labels.slice(0,2).map(l => (
                          <span key={l} className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded text-white">{l}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-300 block">From</span>
                      <span className="text-xl font-bold text-cyan-300">{pkg.currency}{pkg.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Budget Friendly Destinations (With Tabs) */}
      <Section bg="gray">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Budget Friendly Destinations</h2>
            <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
               {[
                 { id: 'budget', label: 'Budget Friendly' },
                 { id: 'luxury', label: 'Luxury Escapes' },
                 { id: 'honeymoon', label: 'Honeymoon' }
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setBudgetTab(tab.id)}
                   className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                     budgetTab === tab.id 
                       ? 'bg-blue-600 text-white shadow-md' 
                       : 'text-gray-500 hover:text-blue-600'
                   }`}
                 >
                   {tab.label}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgetPackages.length > 0 ? budgetPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                onClick={() => navigate(`/packages/${pkg.slug}`)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group"
              >
                <div className="h-48 overflow-hidden relative">
                   <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={pkg.title} />
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                     <Star className="w-3 h-3 text-orange-400 fill-orange-400" /> {pkg.rating}
                   </div>
                </div>
                <div className="p-5">
                   <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600">{pkg.title}</h3>
                   <div className="flex gap-2 mb-3">
                      {pkg.labels.slice(0,2).map(l => <span key={l} className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{l}</span>)}
                   </div>
                   <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-lg font-bold text-blue-600">{pkg.currency}{pkg.price}</span>
                      <span className="text-xs text-blue-600 font-medium flex items-center gap-1">View Deal <ChevronRight className="w-3 h-3" /></span>
                   </div>
                </div>
              </div>
            )) : (
              <div className="col-span-4 text-center py-12 text-gray-500">No packages found for this category.</div>
            )}
          </div>
        </Container>
      </Section>

      {/* Client Stories (Testimonials) */}
      <Section>
         <Container>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Client Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {TESTIMONIALS.map(t => (
                  <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                     </div>
                     <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                           {t.name[0]}
                        </div>
                        <div>
                           <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                           <span className="text-xs text-gray-500">{t.location}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </Section>
      
       {/* Travel Made Simple (Services Grid) */}
      <Section bg="dark">
         <Container>
            <div className="text-center mb-16">
               <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Why Choose Us</span>
               <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Travel Made Simple</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {ALL_SERVICES.slice(0, 4).map((s) => (
                 <div key={s.id} className="bg-slate-800 p-8 rounded-2xl hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer" onClick={() => navigate(`/services`)}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${s.color}`}>
                       {s.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                 </div>
               ))}
            </div>
         </Container>
      </Section>
    </>
  );
};

// --- Services Page ---
const ServicesPage = () => {
   const { navigate, setModalOpen } = useRouter();
   return (
      <>
         <div className="bg-slate-900 pt-32 pb-16 text-white text-center">
            <Container>
               <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
               <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Comprehensive travel management solutions for individuals and businesses.
               </p>
            </Container>
         </div>
         <Section>
            <Container>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ALL_SERVICES.map((service) => (
                     <div 
                        key={service.id} 
                        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
                     >
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                           {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                        <button 
                           onClick={() => setModalOpen(true)}
                           className="text-blue-600 font-bold text-sm flex items-center gap-2 cursor-pointer hover:underline"
                        >
                           Enquire Now <ArrowRight className="w-4 h-4" />
                        </button>
                     </div>
                  ))}
               </div>
            </Container>
         </Section>
      </>
   )
}

// --- Detailed Package Page (Enhanced) ---
const PackageDetailPage = ({ slug }: { slug: string }) => {
   const { navigate, setModalOpen } = useRouter();
   const pkg = PACKAGES.find(p => p.slug === slug);
   const [activeTab, setActiveTab] = useState('itinerary');

   if (!pkg) return <div className="pt-32 text-center">Package not found</div>;

   return (
      <>
         {/* Detail Hero */}
         <div className="relative h-[60vh] min-h-[500px]">
            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            <Container className="absolute bottom-0 left-0 right-0 py-12 text-white">
               <div className="flex gap-2 mb-4">
                  {pkg.labels.map(l => <Badge key={l} className="bg-blue-600">{l}</Badge>)}
               </div>
               <h1 className="text-4xl md:text-6xl font-bold mb-4">{pkg.title}</h1>
               <div className="flex items-center gap-6 text-lg text-gray-200">
                  <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {pkg.destination}</span>
                  <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
               </div>
            </Container>
         </div>

         <Section bg="gray">
            <Container>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                     {/* Tabs */}
                     <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                        {['Itinerary', 'Inclusions', 'Important Info'].map(tab => (
                           <button
                              key={tab}
                              onClick={() => setActiveTab(tab.toLowerCase())}
                              className={`px-6 py-4 font-bold text-sm uppercase tracking-wide whitespace-nowrap ${
                                 activeTab === tab.toLowerCase() 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-500 hover:text-blue-600'
                              }`}
                           >
                              {tab}
                           </button>
                        ))}
                     </div>

                     {activeTab === 'itinerary' && (
                        <div className="space-y-8 animate-fade-in">
                           <h3 className="text-2xl font-bold text-gray-900">Trip Overview</h3>
                           <p className="text-gray-600 leading-relaxed">{pkg.overview}</p>
                           
                           <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-6">Day by Day</h3>
                           <div className="space-y-0 relative border-l-2 border-blue-100 ml-4">
                              {pkg.itinerary && pkg.itinerary.length > 0 ? pkg.itinerary.map((day, idx) => (
                                 <div key={idx} className="mb-10 pl-8 relative">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Day {day.day}: {day.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{day.desc}</p>
                                 </div>
                              )) : <p>Itinerary details available on request.</p>}
                           </div>
                        </div>
                     )}

                     {activeTab === 'inclusions' && (
                        <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div>
                              <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> What's Included</h4>
                              <ul className="space-y-3">
                                 {pkg.inclusions.map((inc, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" /> {inc}</li>
                                 ))}
                              </ul>
                           </div>
                           <div>
                              <h4 className="font-bold text-red-600 mb-4 flex items-center gap-2"><X className="w-5 h-5" /> What's Excluded</h4>
                              <ul className="space-y-3">
                                 {pkg.exclusions.map((exc, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" /> {exc}</li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     )}

                     {activeTab === 'important info' && (
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 animate-fade-in">
                           <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><Info className="w-5 h-5" /> Booking Policy</h4>
                           <ul className="space-y-2 text-sm text-gray-700 mb-6">
                              <li>• 20% Advance to confirm booking.</li>
                              <li>• Balance payment 15 days before travel.</li>
                              <li>• Cancellation charges apply as per hotel/airline policy.</li>
                           </ul>
                           <h4 className="font-bold text-blue-900 mb-4">Visa Requirements</h4>
                           <p className="text-sm text-gray-700">Passport valid for at least 6 months is mandatory. We provide full visa assistance for this package.</p>
                        </div>
                     )}
                  </div>

                  {/* Sticky Booking Sidebar */}
                  <div>
                     <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                        <div className="mb-6 pb-6 border-b border-gray-100">
                           <p className="text-sm text-gray-500 mb-1">Starting from</p>
                           <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold text-blue-600">{pkg.currency}{pkg.price}</span>
                              <span className="text-gray-400">/ person</span>
                           </div>
                        </div>
                        <div className="space-y-4 mb-6">
                           <div className="flex items-center gap-3 text-sm text-gray-600">
                              <Calendar className="w-5 h-5 text-blue-500" /> Flexible Dates
                           </div>
                           <div className="flex items-center gap-3 text-sm text-gray-600">
                              <Flag className="w-5 h-5 text-blue-500" /> Instant Confirmation
                           </div>
                        </div>
                        <Button className="w-full mb-3" onClick={() => setModalOpen(true)}>Book Now</Button>
                        <Button variant="secondary" className="w-full" onClick={() => window.print()}><Download className="w-4 h-4 mr-2" /> Download PDF</Button>
                        <p className="text-xs text-center text-gray-400 mt-4">No hidden fees. Best price guarantee.</p>
                     </div>
                  </div>
               </div>
            </Container>
         </Section>
      </>
   );
};

// --- Schengen Visa Page ---
const VisaPage = () => {
   const { navigate } = useRouter();
   return (
      <>
         <div className="bg-blue-900 pt-32 pb-16 text-white">
            <Container>
               <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/2">
                     <Badge className="bg-yellow-400 text-black mb-4">Daily Appointments Available!</Badge>
                     <h1 className="text-4xl md:text-5xl font-bold mb-6">Schengen Visa for Spain, France & Italy</h1>
                     <p className="text-xl text-blue-200 mb-8">
                        Struggling to find an appointment? We have dedicated slots for UK residents. High success rate and full documentation support.
                     </p>
                     <ul className="space-y-3 mb-8">
                        <li className="flex gap-2 items-center"><Check className="w-5 h-5 text-green-400" /> Appointment Booking</li>
                        <li className="flex gap-2 items-center"><Check className="w-5 h-5 text-green-400" /> Flight & Hotel Dummies</li>
                        <li className="flex gap-2 items-center"><Check className="w-5 h-5 text-green-400" /> Cover Letter Drafting</li>
                     </ul>
                  </div>
                  
                  {/* Quick Visa Form */}
                  <div className="md:w-1/2 w-full">
                     <div className="bg-white text-gray-900 p-6 md:p-8 rounded-2xl shadow-2xl">
                        <h3 className="font-bold text-xl mb-2">Check Visa Availability</h3>
                        <p className="text-sm text-gray-500 mb-6">Fill this form to get a callback about appointment slots.</p>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                           <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="No. of People" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                 <option>Spain</option>
                                 <option>France</option>
                                 <option>Italy</option>
                                 <option>Switzerland</option>
                              </select>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <label className="text-xs font-bold text-gray-500 uppercase mb-1">Travel Date</label>
                                 <input type="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
                              </div>
                              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 mt-5 outline-none" />
                           </div>
                           <Button className="w-full font-bold">Check Availability</Button>
                        </form>
                     </div>
                  </div>
               </div>
            </Container>
         </div>
      </>
   )
}

// --- Footer ---
const Footer = () => {
   const { navigate } = useRouter();
   return (
      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
         <Container>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
               <div className="col-span-1 md:col-span-1">
                  {/* Fixed Logo: Added white container to fix negative image look */}
                  <div className="bg-white p-3 rounded-lg inline-block mb-6">
                     <img src={LOGO_URL} alt="MyPerfectTrips" className="h-10 w-auto object-contain" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                     Your trusted travel partner in Manchester. We specialize in bespoke holidays, visa assistance, and corporate travel solutions.
                  </p>
               </div>
               <div>
                  <h4 className="font-bold mb-6 text-slate-200">Company</h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                     <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate('/about')}>About Us</li>
                     <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate('/contact')}>Contact</li>
                     <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate('/blog')}>Blog</li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold mb-6 text-slate-200">Services</h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                     <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate('/services/schengen-visa')}>Schengen Visa</li>
                     <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate('/services/flight-booking')}>Flights</li>
                     <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate('/services/corporate-travel')}>Corporate Travel</li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold mb-6 text-slate-200">Contact</h4>
                  <div className="space-y-3 text-sm text-slate-400">
                     <p className="flex gap-3"><MapPin className="w-4 h-4 text-cyan-500" /> {SITE_CONFIG.address}</p>
                     <p className="flex gap-3"><Phone className="w-4 h-4 text-cyan-500" /> {SITE_CONFIG.phone}</p>
                     <p className="flex gap-3"><Mail className="w-4 h-4 text-cyan-500" /> {SITE_CONFIG.email}</p>
                  </div>
               </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
               <p>© 2024 MyPerfectTrips. All rights reserved.</p>
               <div className="flex gap-4 mt-4 md:mt-0">
                  <span className="cursor-pointer hover:text-white">Privacy Policy</span>
                  <span className="cursor-pointer hover:text-white">Terms</span>
               </div>
            </div>
         </Container>
      </footer>
   )
}

/* ===================================================================
  RESTORED PAGES
  ===================================================================
*/

const PackagesPage = () => {
  const { navigate } = useRouter();
  const [filters, setFilters] = useState({
    price: 3000,
    duration: 'all',
    rating: 'all',
    theme: 'all'
  });

  const filteredPackages = PACKAGES.filter(p => {
    return p.price <= filters.price &&
           (filters.theme === 'all' || p.labels.includes(filters.theme)) &&
           (filters.rating === 'all' || p.rating >= parseInt(filters.rating));
  });

  return (
    <>
      <div className="bg-slate-900 pt-32 pb-12 text-white">
        <Container>
          <h1 className="text-4xl font-bold mb-2">Find Your Perfect Trip</h1>
          <p className="text-gray-400">Explore our handpicked itineraries</p>
        </Container>
      </div>

      <Section bg="gray">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4 space-y-6">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                  <div className="flex items-center gap-2 font-bold text-gray-900 mb-6 pb-4 border-b">
                     <Filter className="w-5 h-5 text-blue-600" /> Filters
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                     <label className="text-sm font-bold text-gray-700 mb-2 block">Max Budget: £{filters.price}</label>
                     <input 
                        type="range" min="500" max="5000" step="100" 
                        value={filters.price}
                        onChange={(e) => setFilters({...filters, price: parseInt(e.target.value)})}
                        className="w-full accent-blue-600"
                     />
                     <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>£500</span>
                        <span>£5000+</span>
                     </div>
                  </div>

                  {/* Theme */}
                  <div className="mb-6">
                     <label className="text-sm font-bold text-gray-700 mb-2 block">Theme</label>
                     <div className="space-y-2">
                        {['Family', 'Honeymoon', 'Luxury', 'Budget', 'Nature'].map(t => (
                           <label key={t} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                              <input 
                                type="radio" 
                                name="theme"
                                checked={filters.theme === t}
                                onChange={() => setFilters({...filters, theme: t})}
                                className="accent-blue-600"
                              /> {t}
                           </label>
                        ))}
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                              <input 
                                type="radio" 
                                name="theme"
                                checked={filters.theme === 'all'}
                                onChange={() => setFilters({...filters, theme: 'all'})}
                                className="accent-blue-600"
                              /> All Themes
                        </label>
                     </div>
                  </div>

                  <Button variant="secondary" className="w-full text-sm" onClick={() => setFilters({price: 3000, duration: 'all', rating: 'all', theme: 'all'})}>Reset Filters</Button>
               </div>
            </div>

            {/* Package Grid */}
            <div className="w-full lg:w-3/4">
               <div className="mb-4 text-sm text-gray-500">Showing {filteredPackages.length} results</div>
               <div className="space-y-6">
                  {filteredPackages.map(pkg => (
                     <div 
                        key={pkg.id} 
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row cursor-pointer group"
                        onClick={() => navigate(`/packages/${pkg.slug}`)}
                     >
                        <div className="md:w-1/3 relative overflow-hidden">
                           <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.title} />
                           {pkg.labels.includes('Honeymoon') && <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">Honeymoon Special</div>}
                        </div>
                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                           <div>
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{pkg.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                       <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {pkg.destination}</span>
                                       <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {pkg.duration.days} Days</span>
                                    </div>
                                 </div>
                                 <div className="flex flex-col items-end">
                                    <span className="text-2xl font-bold text-blue-600">{pkg.currency}{pkg.price}</span>
                                    <span className="text-xs text-gray-400">per person</span>
                                 </div>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{pkg.overview}</p>
                              <div className="flex flex-wrap gap-2">
                                 {pkg.highlights.slice(0, 3).map(h => (
                                    <span key={h} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">{h}</span>
                                 ))}
                              </div>
                           </div>
                           <div className="mt-6 flex justify-end">
                              <Button className="!py-2 !px-6 text-sm">View Details</Button>
                           </div>
                        </div>
                     </div>
                  ))}
                  {filteredPackages.length === 0 && (
                     <div className="bg-white p-12 rounded-xl text-center border border-dashed border-gray-300">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No trips found</h3>
                        <p className="text-gray-500">Try adjusting your budget or filters.</p>
                     </div>
                  )}
               </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

const BlogPage = () => {
   const { navigate } = useRouter();
   const [activeCat, setActiveCat] = useState('All');
   const [search, setSearch] = useState('');

   const filteredBlogs = BLOG_POSTS.filter(post => 
      (activeCat === 'All' || post.category === activeCat) &&
      post.title.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <>
         <div className="bg-slate-900 pt-32 pb-16 text-white text-center">
            <Container>
               <h1 className="text-4xl font-bold mb-4">Travel Journal</h1>
               <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                  Expert advice on visas, destination guides, and industry news to help you travel smarter.
               </p>
               
               {/* Search & Filter */}
               <div className="max-w-xl mx-auto relative mb-12">
                  <input 
                     type="text" 
                     placeholder="Search articles..." 
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/30"
                  />
                  <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
               </div>

               <div className="flex flex-wrap justify-center gap-2">
                  {BLOG_CATEGORIES.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setActiveCat(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                           activeCat === cat 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </Container>
         </div>

         <Section bg="gray">
            <Container>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map(post => (
                     <div 
                        key={post.id} 
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col group"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                     >
                        <div className="h-56 overflow-hidden">
                           <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                           <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                              <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase">{post.category}</span>
                              <span>{post.readTime}</span>
                           </div>
                           <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                           <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                           <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                              Read Article <ArrowRight className="w-4 h-4" />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </Container>
         </Section>
      </>
   )
}

const BlogPostReader = ({ slug }: { slug: string }) => {
   const post = BLOG_POSTS.find(p => p.slug === slug);
   if(!post) return <div>Not found</div>;

   return (
      <div className="pt-24 pb-16">
         <div className="h-96 w-full relative">
             <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Container className="text-center text-white">
                   <Badge className="bg-blue-600 text-white mb-4">{post.category}</Badge>
                   <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
                   <div className="flex items-center justify-center gap-4 text-gray-300 text-sm">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                   </div>
                </Container>
             </div>
         </div>
         <Container className="max-w-3xl py-12">
            <div className="prose prose-lg prose-blue mx-auto" dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p><p>Full content placeholder...</p>` }} />
         </Container>
      </div>
   )
}

const ContactPage = () => {
  return (
    <>
      <div className="bg-slate-900 pt-32 pb-16 text-white">
        <Container className="text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400">Our team in Altrincham is ready to help you plan.</p>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
              {/* Contact Info blocks */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                 <h4 className="font-bold text-blue-900 mb-2">Office Hours</h4>
                 <p className="text-gray-600">Monday - Friday: 09:30 - 18:00</p>
                 <p className="text-gray-600">Saturday: 10:00 - 14:00</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
              <div className="mb-6 pb-6 border-b border-gray-100">
                 <h3 className="text-2xl font-bold text-gray-900">Send an Enquiry</h3>
                 <p className="text-sm text-gray-500">Fill in the details below and we'll get back to you within 24 hours.</p>
              </div>
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

const App = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [params, setParams] = useState<any>({});
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = (path: string) => {
    window.scrollTo(0, 0);
    if (path.startsWith('/packages/') && path !== '/packages') {
      setParams({ slug: path.split('/packages/')[1] });
    } else if (path.startsWith('/blog/') && path !== '/blog') {
      setParams({ slug: path.split('/blog/')[1] });
    } else {
      setParams({});
    }
    setCurrentPath(path);
  };

  const renderContent = () => {
    if (currentPath === '/') return <HomePage />;
    
    // Package Routes
    if (currentPath === '/packages') return <PackagesPage />;
    if (currentPath.startsWith('/packages/')) return <PackageDetailPage slug={params.slug} />;
    
    // Services Routes
    if (currentPath === '/services') return <ServicesPage />;
    if (currentPath === '/services/schengen-visa') return <VisaPage />;
    if (currentPath.startsWith('/services/')) return <div className="pt-32 text-center text-xl font-bold">Service Detail: {currentPath}</div>;

    // Blog Routes
    if (currentPath === '/blog') return <BlogPage />;
    if (currentPath.startsWith('/blog/')) return <BlogPostReader slug={params.slug} />;
    
    // Contact
    if (currentPath === '/contact') return <ContactPage />;
    
    return <HomePage />;
  };

  return (
    <RouterContext.Provider value={{ path: currentPath, params, navigate, isModalOpen, setModalOpen }}>
      <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {renderContent()}
        </main>
        <Footer />
        <EnquiryModal />
      </div>
    </RouterContext.Provider>
  );
};

export default App;
