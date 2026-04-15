
import React, { useEffect, useState } from 'react';
import { 
  Globe, Plane, Hotel, ShieldCheck, MapPin, 
  PhoneCall, ChevronRight, Sparkles, Heart, 
  ClipboardList, Package, UserCheck, Briefcase,
  Clock, ArrowRight, Star
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';

const InternationalPatient: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'overview', label: t('ipc.nav.overview'), icon: <Globe className="w-4 h-4" /> },
    { id: 'guidelines', label: t('ipc.nav.guidelines'), icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'services', label: t('ipc.nav.services'), icon: <UserCheck className="w-4 h-4" /> },
    { id: 'travel', label: t('ipc.nav.travel'), icon: <Plane className="w-4 h-4" /> },
    { id: 'accommodation', label: t('ipc.nav.accommodation'), icon: <Hotel className="w-4 h-4" /> },
    { id: 'checklist', label: t('ipc.nav.checklist'), icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:h-[70vh] flex items-center overflow-hidden bg-[#006D77] py-20 md:py-0">
        <div className="absolute inset-0">
          <img 
            src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" 
            alt="International Patient Care" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006D77] via-[#006D77]/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className={`max-w-3xl space-y-6 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[#83C5BE] text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
              {t('ipc.hero.badge')}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              {t('ipc.hero.title')} <span className="text-[#E29578]">{t('ipc.hero.title2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl">
              {t('ipc.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="mailto:ipc@kbmc.com.my" className="bg-[#E29578] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#006D77] transition-all transform hover:scale-105 shadow-xl active:scale-95">
                {t('tourism.footer.email')}
              </a>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                {t('tourism.cta.download')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-24 md:top-32 lg:top-40 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-8 py-4 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const element = document.getElementById(tab.id);
                  if (element) {
                    const offset = 200;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all pb-2 border-b-2 ${activeTab === tab.id ? 'text-[#006D77] border-[#006D77]' : 'text-gray-400 border-transparent hover:text-[#006D77]'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-32">
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('ipc.services.title')}</h2>
                <div className="w-20 h-1.5 bg-[#E29578] rounded-full"></div>
              </div>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                {t('ipc.services.desc')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-[#F8FAFB] rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform text-[#006D77]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-[#2C3E50] mb-2">{t('ipc.premium.title')}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{t('ipc.premium.desc')}</p>
                </div>
                <div className="p-8 bg-[#F8FAFB] rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform text-[#006D77]">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-[#2C3E50] mb-2">{t('ipc.beyond.title')}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{t('ipc.beyond.desc')}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%204.png" 
                alt="Premium Facilities" 
                className="rounded-[3rem] shadow-2xl w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-[#006D77] p-10 rounded-[3rem] text-white shadow-2xl hidden md:block max-w-xs">
                <p className="text-2xl font-black leading-tight mb-2">{t('ipc.premier.title')}</p>
                <p className="text-sm text-white/70 font-medium">{t('ipc.premier.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Guidelines & Process Section */}
        <section id="guidelines" className="scroll-mt-60">
          <div className="bg-[#EDF6F9] rounded-[4rem] p-12 md:p-20">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('ipc.guidelines.title')}</h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">{t('ipc.process.desc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: t('ipc.guidelines.step1'), icon: <ClipboardList className="w-6 h-6" /> },
                { step: '02', title: t('ipc.guidelines.step2'), icon: <Star className="w-6 h-6" /> },
                { step: '03', title: t('ipc.guidelines.step3'), icon: <UserCheck className="w-6 h-6" /> },
                { step: '04', title: t('ipc.guidelines.step4'), icon: <Plane className="w-6 h-6" /> },
              ].map((item, idx) => (
                <div key={idx} className="relative bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group text-center">
                  <div className="w-14 h-14 bg-[#EDF6F9] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#006D77] group-hover:bg-[#006D77] group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <span className="text-[#E29578] font-black text-xs mb-2 block">STEP {item.step}</span>
                  <p className="text-sm text-[#2C3E50] font-bold leading-relaxed">{item.title}</p>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#83C5BE]/30 z-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel & Visa Section */}
        <section id="travel" className="scroll-mt-60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://storage.googleapis.com/igc-health/MRI%202.png" 
                alt="Travel Support" 
                className="rounded-[3rem] shadow-2xl w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('ipc.visa.title')}</h2>
                <div className="w-20 h-1.5 bg-[#E29578] rounded-full"></div>
              </div>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                {t('ipc.visa.desc')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 bg-[#F8FAFB] rounded-3xl border border-gray-100">
                  <ShieldCheck className="w-6 h-6 text-[#006D77] shrink-0" />
                  <div>
                    <h4 className="font-black text-[#2C3E50] mb-1">e-Visa Assistance</h4>
                    <p className="text-sm text-gray-500 font-medium">We provide the necessary medical invitation letters for your visa application.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-[#F8FAFB] rounded-3xl border border-gray-100">
                  <Plane className="w-6 h-6 text-[#006D77] shrink-0" />
                  <div>
                    <h4 className="font-black text-[#2C3E50] mb-1">Airport Transfers</h4>
                    <p className="text-sm text-gray-500 font-medium">Complimentary airport pick-up and drop-off for international patients.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodation Section */}
        <section id="accommodation" className="scroll-mt-60">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('ipc.care.title')}</h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">{t('ipc.partners.desc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" alt="Premier Suite" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-black text-[#006D77]">{t('ipc.premier.title')}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{t('ipc.premier.desc')}</p>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-6">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%204.png" alt="Partner Hotels" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-black text-[#006D77]">{t('ipc.partners.title')}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Special rates at Perdana Hotel, Grand Renai, and other leading hotels nearby.</p>
              </div>
              <div className="bg-[#006D77] p-8 rounded-[3rem] shadow-2xl text-white space-y-6 flex flex-col justify-center">
                <Hotel className="w-12 h-12 text-[#83C5BE]" />
                <h3 className="text-2xl font-black">Need Assistance?</h3>
                <p className="text-white/70 font-medium leading-relaxed">Our concierge team can handle all your booking requirements for a stress-free stay.</p>
                <button className="bg-[#E29578] text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest self-start hover:bg-white hover:text-[#006D77] transition-all">
                  Contact Concierge
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist & Welcome Pack Section */}
        <section id="checklist" className="scroll-mt-60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-[#F8FAFB] p-12 rounded-[4rem] border border-gray-100 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#006D77] shadow-sm">
                  <ClipboardList className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-black text-[#006D77]">{t('ipc.checklist.title')}</h2>
              </div>
              <ul className="space-y-4">
                {[
                  t('ipc.checklist.item1'),
                  t('ipc.checklist.item2'),
                  t('ipc.checklist.item3'),
                  t('ipc.checklist.item4'),
                  'Flight Itinerary & Travel Insurance',
                  'Emergency Contact Details'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-[#E29578]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#006D77] p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#83C5BE]">
                  <Package className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-black">{t('ipc.welcome.title')}</h2>
              </div>
              <p className="text-white/70 font-medium leading-relaxed relative z-10">
                {t('ipc.welcome.desc')}
              </p>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#83C5BE] mb-1">Stay Connected</p>
                  <p className="text-sm font-bold">Local SIM Card</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#83C5BE] mb-1">Local Guide</p>
                  <p className="text-sm font-bold">Kota Bharu Map</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12">
        <div className="bg-gradient-to-br from-[#006D77] to-[#2A6B77] rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/pattern/stardust.png')]"></div>
          <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {t('tourism.footer.title1')} <span className="text-[#E29578]">{t('tourism.footer.title2')}</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
              {t('tourism.footer.desc')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <a href="mailto:ipc@kbmc.com.my" className="bg-white text-[#006D77] px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#E29578] hover:text-white transition-all shadow-2xl flex items-center gap-3">
              <PhoneCall className="w-5 h-5" />
              {t('tourism.footer.email')}
            </a>
            <a href="tel:+6097458000" className="bg-transparent border-2 border-white/20 text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
              <Clock className="w-5 h-5" />
              {t('tourism.footer.call')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalPatient;
