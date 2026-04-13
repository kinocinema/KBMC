import React, { useEffect } from 'react';
import { Activity, Heart, Users, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Promotions: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#006D77] py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Stockphoto/Wellness%20Program%20-%20Diagnostic%20Capabilities.jpeg" 
            alt="Promotions" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#006D77]/80 via-[#006D77]/60 to-[#006D77]/80"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm">{t('promotions.hero.badge')}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6">{t('promotions.hero.title')}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('promotions.hero.desc')}
          </p>
        </div>
      </div>

      {/* Promotions List */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#2C3E50] mb-4">{t('promotions.section.title')}</h2>
            <p className="text-[#E29578] font-bold tracking-widest uppercase mb-4">{t('promotions.section.badge')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promo 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border border-purple-200 shadow-sm flex flex-col gap-6">
              <div className="bg-purple-500 text-white p-4 rounded-2xl w-max">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#2C3E50] mb-2">{t('promotions.promo1.title')}</h3>
                <p className="text-gray-600 mb-4 text-sm">{t('promotions.promo1.desc')}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-black text-purple-600">{t('promotions.promo1.price')}</span>
                </div>
              </div>
            </div>

            {/* Promo 2 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-8 border border-pink-200 shadow-sm flex flex-col gap-6">
              <div className="bg-pink-500 text-white p-4 rounded-2xl w-max">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#2C3E50] mb-2">{t('promotions.promo2.title')}</h3>
                <p className="text-gray-600 mb-4 text-sm">{t('promotions.promo2.desc')}</p>
                <div className="flex items-center justify-between mt-auto">
                  <button className="text-sm font-bold text-pink-600 hover:text-pink-800 flex items-center gap-1">{t('promotions.learnMore')} <ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Promo 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200 shadow-sm flex flex-col gap-6">
              <div className="bg-blue-500 text-white p-4 rounded-2xl w-max">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#2C3E50] mb-2">{t('promotions.promo3.title')}</h3>
                <p className="text-gray-600 mb-4 text-sm">{t('promotions.promo3.desc')}</p>
                <div className="flex items-center justify-between mt-auto">
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">{t('promotions.learnMore')} <ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
