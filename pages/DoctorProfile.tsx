
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Award, 
  BookOpen, 
  Stethoscope, 
  ShieldCheck, 
  ChevronRight, 
  MessageSquare,
  Sparkles,
  UserCircle2,
  Star,
  X,
  User,
  Fingerprint,
  Phone,
  Loader2,
  ChevronLeft,
  MapPin
} from 'lucide-react';
import { DOCTORS } from '../constants';
import { useLanguage } from '../LanguageContext';

const DoctorImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#EDF6F9] to-[#83C5BE]/20 flex items-center justify-center text-[#006D77]`}>
        <UserCircle2 className="w-32 h-32 opacity-20" />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      referrerPolicy="no-referrer"
      className={`${className} object-cover object-[center_15%] scale-[1.1] transition-transform duration-[3s] group-hover:scale-[1.15]`} 
      onError={() => setHasError(true)}
    />
  );
};

// --- Custom Calendar Component ---
const CustomDatePicker: React.FC<{
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}> = ({ value, onChange, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { t } = useLanguage();
  
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

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <span key={d} className="text-[10px] font-black text-gray-300 uppercase">{d}</span>
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
  doctor: typeof DOCTORS[0];
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      setShowDatePicker(true);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-[#2C3E50]/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="p-8 md:p-10 text-center relative overflow-hidden bg-[#006D77] rounded-t-[4rem]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/20 text-white rounded-2xl hover:bg-white/40 transition-all group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
          
          <div className="relative z-10 space-y-2">
            <span className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px]">{t('booking.modal.badge')}</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">{doctor.name}</h2>
            <p className="text-[#83C5BE] font-bold text-xs uppercase tracking-widest">{doctor.department}</p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {formData.date ? formData.date : 'mm/dd/yyyy'}
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

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 rounded-[2rem] bg-[#006D77] text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:bg-[#E29578] hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('booking.form.confirm')}
              </button>
            </form>
          ) : (
            <div className="py-10 text-center space-y-8 animate-in zoom-in-95 duration-700">
              <div className="w-24 h-24 bg-[#EDF6F9] rounded-full flex items-center justify-center text-[#006D77] mx-auto shadow-2xl">
                <Sparkles className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#006D77]">{t('booking.success.title')}</h3>
                <p className="text-gray-500 font-medium">{t('booking.success.desc').replace('{name}', formData.name)}</p>
              </div>
              <div className="p-6 bg-[#EDF6F9] rounded-[2rem] border border-[#83C5BE]/20">
                <p className="text-xs font-black uppercase tracking-widest text-[#006D77]">Ref: #DOC-{Math.floor(Math.random() * 90000) + 10000}</p>
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

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { t } = useLanguage();

  const doctor = DOCTORS.find(doc => doc.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, [id]);

  const displayHours = useMemo(() => {
    if (doctor?.operationHours) return doctor.operationHours;
    return [
      { day: 'Mon - Wed', time: '9:00 AM - 5:00 PM' },
      { day: 'Thursday', time: '9:00 AM - 1:00 PM' },
      { day: 'Friday', time: 'Closed (Clinic)' },
      { day: 'Saturday', time: '9:00 AM - 1:00 PM' },
    ];
  }, [doctor]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
        <div className="text-center space-y-6">
          <Stethoscope className="w-24 h-24 text-gray-200 mx-auto" />
          <h1 className="text-4xl font-black text-[#006D77]">{t('doctor.notfound.title')}</h1>
          <p className="text-gray-500 max-w-md mx-auto">{t('doctor.notfound.desc')}</p>
          <button 
            onClick={() => navigate('/find-doctor')}
            className="inline-flex items-center gap-2 bg-[#006D77] text-white px-8 py-4 rounded-full font-bold hover:bg-[#005a63] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('doctor.notfound.back')}
          </button>
        </div>
      </div>
    );
  }

  const handleAskAI = (query?: string) => {
    const defaultQuery = `Tell me about the specialty of ${doctor.name}.`;
    const event = new CustomEvent('kbmc-open-chat', {
      detail: { initialMessage: query || defaultQuery }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#EDF6F9] py-8 px-4 md:px-8 border-b border-[#83C5BE]/20">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/find-doctor')}
            className="inline-flex items-center gap-3 text-[#006D77] font-black uppercase tracking-widest text-sm group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#006D77] group-hover:text-white transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span>{t('doctor.profile.back')}</span>
          </button>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-[#EDF6F9] pt-24 pb-16 px-4 md:px-8 relative overflow-hidden">
        {/* Concentric Circles Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] border border-[#006D77]/5 rounded-full"></div>
          <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-[#006D77]/5 rounded-full"></div>
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-[#006D77]/5 rounded-full"></div>
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-[#006D77]/5 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link 
            to="/find-doctor"
            className="inline-flex items-center gap-2 text-[#006D77] font-black text-[10px] uppercase tracking-[0.2em] hover:text-[#E29578] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            {t('doctor.profile.back')}
          </Link>
          <h2 className="text-6xl md:text-7xl font-black text-[#006D77] tracking-tight uppercase">
            {t('doctor.profile.title')}
          </h2>
        </div>
      </div>

      <section className="relative -mt-12 pb-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,109,119,0.1)] border border-white/50 flex flex-col md:flex-row gap-16 items-start">
            {/* Left Column: Image & Booking */}
            <div className="w-full md:w-[380px] shrink-0 space-y-8">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-[#2C3E50] aspect-square group">
                <DoctorImage 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-full h-full" 
                />

                {doctor.isFemale && (
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md py-3 rounded-2xl shadow-xl flex items-center justify-center gap-3 pointer-events-none z-20 border border-white/40">
                    <Sparkles className="w-4 h-4 text-[#E29578]" />
                    <span className="text-[10px] font-black text-[#006D77] uppercase tracking-[0.2em]">{t('doctor.profile.female')}</span>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-[#8B4513] text-white py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-[#723a10] transition-all shadow-[0_20px_40px_-10px_rgba(139,69,19,0.3)] active:scale-[0.98]"
              >
                {t('doctor.profile.book')}
              </button>
            </div>

            {/* Right Column: Details */}
            <div className="flex-1 space-y-12 py-4">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-6">
                  <h1 className="text-5xl md:text-6xl font-black text-[#006D77] leading-[1.1]">
                    {doctor.name}
                  </h1>
                  <span className="px-6 py-2 bg-[#EDF6F9] text-[#006D77] rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-[#83C5BE]/20">
                    {doctor.status === 'Resident' ? t('profile.status.resident') : 
                     doctor.status === 'Sessional' ? t('profile.status.sessional') : 
                     doctor.status === 'Visiting' ? t('profile.status.visiting') : 
                     (doctor.status || t('profile.status.resident'))}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10">
                <div className="space-y-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{t('doctor.profile.specialty')}</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{doctor.department.replace(' Department', '').replace(' Centre', '')}</p>
                </div>

                {doctor.qualification && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{t('doctor.profile.qualification')}</p>
                    <p className="text-base font-bold text-[#2C3E50] leading-relaxed max-w-xl">{doctor.qualification}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{t('doctor.profile.suite')}</p>
                    <p className="text-base font-bold text-[#2C3E50]">{doctor.clinicSuite || 'Specialist Wing'}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{t('doctor.profile.phone')}</p>
                    <p className="text-base font-bold text-[#2C3E50]">{doctor.phone || '09-743 3399 / 019-967 0799'}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{t('doctor.profile.hours')}</p>
                  <div className="grid grid-cols-1 gap-3 max-w-md">
                    {displayHours.map((item) => (
                      <div key={item.day} className="flex justify-between items-center text-sm">
                        <span className="font-bold text-[#2C3E50]">{item.day}</span>
                        <span className="text-gray-500 font-medium">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-8 bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-20">
            <div className={`space-y-10 ${isVisible ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
              <div className="flex items-center gap-6 pb-6 border-b border-[#83C5BE]/30">
                <BookOpen className="w-10 h-10 text-[#E29578]" />
                <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('doctor.profile.clinical')}</h2>
              </div>
              <p className="text-xl text-[#2C3E50]/80 leading-relaxed font-medium">
                {doctor.bio}
              </p>
              <p className="text-xl text-[#2C3E50]/80 leading-relaxed font-medium border-l-4 border-[#83C5BE] pl-8">
                {t('doctor.profile.philosophy')}
              </p>
            </div>

            <div className={`space-y-12 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
              <div className="flex items-center gap-6 pb-6 border-b border-[#83C5BE]/30">
                <Sparkles className="w-10 h-10 text-[#E29578]" />
                <h2 className="text-4xl font-black text-[#006D77] tracking-tight">{t('doctor.profile.focus')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {doctor.focus.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleAskAI(`I want to know more about ${item} treatments provided by ${doctor.name} at KBMC.`)}
                    className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:border-[#83C5BE]/40 transition-all group flex items-center text-left gap-6 group active:scale-[0.98]"
                  >
                    <div className="w-14 h-14 bg-[#EDF6F9] rounded-full flex items-center justify-center text-[#006D77] group-hover:bg-[#006D77] group-hover:text-white transition-all shrink-0 shadow-inner">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-[#2C3E50] leading-tight pr-4">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className={`bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-10 ${isVisible ? 'animate-reveal-right stagger-3' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#006D77] tracking-tight">{t('doctor.profile.hours')}</h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{t('doctor.profile.available')}</p>
              </div>
              <div className="space-y-6">
                {displayHours.map((item) => (
                  <div key={item.day} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                    <span className="font-bold text-[#2C3E50]">{item.day}</span>
                    <span className="text-[#006D77] font-black text-sm uppercase tracking-widest">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#EDF6F9] p-8 rounded-[2.5rem] space-y-4">
                <p className="text-xs text-[#006D77] font-black uppercase tracking-widest text-center">{t('doctor.profile.urgent')}</p>
                <a href="tel:+6097477000" className="w-full bg-[#006D77] text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#E29578] transition-all">
                  {t('doctor.profile.contact')} +609 747 7000
                </a>
              </div>
            </div>

            <div className={`bg-[#006D77] text-white p-12 rounded-[4rem] space-y-8 relative overflow-hidden group ${isVisible ? 'animate-reveal-right stagger-4' : 'opacity-0'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-3xl font-black leading-tight relative z-10">{t('doctor.profile.shariah')}</h3>
              <p className="text-white/70 font-medium relative z-10 leading-relaxed">
                {t('doctor.profile.shariah.desc')}
              </p>
              <div className="pt-4 relative z-10">
                <ShieldCheck className="w-16 h-16 text-[#83C5BE] opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {isBookingModalOpen && (
        <BookingModal 
          doctor={doctor} 
          onClose={() => setIsBookingModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default DoctorProfile;
