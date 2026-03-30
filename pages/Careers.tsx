
import React, { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, Heart, Users, ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Careers: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    { title: t('careers.work.progression'), icon: <GraduationCap className="w-6 h-6" /> },
    { title: t('careers.work.workspace'), icon: <Briefcase className="w-6 h-6" /> },
    { title: t('careers.work.benefits'), icon: <Heart className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="bg-[#006D77] py-48 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Career%20Growth%203.jpeg" 
            alt="KBMC Careers Hero" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=2070";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#006D77]/80 via-[#006D77]/60 to-[#006D77]/80"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm animate-fade-in">{t('careers.hero.badge')}</span>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] animate-reveal-up">{t('careers.hero.title')}</h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium max-w-3xl mx-auto animate-reveal-up stagger-1">
            {t('careers.hero.desc')}
          </p>
        </div>
      </div>

      {/* Our Philosophy */}
      <div className="py-24 px-4 md:px-8 bg-[#EDF6F9]/30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-xl border border-[#83C5BE]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#006D77]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4 text-[#006D77]">
                <div className="w-12 h-1 w-12 bg-[#006D77] rounded-full"></div>
                <span className="font-black uppercase tracking-[0.3em] text-sm">Our Philosophy</span>
              </div>
              <p className="text-2xl md:text-3xl text-[#2C3E50] font-bold leading-relaxed italic">
                "{t('careers.philosophy')}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-[#006D77]">{t('careers.why.title')}</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#EDF6F9] rounded-xl flex items-center justify-center text-[#006D77] shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">{t('careers.why.env')}</p>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#EDF6F9] rounded-xl flex items-center justify-center text-[#006D77] shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">{t('careers.why.impact')}</p>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#EDF6F9] rounded-xl flex items-center justify-center text-[#006D77] shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">{t('careers.why.dev')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <img src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%201.png" className="rounded-[3rem] shadow-xl w-full aspect-square object-cover" referrerPolicy="no-referrer" />
              <img src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%202.png" className="rounded-[3rem] shadow-xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-6 pt-12">
              <img src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%203.png" className="rounded-[3rem] shadow-xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
              <img src="https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%204.png" className="rounded-[3rem] shadow-xl w-full aspect-square object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Categories */}
      <div className="bg-[#F8FAFB] py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-[#006D77]">{t('careers.hiring.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-6 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#006D77]">{t('careers.hiring.medical').split(':')[0]}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{t('careers.hiring.medical').split(':')[1]}</p>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-6 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#006D77]">{t('careers.hiring.allied').split(':')[0]}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{t('careers.hiring.allied').split(':')[1]}</p>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-6 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#006D77]">{t('careers.hiring.support').split(':')[0]}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{t('careers.hiring.support').split(':')[1]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Apply */}
      <div className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-[#006D77]">{t('careers.apply.how')}</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              {t('careers.apply.desc')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a 
              href="mailto:hr@kbmc.com" 
              className="flex items-center justify-center gap-4 bg-[#EDF6F9] p-8 rounded-[3rem] border border-[#83C5BE]/20 hover:bg-[#006D77] hover:text-white transition-all group"
            >
              <Mail className="w-6 h-6" />
              <span className="font-black">Email HR Department</span>
            </a>
            <a 
              href="https://www.jobstreet.com.my/en/job-search/kota-bharu-medical-centre-jobs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-[#EDF6F9] p-8 rounded-[3rem] border border-[#83C5BE]/20 hover:bg-[#E29578] hover:text-white transition-all group"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="font-black">View on JobStreet</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;

import { HeartPulse, Zap } from 'lucide-react';
