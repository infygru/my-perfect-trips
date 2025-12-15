"use client";

import React, { useState, useEffect } from "react";
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Globe, 
  Star, 
  CheckCircle,
  ArrowRight,
  Download
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- Types & Mock Data ---

type Package = {
  id: number;
  title: string;
  location: string;
  price: string;
  days: string;
  image: string;
  category: "budget" | "luxury" | "honeymoon" | "featured";
};

const PACKAGES: Package[] = [
  { id: 1, title: "Dubai Explorer", location: "Dubai, UAE", price: "£699", days: "5 Days", image: "https://images.unsplash.com/photo-1512453979798-5ea936a7fe48?auto=format&fit=crop&q=80&w=800", category: "featured" },
  { id: 2, title: "Magical Turkey", location: "Istanbul & Cappadocia", price: "£850", days: "7 Days", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800", category: "featured" },
  { id: 3, title: "Azerbaijan Escape", location: "Baku, Azerbaijan", price: "£499", days: "4 Days", image: "https://images.unsplash.com/photo-1632973656976-425121c2a074?auto=format&fit=crop&q=80&w=800", category: "budget" },
  { id: 4, title: "Bali Bliss", location: "Bali, Indonesia", price: "£1200", days: "10 Days", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", category: "honeymoon" },
  { id: 5, title: "Parisian Romance", location: "Paris, France", price: "£1500", days: "5 Days", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", category: "luxury" },
  { id: 6, title: "Sri Lanka Safari", location: "Colombo, Sri Lanka", price: "£650", days: "8 Days", image: "https://images.unsplash.com/photo-1588258219511-64eb629cb833?auto=format&fit=crop&q=80&w=800", category: "budget" },
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", role: "Honeymooner", text: "MyPerfectTrips made our honeymoon in Bali absolutely magical. The hotels were stunning!", rating: 5 },
  { id: 2, name: "David Miller", role: "Solo Traveler", text: "Excellent service for my visa and flight booking to Dubai. Highly recommended.", rating: 5 },
  { id: 3, name: "The Thompson Family", role: "Family Vacation", text: "Turkey was a dream. The guide provided was so knowledgeable and friendly.", rating: 4 },
];

const SERVICES = [
  { id: 1, title: "Tour Packages", icon: <MapPin className="w-8 h-8 text-blue-600" />, desc: "Customized itineraries for Dubai, Turkey, Europe & more." },
  { id: 2, title: "Flight Bookings", icon: <Plane className="w-8 h-8 text-blue-600" />, desc: "Best deals on international and domestic flights." },
  { id: 3, title: "Schengen Visas", icon: <Globe className="w-8 h-8 text-blue-600" />, desc: "Expert assistance with visa documentation and appointments." },
  { id: 4, title: "Hotel Stays", icon: <CheckCircle className="w-8 h-8 text-blue-600" />, desc: "Luxury to budget accommodation options worldwide." },
];

// --- Components ---

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"budget" | "luxury" | "honeymoon">("budget");
  const [flightOrigin, setFlightOrigin] = useState("Manchester (MAN)");
  const [flightDest, setFlightDest] = useState("");

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers
  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightDest) return alert("Please enter a destination");
    // Redirect to Skyscanner
    const url = `https://www.skyscanner.net/transport/flights/man/${flightDest.toLowerCase().slice(0, 3)}`;
    window.open(url, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50">
      
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className={`text-2xl font-bold tracking-tight ${isScrolled ? "text-blue-900" : "text-white"}`}>
            MyPerfectTrips<span className="text-blue-500">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["Destinations", "Services", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`font-medium hover:text-blue-500 transition-colors ${isScrolled ? "text-slate-600" : "text-white/90"}`}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => setIsEnquiryModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-blue-600">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? "text-slate-800" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t p-4 flex flex-col space-y-4">
             {["Destinations", "Services", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-600 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>{item}</a>
            ))}
            <button onClick={() => { setIsEnquiryModalOpen(true); setIsMobileMenuOpen(false); }} className="bg-blue-600 text-white w-full py-3 rounded-lg">Enquire Now</button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative h-[85vh] w-full flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000" 
            alt="Travel Background" 
            fill 
            className="object-cover brightness-[0.65]"
            priority
          />
        </div>

        {/* Content & Search Widget */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Discover the World With Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            From visa assistance to luxury tour packages, we handle the details so you can enjoy the journey.
          </p>

          {/* Search Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto transform translate-y-8">
            <div className="flex border-b mb-6">
              <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-semibold px-4 flex items-center gap-2">
                <Plane size={18} /> Find Flights
              </button>
              <button className="pb-3 text-slate-500 font-medium px-4 hover:text-blue-500 flex items-center gap-2 transition-colors">
                <MapPin size={18} /> Tour Packages
              </button>
            </div>
            
            <form onSubmit={handleFlightSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 text-left">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">From</label>
                <div className="flex items-center bg-slate-100 rounded-lg px-3 py-3">
                  <MapPin className="text-slate-400 mr-2" size={18} />
                  <input 
                    type="text" 
                    value={flightOrigin} 
                    onChange={(e) => setFlightOrigin(e.target.value)} 
                    className="bg-transparent w-full outline-none text-slate-800 font-medium"
                  />
                </div>
              </div>
              <div className="md:col-span-4 text-left">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">To</label>
                <div className="flex items-center bg-slate-100 rounded-lg px-3 py-3">
                  <MapPin className="text-slate-400 mr-2" size={18} />
                  <input 
                    type="text" 
                    placeholder="Where to? (e.g. Dubai)" 
                    value={flightDest}
                    onChange={(e) => setFlightDest(e.target.value)}
                    className="bg-transparent w-full outline-none text-slate-800 font-medium" 
                  />
                </div>
              </div>
              <div className="md:col-span-4">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Search size={18} /> Search Flights
                </button>
              </div>
            </form>
            <div className="text-xs text-slate-400 text-left mt-3">*Redirects to Skyscanner for live pricing</div>
          </div>
        </div>
      </header>

      {/* --- Section 1: Find Your Perfect Trip (Featured) --- */}
      <section id="destinations" className="py-20 pt-32 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Top Picks</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Find Your Perfect Trip</h2>
          </div>
          <button onClick={handlePrint} className="hidden md:flex items-center gap-2 text-slate-500 hover:text-blue-600 border border-slate-200 px-4 py-2 rounded-lg transition-all">
            <Download size={16} /> Download Itinerary
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.filter(p => p.category === "featured").map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-900 shadow-sm">
                  {pkg.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {pkg.days}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {pkg.location}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">{pkg.title}</h3>
                <button onClick={() => setIsEnquiryModalOpen(true)} className="w-full py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-blue-600 hover:text-white hover:border-transparent transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 2: Budget Friendly (Tabs) --- */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Explore by Category</h2>
            <p className="text-slate-600 mt-3">Curated packages designed for every type of traveler.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10 space-x-2 md:space-x-6">
            {(["budget", "luxury", "honeymoon"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full font-medium capitalize transition-all ${
                  activeTab === tab 
                    ? "bg-blue-600 text-white shadow-lg transform scale-105" 
                    : "bg-white text-slate-600 hover:bg-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.filter(p => p.category === activeTab).map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{pkg.title}</h3>
                    <span className="text-blue-600 font-bold">{pkg.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-1"><MapPin size={14} /> {pkg.location}</p>
                  <button onClick={() => setIsEnquiryModalOpen(true)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    Request Quote <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Client Stories --- */}
      <section id="about" className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Client Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-slate-200"} />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 4: Travel Made Simple (Services) --- */}
      <section id="services" className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="md:col-span-2 lg:col-span-4 text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Travel Made Simple</h2>
              <p className="text-blue-200">We are a Manchester based agency specializing in personalized travel.</p>
            </div>
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="bg-white p-3 rounded-lg w-fit mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer id="contact" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">MyPerfectTrips.</h3>
            <p className="text-sm mb-4">Making dream destinations affordable and accessible from Manchester to the world.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#destinations" className="hover:text-white">Tour Packages</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} /> +44 7000 000000</li>
              <li className="flex items-center gap-2"><Mail size={14} /> hello@myperfecttrips.co.uk</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Manchester, UK</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Your email" className="bg-slate-800 border-none rounded p-2 text-sm text-white focus:ring-1 focus:ring-blue-500" />
              <button className="bg-blue-600 text-white py-2 rounded text-sm font-bold hover:bg-blue-700">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="text-center text-xs border-t border-slate-800 pt-8">
          © {new Date().getFullYear()} MyPerfectTrips. All rights reserved.
        </div>
      </footer>

      {/* --- Enquiry Modal --- */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Plan Your Trip</h3>
              <button onClick={() => setIsEnquiryModalOpen(false)} className="hover:bg-blue-700 p-1 rounded"><X size={20} /></button>
            </div>
            <div className="p-6">
              <form action="https://formsubmit.co/your@email.com" method="POST" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input type="text" name="name" required className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" name="email" required className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Interest</label>
                  <select name="interest" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>Tour Package</option>
                    <option>Flight Ticket</option>
                    <option>Visa Assistance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea name="message" rows={3} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <input type="hidden" name="_captcha" value="false" />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
