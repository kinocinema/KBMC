
import React, { useEffect, useState } from 'react';
import { Shield, BookOpen, UserCheck, MessageCircle, AlertTriangle, FileText } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const PatientRights: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: t('rights.sections.rights.title'),
      icon: <UserCheck className="w-10 h-10" />,
      items: [
        t('rights.sections.rights.item1'),
        t('rights.sections.rights.item2'),
        t('rights.sections.rights.item3'),
        t('rights.sections.rights.item4'),
        t('rights.sections.rights.item5')
      ],
      color: '#006D77'
    },
    {
      title: t('rights.sections.responsibilities.title'),
      icon: <Shield className="w-10 h-10" />,
      items: [
        t('rights.sections.responsibilities.item1'),
        t('rights.sections.responsibilities.item2'),
        t('rights.sections.responsibilities.item3'),
        t('rights.sections.responsibilities.item4'),
        t('rights.sections.responsibilities.item5')
      ],
      color: '#E29578'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-32 overflow-hidden">
      <div className="bg-[#EDF6F9] py-32 px-4 md:px-8 relative">
        <div className={`max-w-4xl mx-auto text-center space-y-8 relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm">{t('rights.hero.badge')}</span>
          <h1 className="text-6xl md:text-8xl font-black text-[#006D77] leading-[1.1]">{t('rights.hero.title')}</h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            {t('rights.hero.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {sections.map((section, idx) => (
            <div key={section.title} className={`space-y-12 ${isVisible ? `animate-reveal-${idx === 0 ? 'left' : 'right'}` : 'opacity-0'}`}>
               <div className="flex items-center gap-6 pb-6 border-b border-[#83C5BE]/20">
                  <div className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-xl" style={{ backgroundColor: section.color }}>
                    {section.icon}
                  </div>
                  <h2 className="text-4xl font-black text-[#006D77]">{section.title}</h2>
               </div>
               <div className="space-y-6">
                  {section.items.map((item, iidx) => (
                    <div key={iidx} className="flex gap-6 p-8 bg-[#F8FAFB] rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all">
                       <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-xs text-white" style={{ backgroundColor: section.color }}>{iidx + 1}</div>
                       <p className="text-lg font-bold text-[#2C3E50] leading-relaxed">{item}</p>
                    </div>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Footer info blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { icon: <MessageCircle />, title: t('rights.footer.feedback.title'), desc: t('rights.footer.feedback.desc') },
             { icon: <AlertTriangle />, title: t('rights.footer.ethical.title'), desc: t('rights.footer.ethical.desc') },
             { icon: <FileText />, title: t('rights.footer.records.title'), desc: t('rights.footer.records.desc') }
           ].map((item, idx) => (
             <div key={idx} className={`p-10 bg-[#EDF6F9] rounded-[3.5rem] space-y-6 border border-[#83C5BE]/20 text-center ${isVisible ? 'animate-fade-in-up' : ''}`}>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-[#006D77] shadow-sm">
                   {item.icon}
                </div>
                <h4 className="text-xl font-black text-[#006D77]">{item.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default PatientRights;
