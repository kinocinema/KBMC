
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Info, FileText, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const InsurancePanels: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const panels = [
    { 
      category: t('insurance.category.major'), 
      providers: [
        { name: 'AIA Bhd', domain: 'aia.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/aia-seeklogo.png' },
        { name: 'Prudential', domain: 'prudential.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/prudential-seeklogo.png' },
        { name: 'Great Eastern', domain: 'greateasternlife.com', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/great-eastern-seeklogo.png' },
        { name: 'Allianz', domain: 'allianz.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/allianz-sigorta-seeklogo.png' },
        { name: 'Etiqa Takaful', domain: 'etiqa.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/NicePng_logo-vector-png_3285029.png' },
        { name: 'Tokio Marine', domain: 'tokiomarine.com', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/tokio_marine-logo.png' },
        { name: 'Manulife', domain: 'manulife.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/Manulife-Logo.wine.svg' },
        { name: 'Berjaya Sompo', domain: 'berjayasompo.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/BErjaya%20Sompo.png' },
        { name: 'Zurich Takaful', domain: 'zurich.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/Zurich_stac_R_takaful_rgb.jpg' }
      ] 
    },
    { 
      category: t('insurance.category.tpa'), 
      providers: [
        { name: 'PM Care', domain: 'pmcare.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/PM%20Care.png' },
        { name: 'Mediexpress', domain: 'mediexpress.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/Screenshot%202026-03-13%20161700.png' },
        { name: 'MHC Asia', domain: 'mhcasia.com', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/mhc-logo.png' },
        { name: 'Cuepacs Care', domain: 'cuepacscare.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/Cuepacs%20care.jpg' },
        { name: 'Eximius Medical', domain: 'eximius.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/Eximius%20Medical.png' },
        { name: 'Health Connect', domain: 'healthconnect.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/logoinsurance/HEALTH-CONNECT.png' }
      ] 
    },
    { 
      category: t('insurance.category.corporate'), 
      providers: [
        { name: 'PETRONAS', domain: 'petronas.com', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/PETRONAS.png' },
        { name: 'Tenaga Nasional', domain: 'tnb.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/Tenaga_Nasional_logo.svg' },
        { name: 'Telekom Malaysia', domain: 'tm.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/Logo_of_the_Telekom_Malaysia.svg' },
        { name: 'Public Bank', domain: 'pbebank.com', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/public-bank.svg' },
        { name: 'CIMB Bank', domain: 'cimb.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/CIMB-Logo.jpg' },
        { name: 'Affin Bank', domain: 'affinbank.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/AFFIN_BANK_Logo_Full_Colour.png' },
        { name: 'Sime Darby', domain: 'simedarby.com', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/295_sime_darby.jpg' },
        { name: 'FELDA', domain: 'felda.com.my', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/felda-seeklogo.png' },
        { name: 'PERKESO', domain: 'perkeso.gov.my', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/PERKESO_logo.png' },
        { name: 'UTHM', domain: 'uthm.edu.my', logoUrl: 'https://storage.googleapis.com/igc-health/Partners/logo-uthm.png' }
      ] 
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-32 overflow-hidden">
      {/* Header / Hero Banner */}
      <div className="relative bg-[#EDF6F9] py-32 md:py-48 px-4 md:px-8 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Insurance%20Panels.png" 
            alt="Insurance Panels Background" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40"></div>
        </div>

        <div className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#006D77] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">{t('insurance.hero.badge')}</span>
          <h1 className="text-6xl md:text-9xl font-black leading-tight">
            <span className="text-[#006D77]">{t('insurance.hero.title')}</span>{' '}
            <span className="text-[#E29578] italic font-serif">{t('insurance.hero.title2')}</span>
          </h1>
          <p className="text-base md:text-lg text-[#2C3E50] leading-relaxed font-bold max-w-2xl mx-auto">
            {t('insurance.hero.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="space-y-32">
          {panels.map((group, groupIdx) => (
            <div key={group.category} className={`space-y-12 ${isVisible ? `animate-fade-in-up stagger-${groupIdx+1}` : 'opacity-0'}`}>
               <div className="flex items-center gap-4 pb-6 border-b border-[#83C5BE]/20">
                  <div className="w-12 h-12 rounded-2xl bg-[#006D77] flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black text-[#006D77] tracking-tight font-serif">{group.category}</h2>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {group.providers.map((p: any, idx) => (
                    <div 
                      key={p.name} 
                      className={`bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#83C5BE]/30 transition-all duration-500 group flex flex-col items-center justify-center gap-4 text-center min-h-[160px] ${isVisible ? `animate-fade-in-up stagger-${idx % 5 + 1}` : 'opacity-0'}`}
                    >
                       <div className="w-full h-16 flex items-center justify-center relative px-4">
                          <img 
                            src={p.logoUrl || `https://logo.clearbit.com/${p.domain}`} 
                            alt={p.name}
                            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-125"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${p.name}&background=EDF6F9&color=006D77&bold=true&size=128`;
                            }}
                            referrerPolicy="no-referrer"
                          />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#006D77] transition-colors">
                         {p.name}
                       </span>
                    </div>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Not on the list? Banner */}
        <div className={`mt-32 p-10 md:p-16 bg-[#2C3E50] rounded-[3rem] md:rounded-[4rem] text-white flex flex-col md:flex-row gap-10 md:gap-16 items-center relative overflow-hidden shadow-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="bg-white/10 p-6 md:p-8 rounded-full backdrop-blur-sm shrink-0">
             <Globe className="w-10 h-10 md:w-12 md:h-12 text-[#83C5BE]" />
          </div>
          <div className="space-y-4 relative z-10 flex-grow text-center md:text-left">
             <h3 className="text-3xl font-black font-serif">{t('insurance.note.title')}</h3>
             <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed max-w-3xl">
               {t('insurance.note.desc')}
             </p>
             <div className="pt-2">
               <button className="flex items-center gap-2 text-[#83C5BE] font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors mx-auto md:mx-0">
                  <Info className="w-3.5 h-3.5" />
                  {t('insurance.note.cta')}
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePanels;
