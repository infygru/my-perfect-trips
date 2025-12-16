"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Calendar, Clock, Check, X, Phone, Mail, 
  Menu, Globe, Search, ArrowRight, Star, Plane, 
  Briefcase, FileText, Users, Building, Music, Flag, Info, XCircle, 
  Download, Printer
} from 'lucide-react';

/* ===================================================================
  CONFIG & DATA
  ===================================================================
*/

const LOGO_URL = "https://myperfecttrips.com/wp-content/uploads/2021/06/MPT-Png.png";
// Replace this with your STRAPI URL from Coolify after setup
const STRAPI_API_URL = "https://your-strapi-url.com/api"; 
const EMAIL_TARGET = "hello@myperfecttrips.co.uk"; 

const SITE_CONFIG = {
  name: "MyPerfectTrips",
  phone: "+44 161 123 4567",
  email: EMAIL_TARGET,
  address: "Altrincham, Manchester, UK",
};

const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2074",
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2068"
];

/* --- HARDCODED DATA (FALLBACK UNTIL STRAPI IS CONNECTED) --- */
const ALL_SERVICES = [
  { id: 1, title: "Schengen Visa", slug: "schengen-visa", icon: <FileText className="w-8 h-8" />, desc: "Daily appointments for Spain, France & Italy. 99% success.", color: "bg-blue-50 text-blue-600" },
  { id: 2, title: "Flight Booking", slug: "flight-booking", icon: <Plane className="w-8 h-8" />, desc: "Global ticketing with corporate rates.", color: "bg-cyan-50 text-cyan-600" },
  { id: 3, title: "MICE", slug: "mice", icon: <Users className="w-8 h-8" />, desc: "Meetings, Incentives, Conferences, Exhibitions.", color: "bg-purple-50 text-purple-600" },
  { id: 4, title: "Event Management", slug: "event-management", icon: <Music className="w-8 h-8" />, desc: "Destination weddings and corporate events.", color: "bg-pink-50 text-pink-600" },
  { id: 5, title: "Corporate Travel", slug: "corporate-travel", icon: <Building className="w-8 h-8" />, desc: "End-to-end business travel solutions.", color: "bg-indigo-50 text-indigo-600" },
  { id: 6, title: "Hotel Booking", slug: "hotel-booking", icon: <Hotel className="w-8 h-8" />, desc: "Luxury stays and budget accommodation.", color: "bg-orange-50 text-orange-600" }
];

const PACKAGES = [
  {
    id: 101, title: "Swiss Alpine Wonder", slug: "swiss-alpine-wonder", destination: "Switzerland", price: 1299, currency: "£", duration: { days: 6, nights: 5 }, labels: ["Family", "Nature"], rating: 5,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800",
    overview: "Experience the majestic Alps, serene lakes, and charming villages of Switzerland.",
    highlights: ["Jungfraujoch excursion", "Lake Lucerne cruise", "Glacier Express Ride"],
    inclusions: ["5 Nights Accommodation", "Daily Breakfast", "Swiss Travel Pass", "Visa Assistance"],
    exclusions: ["International Flights", "City Tax"],
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
    highlights: ["Alleppey Houseboat", "Munnar Tea Gardens"],
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
  }
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", location: "Manchester", text: "Got my Spain visa in just 5 days thanks to their daily appointment slots!", rating: 5 },
  { id: 2, name: "Rahul Verma", location: "London", text: "The Kerala package was perfectly organized. The houseboat experience was magical.", rating: 5 },
  { id: 3, name: "David Miller", location: "Leeds", text: "Great corporate travel service. They handle our entire team's logistics flawlessly.", rating: 4 }
];

const BLOG_POSTS = [
  { id: 1, title: "Top 5 Mistakes in Schengen Visa Applications", slug: "schengen-visa-mistakes", category: "Visa Tips", date: "Oct 12, 2023", readTime: "5 min", excerpt: "Avoid these common mistakes to ensure approval.", image: "https://images.unsplash.com/photo-1542452377-51cfa823c3c7" },
  { id: 2, title: "Best Budget Family Destinations", slug: "family-destinations", category: "Destinations", date: "Nov 05, 2023", readTime: "7 min", excerpt: "Top destinations that cater to both kids and adults.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18" },
  { id: 3, title: "MICE Travel Trends", slug: "mice-trends", category: "Corporate", date: "Nov 20, 2023", readTime: "6 min", excerpt: "How corporate events are evolving.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865" }
];

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
  COMPONENTS
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
  FUNCTIONAL MODULES (FLIGHTS, PDF, FORM)
  ===================================================================
*/

