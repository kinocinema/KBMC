
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Phone, Calendar, ChevronDown, 
  Stethoscope, Bed, Activity, ShieldCheck, 
  Info, Briefcase, FileText, PhoneCall, 
  HeartPulse, Sparkles, GraduationCap, MapPin,
  ClipboardList, Heart, Users, History, Globe
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import PrayerWidget from './PrayerWidget';
import { menuData } from '../data/menuData';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 z-[100] w-full">
      {/* TIER 1: Utility Bar */}
      <div className={`bg-[#006D77] text-white transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-auto py-2 px-2 sm:px-4 lg:px-4 xl:px-6 2xl:px-8 opacity-100'}`}>
        <div className="w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
          <PrayerWidget />
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/20">
               <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === 'en' ? 'bg-white text-[#006D77] shadow-sm' : 'text-white/60 hover:text-white'}`}
               >
                 EN
               </button>
               <button 
                onClick={() => setLanguage('bm')}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === 'bm' ? 'bg-white text-[#006D77] shadow-sm' : 'text-white/60 hover:text-white'}`}
               >
                 BM
               </button>
               <button 
                onClick={() => setLanguage('th')}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === 'th' ? 'bg-white text-[#006D77] shadow-sm' : 'text-white/60 hover:text-white'}`}
               >
                 TH
               </button>
            </div>
            <div className="h-4 w-px bg-white/20"></div>
            <a href="tel:+6097477000" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#83C5BE] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{t('nav.emergency')}: +609 747 7000</span>
            </a>
          </div>
        </div>
      </div>

      {/* TIER 3: Clinical Navigation */}
      <div className={`transition-all duration-500 ${scrolled ? 'px-2 md:px-4 mt-4' : 'px-0'}`}>
        <nav className={`mx-auto transition-all duration-500 ${scrolled ? 'w-[98%] max-w-[1920px] rounded-full glass-nav shadow-2xl border border-white/20' : 'w-full bg-white border-b border-gray-100'}`}>
          <div className="w-full mx-auto px-2 sm:px-4 lg:px-4 xl:px-6 2xl:px-8">
            <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-20' : 'h-32'}`}>
              <div className="flex items-center gap-3 flex-shrink-0">
                 <Link to="/" className="flex items-center gap-3 flex-shrink-0">
                   <img 
                     src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC_Logo_Hi-Res_2022_CS6-01-scaled.png" 
                     alt="KBMC Logo" 
                     className={`transition-all duration-500 ${scrolled ? 'h-10 md:h-12 xl:h-14' : 'h-12 md:h-16 xl:h-20'} w-auto object-contain`} 
                   />
                 </Link>
              </div>

              <div className="hidden lg:flex flex-col justify-center items-end h-full gap-2 xl:gap-3 py-2">
                {/* Top Row */}
                <div className="flex items-center space-x-3 xl:space-x-6 2xl:space-x-8">
                  {menuData.filter(m => ["HEALTH SCREENING PACKAGES AND CORPORATE WELLNESS PROGRAM", "MEDICAL TOURISM AND INTERNATIONAL PATIENT SERVICES", "MYHEALTH360 FAQ"].includes(m.title)).map((menu, index) => (
                    <div key={menu.title} className="relative group flex items-center hover:z-50">
                      <button className={`flex items-center gap-1.5 xl:gap-2 text-[11px] xl:text-[13px] 2xl:text-sm font-bold uppercase tracking-wide px-3 xl:px-4 py-2 rounded-full transition-all hover:bg-[#EDF6F9] text-[#1A2530] whitespace-nowrap ${menu.title === 'MYHEALTH360 FAQ' ? 'bg-[#F0F8FA]' : ''}`}>
                        {menu.title} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                      </button>
                      <div className={`absolute top-full pt-2 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 right-0`}>
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-3 flex flex-col gap-1 overflow-hidden max-h-[70vh] overflow-y-auto pointer-events-auto">
                          {menu.links.map((link) => (
                            <Link key={link.path} to={link.path} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#EDF6F9] transition-all group/item">
                              <span className="text-[11px] font-bold text-[#2C3E50] tracking-wide">{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Row */}
                <div className="flex items-center space-x-3 xl:space-x-6 2xl:space-x-8">
                  {menuData.filter(m => ["HOME", "OUR SPECIALISTS & SERVICES", "PATIENT & VISITOR INFO", "CENTRE OF EXCELLENCE", "NEWS AND GALLERY"].includes(m.title)).map((menu, index) => (
                    <div key={menu.title} className="relative group flex items-center hover:z-50">
                      <button className={`flex items-center gap-1.5 xl:gap-2 text-[11px] xl:text-[13px] 2xl:text-sm font-bold uppercase tracking-wide px-3 xl:px-4 py-2 rounded-full transition-all hover:bg-[#EDF6F9] text-[#1A2530] whitespace-nowrap`}>
                        {menu.title} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                      </button>
                      <div className={`absolute top-full pt-2 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 ${index > 2 ? 'right-0' : 'left-0'}`}>
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-3 flex flex-col gap-1 overflow-hidden max-h-[70vh] overflow-y-auto pointer-events-auto">
                          {menu.links.map((link) => (
                            <Link key={link.path} to={link.path} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#EDF6F9] transition-all group/item">
                              <span className="text-[11px] font-bold text-[#2C3E50] tracking-wide">{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Link to="/find-doctor" className="bg-[#006D77] text-white px-6 xl:px-8 py-2.5 rounded-full text-[11px] xl:text-[13px] 2xl:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 xl:gap-2 hover:bg-[#E29578] transition-all transform hover:scale-105 shadow-lg active:scale-95 ml-4 xl:ml-8 whitespace-nowrap">
                    {t('nav.book')}
                  </Link>
                </div>
              </div>

              <div className="lg:hidden flex items-center justify-between w-full">
                <button onClick={() => setIsOpen(!isOpen)} className="text-[#2C3E50] hover:text-[#006D77] focus:outline-none ml-auto">
                  {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          <div className={`lg:hidden fixed inset-0 z-[150] transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-[#2C3E50]/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex flex-col h-full">
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                  <img src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC_Logo_Hi-Res_2022_CS6-01-scaled.png" alt="KBMC Logo" className="h-16 md:h-20 w-auto object-contain" />
                  <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-[#006D77] transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {menuData.map((menu) => (
                    <div key={menu.title} className="space-y-4">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">{menu.title}</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {menu.links.map((link) => (
                          <Link key={link.path} to={link.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EDF6F9] text-[#2C3E50] font-bold transition-all">
                            <span>{link.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <Link to="/find-doctor" className="w-full bg-[#006D77] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[#006D77]/20">
                    <Calendar className="w-5 h-5" />
                    {t('nav.book')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
