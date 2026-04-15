import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Calendar, PhoneCall, Activity, Heart, Microscope, Stethoscope, Shield, Building2, Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseErrors';

const WellnessProgram: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'wellness'), where('isActive', '==', true));
    const unsub = onSnapshot(q, (snapshot) => {
      setPackages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'wellness');
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // Handle scrolling to sections based on pathname or hash
    const path = location.pathname;
    let elementId = '';
    
    if (path.includes('health-screening') || path.includes('other-packages')) elementId = 'health-screening';
    else if (path.includes('specialized-screening')) elementId = 'specialized-promotions';
    else if (path.includes('corporate-wellness') || path.includes('corporate-benefits') || path.includes('why-partner') || path.includes('next-steps')) elementId = 'corporate-wellness';
    
    if (elementId) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* 1. Main Page & Introduction of Services */}
      <div className="bg-[#006D77] text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{t('wellness.hero.title')}</h1>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              {t('wellness.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#E29578] text-white px-8 py-3 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#E29578] transition-all shadow-lg flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('wellness.hero.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Capabilities Highlight */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20 mb-20">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" 
              alt="Advanced Diagnostics" 
              className="rounded-2xl shadow-md" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-black text-[#2C3E50]">{t('wellness.diag.title')}</h2>
            <p className="text-gray-600 leading-relaxed">
              {t('wellness.diag.desc')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#EDF6F9] p-3 rounded-xl"><Activity className="w-6 h-6 text-[#006D77]" /></div>
                <span className="font-bold text-[#2C3E50]">{t('wellness.diag.mri')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#EDF6F9] p-3 rounded-xl"><Microscope className="w-6 h-6 text-[#006D77]" /></div>
                <span className="font-bold text-[#2C3E50]">{t('wellness.diag.ct')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#EDF6F9] p-3 rounded-xl"><Heart className="w-6 h-6 text-[#006D77]" /></div>
                <span className="font-bold text-[#2C3E50]">{t('wellness.diag.echo')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#EDF6F9] p-3 rounded-xl"><Stethoscope className="w-6 h-6 text-[#006D77]" /></div>
                <span className="font-bold text-[#2C3E50]">{t('wellness.diag.xray')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Health Screening Packages */}
      <div id="health-screening" className="max-w-7xl mx-auto px-4 md:px-8 mb-20 pt-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#2C3E50] mb-4">{t('wellness.hs.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('wellness.hs.desc')}</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-bold">Loading packages...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                <div className="bg-[#006D77] p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{pkg.category}</span>
                    <Activity className="w-6 h-6 opacity-50" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-black text-[#83C5BE]">{pkg.price}</div>
                </div>
                <div className="p-8 flex-grow">
                  <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>
                  <ul className="space-y-3">
                    {(pkg.features || []).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-[#006D77] mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  <button className="w-full bg-[#EDF6F9] text-[#006D77] py-3 rounded-xl font-bold hover:bg-[#006D77] hover:text-white transition-all">
                    {t('wellness.hs.contact')}
                  </button>
                </div>
              </div>
            ))}
            {packages.length === 0 && (
              <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
                <p className="text-gray-500">No health screening packages available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4 & 5. Corporate Wellness Program & Benefits */}
      <div id="corporate-wellness" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#2C3E50] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="inline-block bg-white/10 text-[#83C5BE] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6 w-max">{t('wellness.corp.badge')}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">{t('wellness.corp.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {t('wellness.corp.desc')}
            </p>
            
            <h3 className="text-xl font-bold text-white mb-6">{t('wellness.corp.benefits.title')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#006D77] p-2 rounded-lg shrink-0"><Check className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t('wellness.corp.benefit1.title')}</h4>
                  <p className="text-sm text-gray-400">{t('wellness.corp.benefit1.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#006D77] p-2 rounded-lg shrink-0"><Check className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t('wellness.corp.benefit2.title')}</h4>
                  <p className="text-sm text-gray-400">{t('wellness.corp.benefit2.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#006D77] p-2 rounded-lg shrink-0"><Check className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t('wellness.corp.benefit3.title')}</h4>
                  <p className="text-sm text-gray-400">{t('wellness.corp.benefit3.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#006D77] p-2 rounded-lg shrink-0"><Check className="w-5 h-5 text-white" /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t('wellness.corp.benefit4.title')}</h4>
                  <p className="text-sm text-gray-400">{t('wellness.corp.benefit4.desc')}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">{t('wellness.corp.partner.title')}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {t('wellness.corp.partner.desc')}
              </p>
              <h3 className="text-lg font-bold text-white mb-2">{t('wellness.corp.steps.title')}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t('wellness.corp.steps.desc')}
              </p>
            </div>
            
            <button className="mt-10 bg-[#E29578] text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#E29578] transition-all shadow-lg w-max">
              {t('wellness.corp.contact')}
            </button>
          </div>
          <div className="lg:w-1/2 bg-[#2C3E50] relative overflow-hidden min-h-[400px]">
            <img 
              src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" 
              alt="Corporate Wellness" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default WellnessProgram;
