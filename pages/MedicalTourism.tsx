
import React, { useEffect, useState } from 'react';
import { Globe, Plane, Hotel, ShieldCheck, MapPin, PhoneCall, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const MedicalTourism: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Plane className="w-6 h-6" />,
      title: t('tourism.ipc.title'),
      desc: t('tourism.ipc.desc')
    },
    {
      icon: <Hotel className="w-6 h-6" />,
      title: t('tourism.concierge.title'),
      desc: t('tourism.concierge.desc')
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Visa & Travel Support',
      desc: 'Assistance with medical visa arrangements and travel documentation for a smooth entry into Malaysia.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Personalized Care',
      desc: 'Dedicated patient coordinators to guide you through every step of your clinical journey.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center overflow-hidden bg-[#006D77]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80" 
            alt="Medical Tourism" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006D77] via-[#006D77]/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className={`max-w-3xl space-y-6 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[#83C5BE] text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
              {t('tourism.hero.badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              {t('tourism.hero.title')} <span className="text-[#E29578]">{t('tourism.hero.title2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl">
              {t('tourism.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#E29578] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#006D77] transition-all transform hover:scale-105 shadow-xl active:scale-95">
                Begin Your Journey
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Download Welcome Pack
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why KBMC Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-[#006D77] tracking-tight">
                {t('tourism.why.title')}
              </h2>
              <div className="w-20 h-1.5 bg-[#E29578] rounded-full"></div>
            </div>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              {t('tourism.why.desc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="p-6 bg-[#F8FAFB] rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform text-[#006D77]">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-black text-[#2C3E50] mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80" 
                alt="Concierge" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 hidden md:block max-w-xs">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#006D77] rounded-full flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-black text-[#006D77] text-sm uppercase tracking-widest">Premium Concierge</span>
              </div>
              <p className="text-sm text-gray-500 font-medium">Beyond borders, we provide a healing experience that feels like home.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Flow */}
      <div className="bg-[#EDF6F9] py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-[#006D77] tracking-tight">International Patient Journey</h2>
            <p className="text-gray-500 font-medium">A seamless 5-step process for your medical travel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Inquiry', desc: 'Contact our IPC team with your medical records.' },
              { step: '02', title: 'Consultation', desc: 'Virtual evaluation with our specialists.' },
              { step: '03', title: 'Planning', desc: 'Travel and treatment itinerary finalized.' },
              { step: '04', title: 'Arrival', desc: 'Airport pick-up and concierge check-in.' },
              { step: '05', title: 'Recovery', desc: 'Post-treatment care and travel support.' }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-[#006D77] font-black text-xl border-4 border-[#83C5BE]">
                  {item.step}
                </div>
                <h3 className="text-lg font-black text-[#2C3E50]">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed px-4">{item.desc}</p>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-[#83C5BE]/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="bg-[#006D77] rounded-[4rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight relative z-10">
            Ready to Begin Your <span className="text-[#E29578]">Healing Journey?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto relative z-10">
            Contact our International Patient Centre today for a complimentary evaluation and travel estimate.
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <a href="mailto:ipc@kbmc.com.my" className="bg-white text-[#006D77] px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#E29578] hover:text-white transition-all shadow-2xl">
              Email Our IPC Team
            </a>
            <a href="tel:+6097458000" className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
              Call Concierge
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalTourism;