// 1. FLIGHT SEARCH WIDGET (Working Redirect)
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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mt-8 text-left">
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[{ id: 'flights', icon: <Plane className="w-4 h-4" />, label: "Flights" }, { id: 'packages', icon: <Globe className="w-4 h-4" />, label: "Packages" }, { id: 'visa', icon: <FileText className="w-4 h-4" />, label: "Visa" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium ${activeTab === tab.id ? 'bg-white text-blue-900' : 'text-white/80 hover:bg-white/10'}`}>{tab.icon}{tab.label}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 shadow-inner">
        {activeTab === 'flights' && (
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
             <div className="space-y-1"><label className="text-xs font-bold text-gray-500 uppercase">From (Code)</label><div className="flex items-center gap-2 border-b-2"><MapPin className="w-5 h-5 text-blue-500"/><input type="text" value={flightData.from} onChange={e => setFlightData({...flightData, from: e.target.value})} className="w-full outline-none font-medium"/></div></div>
             <div className="space-y-1"><label className="text-xs font-bold text-gray-500 uppercase">To (Code)</label><div className="flex items-center gap-2 border-b-2"><MapPin className="w-5 h-5 text-blue-500"/><input type="text" value={flightData.to} onChange={e => setFlightData({...flightData, to: e.target.value})} className="w-full outline-none font-medium"/></div></div>
             <div className="space-y-1"><label className="text-xs font-bold text-gray-500 uppercase">Date</label><div className="flex items-center gap-2 border-b-2"><Calendar className="w-5 h-5 text-blue-500"/><input type="date" onChange={e => setFlightData({...flightData, date: e.target.value})} className="w-full outline-none font-medium"/></div></div>
             <Button className="w-full h-12" onClick={handleFlightSearch}>Search Flights</Button>
           </div>
        )}
        {activeTab === 'packages' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
             <div className="space-y-1"><label className="text-xs font-bold text-gray-500 uppercase">Destination</label><div className="flex items-center gap-2 border-b-2"><Search className="w-5 h-5 text-blue-500"/><input type="text" placeholder="Where to?" className="w-full outline-none font-medium"/></div></div>
             <div className="space-y-1"><label className="text-xs font-bold text-gray-500 uppercase">Budget</label><div className="flex items-center gap-2 border-b-2"><CreditCard className="w-5 h-5 text-blue-500"/><select className="w-full outline-none font-medium"><option>Any</option><option>£500+</option></select></div></div>
             <Button className="w-full h-12" onClick={() => navigate('/packages')}>Explore</Button>
           </div>
        )}
        {activeTab === 'visa' && (
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center"><div className="flex-1"><h4 className="font-bold">Schengen Visa</h4><p className="text-sm text-gray-500">Expert assistance for UK Residents.</p></div><Button variant="secondary" onClick={() => navigate('/services/schengen-visa')}>Check Requirements</Button></div>
        )}
      </div>
    </div>
  );
};

// 2. ENQUIRY FORM MODAL (Data Entry)
const EnquiryModal = () => {
  const { isModalOpen, setModalOpen } = useRouter();
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-8">
        <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><XCircle className="w-8 h-8" /></button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Journey</h2>
        <p className="text-gray-500 mb-6">Fill this form and our agents will contact you shortly.</p>
        
        <form action={`https://formsubmit.co/${EMAIL_TARGET}`} method="POST" className="space-y-4">
          <input type="hidden" name="_subject" value="New Website Enquiry" />
          <input type="hidden" name="_template" value="table" />
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-bold text-gray-500 uppercase">Name</label><input type="text" name="name" required className="w-full p-3 border rounded-lg focus:ring-2 ring-blue-500 outline-none" placeholder="Jane Doe" /></div>
            <div><label className="text-xs font-bold text-gray-500 uppercase">Phone</label><input type="tel" name="phone" required className="w-full p-3 border rounded-lg focus:ring-2 ring-blue-500 outline-none" placeholder="+44 7700..." /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-bold text-gray-500 uppercase">Email</label><input type="email" name="email" required className="w-full p-3 border rounded-lg focus:ring-2 ring-blue-500 outline-none" placeholder="jane@email.com" /></div>
            <div><label className="text-xs font-bold text-gray-500 uppercase">Service</label><select name="service" className="w-full p-3 border rounded-lg bg-white"><option>Holiday Package</option><option>Visa</option><option>Flights</option></select></div>
          </div>
          <div><label className="text-xs font-bold text-gray-500 uppercase">Message</label><textarea name="message" rows={3} className="w-full p-3 border rounded-lg focus:ring-2 ring-blue-500 outline-none" placeholder="Tell us your plans..." /></div>
          
          <Button className="w-full justify-center text-lg"><Send className="w-5 h-5" /> Send Enquiry</Button>
          <p className="text-center text-xs text-gray-400">Secure submission powered by FormSubmit.</p>
        </form>
      </div>
    </div>
  );
};

// 3. PDF DOWNLOAD LOGIC
const handleDownloadPDF = () => {
  window.print();
};

