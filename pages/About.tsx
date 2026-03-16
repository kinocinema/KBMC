
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Award, History, Target, CheckCircle2, HeartPulse, Quote, MapPin, Building2, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    { year: '1997', title: t('about.milestone.1.title'), desc: t('about.milestone.1.desc') },
    { year: '1998', title: t('about.milestone.2.title'), desc: t('about.milestone.2.desc') },
  ];

  const coreValues = [
    { key: 'K', title: 'Kindness', desc: t('about.values.k'), icon: <HeartPulse className="w-6 h-6" /> },
    { key: 'B', title: 'Believability', desc: t('about.values.b'), icon: <ShieldCheck className="w-6 h-6" /> },
    { key: 'M', title: 'Mastery', desc: t('about.values.m'), icon: <Zap className="w-6 h-6" /> },
    { key: 'C', title: 'Care', desc: t('about.values.c'), icon: <CheckCircle2 className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Header */}
      <div className="bg-[#006D77] py-48 px-4 md:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Welcoming.png" 
            alt="KBMC Heritage" 
            className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#006D77]/80 via-[#006D77]/60 to-[#006D77]/80"></div>
        </div>

        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-white/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 slow-spin"></div>
        <div className={`max-w-5xl mx-auto text-center space-y-8 relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm">{t('about.heritage')}</span>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1]">{t('about.hero.title')}</h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium max-w-3xl mx-auto">
            {t('about.hero.desc')}
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="max-w-7xl mx-auto py-32 px-4 md:px-8 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform group ${isVisible ? 'animate-reveal-left stagger-1' : 'opacity-0'}`}>
               <div className="w-20 h-20 bg-[#EDF6F9] rounded-[2rem] flex items-center justify-center text-[#006D77] mb-8 group-hover:bg-[#006D77] group-hover:text-white transition-all">
                 <Target className="w-10 h-10" />
               </div>
               <h2 className="text-4xl font-black text-[#006D77] mb-6">{t('about.vision.title')}</h2>
               <p className="text-xl text-gray-500 font-medium leading-relaxed">
                 {t('about.vision.desc')}
               </p>
            </div>
            <div className={`bg-[#006D77] p-12 rounded-[4rem] shadow-2xl text-white hover:-translate-y-2 transition-transform group ${isVisible ? 'animate-reveal-right stagger-2' : 'opacity-0'}`}>
               <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-[#83C5BE] mb-8 group-hover:bg-[#83C5BE] group-hover:text-white transition-all">
                 <HeartPulse className="w-10 h-10" />
               </div>
               <h2 className="text-4xl font-black mb-6">{t('about.mission.title')}</h2>
               <div className="space-y-6 text-white/80 font-medium leading-relaxed">
                 <p>{t('about.mission.wellbeing')}</p>
                 <p>{t('about.mission.innovation')}</p>
                 <p>{t('about.mission.accessibility')}</p>
                 <p>{t('about.mission.growth')}</p>
               </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl aspect-[3/4]">
              <img 
                src="https://storage.googleapis.com/igc-health/Care%202.png" 
                alt="KBMC Care" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#006D77]/40 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-5xl font-black text-[#006D77]">{t('about.values.title')}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {coreValues.map((val) => (
                <div key={val.key} className="bg-[#EDF6F9] p-8 rounded-[3rem] border border-[#83C5BE]/20 hover:bg-[#006D77] hover:text-white transition-all group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#006D77] mb-6 group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{val.key} - {val.title}</h3>
                  <p className="opacity-80 font-medium">{val.desc}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl aspect-square">
                <img 
                  src="https://storage.googleapis.com/igc-health/Surgical%202.png" 
                  alt="KBMC Excellence" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#006D77]/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-[#F8FAFB] py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-[#006D77]">{t('about.legacy.title')}</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">{t('about.legacy.subtitle')}</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#83C5BE]/20 -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-20 relative z-10">
              {milestones.map((m, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 text-center md:text-left">
                    <div className={`p-10 bg-white rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all ${isVisible ? 'animate-fade-in-up' : ''}`}>
                      <span className="text-4xl font-black text-[#E29578] tracking-tighter mb-2 block">{m.year}</span>
                      <h3 className="text-2xl font-black text-[#006D77] mb-4">{m.title}</h3>
                      <p className="text-gray-500 font-medium leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#006D77] border-4 border-white shadow-xl flex items-center justify-center text-white z-20 shrink-0">
                    <History className="w-6 h-6" />
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Future Growth & Location */}
      <div className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-5xl font-black text-[#006D77]">{t('about.future.title')}</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                {t('about.future.desc')}
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <MapPin className="w-8 h-8" />
              </div>
              <h2 className="text-5xl font-black text-[#006D77]">{t('about.location.title')}</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                {t('about.location.desc')}
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%204.png" 
              alt="KBMC Expansion" 
              className="rounded-[4rem] shadow-2xl w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#E29578] p-12 rounded-[3rem] text-white shadow-2xl hidden md:block">
              <p className="text-4xl font-black leading-none">400+</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2">New Jobs Created</p>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Message Section */}
      <div className="py-32 px-4 md:px-8 bg-[#006D77] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[40px] border-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="aspect-[3/4] rounded-[4rem] overflow-hidden border-8 border-white/20 shadow-2xl">
                  <img 
                    src="https://storage.googleapis.com/igc-health/CEO.png" 
                    alt="CEO Mohd Nazri Yaacob" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[2.5rem] shadow-2xl">
                  <p className="text-[#006D77] font-black text-xl">{t('about.ceo.name')}</p>
                  <p className="text-[#83C5BE] font-bold text-xs uppercase tracking-widest mt-1">{t('about.ceo.title')}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-10">
              <div className="space-y-4">
                <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm">{t('about.ceo.headline')}</span>
                <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">{t('about.ceo.subheadline')}</h2>
              </div>
              <div className="relative">
                <Quote className="absolute -top-10 -left-12 w-24 h-24 text-white/10" />
                <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
                  {t('about.ceo.message')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
