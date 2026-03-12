
import React, { useEffect, useState } from 'react';
import { Briefcase, Users, Heart, Star, ChevronRight, GraduationCap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Careers: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const jobs = [
    { title: 'Registered Nurse (O&G)', dept: 'Clinical Operations', type: 'Full-Time' },
    { title: 'Consultant Radiologist', dept: 'Imaging & Diagnostics', type: 'Full-Time' },
    { title: 'Front Desk Concierge', dept: 'Customer Relations', type: 'Contract' },
    { title: 'Clinical Pharmacist', dept: 'Pharmacy', type: 'Full-Time' }
  ];

  return (
    <div className="min-h-screen bg-white pb-32 overflow-hidden">
      <div className="bg-[#EDF6F9] py-32 px-4 md:px-8 relative">
        <div className={`max-w-4xl mx-auto text-center space-y-8 relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm">{t('careers.hero.badge')}</span>
          <h1 className="text-6xl md:text-8xl font-black text-[#006D77] leading-[1.1]">{t('careers.hero.title')}</h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            {t('careers.hero.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4 space-y-12">
           <div className="space-y-6">
              <h2 className="text-4xl font-black text-[#006D77]">{t('careers.balance.title')}</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                {t('careers.balance.desc')}
              </p>
           </div>
           <div className="space-y-4">
              {[
                { icon: <Heart className="text-[#E29578]" />, text: t('careers.benefit.medical') },
                { icon: <GraduationCap className="text-[#E29578]" />, text: t('careers.benefit.training') },
                { icon: <Users className="text-[#E29578]" />, text: t('careers.benefit.culture') },
                { icon: <Star className="text-[#E29578]" />, text: t('careers.benefit.bonus') }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-[#F8FAFB] rounded-2xl border border-gray-50">
                   <div className="p-3 bg-white rounded-xl shadow-sm">{item.icon}</div>
                   <span className="font-bold text-[#006D77]">{item.text}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-8">
           <div className="space-y-8">
              <div className="flex items-center justify-between">
                 <h2 className="text-3xl font-black text-[#006D77]">{t('careers.opp.title')}</h2>
                 <span className="text-xs font-black uppercase tracking-widest text-gray-400">{jobs.length} {t('careers.opp.available')}</span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                 {jobs.map((job, idx) => (
                   <div key={idx} className={`bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all group cursor-pointer ${isVisible ? `animate-fade-in-up stagger-${idx+1}` : 'opacity-0'}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="space-y-2">
                            <h3 className="text-2xl font-black text-[#2C3E50] group-hover:text-[#006D77] transition-colors">{job.title}</h3>
                            <div className="flex items-center gap-4">
                               <span className="text-xs font-black uppercase tracking-widest text-[#83C5BE]">{job.dept}</span>
                               <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{job.type}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-[#E29578] font-black uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                            {t('careers.apply')}
                            <ChevronRight className="w-5 h-5" />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="bg-[#EDF6F9] p-12 rounded-[4rem] text-center space-y-4">
                 <p className="text-[#006D77] font-bold">{t('careers.nofit.title')}</p>
                 <p className="text-sm text-gray-500 font-medium">{t('careers.nofit.desc')}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
