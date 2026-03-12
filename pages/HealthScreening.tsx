
import React, { useEffect, useState, useMemo } from 'react';
import { 
  Heart, Activity, User, Shield, ChevronRight, CheckCircle2, 
  X, Calendar, CreditCard, Phone, Fingerprint, Loader2, Sparkles,
  Clock, ChevronLeft
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// --- Custom Calendar Component ---
const CustomDatePicker: React.FC<{
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}> = ({ value, onChange, onClose }) => {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const days = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const count = daysInMonth(year, month);
    const start = startDayOfMonth(year, month);
    
    const result = [];
    for (let i = 0; i < start; i++) result.push(null);
    for (let i = 1; i <= count; i++) result.push(i);
    return result;
  }, [currentDate]);

  const monthNames = t('calendar.months').split(',');
  const dayNames = t('calendar.days').split(',');

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formatted = selectedDate.toISOString().split('T')[0];
    onChange(formatted);
    onClose();
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 border border-gray-100 z-[300] animate-in fade-in zoom-in-95 duration-300 w-[320px]">
      <div className="flex items-center justify-between mb-6">
        <button type="button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="p-2 hover:bg-[#EDF6F9] rounded-xl transition-all">
          <ChevronLeft className="w-5 h-5 text-[#006D77]" />
        </button>
        <span className="font-black text-[#006D77] uppercase tracking-widest text-[10px]">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button type="button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="p-2 hover:bg-[#EDF6F9] rounded-xl transition-all">
          <ChevronRight className="w-5 h-5 text-[#006D77]" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {dayNames.map((d, i) => (
          <span key={i} className="text-[10px] font-black text-gray-300 uppercase">{d}</span>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          day ? (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectDay(day)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center hover:bg-[#006D77] hover:text-white ${
                value === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0]
                ? 'bg-[#006D77] text-white shadow-lg'
                : 'text-gray-600'
              }`}
            >
              {day}
            </button>
          ) : <div key={i} />
        ))}
      </div>
    </div>
  );
};

interface BookingModalProps {
  pkg: {
    title: string;
    price: string;
    color: string;
    features: string[];
  } | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ pkg, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    ic: '',
    phone: '',
    date: ''
  });

  if (!pkg) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      setShowDatePicker(true);
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-[#2C3E50]/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Header Branding */}
        <div className="p-8 md:p-12 text-center relative overflow-hidden rounded-t-[4rem]" style={{ backgroundColor: pkg.color }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/20 text-white rounded-2xl hover:bg-white/40 transition-all group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
          
          <div className="relative z-10 space-y-2">
            <span className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px]">{t('booking.modal.badge')}</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">{pkg.title}</h2>
            <p className="text-white/80 font-bold">{pkg.price} {t('screening.package')}</p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#006D77]">{t('screening.overview')}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-[#F8FAFB] rounded-2xl border border-gray-100">
                      <CheckCircle2 className="w-5 h-5" style={{ color: pkg.color }} />
                      <span className="text-sm font-bold text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full py-6 rounded-[2rem] text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: pkg.color }}
              >
                {t('screening.proceed')}
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#006D77] transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder={t('booking.form.name')}
                    className="w-full pl-16 pr-6 py-5 bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-3xl outline-none font-bold text-sm transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative group">
                  <Fingerprint className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#006D77] transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder={t('booking.form.ic')}
                    className="w-full pl-16 pr-6 py-5 bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-3xl outline-none font-bold text-sm transition-all"
                    value={formData.ic}
                    onChange={(e) => setFormData({...formData, ic: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#006D77] transition-colors" />
                    <input 
                      required
                      type="tel" 
                      placeholder={t('booking.form.phone')}
                      className="w-full pl-16 pr-6 py-5 bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-3xl outline-none font-bold text-sm transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="relative group">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#006D77] transition-colors" />
                    <button 
                      type="button"
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className={`w-full pl-16 pr-6 py-5 bg-[#F8FAFB] border-2 border-transparent focus:border-[#006D77]/10 focus:bg-white rounded-3xl outline-none font-bold text-sm transition-all text-left ${!formData.date ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {formData.date ? formData.date : t('calendar.placeholder')}
                    </button>
                    {showDatePicker && (
                      <CustomDatePicker 
                        value={formData.date} 
                        onChange={(val) => setFormData({...formData, date: val})} 
                        onClose={() => setShowDatePicker(false)} 
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-6 rounded-[2rem] bg-gray-50 text-gray-400 font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all"
                >
                  {t('booking.form.back')}
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-6 rounded-[2rem] text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  style={{ backgroundColor: pkg.color }}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    t('booking.form.confirm')
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-8 animate-in zoom-in-95 duration-700">
              <div className="relative inline-block">
                <div className="absolute -inset-4 rounded-full blur-xl opacity-20" style={{ backgroundColor: pkg.color }}></div>
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white relative z-10 shadow-2xl" style={{ backgroundColor: pkg.color }}>
                  <Sparkles className="w-12 h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-[#006D77]">{t('booking.success.title')}</h3>
                <p className="text-gray-500 font-medium text-lg">{t('booking.success.desc').replace('{name}', formData.name)}</p>
              </div>
              <div className="p-8 bg-[#EDF6F9] rounded-[2.5rem] border border-[#83C5BE]/20 space-y-4">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
                  <span>{t('booking.success.ref')}</span>
                  <span className="text-[#006D77]">#KBMC-{Math.floor(Math.random() * 90000) + 10000}</span>
                </div>
                <div className="h-px bg-[#83C5BE]/10" />
                <p className="text-sm font-bold text-[#006D77]">{t('screening.concierge')}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-5 rounded-2xl border-2 border-[#006D77] text-[#006D77] font-black text-xs uppercase tracking-widest hover:bg-[#006D77] hover:text-white transition-all"
              >
                {t('booking.success.close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HealthScreening: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<{
    title: string;
    price: string;
    color: string;
    features: string[];
  } | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      title: t('screening.package.basic.title'),
      price: 'RM 288',
      icon: <User className="w-10 h-10" />,
      features: [
        t('screening.feat.clinical'),
        t('screening.feat.blood'),
        t('screening.feat.renal'),
        t('screening.feat.liver'),
        t('screening.feat.urine')
      ],
      color: '#83C5BE'
    },
    {
      title: t('screening.package.executive.title'),
      price: 'RM 588',
      icon: <Activity className="w-10 h-10" />,
      features: [
        t('screening.feat.plus.basic'),
        t('screening.feat.xray'),
        t('screening.feat.ecg'),
        t('screening.feat.glucose'),
        t('screening.feat.lipid')
      ],
      color: '#006D77',
      featured: true
    },
    {
      title: t('screening.package.premier.title'),
      price: 'RM 1,288',
      icon: <Shield className="w-10 h-10" />,
      features: [
        t('screening.feat.plus.executive'),
        t('screening.feat.ultrasound'),
        t('screening.feat.stress'),
        t('screening.feat.cancer'),
        t('screening.feat.consultant')
      ],
      color: '#E29578'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB] pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-[#83C5BE]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-[#E29578]/5 rounded-full blur-[120px]" />
      </div>

      <div className="bg-[#006D77] py-48 px-4 md:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Healt%20Screening.jpeg" 
            alt="Health Screening" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#006D77]/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100" fill="white" />
          </svg>
        </div>
        <div className={`max-w-4xl mx-auto text-center space-y-10 relative z-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-[#83C5BE] font-black tracking-[0.4em] uppercase text-sm">{t('screening.hero.badge')}</span>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1]">{t('screening.hero.title')}</h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
            {t('screening.hero.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {packages.map((pkg, idx) => (
            <div 
              key={pkg.title} 
              className={`group bg-white rounded-[4rem] p-12 shadow-2xl border-4 transition-all duration-700 hover:-translate-y-4 ${pkg.featured ? 'border-[#83C5BE]' : 'border-transparent'} ${isVisible ? `animate-fade-in-up stagger-${idx+1}` : 'opacity-0'}`}
            >
              <div className="w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform duration-700" style={{ backgroundColor: `${pkg.color}20`, color: pkg.color }}>
                {pkg.icon}
              </div>
              <h3 className="text-3xl font-black text-[#2C3E50] mb-4 group-hover:text-[#006D77] transition-colors">{pkg.title}</h3>
              <p className="text-4xl font-black text-[#006D77] mb-10">{pkg.price}</p>
              
              <ul className="space-y-6 mb-12">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-4 text-sm font-bold text-gray-500">
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: pkg.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setSelectedPkg(pkg)}
                className="w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-black/5 active:scale-95 flex items-center justify-center gap-3 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]"
                style={{ backgroundColor: pkg.color, color: 'white' }}
              >
                {t('screening.book')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-40 max-w-5xl mx-auto px-4 md:px-8 text-center space-y-12">
         <div className="relative inline-block">
           <div className="absolute -inset-10 bg-[#E29578]/10 rounded-full blur-[40px] animate-pulse" />
           <Heart className="w-20 h-20 text-[#E29578] mx-auto relative z-10" />
         </div>
         <h2 className="text-4xl md:text-5xl font-black text-[#006D77]">{t('screening.why.title')}</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-sm space-y-4 border border-gray-100 hover:shadow-2xl transition-all duration-700 group">
               <div className="w-12 h-12 rounded-2xl bg-[#EDF6F9] flex items-center justify-center text-[#006D77] mb-6 group-hover:bg-[#006D77] group-hover:text-white transition-all">
                  <Clock className="w-6 h-6" />
               </div>
               <h4 className="text-2xl font-black text-[#2C3E50]">{t('screening.why.quick.title')}</h4>
               <p className="text-gray-500 font-medium text-lg leading-relaxed">{t('screening.why.quick.desc')}</p>
            </div>
            <div className="bg-white p-12 rounded-[3.5rem] shadow-sm space-y-4 border border-gray-100 hover:shadow-2xl transition-all duration-700 group">
               <div className="w-12 h-12 rounded-2xl bg-[#EDF6F9] flex items-center justify-center text-[#006D77] mb-6 group-hover:bg-[#006D77] group-hover:text-white transition-all">
                  <Activity className="w-6 h-6" />
               </div>
               <h4 className="text-2xl font-black text-[#2C3E50]">{t('screening.why.labs.title')}</h4>
               <p className="text-gray-500 font-medium text-lg leading-relaxed">{t('screening.why.labs.desc')}</p>
            </div>
         </div>
      </section>

      {/* Booking Modal Portal */}
      {selectedPkg && (
        <BookingModal 
          pkg={selectedPkg} 
          onClose={() => setSelectedPkg(null)} 
        />
      )}
    </div>
  );
};

export default HealthScreening;
