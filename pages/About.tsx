
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Award, History, Target, CheckCircle2, HeartPulse, Quote, MapPin, Building2, Zap, Users, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const milestones = [
    { year: '1997', title: t('about.milestone.1.title'), desc: t('about.milestone.1.desc') },
    { year: '1998', title: t('about.milestone.2.title'), desc: t('about.milestone.2.desc') },
  ];

  const coreValues = [
    { key: 'K', title: t('about.values.k.title'), desc: t('about.values.k'), icon: <HeartPulse className="w-6 h-6" /> },
    { key: 'B', title: t('about.values.b.title'), desc: t('about.values.b'), icon: <ShieldCheck className="w-6 h-6" /> },
    { key: 'M', title: t('about.values.m.title'), desc: t('about.values.m'), icon: <Zap className="w-6 h-6" /> },
    { key: 'C', title: t('about.values.c.title'), desc: t('about.values.c'), icon: <CheckCircle2 className="w-6 h-6" /> },
  ];


  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Header */}
      <div className="bg-[#006D77] py-48 px-4 md:px-8 relative overflow-hidden">
        {/* Background Image - New Hospital Building */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" 
            alt="KBMC New Hospital Building" 
            className="w-full h-full object-cover opacity-40"
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

      {/* CEO Message Section */}
      <div id="ceo-message" className="py-32 px-4 md:px-8 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="aspect-[3/4] rounded-[4rem] overflow-hidden border-8 border-[#EDF6F9] shadow-2xl">
                  <img 
                    src="https://storage.googleapis.com/igc-health/CEO.png" 
                    alt="CEO Mohd Nazri Yaacob" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#006D77] p-8 rounded-[2.5rem] shadow-2xl">
                  <p className="text-white font-black text-xl">{t('about.ceo.name')}</p>
                  <p className="text-[#83C5BE] font-bold text-xs uppercase tracking-widest mt-1">{t('about.ceo.title')}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-10">
              <div className="space-y-4">
                <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm">{t('about.ceo.headline')}</span>
                <h2 className="text-5xl md:text-6xl font-black text-[#006D77] leading-tight">{t('about.ceo.subheadline')}</h2>
              </div>
              <div className="relative">
                <Quote className="absolute -top-10 -left-12 w-24 h-24 text-[#006D77]/5" />
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic">
                    {t('about.ceo.p1')}
                  </p>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic">
                    {t('about.ceo.p2')}
                  </p>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic">
                    {t('about.ceo.p3')}
                  </p>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic">
                    {t('about.ceo.p4')}
                  </p>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic">
                    {t('about.ceo.p5')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Vision & Mission */}
      <div id="vision-mission" className="max-w-7xl mx-auto py-32 px-4 md:px-8 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className={`lg:col-span-5 bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform group flex flex-col justify-start ${isVisible ? 'animate-reveal-left stagger-1' : 'opacity-0'}`}>
               <div className="w-20 h-20 bg-[#EDF6F9] rounded-[2rem] flex items-center justify-center text-[#006D77] mb-10 group-hover:bg-[#006D77] group-hover:text-white transition-all">
                 <Target className="w-10 h-10" />
               </div>
               <h2 className="text-5xl font-black text-[#006D77] mb-8">{t('about.vision.title')}</h2>
               <p className="text-2xl text-gray-500 font-medium leading-relaxed">
                 {t('about.vision.desc')}
               </p>
            </div>
            <div className={`lg:col-span-7 bg-[#006D77] p-12 rounded-[4rem] shadow-2xl text-white hover:-translate-y-2 transition-transform group flex flex-col justify-start ${isVisible ? 'animate-reveal-right stagger-2' : 'opacity-0'}`}>
               <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-[#83C5BE] mb-8 group-hover:bg-[#83C5BE] group-hover:text-white transition-all">
                 <HeartPulse className="w-10 h-10" />
               </div>
               <h2 className="text-4xl font-black mb-8">{t('about.mission.title')}</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('about.mission.wellbeing.title')}</h3>
                   <p className="text-white/80 font-medium leading-relaxed">{t('about.mission.wellbeing.desc')}</p>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('about.mission.innovation.title')}</h3>
                   <p className="text-white/80 font-medium leading-relaxed">{t('about.mission.innovation.desc')}</p>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('about.mission.accessibility.title')}</h3>
                   <p className="text-white/80 font-medium leading-relaxed">{t('about.mission.accessibility.desc')}</p>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">{t('about.mission.growth.title')}</h3>
                   <p className="text-white/80 font-medium leading-relaxed">{t('about.mission.growth.desc')}</p>
                 </div>
               </div>
            </div>
        </div>

        {/* Core Values */}
        <motion.div 
          id="core-values" 
          className="max-w-4xl mx-auto py-24 px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative bg-gradient-to-br from-[#EDF6F9] via-white to-[#EDF6F9]/50 p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] shadow-[0_30px_100px_rgba(0,109,119,0.08)] border border-white overflow-hidden group">
            {/* Decorative Background Text */}
            <div className="absolute -right-12 -bottom-12 text-[15rem] md:text-[20rem] font-black text-[#006D77]/[0.02] select-none pointer-events-none leading-none">
              KBMC
            </div>
            
            <motion.h2 
              className="text-4xl md:text-8xl font-black text-[#006D77] mb-12 md:text-16 tracking-tighter relative z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('about.values.title')}
            </motion.h2>
            
            <div className="space-y-8 md:space-y-10 relative z-10">
              {coreValues.map((val, idx) => (
                <motion.div 
                  key={val.key} 
                  className="flex items-start gap-4 md:gap-6 text-xl md:text-4xl group/item p-2 md:p-4 -ml-2 md:-ml-4 rounded-3xl hover:bg-white/60 hover:shadow-xl hover:shadow-[#006D77]/5 transition-all duration-500"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#006D77] to-[#83C5BE] font-black min-w-[1.5rem] md:min-w-[2.5rem] group-hover/item:scale-110 transition-transform duration-500">
                      {val.key}
                    </span>
                    <div className="h-px w-4 md:w-8 bg-gray-200 group-hover/item:w-12 group-hover/item:bg-[#E29578] transition-all duration-500 mt-1"></div>
                  </div>
                  
                  <div className="space-y-1 md:space-y-2 min-w-0">
                    <p className="text-[#2C3E50] font-black leading-tight group-hover/item:text-[#006D77] transition-colors duration-500 break-words">
                      {val.title}
                    </p>
                    <p className="text-[#546E7A] text-base md:text-xl font-medium leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity duration-500">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div id="history" className="bg-[#F8FAFB] py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-[#006D77]">{t('about.legacy.title')}</h2>
            <p className="text-gray-500 font-medium text-xl max-w-3xl mx-auto">{t('about.legacy.subtitle')}</p>
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
      <div id="location-direction" className="py-32 px-4 md:px-8 bg-white">
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
              <div className="pt-4">
                <Link 
                  to="/contact-us#location-direction" 
                  className="inline-flex items-center gap-3 bg-[#006D77] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#E29578] transition-all group shadow-lg"
                >
                  {t('nav.contact')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
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
              <p className="text-4xl font-black leading-none">{t('about.future.jobs.count')}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2">{t('about.future.jobs.label')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Message Section - MOVED UP */}

      {/* Careers Section */}
      <div id="careers" className="py-32 px-4 md:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[#E29578] font-black uppercase tracking-[0.4em] text-sm">{t('careers.hero.badge')}</span>
                <h2 className="text-5xl md:text-7xl font-black text-[#006D77] leading-tight">{t('about.careers.title')}</h2>
              </div>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                {t('careers.hero.desc')}
              </p>
              <div className="bg-[#EDF6F9]/50 p-10 rounded-[3rem] border border-[#83C5BE]/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006D77]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <p className="text-lg text-[#2C3E50] font-bold leading-relaxed italic relative z-10">
                  "{t('careers.philosophy')}"
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#EDF6F9] p-8 rounded-[2.5rem] border border-[#83C5BE]/20">
                  <h3 className="text-xl font-black text-[#006D77] mb-2">{t('careers.hiring.title')}</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">{t('careers.hiring.medical')}</p>
                </div>
                <div className="bg-[#EDF6F9] p-8 rounded-[2.5rem] border border-[#83C5BE]/20">
                  <h3 className="text-xl font-black text-[#006D77] mb-2">{t('careers.apply.how')}</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">{t('careers.apply.desc')}</p>
                </div>
              </div>
              <div className="pt-6">
                <Link 
                  to="/careers#current-opportunities" 
                  className="inline-flex items-center gap-4 bg-[#E29578] text-white px-10 py-5 rounded-full font-black text-lg hover:bg-[#006D77] transition-all group shadow-xl hover:shadow-2xl"
                >
                  {t('careers.opp.available')}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl bg-[#EDF6F9] flex items-center justify-center">
                <img 
                  src="https://storage.googleapis.com/igc-health/Career%20Growth%203.jpeg" 
                  alt="KBMC Careers" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=2070";
                  }}
                />
              </div>
              <div className="absolute -top-10 -left-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 hidden md:block">
                <Users className="w-12 h-12 text-[#006D77] mb-4" />
                <p className="text-3xl font-black text-[#006D77] leading-none">{t('about.future.jobs.count')}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{t('about.future.jobs.label')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Directory, Operating Hours, Parking */}
      <div id="directory" className="bg-[#F8FAFB] py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Hospital Directory */}
          <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-8">
            <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-[#006D77]">{t('contact.directory.title')}</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-bold">{t('contact.directory.registry')}</span>
                <span className="text-[#006D77] font-black">+609 745 8000</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-bold">{t('contact.directory.ae')}</span>
                <span className="text-[#006D77] font-black">{t('about.directory.ext')} 8111</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-bold">{t('about.directory.admission')}</span>
                <span className="text-[#006D77] font-black">{t('about.directory.ext')} 8022</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-bold">{t('about.directory.pharmacy')}</span>
                <span className="text-[#006D77] font-black">{t('about.directory.ext')} 8033</span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-[#006D77] p-12 rounded-[4rem] shadow-2xl text-white space-y-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[#83C5BE]">
              <Clock className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black">{t('contact.hours.title')}</h2>
            <div className="space-y-6 text-white/80 font-medium">
              <div>
                <p className="text-[#83C5BE] font-black uppercase tracking-widest text-xs">{t('about.hours.ae.label')}</p>
                <p className="text-xl">{t('contact.hours.ae')}</p>
              </div>
              <div>
                <p className="text-[#83C5BE] font-black uppercase tracking-widest text-xs">{t('about.hours.clinics.label')}</p>
                <p className="text-xl">{t('contact.hours.clinics')}</p>
              </div>
            </div>
          </div>

          {/* Parking & Facility */}
          <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-8">
            <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
              <MapPin className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-[#006D77]">{t('contact.facility.title')}</h2>
            <div className="space-y-6 text-gray-500 font-medium">
              <div className="space-y-4">
                <p><strong className="text-[#006D77]">{t('about.facility.parking.label')}:</strong> {t('contact.parking.desc')}</p>
                <Link 
                  to="/contact-us#parking-info" 
                  className="inline-flex items-center gap-2 text-[#006D77] font-black uppercase tracking-widest text-[10px] hover:text-[#E29578] transition-colors group"
                >
                  {t('menu.PARKING INFO')}
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p><strong className="text-[#006D77]">{t('about.facility.blockA.label')}:</strong> {t('contact.facility.a.desc')}</p>
              <p><strong className="text-[#006D77]">{t('about.facility.blockB.label')}:</strong> {t('contact.facility.b.desc')}</p>
              <p><strong className="text-[#006D77]">{t('about.facility.blockC.label')}:</strong> {t('contact.facility.c.desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Careers & Contact Links */}
      <div className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="/careers" className="group bg-[#EDF6F9] p-12 rounded-[4rem] border border-[#83C5BE]/20 hover:bg-[#006D77] transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-[#006D77] group-hover:text-white transition-colors">{t('about.careers.title')}</h3>
                <p className="text-gray-500 group-hover:text-white/70 transition-colors">{t('about.careers.desc')}</p>
              </div>
              <ArrowRight className="w-10 h-10 text-[#006D77] group-hover:text-white transition-all group-hover:translate-x-2" />
            </div>
          </a>
          <a href="/contact-us" className="group bg-[#EDF6F9] p-12 rounded-[4rem] border border-[#83C5BE]/20 hover:bg-[#E29578] transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-[#006D77] group-hover:text-white transition-colors">{t('nav.contact')}</h3>
                <p className="text-gray-500 group-hover:text-white/70 transition-colors">{t('about.contact.desc')}</p>
              </div>
              <ArrowRight className="w-10 h-10 text-[#006D77] group-hover:text-white transition-all group-hover:translate-x-2" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
