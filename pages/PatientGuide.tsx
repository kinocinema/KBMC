
import React, { useEffect, useState } from 'react';
import { Info, Clock, Luggage, Wallet, Users, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const PatientGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header / Hero Banner */}
      <div className="relative bg-[#EDF6F9] py-32 md:py-48 px-4 md:px-8 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Admission%202.png" 
            alt="Admission Background" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40"></div>
        </div>

        <div className={`max-w-5xl mx-auto text-center space-y-6 relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#006D77] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">{t('guide.hero.badge')}</span>
          <h1 className="text-5xl md:text-8xl font-black leading-tight">
            <span className="text-[#006D77]">{t('guide.hero.title')}</span>{' '}
            <span className="text-[#E29578]">{t('guide.hero.title2')}</span>
          </h1>
          <p className="text-base md:text-lg text-[#2C3E50] leading-relaxed font-bold max-w-2xl mx-auto">
            {t('guide.hero.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-20 md:py-32 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-20">
          
          {/* Registry Prep Section */}
          <section className="space-y-12">
            <div className={`flex items-center gap-4 ${isVisible ? 'animate-reveal-left stagger-1' : 'opacity-0'}`}>
              <div className="w-12 h-12 rounded-full bg-[#006D77] flex items-center justify-center text-white shadow-lg">
                <Luggage className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-[#006D77]">{t('guide.registry.title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vital Documents Card */}
              <div className={`bg-white p-8 md:p-10 rounded-[2.5rem] space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
                <h3 className="text-xl font-black text-[#006D77] flex items-center gap-3">
                  <Info className="w-5 h-5 text-[#E29578]" />
                  {t('guide.registry.vital.title')}
                </h3>
                <ul className="space-y-4">
                  {[t('guide.registry.vital.id'), t('guide.registry.vital.gl'), t('guide.registry.vital.records')].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-[#2C3E50] font-bold text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#006D77]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ward Essentials Card */}
              <div className={`bg-white p-8 md:p-10 rounded-[2.5rem] space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
                <h3 className="text-xl font-black text-[#006D77] flex items-center gap-3">
                  <Luggage className="w-5 h-5 text-[#E29578]" />
                  {t('guide.registry.essentials.title')}
                </h3>
                <ul className="space-y-4">
                  {[t('guide.registry.essentials.toiletries'), t('guide.registry.essentials.slippers'), t('guide.registry.essentials.pajamas')].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-[#2C3E50] font-bold text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#006D77]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Financial Security Banner */}
            <div className={`bg-[#006D77] text-white p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row gap-8 items-center shadow-xl relative overflow-hidden ${isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
              <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-sm shrink-0">
                <Wallet className="w-10 h-10 text-[#83C5BE]" />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-black">{t('guide.financial.title')}</h3>
                <p className="text-sm opacity-90 font-medium leading-relaxed">
                  {t('guide.financial.desc')}
                </p>
              </div>
            </div>
          </section>

          {/* Visitor Policy Section */}
          <section className="space-y-12">
            <div className={`flex items-center gap-4 ${isVisible ? 'animate-reveal-left stagger-2' : 'opacity-0'}`}>
              <div className="w-12 h-12 rounded-full bg-[#E29578] flex items-center justify-center text-white shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-[#006D77]">{t('guide.visitor.title')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 space-y-6">
                 {[
                   { title: t('guide.visitor.general.title'), icon: <Clock className="w-6 h-6 text-[#E29578]" />, times: [t('guide.visitor.general.time1'), t('guide.visitor.general.time2')] },
                   { title: t('guide.visitor.icu.title'), icon: <AlertCircle className="w-6 h-6 text-[#006D77]" />, times: [t('guide.visitor.icu.rule1'), t('guide.visitor.icu.rule2')] }
                 ].map((item, idx) => (
                   <div key={idx} className={`flex items-center gap-6 p-8 bg-white border border-gray-50 rounded-[2rem] shadow-sm ${isVisible ? `animate-fade-in-up stagger-${idx+1}` : 'opacity-0'}`}>
                      <div className="p-4 bg-[#F8FAFB] rounded-2xl shrink-0">{item.icon}</div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-[#006D77]">{item.title}</h4>
                        {item.times.map((t, tidx) => (
                          <p key={tidx} className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-tight">{t}</p>
                        ))}
                      </div>
                   </div>
                 ))}
              </div>
              
              {/* Patient Safety Card */}
              <div className={`md:col-span-7 bg-[#E29578]/5 border-l-4 border-[#E29578] p-10 rounded-3xl space-y-4 flex flex-col justify-center ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
                 <h4 className="text-lg font-black text-[#006D77] flex items-center gap-3">
                   <AlertCircle className="w-5 h-5 text-[#E29578]" />
                   {t('guide.visitor.safety.title')}
                 </h4>
                 <p className="text-[#2C3E50]/80 text-sm leading-relaxed font-medium">
                   {t('guide.visitor.safety.desc')}
                 </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           {/* Expert Assistance Card */}
           <div className={`bg-[#2C3E50] text-white p-10 rounded-[3rem] space-y-8 shadow-2xl border border-white/5 ${isVisible ? 'animate-reveal-right stagger-3' : 'opacity-0'}`}>
              <div className="space-y-3">
                <h3 className="text-3xl font-black leading-tight">{t('guide.sidebar.title')}</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">{t('guide.sidebar.desc')}</p>
              </div>
              <div className="space-y-3">
                {[
                  t('guide.sidebar.link.insurance'),
                  t('guide.sidebar.link.rates'),
                  t('guide.sidebar.link.registry'),
                  t('guide.sidebar.link.international')
                ].map((link, idx) => (
                  <a key={idx} href="#" className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                    <span className="font-black uppercase tracking-widest text-[10px] text-white"> {link} </span>
                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
           </div>

           {/* Shariah Accredited Card */}
           <div className={`bg-[#83C5BE]/10 p-10 rounded-[3rem] border border-[#83C5BE]/20 text-center space-y-6 ${isVisible ? 'animate-reveal-right stagger-4' : 'opacity-0'}`}>
              <div className="w-16 h-16 mx-auto bg-[#83C5BE]/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#006D77]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-[#006D77]">{t('guide.sidebar.shariah.title')}</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{t('guide.sidebar.shariah.desc')}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientGuide;
