
import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, Navigation, Car, ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../firebaseErrors';

const ContactUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'settings/global');
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white pb-32 overflow-hidden relative">
      {/* 1. Emergency Header - Red Box */}
      <div className="bg-red-600 py-4 px-4 md:px-8 text-center relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-white">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 animate-pulse" />
              </div>
              <span className="font-black uppercase tracking-widest text-sm">{t('contact.directory.ae')}</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <a href={`tel:${settings?.emergencyPhone?.replace(/\s+/g, '') || '+6097439999'}`} className="text-2xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform">
                {settings?.emergencyPhone || '+60 9-743 9999'}
              </a>
              <span className="text-2xl md:text-3xl font-black tracking-tighter hidden md:inline">/</span>
              <a href="tel:+60199433599" className="text-2xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform">
                +60 19-943 3599
              </a>
            </div>
          </div>
          <p className="text-sm md:text-base font-medium opacity-90">Our trauma team is standing by to provide immediate care.</p>
        </div>
      </div>

      {/* Hero Section - Minimal */}
      <div className="bg-[#006D77] py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className={`max-w-7xl mx-auto text-center space-y-4 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-xs">{t('contact.hero.badge')}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            {t('contact.hero.title')} <span className="text-[#E29578]">{t('contact.hero.title2')}</span>
          </h1>
        </div>
      </div>

      {/* 2. Interactive Map Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="h-[400px] md:h-[500px] relative">
            <iframe 
              src="https://maps.google.com/maps?q=Kota%20Bharu%20Medical%20Centre&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1]"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="KBMC Location Map"
            ></iframe>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
              <a 
                href="https://www.google.com/maps/dir//Kota+Bharu+Medical+Centre,+Lot+179+%26+184,+Seksyen+25,+Jalan+Sultan+Yahya+Petra,+Lundang,+15150+Kota+Bharu,+Kelantan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#006D77] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 hover:bg-[#005a63] transition-all transform hover:-translate-y-1 active:scale-95 w-full"
              >
                <Navigation className="w-5 h-5" />
                {t('contact.maps.nav')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Facility Guide - 3-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('contact.facility.title')}</h2>
          <div className="w-20 h-1.5 bg-[#E29578] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column A */}
          <div className="bg-[#F8FAFB] p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-[#006D77]">A</span>
            </div>
            <h3 className="text-xl font-black text-[#2C3E50] mb-4">{t('contact.facility.a.title')}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{t('contact.facility.a.desc')}</p>
          </div>
          {/* Column B */}
          <div className="bg-[#F8FAFB] p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-[#006D77]">B</span>
            </div>
            <h3 className="text-xl font-black text-[#2C3E50] mb-4">{t('contact.facility.b.title')}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{t('contact.facility.b.desc')}</p>
          </div>
          {/* Column C */}
          <div className="bg-[#F8FAFB] p-10 rounded-[3rem] border border-gray-100 hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-[#006D77]">C</span>
            </div>
            <h3 className="text-xl font-black text-[#2C3E50] mb-4">{t('contact.facility.c.title')}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{t('contact.facility.c.desc')}</p>
          </div>
        </div>
      </div>

      {/* Sub-page Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24 pb-24">
        {/* LOCATION & DIRECTION */}
        <div id="location-direction" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[#E29578] font-black uppercase tracking-[0.3em] text-[10px]">{t('contact.directory.location')}</span>
              <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('contact.location.title')}</h2>
            </div>
            <div className="flex gap-6 p-8 bg-[#F8FAFB] rounded-[3rem] border border-gray-50">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <MapPin className="text-[#E29578] w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-[#2C3E50] leading-relaxed">
                {t('contact.directory.location.value')}
              </p>
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" 
              alt="KBMC Exterior" 
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* PARKING INFO */}
        <div id="parking-info" className="bg-[#EDF6F9] p-12 md:p-16 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#006D77]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Car className="text-[#006D77] w-7 h-7" />
                </div>
                <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('contact.parking.title')}</h2>
              </div>
              <p className="text-xl font-bold text-[#2C3E50] leading-relaxed max-w-xl">
                {t('contact.parking.desc')}
              </p>
              <div className="pt-4">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Kota+Bharu+Medical+Centre" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#006D77] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#E29578] transition-all group shadow-lg"
                >
                  {t('contact.maps.nav')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Kota+Bharu+Medical+Centre" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-[3rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 group"
              >
                <div className="bg-[#006D77] text-white px-12 py-8 rounded-[2.5rem] text-center space-y-1 min-w-[280px] group-hover:bg-[#E29578] transition-colors">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">{t('contact.parking.status.label')}</p>
                  <p className="text-4xl font-black tracking-tight">{t('contact.parking.status.value')}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* OPERATING HOURS */}
        <div id="operating-hours" className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[#E29578] font-black uppercase tracking-[0.3em] text-[10px]">{t('contact.hours.title')}</span>
              <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('contact.hours.title')}</h2>
            </div>
            <div className="space-y-6">
              <div className="p-8 bg-[#F8FAFB] rounded-[3rem] border border-gray-50 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Clock className="text-red-600 w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-[#2C3E50]">{t('contact.hours.ae.label')}</h3>
                </div>
                <p className="text-2xl font-black text-red-600">{t('contact.hours.ae.value')}</p>
              </div>
              <div className="p-8 bg-[#F8FAFB] rounded-[3rem] border border-gray-50 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#006D77]/10 rounded-xl flex items-center justify-center">
                    <Clock className="text-[#006D77] w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-[#2C3E50]">{t('contact.hours.clinics.label')}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="font-bold text-gray-500">{t('contact.hours.clinics.sun_thu')}</span>
                    <span className="font-black text-[#006D77]">{t('contact.hours.clinics.sun_thu_time')}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="font-bold text-gray-500">{t('contact.hours.clinics.fri')}</span>
                    <span className="font-black text-red-500">{t('contact.hours.clinics.fri_time')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-500">{t('contact.hours.clinics.sat')}</span>
                    <span className="font-black text-[#006D77]">{t('contact.hours.clinics.sat_time')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form remains at the bottom right as per previous design but integrated */}
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
