import React, { useEffect, useState } from 'react';
import { Activity, Heart, Users, ArrowRight, Tag } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseErrors';

const Promotions: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'promotions'), where('isActive', '==', true));
    const unsub = onSnapshot(q, (snapshot) => {
      setPromotions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'promotions');
    });
    return () => unsub();
  }, [location]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-8 h-8" />;
      case 'Heart': return <Heart className="w-8 h-8" />;
      case 'Users': return <Users className="w-8 h-8" />;
      default: return <Tag className="w-8 h-8" />;
    }
  };

  const getBgColor = (index: number) => {
    const colors = [
      'from-purple-50 to-purple-100 border-purple-200',
      'from-pink-50 to-pink-100 border-pink-200',
      'from-blue-50 to-blue-100 border-blue-200',
      'from-teal-50 to-teal-100 border-teal-200',
      'from-orange-50 to-orange-100 border-orange-200'
    ];
    return colors[index % colors.length];
  };

  const getIconColor = (index: number) => {
    const colors = ['bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-teal-500', 'bg-orange-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#006D77] py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" 
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
          
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-bold">Loading promotions...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {promotions.map((promo, index) => (
                <div key={promo.id} className={`bg-gradient-to-br ${getBgColor(index)} rounded-3xl p-8 border shadow-sm flex flex-col gap-6`}>
                  <div className={`${getIconColor(index)} text-white p-4 rounded-2xl w-max`}>
                    {getIcon(promo.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#2C3E50] mb-2">{promo.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{promo.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-black text-[#006D77]">{promo.price}</span>
                      <button className="text-sm font-bold text-[#E29578] hover:text-[#d17a5a] flex items-center gap-1">
                        {t('promotions.learnMore')} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {promotions.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">No active promotions at the moment.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
