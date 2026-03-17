
import React, { useEffect, useState } from 'react';
import { Heart, Baby, Eye, Activity, ShieldCheck, Sparkles, ArrowRight, Stethoscope } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Link } from 'react-router-dom';

const CentreOfExcellence: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const centres = [
    {
      id: 'women-child',
      icon: <Baby className="w-8 h-8" />,
      title: t('coe.women.title'),
      desc: 'Comprehensive care for mothers and children, featuring female-led maternity teams and advanced neonatal support.',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80'
    },
    {
      id: 'heart',
      icon: <Heart className="w-8 h-8" />,
      title: t('coe.heart.title'),
      desc: 'Expert cardiovascular care focusing on prevention, diagnosis, and advanced treatment of heart conditions.',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80'
    },
    {
      id: 'cancer',
      icon: <Activity className="w-8 h-8" />,
      title: t('coe.cancer.title'),
      desc: 'Holistic oncology services including chemotherapy, specialized diagnostics, and supportive care in a healing environment.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80'
    },
    {
      id: 'eye',
      icon: <Eye className="w-8 h-8" />,
      title: t('coe.eye.title'),
      desc: 'Advanced ophthalmology services for vision preservation, cataract surgery, and comprehensive eye health management.',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80'
    },
    {
      id: 'digestive',
      icon: <ShieldCheck className="w-8 h-8" />,
      title: t('coe.digestive.title'),
      desc: 'Specialized gastroenterology care for digestive disorders, featuring advanced endoscopy and minimally invasive procedures.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="relative py-32 px-4 md:px-8 overflow-hidden bg-[#006D77]">
        <img 
          src="https://storage.googleapis.com/igc-health/Centres%20of%20Excellence.jpeg" 
          alt="Centres of Excellence Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#006D77]/70 to-[#006D77]"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className={`max-w-7xl mx-auto text-center space-y-6 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[#83C5BE] text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
            {t('coe.hero.badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            {t('coe.hero.title')} <span className="text-[#E29578]">{t('coe.hero.title2')}</span>
          </h1>
          <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto">
            {t('coe.hero.desc')}
          </p>
        </div>
      </div>

      {/* Centres Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="space-y-24">
          {centres.map((coe, idx) => (
            <div key={coe.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77] shadow-sm">
                    {coe.icon}
                  </div>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{coe.title}</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    {coe.desc}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-[#F8FAFB] rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-[#006D77] uppercase tracking-widest mb-2">Technology</p>
                    <p className="text-sm font-bold text-[#2C3E50]">Advanced Diagnostics</p>
                  </div>
                  <div className="p-6 bg-[#F8FAFB] rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-[#006D77] uppercase tracking-widest mb-2">Expertise</p>
                    <p className="text-sm font-bold text-[#2C3E50]">Senior Consultants</p>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link to="/find-doctor" className="bg-[#006D77] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#E29578] transition-all flex items-center gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Consult Specialists
                  </Link>
                  <button className="flex items-center gap-2 text-[10px] font-black text-[#006D77] uppercase tracking-widest hover:gap-4 transition-all">
                    View Clinical Scope <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/3]">
                  <img 
                    src={coe.image} 
                    alt={coe.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className={`absolute -bottom-10 ${idx % 2 === 1 ? '-left-10' : '-right-10'} bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 hidden md:block max-w-xs`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#E29578] rounded-full flex items-center justify-center text-white">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="font-black text-[#006D77] text-sm uppercase tracking-widest">Centre Excellence</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Delivering precision medicine with a human touch.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Standard Section */}
      <div className="bg-[#F8FAFB] py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[#E29578] font-black uppercase tracking-[0.3em] text-[10px]">Quality Assurance</span>
            <h2 className="text-4xl font-black text-[#006D77] tracking-tight">Global Clinical Standards</h2>
            <p className="text-gray-500 font-medium">Our Centres of Excellence are benchmarked against international clinical outcomes and patient safety protocols.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'MSQH Accredited', desc: 'Certified for healthcare quality and safety standards.' },
              { title: 'Evidence-Based', desc: 'Clinical protocols based on the latest medical research.' },
              { title: 'Patient-Centered', desc: 'Care pathways designed around individual patient needs.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black text-[#2C3E50] mb-4">{item.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentreOfExcellence;
