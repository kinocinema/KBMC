
import React, { useEffect, useState } from 'react';
import { Bed, Check, Info, Sparkles, Coffee, Tv, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const RoomRates: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const rooms = [
    {
      name: t('rooms.executive.title'),
      price: 'RM 450.00',
      description: t('rooms.executive.desc'),
      features: [
        t('rooms.feature.lounge'), 
        t('rooms.feature.minibar'), 
        t('rooms.feature.prayer'), 
        t('rooms.feature.nurse'), 
        t('rooms.feature.tv'), 
        t('rooms.feature.companion')
      ],
      popular: true,
      color: '#006D77'
    },
    {
      name: t('rooms.single.title'),
      price: 'RM 250.00',
      description: t('rooms.single.desc'),
      features: [
        t('rooms.feature.bathroom'), 
        t('rooms.feature.tv'), 
        t('rooms.feature.fridge'), 
        t('rooms.feature.guest')
      ],
      popular: false,
      color: '#E29578'
    },
    {
      name: t('rooms.double.title'),
      price: 'RM 150.00',
      description: t('rooms.double.desc'),
      features: [
        t('rooms.feature.partition'), 
        t('rooms.feature.tv'), 
        t('rooms.feature.bathroom'), 
        t('rooms.feature.table')
      ],
      popular: false,
      color: '#83C5BE'
    },
    {
      name: t('rooms.quad.title'),
      price: 'RM 100.00',
      description: t('rooms.quad.desc'),
      features: [
        t('rooms.feature.aircon'), 
        t('rooms.feature.care'), 
        t('rooms.feature.bathroom'), 
        t('rooms.feature.support')
      ],
      popular: false,
      color: '#2C3E50'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden pb-32">
      {/* Header / Hero Banner */}
      <div className="relative bg-[#EDF6F9] py-32 md:py-48 px-4 md:px-8 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Luxury%20Suite%202.png" 
            alt="Luxury Suite Background" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40"></div>
        </div>

        <div className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#006D77] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">{t('rooms.hero.badge')}</span>
          <h1 className="text-6xl md:text-9xl font-black leading-tight">
            <span className="text-[#006D77]">{t('rooms.hero.title')}</span>{' '}
            <span className="text-[#E29578]">{t('rooms.hero.title2')}</span>
          </h1>
          <p className="text-base md:text-lg text-[#2C3E50] leading-relaxed font-bold max-w-2xl mx-auto">
            {t('rooms.hero.desc')}
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {rooms.map((room, idx) => (
            <div 
              key={room.name} 
              className={`bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col hover:translate-y-[-8px] transition-all duration-500 relative ${isVisible ? `animate-fade-in-up stagger-${idx+1}` : 'opacity-0'}`}
            >
              {room.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#006D77] text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 z-30 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  {t('rooms.preferred')}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-black text-[#2C3E50] mb-2">{room.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black" style={{ color: room.color }}>{room.price}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ {t('rooms.day')}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-8 flex-grow font-medium">{room.description}</p>
              <div className="space-y-3 mb-10">
                {room.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-[11px] font-bold text-[#006D77]">
                    <Check className="w-3.5 h-3.5 shrink-0 text-[#E29578]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 rounded-2xl bg-[#EDF6F9] text-[#006D77] font-black text-[10px] uppercase tracking-widest hover:bg-[#006D77] hover:text-white transition-all shadow-sm">
                {t('rooms.availability')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Refined Healing Spaces Section */}
      <section className="mt-32 md:mt-48 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className={`space-y-10 md:space-y-12 ${isVisible ? 'animate-reveal-left' : ''}`}>
           <div className="space-y-6">
             <span className="text-[#006D77] font-black uppercase tracking-widest text-[10px] md:text-xs">{t('rooms.facilities.badge')}</span>
             <h2 className="text-5xl md:text-7xl font-black leading-tight">
               <span className="text-[#006D77]">{t('rooms.facilities.title')}</span>{' '}
               <span className="text-[#E29578]">{t('rooms.facilities.title2')}</span>
             </h2>
             <p className="text-base md:text-lg text-[#2C3E50]/70 leading-relaxed font-medium max-w-xl">
               {t('rooms.facilities.desc')}
             </p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { icon: <Coffee className="w-5 h-5" />, text: t('rooms.facilities.catering') },
                { icon: <ShieldCheck className="w-5 h-5" />, text: t('rooms.facilities.security') },
                { icon: <Tv className="w-5 h-5" />, text: t('rooms.facilities.entertainment') },
                { icon: <Bed className="w-5 h-5" />, text: t('rooms.facilities.companion') }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#EDF6F9] flex items-center justify-center text-[#006D77] group-hover:bg-[#E29578] group-hover:text-white transition-all shadow-inner">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-[#2C3E50] group-hover:text-[#006D77] transition-colors uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
           </div>
        </div>
        <div className={`relative ${isVisible ? 'animate-reveal-right' : ''}`}>
           <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl group">
             <img 
              src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%204.png" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
              alt="Hospital Interior"
              referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#006D77]/20 to-transparent"></div>
           </div>
           
           {/* Floating Info Card */}
           <div className="absolute -bottom-6 md:-bottom-10 -left-4 md:-left-10 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-50 max-w-[240px] md:max-w-xs z-20 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#E29578]/10 flex items-center justify-center shrink-0">
                <Info className="text-[#E29578] w-5 h-5" />
              </div>
              <p className="text-[11px] md:text-xs font-bold text-[#006D77] leading-relaxed">
                {t('rooms.facilities.note')}
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default RoomRates;
