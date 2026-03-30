import React from 'react';
import { Check, Info, Calendar, PhoneCall, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const HealthScreening: React.FC = () => {
  const { t } = useLanguage();

  const packages = [
    {
      name: t('hs.pkg.basic.name'),
      price: 'RM 250',
      description: t('hs.pkg.basic.desc'),
      popular: false,
      features: [
        t('hs.pkg.basic.f1'),
        t('hs.pkg.basic.f2'),
        t('hs.pkg.basic.f3'),
        t('hs.pkg.basic.f4'),
        t('hs.pkg.basic.f5'),
        t('hs.pkg.basic.f6'),
        t('hs.pkg.basic.f7')
      ]
    },
    {
      name: t('hs.pkg.comp.name'),
      price: 'RM 450',
      description: t('hs.pkg.comp.desc'),
      popular: true,
      features: [
        t('hs.pkg.comp.f1'),
        t('hs.pkg.comp.f2'),
        t('hs.pkg.comp.f3'),
        t('hs.pkg.comp.f4'),
        t('hs.pkg.comp.f5'),
        t('hs.pkg.comp.f6'),
        t('hs.pkg.comp.f7'),
        t('hs.pkg.comp.f8')
      ]
    },
    {
      name: t('hs.pkg.prem.name'),
      price: 'RM 850',
      description: t('hs.pkg.prem.desc'),
      popular: false,
      features: [
        t('hs.pkg.prem.f1'),
        t('hs.pkg.prem.f2'),
        t('hs.pkg.prem.f3'),
        t('hs.pkg.prem.f4'),
        t('hs.pkg.prem.f5'),
        t('hs.pkg.prem.f6'),
        t('hs.pkg.prem.f7'),
        t('hs.pkg.prem.f8'),
        t('hs.pkg.prem.f9')
      ]
    }
  ];

  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#006D77] text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{t('hs.hero.title')}</h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              {t('hs.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#E29578] text-white px-8 py-3 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#E29578] transition-all shadow-lg flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('hs.hero.book')}
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                {t('hs.hero.contact')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-3xl shadow-xl overflow-hidden border-2 transition-transform hover:-translate-y-2 duration-300 ${
                pkg.popular ? 'border-[#E29578] relative' : 'border-transparent'
              }`}
            >
              {pkg.popular && (
                <div className="bg-[#E29578] text-white text-[10px] font-black uppercase tracking-widest py-1.5 text-center absolute top-0 w-full">
                  {t('hs.pkg.popular')}
                </div>
              )}
              <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-black text-[#2C3E50] mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">{pkg.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-black text-[#006D77]">{pkg.price}</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div className="bg-[#EDF6F9] p-1 rounded-full mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-[#006D77]" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                  pkg.popular 
                    ? 'bg-[#006D77] text-white hover:bg-[#2C3E50] shadow-lg shadow-[#006D77]/20' 
                    : 'bg-[#EDF6F9] text-[#006D77] hover:bg-[#83C5BE] hover:text-white'
                }`}>
                  {t('hs.pkg.select')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preparation Guidelines */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <div className="bg-[#EDF6F9] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Info className="w-8 h-8 text-[#006D77]" />
              </div>
              <h2 className="text-3xl font-black text-[#2C3E50] mb-4 tracking-tight">{t('hs.prep.title')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('hs.prep.desc')}
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-[#E29578] font-black text-xl">01</div>
                <div>
                  <h4 className="font-bold text-[#2C3E50] mb-2">{t('hs.prep.1.title')}</h4>
                  <p className="text-sm text-gray-600">{t('hs.prep.1.desc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#E29578] font-black text-xl">02</div>
                <div>
                  <h4 className="font-bold text-[#2C3E50] mb-2">{t('hs.prep.2.title')}</h4>
                  <p className="text-sm text-gray-600">{t('hs.prep.2.desc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#E29578] font-black text-xl">03</div>
                <div>
                  <h4 className="font-bold text-[#2C3E50] mb-2">{t('hs.prep.3.title')}</h4>
                  <p className="text-sm text-gray-600">{t('hs.prep.3.desc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#E29578] font-black text-xl">04</div>
                <div>
                  <h4 className="font-bold text-[#2C3E50] mb-2">{t('hs.prep.4.title')}</h4>
                  <p className="text-sm text-gray-600">{t('hs.prep.4.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add-on Tests */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-[#2C3E50] tracking-tight">{t('hs.addon.title')}</h2>
          <button className="text-[#006D77] font-bold text-sm flex items-center gap-2 hover:underline">
            {t('hs.addon.view')} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: t('hs.addon.1'), price: 'RM 45' },
            { name: t('hs.addon.2'), price: 'RM 120' },
            { name: t('hs.addon.3'), price: 'RM 150' },
            { name: t('hs.addon.4'), price: 'RM 180' }
          ].map((addon, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-[#83C5BE] transition-colors cursor-pointer">
              <span className="font-bold text-[#2C3E50] text-sm">{addon.name}</span>
              <span className="text-[#006D77] font-black">{addon.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthScreening;
