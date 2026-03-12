
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Award, History, Users, Target, CheckCircle2, HeartPulse } from 'lucide-react';
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
    { year: '2005', title: t('about.milestone.2.title'), desc: t('about.milestone.2.desc') },
    { year: '2015', title: t('about.milestone.3.title'), desc: t('about.milestone.3.desc') },
    { year: '2020', title: t('about.milestone.4.title'), desc: t('about.milestone.4.desc') },
  ];

  const leaders = [
    { name: 'Dato\' Dr. Haji Ikhwan', title: 'Chairman & Chief Executive', image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Dr. Sharifah Zaleha', title: 'Medical Director', image: 'https://images.unsplash.com/photo-1605684954998-685c79d6a018?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Haji Wan Muhammad', title: 'Director of Operations', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Header */}
      <div className="bg-[#EDF6F9] py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[#006D77]/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 slow-spin"></div>
        <div className={`max-w-5xl mx-auto text-center space-y-8 relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm">{t('about.heritage')}</span>
          <h1 className="text-6xl md:text-8xl font-black text-[#006D77] leading-[1.1]">{t('about.hero.title')}</h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
            {t('about.hero.desc')}
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="max-w-7xl mx-auto py-32 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className={`bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform group ${isVisible ? 'animate-reveal-left stagger-1' : 'opacity-0'}`}>
           <div className="w-20 h-20 bg-[#EDF6F9] rounded-[2rem] flex items-center justify-center text-[#006D77] mb-8 group-hover:bg-[#006D77] group-hover:text-white transition-all">
             <Target className="w-10 h-10" />
           </div>
           <h2 className="text-4xl font-black text-[#006D77] mb-6">{t('about.vision.title')}</h2>
           <p className="text-xl text-gray-500 font-medium leading-relaxed">
             {t('about.vision.desc')}
           </p>
        </div>
        <div className={`bg-[#2C3E50] p-12 rounded-[4rem] shadow-2xl text-white hover:-translate-y-2 transition-transform group ${isVisible ? 'animate-reveal-right stagger-2' : 'opacity-0'}`}>
           <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-[#83C5BE] mb-8 group-hover:bg-[#83C5BE] group-hover:text-white transition-all">
             <HeartPulse className="w-10 h-10" />
           </div>
           <h2 className="text-4xl font-black mb-6">{t('about.mission.title')}</h2>
           <p className="text-xl text-gray-300 font-medium leading-relaxed opacity-80">
             {t('about.mission.desc')}
           </p>
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
            {/* Timeline Line */}
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

      {/* Certifications */}
      <div className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-5xl font-black text-[#006D77] leading-tight">{t('about.accredited.title')}</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              {t('about.accredited.desc')}
            </p>
            <div className="pt-6 space-y-4">
              {[
                'MSQH 5th Edition Accredited',
                'Halal Certified Catering',
                'Kementerian Kesihatan Malaysia (KKM) Licensed',
                'ISO 9001:2015 Standards'
              ].map((c) => (
                <div key={c} className="flex items-center gap-4 text-[#006D77] font-bold">
                  <CheckCircle2 className="w-6 h-6 text-[#E29578]" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
            <div className="bg-[#EDF6F9] p-12 rounded-[4rem] text-center space-y-6 group hover:bg-[#006D77] transition-all cursor-default">
              <Award className="w-20 h-20 mx-auto text-[#006D77] group-hover:text-white transition-colors" />
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-[#006D77] group-hover:text-white">MSQH</h4>
                <p className="text-xs uppercase font-black text-gray-400 group-hover:text-[#83C5BE]">Clinical Safety Excellence</p>
              </div>
            </div>
            <div className="bg-[#EDF6F9] p-12 rounded-[4rem] text-center space-y-6 group hover:bg-[#E29578] transition-all cursor-default">
              <ShieldCheck className="w-20 h-20 mx-auto text-[#006D77] group-hover:text-white transition-colors" />
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-[#006D77] group-hover:text-white">Ibadah Friendly</h4>
                <p className="text-xs uppercase font-black text-gray-400 group-hover:text-white/60">Shariah-Compliant Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="py-32 px-4 md:px-8 bg-[#2C3E50]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <div className="space-y-4">
             <h2 className="text-5xl font-black text-white">{t('about.leadership.title')}</h2>
             <p className="text-[#83C5BE] font-bold uppercase tracking-widest text-sm">{t('about.leadership.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            {leaders.map((leader, i) => (
              <div key={i} className="group relative">
                 <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-700">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    />
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 text-white text-left translate-y-4 group-hover:translate-y-0 transition-all">
                    <h4 className="text-2xl font-bold">{leader.name}</h4>
                    <p className="text-xs font-black uppercase tracking-widest text-[#83C5BE]">{leader.title}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
