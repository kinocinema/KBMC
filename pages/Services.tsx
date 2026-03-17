
import React, { useState, useEffect } from 'react';
import { SERVICES, DOCTORS } from '../constants';
import { ChevronRight, ArrowRight, X, User, Calendar, CheckCircle2, Info, Hospital } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
    
    // Check for department query parameter to auto-open modal
    const deptId = searchParams.get('dept');
    if (deptId) {
      const service = SERVICES.find(s => s.id === deptId);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setSelectedService(null);
    // Remove query param when closing
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('dept');
    setSearchParams(newParams);
  };

  const getAssociatedDoctors = (serviceId: string) => {
    const mapping: Record<string, string> = {
      og: 'O&G Department',
      ortho: 'Orthopedic Centre',
      paeds: 'Paediatric Department',
      surgery: 'General Surgery',
      medicine: 'Internal Medicine & Nephrology',
      eye: 'Ophthalmology Department',
      ent: 'ENT Department',
    };
    const dept = mapping[serviceId];
    return DOCTORS.filter((doc) => doc.department === dept);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Header */}
      <div className="relative pt-40 pb-32 px-4 md:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://storage.googleapis.com/igc-health/Medicine%203.png" 
            alt="Medical Excellence" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
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

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#83C5BE] animate-pulse"></div>
            <span>{t('services.hero.badge')}</span>
          </div>
          <h1 className={`text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] ${isVisible ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
            {t('services.hero.title')} <br/>
            <span className="text-[#83C5BE]">{t('services.hero.title_accent')}</span>
          </h1>
          <p className={`text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
            {t('services.hero.desc')}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-40 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id} 
              className={`group relative bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,109,119,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,109,119,0.12)] transition-all duration-700 flex flex-col h-full overflow-hidden border border-gray-100/50 ${isVisible ? `animate-fade-in-up stagger-${(idx % 5) + 1}` : 'opacity-0'}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-[#EDF6F9] rounded-full flex items-center justify-center text-[#006D77] mb-8 group-hover:bg-[#006D77] group-hover:text-white transition-all duration-500 shadow-inner">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
                </div>
                
                <h3 className="text-3xl font-black text-[#006D77] mb-3 leading-tight h-20 flex items-center">{t(`services.item.${service.id}.title`)}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed font-medium text-sm">{t(`services.item.${service.id}.desc`)}</p>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-gray-100 flex-grow"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#83C5BE] whitespace-nowrap">{t('services.focus')}</p>
                    <div className="h-px bg-gray-100 flex-grow"></div>
                  </div>
                  <ul className="space-y-3.5">
                    {service.features.slice(0, 3).map((_, fidx) => (
                      <li key={fidx} className="flex items-center gap-3 text-sm text-[#2C3E50] font-bold">
                        <div className="w-1.5 h-1.5 rounded-sm bg-[#E29578]"></div>
                        {t(`services.item.${service.id}.feature${fidx + 1}`)}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-8 flex flex-col gap-3">
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="w-full py-4 rounded-full bg-[#006D77] text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#005a63] transition-all active:scale-95 shadow-lg shadow-[#006D77]/20"
                  >
                    {t('services.btn.details')}
                    <Info className="w-4 h-4" />
                  </button>
                  <Link 
                    to="/find-doctor" 
                    className="w-full py-4 rounded-full border border-gray-200 text-[#006D77] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#EDF6F9] hover:border-[#006D77]/20 transition-all active:scale-95"
                  >
                    {t('services.btn.consult')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal with Refined Motion */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div 
            className="absolute inset-0 bg-[#2C3E50]/90 backdrop-blur-xl animate-in fade-in duration-500"
            onClick={handleCloseModal}
          ></div>
          
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 no-scrollbar">
            <button 
              onClick={handleCloseModal}
              className="fixed md:absolute top-8 right-8 p-5 bg-[#EDF6F9] text-[#006D77] rounded-[2rem] hover:bg-[#006D77] hover:text-white transition-all z-50 shadow-xl group"
            >
              <X className="w-8 h-8 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
              {/* Left Column: Service Info */}
              <div className="lg:col-span-3 p-10 md:p-20 space-y-16 border-r border-gray-50">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
                  <div className="w-28 h-28 bg-[#EDF6F9] rounded-[3rem] flex items-center justify-center text-[#006D77] shadow-inner">
                    {React.cloneElement(selectedService.icon as React.ReactElement<any>, { className: "w-14 h-14" })}
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-5xl md:text-6xl font-black text-[#006D77] leading-[1.1]">{t(`services.item.${selectedService.id}.title`)}</h2>
                    <p className="text-[#E29578] font-black tracking-[0.4em] uppercase text-sm">{t('services.hero.badge')}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl font-black text-[#2C3E50] tracking-tight">{t('services.modal.scope')}</h3>
                  <p className="text-gray-500 text-xl leading-relaxed font-medium">
                    {t('services.modal.desc_prefix')} {t(`services.item.${selectedService.id}.title`)} {t('services.modal.desc_suffix')}
                  </p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl font-black text-[#2C3E50] tracking-tight">{t('services.modal.focus')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedService.features.map((_, fidx) => (
                      <div key={fidx} className="flex items-center gap-5 p-6 bg-[#EDF6F9] rounded-[2.5rem] hover:bg-[#83C5BE]/10 transition-colors cursor-default border border-transparent hover:border-[#83C5BE]/20">
                        <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#83C5BE] shadow-sm">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-[#006D77] text-lg">{t(`services.item.${selectedService.id}.feature${fidx + 1}`)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#E29578] p-12 rounded-[4rem] text-white flex flex-col md:flex-row gap-10 items-center shadow-2xl shadow-[#E29578]/30 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="bg-white/20 p-6 rounded-[2rem] backdrop-blur relative z-10">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-4 relative z-10 flex-grow text-center md:text-left">
                    <h4 className="text-3xl font-black">{t('services.modal.cta.title')}</h4>
                    <p className="text-lg opacity-90 font-medium">{t('services.modal.cta.desc')}</p>
                    <button className="mt-4 bg-white text-[#E29578] px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl">
                      {t('services.modal.cta.btn')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Doctors */}
              <div className="lg:col-span-2 bg-[#F8FAFB] p-10 md:p-20 space-y-12">
                <div className="space-y-2">
                  <span className="text-gray-400 font-black uppercase tracking-widest text-xs">{t('services.modal.team.badge')}</span>
                  <h3 className="text-3xl font-black text-[#2C3E50] flex items-center gap-3">
                    {t('services.modal.team.title')}
                  </h3>
                </div>
                
                <div className="space-y-8 overflow-y-auto max-h-[600px] no-scrollbar pr-4">
                  {getAssociatedDoctors(selectedService.id).map((doc) => (
                    <div 
                      key={doc.id} 
                      onClick={() => {
                        setSelectedService(null);
                        navigate(`/doctor/${doc.id}`);
                      }}
                      className="bg-white p-8 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer"
                    >
                      <div className="flex items-center gap-8">
                        <div className="relative">
                           <div className="absolute -inset-2 bg-gradient-to-tr from-[#006D77] to-[#83C5BE] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                           <img 
                            src={doc.imageUrl} 
                            alt={doc.name} 
                            className="w-24 h-24 rounded-[2rem] object-cover relative z-10 shadow-xl group-hover:scale-110 transition-transform duration-700" 
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-2xl font-bold text-[#006D77] leading-tight group-hover:text-[#E29578] transition-colors">{doc.name}</h4>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">{doc.designation}</p>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-300">{t('services.modal.team.profile')}</span>
                        <div className="w-12 h-12 bg-[#EDF6F9] rounded-[1.5rem] flex items-center justify-center text-[#006D77] group-hover:bg-[#006D77] group-hover:text-white transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {getAssociatedDoctors(selectedService.id).length === 0 && (
                    <div className="text-center py-24 space-y-6">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-gray-200 shadow-inner">
                        <User className="w-12 h-12" />
                      </div>
                      <p className="text-gray-400 font-bold text-lg">{t('services.modal.team.empty')}</p>
                    </div>
                  )}
                </div>

                <div className="pt-12 border-t border-gray-100 space-y-6">
                  <h4 className="font-black text-xs text-gray-300 uppercase tracking-[0.3em]">{t('services.modal.registry')}</h4>
                  <div className="flex items-center gap-4 text-[#006D77]">
                    <div className="w-3 h-3 rounded-full bg-[#E29578] animate-pulse shadow-[0_0_10px_#E29578]"></div>
                    <span className="text-2xl font-black tracking-tighter">+609 747 7000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Facility Reveal */}
      <div className="bg-[#2C3E50] py-40 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#006D77]/20 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className={`space-y-12 ${isVisible ? 'animate-reveal-left' : ''}`}>
              <div className="space-y-6">
                 <span className="text-[#83C5BE] font-black uppercase tracking-[0.3em] text-xs">{t('services.infra.badge')}</span>
                 <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1]">
                   {t('services.infra.title')} <br/>
                   <span className="text-[#83C5BE]">{t('services.infra.title_italic')}</span>
                 </h2>
                 <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl">
                   {t('services.infra.desc')}
                 </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: t('services.infra.imaging.title'), desc: t('services.infra.imaging.desc'), color: '#83C5BE' },
                  { title: t('services.infra.rehab.title'), desc: t('services.infra.rehab.desc'), color: '#E29578' }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all group cursor-default">
                    <h4 className="text-xl font-black mb-2" style={{ color: item.color }}>{item.title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative ${isVisible ? 'animate-reveal-right' : ''}`}>
              <div className="absolute -inset-10 bg-[#006D77]/30 rounded-full blur-[80px]"></div>
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070" 
                alt="Medical Equipment" 
                className="rounded-[4rem] shadow-2xl relative z-10 hover:grayscale-0 transition-all duration-1000 grayscale-[0.5]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none slow-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
