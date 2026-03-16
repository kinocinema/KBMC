
import React, { useState, useEffect } from 'react';
import { Search, UserRound, Filter, Star, Calendar, ChevronRight, UserCircle2, ArrowRight, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DOCTORS } from '../constants';
import { useLanguage } from '../LanguageContext';

const DoctorImage = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#EDF6F9] to-[#83C5BE]/20 flex items-center justify-center text-[#006D77]`}>
        <UserCircle2 className="w-20 h-20 opacity-20" />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      referrerPolicy="no-referrer"
      className={`${className} object-cover object-[center_15%] scale-[1.1] transition-transform duration-700 group-hover:scale-[1.15]`} 
      onError={() => setHasError(true)}
    />
  );
};

const FindDoctor: React.FC = () => {
  const { t } = useLanguage();
  const [filterFemale, setFilterFemale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesGender = filterFemale ? doc.isFemale : true;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGender && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFB] overflow-hidden">
      {/* Hero Header Section */}
      <div className="bg-[#006D77] pt-48 pb-40 px-4 md:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Specialist.png" 
            alt="Elite Specialists" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#006D77]/50 backdrop-blur-[1px]"></div>
        </div>

        {/* Concentric Circles Background Pattern */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-10 z-10">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] border border-white rounded-full"></div>
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] border border-white rounded-full"></div>
          <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-20 text-center space-y-8">
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{t('doctor.registry')}</span>
          </div>
          <h1 className={`text-6xl md:text-8xl font-black text-white font-serif uppercase tracking-tighter leading-[0.9] ${isVisible ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
            {t('doctor.title')} <br/><span className="text-[#83C5BE]">{t('doctor.italic')}</span>
          </h1>
          <p className={`text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
            {t('doctor.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32 relative">
        {/* Search & Filter Bar - Pulled up to overlap hero seamlessly */}
        <div className={`glass-nav p-6 md:p-8 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,109,119,0.2)] border border-white/80 flex flex-col md:flex-row gap-4 items-center relative z-20 -mt-20 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#006D77] group-focus-within:scale-110 transition-transform" />
            <input
              type="text"
              placeholder={t('doctor.search')}
              className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-transparent bg-white/90 focus:bg-white focus:outline-none focus:border-[#83C5BE] transition-all text-lg font-bold text-[#006D77] placeholder:text-[#006D77]/40 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setFilterFemale(!filterFemale)}
              className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border-2 active:scale-95 whitespace-nowrap shadow-lg w-full md:w-auto justify-center ${
                filterFemale 
                ? 'bg-[#E29578] text-white border-[#E29578]' 
                : 'bg-[#006D77] text-white border-[#006D77] hover:bg-[#E29578] hover:border-[#E29578]'
              }`}
            >
              <Filter className="w-4 h-4" />
              {filterFemale ? t('doctor.filter.female') : t('doctor.filter.all')}
            </button>
          </div>
        </div>

        {/* Results Grid - Updated Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-24">
          {filteredDoctors.map((doc, idx) => (
            <div 
              key={doc.id} 
              className={`bg-white p-8 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,109,119,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,109,119,0.15)] transition-all duration-700 group flex flex-col items-center text-center border border-white/50 relative overflow-hidden h-full ${isVisible ? `animate-fade-in-up stagger-${(idx % 5) + 1}` : 'opacity-0'}`}
            >
              <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden mb-8 bg-[#2C3E50] shadow-xl flex-shrink-0">
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] text-[#006D77] flex items-center gap-1.5 z-20 shadow-lg border border-white/50">
                  <Star className="w-3 h-3 fill-[#E29578] text-[#E29578]" />
                  {t('doctor.profile.specialized')}
                </div>
                <DoctorImage 
                  src={doc.imageUrl} 
                  alt={doc.name} 
                  className="w-full h-full" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#006D77]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              <div className="space-y-6 w-full flex-1 flex flex-col">
                <div className="space-y-2 flex-grow-0">
                  <h3 className="text-2xl font-black text-[#006D77] leading-tight font-serif group-hover:text-[#E29578] transition-colors min-h-[3rem] flex items-center justify-center">
                    {doc.name}
                  </h3>
                  <p className="text-[#83C5BE] font-black text-[10px] uppercase tracking-[0.2em] min-h-[2.5rem] flex items-center justify-center">
                    {doc.designation}
                  </p>
                </div>

                <div className="flex justify-center flex-grow">
                  <div className="self-center">
                    <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm border ${
                      doc.status === 'Resident' ? 'bg-[#EDF6F9] text-[#006D77] border-[#83C5BE]/20' : 
                      doc.status === 'Sessional' ? 'bg-[#E29578]/10 text-[#E29578] border-[#E29578]/20' : 
                      'bg-gray-50 text-gray-400 border-gray-100'
                    }`}>
                      {doc.status === 'Resident' ? t('doctor.status.resident') : 
                       doc.status === 'Sessional' ? t('doctor.status.sessional') : 
                       doc.status === 'Visiting' ? t('doctor.status.visiting') : 
                       (doc.status || t('doctor.status.resident'))}
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-auto w-full">
                  <Link 
                    to={`/doctor/${doc.id}`}
                    className="inline-flex items-center justify-center gap-3 bg-[#8B4513] text-white w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#723a10] transition-all shadow-xl shadow-[#8B4513]/20 active:scale-95 group/btn"
                  >
                    {t('doctor.profile.view')}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[5rem] mt-12 space-y-8 shadow-inner animate-fade-in-up">
            <UserRound className="w-32 h-32 text-gray-100 mx-auto animate-pulse" />
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-gray-200 uppercase tracking-tighter">{t('doctor.search.noResults')}</h3>
            </div>
            <button 
              onClick={() => {setSearchQuery(''); setFilterFemale(false);}}
              className="text-[#006D77] font-black uppercase tracking-widest text-sm hover:underline"
            >
              {t('doctor.search.clear')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
