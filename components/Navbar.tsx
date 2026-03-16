
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

  const specialistsLinks = [
    { name: t('nav.findDoctor'), path: '/find-doctor', icon: <Stethoscope className="w-4 h-4" /> },
    { name: t('nav.coe'), path: '/centre-of-excellence', icon: <Sparkles className="w-4 h-4" /> },
    { name: t('nav.services'), path: '/services', icon: <Activity className="w-4 h-4" /> },
  ];

  const patientGuideLinks = [
    { name: t('nav.patientGuide'), path: '/patient-guide', icon: <Info className="w-4 h-4" /> },
    { name: t('nav.roomRates'), path: '/room-rates', icon: <Bed className="w-4 h-4" /> },
    { name: t('nav.insurance'), path: '/insurance-panels', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: t('nav.faq'), path: '/faq', icon: <FileText className="w-4 h-4" /> },
  ];

  const corporateLinks = [
    { name: t('nav.hospital'), path: '/about', icon: <History className="w-4 h-4" /> },
    { name: 'Careers', path: '/careers', icon: <Briefcase className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 z-[100] w-full">
      {/* TIER 1: Utility Bar */}
      <div className={`bg-[#006D77] text-white transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-auto py-2 px-4 md:px-8 opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
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
            </div>
            <div className="h-4 w-px bg-white/20"></div>
            <a href="tel:+6097477000" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#83C5BE] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{t('nav.emergency')}: +609 747 7000</span>
            </a>
          </div>
        </div>
      </div>

      {/* TIER 2: Master Branding - REMOVED per request */}

      {/* TIER 3: Clinical Navigation */}
      <div className={`transition-all duration-500 ${scrolled ? 'px-4 md:px-8 mt-4' : 'px-0'}`}>
        <nav className={`mx-auto transition-all duration-500 ${scrolled ? 'max-w-6xl rounded-full glass-nav shadow-2xl border border-white/20' : 'max-w-full bg-white border-b border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-20' : 'h-32'}`}>
              <div className="flex items-center gap-3">
                 <Link to="/" className="flex items-center gap-3">
                   <img src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC_Logo_Hi-Res_2022_CS6-01-scaled.png" alt="KBMC Logo" className={`transition-all duration-500 ${scrolled ? 'h-14' : 'h-24'} w-auto`} />
                 </Link>
              </div>

              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                <Link to="/" className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all hover:bg-[#EDF6F9] ${isActive('/') ? 'text-[#006D77] bg-[#EDF6F9]' : 'text-[#2C3E50]'}`}>
                  {t('nav.home')}
                </Link>

                <Link to="/about" className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all hover:bg-[#EDF6F9] ${isActive('/about') ? 'text-[#006D77] bg-[#EDF6F9]' : 'text-[#2C3E50]'}`}>
                  {t('nav.hospital')}
                </Link>

                <div className="relative group h-full flex items-center">
                  <button className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all hover:bg-[#EDF6F9] ${isActive('/find-doctor') || isActive('/centre-of-excellence') || isActive('/services') ? 'text-[#006D77] bg-[#EDF6F9]' : 'text-[#2C3E50]'}`}>
                    {t('nav.medical')} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 pt-4 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-3 flex flex-col gap-1 overflow-hidden">
                      {specialistsLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#EDF6F9] transition-all group/item">
                          <div className="text-[#83C5BE] group-hover/item:text-[#006D77] transition-colors">{link.icon}</div>
                          <span className="text-[11px] font-bold text-[#2C3E50] tracking-wide">{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative group h-full flex items-center">
                  <button className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all hover:bg-[#EDF6F9] ${isActive('/patient-guide') || isActive('/room-rates') || isActive('/insurance-panels') || isActive('/faq') || isActive('/medical-tourism') || isActive('/news-gallery') ? 'text-[#006D77] bg-[#EDF6F9]' : 'text-[#2C3E50]'}`}>
                    {t('nav.visitor')} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 pt-4 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-3 flex flex-col gap-1 overflow-hidden">
                      {patientGuideLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#EDF6F9] transition-all group/item">
                          <div className="text-[#83C5BE] group-hover/item:text-[#006D77] transition-colors">{link.icon}</div>
                          <span className="text-[11px] font-bold text-[#2C3E50] tracking-wide">{link.name}</span>
                        </Link>
                      ))}
                      <Link to="/medical-tourism" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#EDF6F9] transition-all group/item">
                        <div className="text-[#83C5BE] group-hover/item:text-[#006D77] transition-colors"><Globe className="w-4 h-4" /></div>
                        <span className="text-[11px] font-bold text-[#2C3E50] tracking-wide">{t('nav.international')}</span>
                      </Link>
                      <Link to="/news-gallery" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#EDF6F9] transition-all group/item">
                        <div className="text-[#83C5BE] group-hover/item:text-[#006D77] transition-colors"><FileText className="w-4 h-4" /></div>
                        <span className="text-[11px] font-bold text-[#2C3E50] tracking-wide">{t('nav.news')}</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/contact-us" className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all hover:bg-[#EDF6F9] ${isActive('/contact-us') ? 'text-[#006D77] bg-[#EDF6F9]' : 'text-[#2C3E50]'}`}>
                  {t('nav.contact')}
                </Link>

                <Link to="/find-doctor" className="bg-[#006D77] text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#E29578] transition-all transform hover:scale-105 shadow-lg active:scale-95 ml-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {t('nav.book')}
                </Link>
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
                  <img src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC_Logo_Hi-Res_2022_CS6-01-scaled.png" alt="KBMC Logo" className="h-20 w-auto" />
                  <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-[#006D77] transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">{t('nav.home')}</h3>
                    <Link to="/" className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFB] text-[#2C3E50] font-bold">
                      <History className="w-5 h-5 text-[#83C5BE]" />
                      <span>{t('nav.home')}</span>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">{t('nav.specialists')}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {specialistsLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EDF6F9] text-[#2C3E50] font-bold transition-all">
                          <div className="text-[#83C5BE]">{link.icon}</div>
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">{t('nav.patientGuide')}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {patientGuideLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EDF6F9] text-[#2C3E50] font-bold transition-all">
                          <div className="text-[#83C5BE]">{link.icon}</div>
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">{t('nav.international')}</h3>
                    <Link to="/medical-tourism" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EDF6F9] text-[#2C3E50] font-bold transition-all">
                      <div className="text-[#83C5BE]"><Globe className="w-5 h-5" /></div>
                      <span>{t('nav.international')}</span>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">{t('nav.news')}</h3>
                    <Link to="/news-gallery" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EDF6F9] text-[#2C3E50] font-bold transition-all">
                      <div className="text-[#83C5BE]"><FileText className="w-5 h-5" /></div>
                      <span>{t('nav.news')}</span>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">{t('nav.hospital')}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {corporateLinks.map((link) => (
                        <Link key={link.path} to={link.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#EDF6F9] text-[#2C3E50] font-bold transition-all">
                          <div className="text-[#83C5BE]">{link.icon}</div>
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
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
