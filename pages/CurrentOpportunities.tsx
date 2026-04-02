
import React, { useEffect } from 'react';
import { CheckCircle2, PhoneCall, Mail, Briefcase, Users, HeartPulse, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const CurrentOpportunities: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const opportunities = [
    {
      category: t('opportunities.medical'),
      icon: <HeartPulse className="w-8 h-8 text-[#006D77]" />,
      roles: ["Consultant Specialists (all fields)", "Medical Officers", "Resident Doctors"]
    },
    {
      category: t('opportunities.nursing'),
      icon: <Users className="w-8 h-8 text-[#006D77]" />,
      roles: ["Staff Nurses (General, ICU, Midwifery)", "Clinic Assistants", "Medical Assistants"]
    },
    {
      category: t('opportunities.allied'),
      icon: <ShieldCheck className="w-8 h-8 text-[#006D77]" />,
      roles: ["Radiographers", "Pharmacists", "Laboratory Technicians", "Dietitians"]
    },
    {
      category: t('opportunities.admin'),
      icon: <Briefcase className="w-8 h-8 text-[#006D77]" />,
      roles: ["Human Resource Executives", "Customer Service", "Billing Assistants", "IT & Multimedia", "Facility Technicians"]
    }
  ];

  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#006D77] text-white py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">{t('opportunities.title')}</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {t('opportunities.desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-3xl font-black text-[#2C3E50] mb-8 flex items-center gap-3">
                <div className="w-10 h-2 bg-[#006D77] rounded-full"></div>
                {t('opportunities.open')}
              </h2>
              
              <div className="grid grid-cols-1 gap-8">
                {opportunities.map((item, index) => (
                  <div key={index} className="group bg-[#F8FAFB] p-8 rounded-3xl border border-gray-100 hover:border-[#83C5BE] transition-all hover:shadow-lg">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-[#006D77] mb-4 uppercase tracking-wide">{item.category}</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.roles.map((role, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-600 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-[#83C5BE]" />
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-2xl font-black text-[#2C3E50] mb-6">{t('opportunities.why')}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('opportunities.why.desc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  t('opportunities.benefit1'),
                  t('opportunities.benefit2'),
                  t('opportunities.benefit3'),
                  t('opportunities.benefit4'),
                  t('opportunities.benefit5'),
                  t('opportunities.benefit6')
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#EDF6F9] p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-[#006D77]" />
                    <span className="text-sm font-bold text-[#2C3E50]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#006D77] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-4 relative z-10">{t('opportunities.apply')}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8 relative z-10">
                {t('opportunities.apply.desc')}
              </p>
              <div className="space-y-4 relative z-10">
                <a 
                  href="mailto:hr@kbmc.com" 
                  className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                >
                  <Mail className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Email Resume</span>
                    <span className="font-bold">hr@kbmc.com</span>
                  </div>
                </a>
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <PhoneCall className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">HR Department</span>
                    <span className="font-bold">+60 9-743 3399</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
              <h3 className="text-lg font-black text-[#2C3E50] uppercase tracking-wider mb-6">Job Portals</h3>
              <div className="space-y-4">
                <a 
                  href="https://www.jobstreet.com.my/en/job-search/kota-bharu-medical-centre-jobs/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFB] hover:bg-[#EDF6F9] transition-all group"
                >
                  <span className="font-bold text-gray-700">JobStreet</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#006D77] group-hover:translate-x-1 transition-all" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/kota-bharu-medical-centre/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFB] hover:bg-[#EDF6F9] transition-all group"
                >
                  <span className="font-bold text-gray-700">LinkedIn</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#006D77] group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentOpportunities;
