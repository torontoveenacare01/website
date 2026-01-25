// app/Storefront.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from "../../public/images/Rotator1.jpg"
import image2 from "../../public/images/Rotator2.jpg"
import image3 from "../../public/images/Rotator3.jpg"
import image4 from "../../public/images/Rotator4.jpg"
import image5 from "../../public/images/Rotator5.jpg"
import image6 from "../../public/images/Rotator6.jpg"

import { Instagram, Facebook, Phone, ArrowRight, Send, CheckCircle2, Music2 } from "lucide-react";

const SOCIALS = [
  { icon: Phone, href: "https://wa.me/16478801416", label: "WhatsApp" },
  { icon: Instagram, href: "https://www.instagram.com/torontoveenacare/", label: "Instagram" },
  { icon: Music2, href: "https://www.tiktok.com/@torontoveenacare_01", label: "TikTok" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61575265017711", label: "Facebook" },
];

const HERO_IMAGES = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6
];

export default function Storefront({ products }) {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", message: "" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => setVisibleProducts((prev) => prev + 3);

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phoneNumber = "16478801416";
    const text = `Hello Toronto Veena Care! %0A%0AMy Name: ${formData.name}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(whatsappUrl, '_blank');
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200); 
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-[#D97706]/20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[92vh] w-full flex items-center overflow-hidden bg-black">
        {HERO_IMAGES.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentHeroIndex ? "opacity-60 scale-100" : "opacity-0 scale-105"
            } transition-transform duration-[6000ms]`}
          >
            <Image src={src} alt="Hero Gradient" fill className="object-cover" priority={index === 0} />
          </div>
        ))}

        <div className="relative z-10 px-6 md:px-20 max-w-7xl w-full pb-32">
          <span className="inline-block mb-4 text-[#D97706] font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
            Traditional Craft meets Modern Care
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-semibold text-white tracking-tight leading-[1.05] mb-6 max-w-4xl">
            Toronto <br /> Veena Care
          </h1>
          
          {/* UPDATED ADDRESS IN HERO */}
          <div className="mb-10 space-y-1 text-white/90">
            <p className="text-lg md:text-xl font-light tracking-tight">22 Morning Dew Rd</p>
            <p className="text-sm md:text-base text-white/60 tracking-wide uppercase">Scarborough, ON M1E 3X1</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button 
              onClick={scrollToContact}
              className="px-10 py-4 bg-white text-black rounded-full font-medium hover:bg-stone-100 transition-all active:scale-95 w-full sm:w-auto"
            >
              Contact for Services
            </button>
            <button 
              onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-full font-medium hover:bg-white/20 transition-all w-full sm:w-auto"
            >
              View Catalog
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-6 md:left-20 flex gap-8 z-20">
            {SOCIALS.map((Item, i) => (
              <a key={i} href={Item.href} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-all hover:-translate-y-1">
                <Item.icon size={22} strokeWidth={1.5} />
              </a>
            ))}
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section id="catalog" className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="mb-20 space-y-4 text-left">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight">Our Collection.</h2>
          <p className="text-xl md:text-2xl text-[#86868B] max-w-2xl leading-relaxed">
            Handpicked instruments and professional services, curated for the discerning musician.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {products.slice(0, visibleProducts).map((product) => (
            <div key={product.id} className="group cursor-default text-left">
              <div className="relative aspect-[4/5] w-full mb-8 overflow-hidden rounded-3xl bg-[#F5F5F7]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {product.type}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-serif font-medium tracking-tight">{product.name}</h3>
                <p className="text-[#86868B] text-base leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <button 
                  onClick={scrollToContact}
                  className="pt-2 flex items-center gap-1 text-[#D97706] font-medium text-sm group/btn transition-all hover:translate-x-1"
                >
                  Inquire <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="mt-24">
            <button
              onClick={handleLoadMore}
              className="text-[#0066CC] hover:underline text-lg font-medium flex items-center gap-2"
            >
              Show more products <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#F5F5F7] border-t border-[#D2D2D7] pt-24 pb-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-[#D2D2D7]">
            
            <div className="space-y-12" id="contact-form">
              <div className="space-y-4">
                <h4 className="text-3xl font-serif font-semibold tracking-tight">Get in touch.</h4>
                <p className="text-[#86868B] max-w-sm">
                  Send a message to open WhatsApp and speak with our specialists.
                </p>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleWhatsAppSubmit} className="space-y-6 max-w-md transition-all duration-500">
                  <input 
                    required
                    type="text" placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D97706] transition-all shadow-sm"
                  />
                  <textarea 
                    required
                    placeholder="Tell us about your instrument or service needs..." rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D97706] transition-all shadow-sm"
                  ></textarea>
                  <button 
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-[#D97706] text-white w-full md:w-auto px-10 py-3 rounded-full font-medium hover:bg-[#B45309] transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? "Syncing WhatsApp..." : "Send Message"} <Send size={16} />
                  </button>
                </form>
              ) : (
                <div className="max-w-md p-10 bg-white rounded-3xl border border-[#D97706]/20 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-700">
                   <div className="w-16 h-16 bg-[#D97706]/10 rounded-full flex items-center justify-center text-[#D97706] animate-bounce">
                      <CheckCircle2 size={32} />
                   </div>
                   <h5 className="text-xl font-medium font-serif">Message Prepared</h5>
                   <p className="text-sm text-[#86868B]">We’ve opened WhatsApp on your device. Just hit 'send' in the app to reach us!</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:pt-4">
              <div className="space-y-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#1D1D1F]">Visit Our Shop</span>
                {/* UPDATED ADDRESS IN FOOTER */}
                <div className="text-sm text-[#424245] space-y-1 text-left">
                  <p className="font-medium text-[#1D1D1F]">Toronto Veena Care</p>
                  <p>22 Morning Dew Rd</p>
                  <p>Scarborough, ON M1E 3X1</p>
                  <p className="pt-4 font-semibold text-[#D97706]">WhatsApp: 647-880-1416</p>
                </div>
              </div>
              <div className="space-y-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#1D1D1F]">Connect</span>
                <div className="flex flex-col gap-4">
                  {SOCIALS.map((Item, i) => (
                    <a key={i} href={Item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#424245] hover:text-[#D97706] transition-colors group">
                      <div className="p-2 rounded-lg bg-[#F0F0F2] group-hover:bg-[#D97706]/10 transition-colors">
                        <Item.icon size={18} strokeWidth={1.5} /> 
                      </div>
                      {Item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 flex flex-col md:flex-row justify-between items-start gap-4 text-[12px] text-[#86868B]">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <span>Copyright © {new Date().getFullYear()} Toronto Veena Care.</span>
              <span className="hover:text-[#1D1D1F] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#1D1D1F] cursor-pointer">Terms</span>
            </div>
            <div className="text-[#1D1D1F] font-medium uppercase tracking-tighter text-[10px]">Scarborough, Canada</div>
          </div>
        </div>
      </footer>
    </div>
  );
}