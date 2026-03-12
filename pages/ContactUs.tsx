
import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const ContactUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white pb-32 overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Themed Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Contact%20Us.png" 
            alt="KBMC Contact Header" 
            className="w-full h-full object-cover"
          />
          {/* Cyan/Teal Overlay - Stronger multiply effect to match image */}
          <div className="absolute inset-0 bg-[#006D77]/75 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#006D77]/10 to-[#006D77]/30"></div>
        </div>

        {/* Content Overlay */}
        <div className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[#83C5BE] font-bold uppercase tracking-[0.5em] text-[10px] drop-shadow-sm">{t('contact.hero.badge')}</p>
          <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tight">
            {t('contact.hero.title')} <span className="text-[#E29578] italic">{t('contact.hero.title2')}</span>
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium max-w-xl mx-auto">
            {t('contact.hero.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Hospital Directory */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('contact.directory.title')}</h2>
            <div className="space-y-4">
               {[
                 { icon: <Phone className="text-[#E29578] w-5 h-5" />, label: t('contact.directory.registry'), value: '+609 747 7000' },
                 { icon: <Mail className="text-[#E29578] w-5 h-5" />, label: t('contact.directory.inquiry'), value: 'info@kbmc.com.my' },
                 { icon: <MapPin className="text-[#E29578] w-5 h-5" />, label: t('contact.directory.location'), value: t('contact.directory.location.value') },
                 { icon: <Clock className="text-[#E29578] w-5 h-5" />, label: t('contact.directory.ae'), value: t('contact.directory.open24') }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-6 p-5 bg-[#F8FAFB] rounded-[2.5rem] border border-gray-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">{item.icon}</div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">{item.label}</p>
                       <p className="text-base font-bold text-[#2C3E50] leading-tight mt-1">{item.value}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Find Us on Maps Card */}
          <div className="bg-[#006D77] p-10 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-[#006D77]/20">
             <h3 className="text-2xl font-black tracking-tight">{t('contact.maps.title')}</h3>
             <div className="aspect-[16/10] bg-white/10 rounded-[2.5rem] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-30 grayscale"
                  alt="Map Placeholder"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <button className="bg-white text-[#006D77] px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform active:scale-95">
                     {t('contact.maps.nav')}
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Send a Message Form */}
        <div className="lg:col-span-7">
           <div className="bg-white p-12 md:p-16 rounded-[4.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.06)] border border-gray-50/50 space-y-12">
              <div className="space-y-4">
                 <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('contact.form.title')}</h2>
                 <p className="text-base text-gray-400 font-medium leading-relaxed">{t('contact.form.desc')}</p>
              </div>

              {submitted ? (
                <div className="py-20 text-center space-y-6 animate-fade-in-up">
                   <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                   </div>
                   <h3 className="text-3xl font-black text-[#006D77]">{t('contact.form.success.title')}</h3>
                   <p className="text-gray-500 font-medium">{t('contact.form.success.desc')}</p>
                   <button onClick={() => setSubmitted(false)} className="bg-[#EDF6F9] text-[#006D77] px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#006D77] hover:text-white transition-all">{t('contact.form.success.another')}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-5">{t('contact.form.name')}</label>
                         <input required type="text" className="w-full bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-2xl px-8 py-5 font-bold outline-none transition-all text-sm" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-5">{t('contact.form.email')}</label>
                         <input required type="email" className="w-full bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-2xl px-8 py-5 font-bold outline-none transition-all text-sm" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-5">{t('contact.form.subject')}</label>
                      <div className="relative">
                        <select className="w-full bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-2xl px-8 py-5 font-bold outline-none transition-all appearance-none text-sm cursor-pointer">
                           <option>{t('contact.form.subject.general')}</option>
                           <option>{t('contact.form.subject.booking')}</option>
                           <option>{t('contact.form.subject.billing')}</option>
                           <option>{t('contact.form.subject.careers')}</option>
                        </select>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-5">{t('contact.form.message')}</label>
                      <textarea required rows={5} className="w-full bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-[2.5rem] px-8 py-6 font-bold outline-none transition-all resize-none text-sm"></textarea>
                   </div>
                   <button type="submit" className="w-full bg-[#006D77] text-white py-6 rounded-full font-black text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:bg-[#005a63] transition-all shadow-2xl shadow-[#006D77]/20 active:scale-[0.98]">
                      <Send className="w-5 h-5" />
                      {t('contact.form.submit')}
                   </button>
                </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