/* ===================================================================
  PAGES
  ===================================================================
*/

const HomePage = () => {
  const { navigate } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [budgetTab, setBudgetTab] = useState('budget');

  // Slideshow Logic
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const budgetPackages = useMemo(() => {
    if (budgetTab === 'budget') return PACKAGES.filter(p => p.price < 1000);
    if (budgetTab === 'luxury') return PACKAGES.filter(p => p.price >= 1000);
    return PACKAGES;
  }, [budgetTab]);

  return (
    <>
      <div className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/50 to-transparent" />
          </div>
        ))}
        <Container className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Your Journey, <span className="text-cyan-300">Beautifully Crafted</span></h1>
          <p className="text-xl mb-8 font-light">Daily appointment slots for Spain Visa available.</p>
          <SearchWidget />
        </Container>
      </div>

      <Section>
        <Container>
          <h2 className="text-3xl font-bold mb-8">Find Your Perfect Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.slice(0, 3).map(pkg => (
              <div key={pkg.id} className="group h-96 rounded-2xl overflow-hidden relative cursor-pointer shadow-lg" onClick={() => navigate(`/packages/${pkg.slug}`)}>
                <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-2xl font-bold">{pkg.title}</h3>
                  <div className="flex justify-between mt-2"><span className="text-cyan-300 font-bold">{pkg.currency}{pkg.price}</span><span>{pkg.duration.days} Days</span></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="gray">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Budget Friendly Destinations</h2>
            <div className="inline-flex bg-white p-1 rounded-full shadow-sm">
              {['budget', 'luxury', 'honeymoon'].map(tab => (
                <button key={tab} onClick={() => setBudgetTab(tab)} className={`px-6 py-2 rounded-full font-bold capitalize ${budgetTab === tab ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>{tab}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {budgetPackages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => navigate(`/packages/${pkg.slug}`)}>
                <img src={pkg.image} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">{pkg.title}</h4>
                  <div className="flex justify-between mt-4 text-blue-600 font-bold"><span>{pkg.currency}{pkg.price}</span><span className="text-xs flex items-center">View <ChevronRight className="w-3 h-3" /></span></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Client Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4 text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-gray-600 italic mb-4">"{t.text}"</p>
                <div className="font-bold text-gray-900">{t.name}, <span className="text-gray-400 font-normal">{t.location}</span></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="dark">
        <Container>
          <div className="text-center mb-12 text-white"><h2 className="text-3xl font-bold">Travel Made Simple</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {ALL_SERVICES.slice(0, 4).map(s => (
              <div key={s.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-700 cursor-pointer" onClick={() => navigate('/services')}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>{s.icon}</div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

const PackageDetailPage = ({ slug }: { slug: string }) => {
  const { setModalOpen } = useRouter();
  const pkg = PACKAGES.find(p => p.slug === slug);
  const [activeTab, setActiveTab] = useState('itinerary');
  if (!pkg) return <div className="pt-32 text-center">Package Not Found</div>;

  return (
    <>
      <div className="relative h-[60vh]"><img src={pkg.image} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40" /><Container className="absolute bottom-0 py-12 text-white"><h1 className="text-5xl font-bold mb-4">{pkg.title}</h1><div className="flex gap-4 items-center text-xl"><MapPin /> {pkg.destination} | <Clock /> {pkg.duration.days} Days</div></Container></div>
      <Section bg="gray"><Container><div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex border-b mb-8">{['Itinerary', 'Inclusions', 'Policy'].map(t => <button key={t} onClick={() => setActiveTab(t.toLowerCase())} className={`px-6 py-4 font-bold ${activeTab === t.toLowerCase() ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>{t}</button>)}</div>
          {activeTab === 'itinerary' && <div className="space-y-8">{pkg.itinerary.map((d, i) => <div key={i} className="pl-6 border-l-2 border-blue-200"><h4 className="font-bold text-lg">Day {d.day}: {d.title}</h4><p className="text-gray-600">{d.desc}</p></div>)}</div>}
          {activeTab === 'inclusions' && <div className="grid grid-cols-2 gap-4">{pkg.inclusions.map((inc, i) => <div key={i} className="flex gap-2"><Check className="text-green-500" /> {inc}</div>)}</div>}
          {activeTab === 'policy' && <div><p>Cancellation allowed up to 15 days before departure.</p></div>}
        </div>
        <div>
          <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-24 border">
            <div className="mb-6"><span className="text-gray-500">From</span> <span className="text-3xl font-bold text-blue-600">{pkg.currency}{pkg.price}</span></div>
            <Button className="w-full mb-3" onClick={() => setModalOpen(true)}>Book Now</Button>
            <Button variant="secondary" className="w-full" onClick={handleDownloadPDF}><Download className="w-4 h-4 mr-2" /> Download PDF</Button>
          </div>
        </div>
      </div></Container></Section>
    </>
  );
};

const ServicesPage = () => {
  const { setModalOpen } = useRouter();
  return (
    <div className="pt-32 pb-16">
      <Container><h1 className="text-4xl font-bold text-center mb-16">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ALL_SERVICES.map(s => (
          <div key={s.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${s.color}`}>{s.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
            <p className="text-gray-600 mb-6">{s.desc}</p>
            <button onClick={() => setModalOpen(true)} className="text-blue-600 font-bold flex items-center gap-2">Enquire Now <ArrowRight className="w-4 h-4" /></button>
          </div>
        ))}
      </div></Container>
    </div>
  );
};

const PackagesPage = () => {
  const { navigate } = useRouter();
  return <div className="pt-32"><Container><h1 className="text-4xl font-bold mb-8">All Packages</h1><div className="grid grid-cols-3 gap-6">{PACKAGES.map(p => <div key={p.id} onClick={() => navigate(`/packages/${p.slug}`)} className="bg-white border rounded-xl overflow-hidden cursor-pointer"><img src={p.image} className="h-48 w-full object-cover" /><div className="p-4"><h3 className="font-bold">{p.title}</h3><p className="text-blue-600 font-bold">{p.currency}{p.price}</p></div></div>)}</div></Container></div>;
};

const BlogPage = () => {
  const { navigate } = useRouter();
  return <div className="pt-32"><Container><h1 className="text-4xl font-bold mb-8">Blog</h1><div className="grid grid-cols-3 gap-6">{BLOG_POSTS.map(p => <div key={p.id} onClick={() => navigate(`/blog/${p.slug}`)} className="bg-white border rounded-xl overflow-hidden cursor-pointer"><img src={p.image} className="h-48 w-full object-cover" /><div className="p-4"><h3 className="font-bold">{p.title}</h3><p className="text-sm text-gray-500">{p.excerpt}</p></div></div>)}</div></Container></div>;
};

const BlogPostReader = ({ slug }: { slug: string }) => (<div className="pt-32"><Container><h1>Blog: {slug}</h1><p>Content...</p></Container></div>);
const VisaPage = () => { const { setModalOpen } = useRouter(); return <div className="pt-32"><Container><h1>Schengen Visa</h1><Button onClick={() => setModalOpen(true)}>Enquire</Button></Container></div>; };
const ContactPage = () => (<div className="pt-32"><Container><h1 className="text-4xl font-bold mb-8">Contact Us</h1><EnquiryForm /></Container></div>);

const Footer = () => {
  const { navigate } = useRouter();
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div><div className="bg-white p-2 rounded-lg inline-block mb-4"><img src={LOGO_URL} className="h-8" /></div><p className="text-slate-400 text-sm">Manchester's trusted travel partner.</p></div>
          <div><h4 className="font-bold mb-4">Company</h4><ul className="space-y-2 text-sm text-slate-400"><li onClick={() => navigate('/contact')} className="cursor-pointer hover:text-white">Contact</li><li onClick={() => navigate('/blog')} className="cursor-pointer hover:text-white">Blog</li></ul></div>
          <div><h4 className="font-bold mb-4">Services</h4><ul className="space-y-2 text-sm text-slate-400"><li onClick={() => navigate('/services')} className="cursor-pointer hover:text-white">All Services</li></ul></div>
          <div><h4 className="font-bold mb-4">Contact</h4><p className="text-sm text-slate-400">{SITE_CONFIG.phone}<br/>{SITE_CONFIG.email}</p></div>
        </div>
      </Container>
    </footer>
  );
};

const App = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [params, setParams] = useState<any>({});
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = (path: string) => {
    window.scrollTo(0, 0);
    if (path.startsWith('/packages/') && path !== '/packages') setParams({ slug: path.split('/packages/')[1] });
    else if (path.startsWith('/blog/') && path !== '/blog') setParams({ slug: path.split('/blog/')[1] });
    else setParams({});
    setCurrentPath(path);
  };

  const renderContent = () => {
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/packages') return <PackagesPage />;
    if (currentPath.startsWith('/packages/')) return <PackageDetailPage slug={params.slug} />;
    if (currentPath === '/services') return <ServicesPage />;
    if (currentPath === '/services/schengen-visa') return <VisaPage />;
    if (currentPath === '/blog') return <BlogPage />;
    if (currentPath.startsWith('/blog/')) return <BlogPostReader slug={params.slug} />;
    if (currentPath === '/contact') return <ContactPage />;
    return <HomePage />;
  };

  return (
    <RouterContext.Provider value={{ path: currentPath, params, navigate, isModalOpen, setModalOpen }}>
      <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{renderContent()}</main>
        <Footer />
        <EnquiryModal />
      </div>
    </RouterContext.Provider>
  );
};

export default App;
