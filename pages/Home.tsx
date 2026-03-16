
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, HeartPulse, 
  Clock, Sparkles, ChevronLeft, ChevronRight, Quote, Hospital
} from 'lucide-react';
import VirtualTour from '../components/VirtualTour';
import { SERVICES } from '../constants';
import { useLanguage } from '../LanguageContext';
import { TranslationKeys } from '../translations';

const HeroImage = ({ src, alt }: { src: string, alt: string }) => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallbackSrc = "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=2070";

  return (
    <div className="relative w-full h-full bg-[#EDF6F9] flex items-center justify-center overflow-hidden">
      {loading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#EDF6F9] animate-pulse">
          <Hospital className="w-12 h-12 text-[#83C5BE] opacity-20" />
        </div>
      )}
      <img 
        src={hasError ? fallbackSrc : src} 
        alt={alt} 
        onLoad={() => setLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-[3s] ${loading ? 'scale-110 opacity-0' : 'scale-100 opacity-100'} group-hover:scale-105`}
      />
      {hasError && (
        <div className="absolute bottom-4 left-4 bg-red-500/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-red-600 font-bold border border-red-200">
          Using fallback image (Check GCS Permissions)
        </div>
      )}
    </div>
  );
};

const FacilityCarousel = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      image: "https://storage.googleapis.com/igc-health/Testimomial%20-%20ibadah%20friendly.png",
      title: t('carousel.slide1.title'),
      testimonial: t('carousel.slide1.testimonial'),
      author: "Puan Siti Aminah",
      role: t('carousel.slide1.role')
    },
    {
      image: "https://storage.googleapis.com/igc-health/fasiliti%20World%20Class%204.png",
      title: t('carousel.slide2.title'),
      testimonial: t('carousel.slide2.testimonial'),
      author: "Encik Ahmad Fauzi",
      role: t('carousel.slide2.role')
    },
    {
      image: "https://storage.googleapis.com/igc-health/MRI%202.png",
      title: t('carousel.slide3.title'),
      testimonial: t('carousel.slide3.testimonial'),
      author: "Dato' Wong",
      role: t('carousel.slide3.role')
    }
  ];

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="py-24 px-4 md:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.3em] text-sm">{t('carousel.badge')}</span>
          <h2 className="text-5xl md:text-6xl font-bold text-[#006D77]">{t('carousel.title')}</h2>
        </div>

        <div className="relative group bg-[#EDF6F9] rounded-[4rem] overflow-hidden shadow-2xl h-[600px] md:h-[700px]">
          <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover grayscale-[0.3] opacity-50" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#006D77]/80 via-[#006D77]/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center px-10 md:px-24">
                  <div className="max-w-2xl space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest">
                      <Sparkles className="w-4 h-4" />
                      <span>{slide.title}</span>
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-6 -left-10 w-20 h-20 text-white/10" />
                      <p className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        "{slide.testimonial}"
                      </p>
                    </div>

                    <div className="flex items-center gap-5 pt-4">
                      <div className="w-16 h-px bg-white/40"></div>
                      <div>
                        <p className="text-xl font-black text-white">{slide.author}</p>
                        <p className="text-sm font-bold text-[#83C5BE] uppercase tracking-widest">{slide.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
            <button onClick={handlePrev} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#006D77] transition-all transform hover:scale-110 active:scale-90">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={handleNext} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#006D77] transition-all transform hover:scale-110 active:scale-90">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Legacy Section */}
      <section className="py-32 px-4 md:px-8 bg-[#F4F9FA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-5xl md:text-6xl font-black text-[#006D77] leading-tight">
              {t('legacy.title')}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              {t('legacy.desc')}
            </p>
            <Link to="/about" className="inline-block bg-[#6B9095] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#5a7a7e] transition-all active:scale-95">
              {t('legacy.cta')}
            </Link>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white group">
              <img 
                src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg" 
                alt="Kota Bharu Medical Centre" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-32 px-4 md:px-8 bg-[#006D77] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#83C5BE] font-black uppercase tracking-[0.3em] text-sm">PATIENT JOURNEY</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white">{t('home.expect.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: t('home.expect.hospitality.title'),
                desc: t('home.expect.hospitality.desc'),
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                title: t('home.expect.care.title'),
                desc: t('home.expect.care.desc'),
                icon: <HeartPulse className="w-8 h-8" />
              },
              {
                title: t('home.expect.guidance.title'),
                desc: t('home.expect.guidance.desc'),
                icon: <ShieldCheck className="w-8 h-8" />
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 hover:bg-white/20 transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#006D77] mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <div className="inline-block relative">
              <Quote className="absolute -top-8 -left-12 w-20 h-20 text-white/10" />
              <p className="text-2xl md:text-3xl font-bold text-white max-w-4xl mx-auto">
                "{t('home.expect.quote')}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-40 px-4 md:px-8 bg-[#EDF6F9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6 max-w-2xl">
              <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-xs">{t('services.badge')}</span>
              <h2 className="text-6xl md:text-7xl font-black text-[#006D77] uppercase leading-[1]">{t('services.title')}</h2>
            </div>
            <Link to="/services" className="group flex items-center gap-4 bg-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-[#006D77] hover:bg-[#006D77] hover:text-white transition-all shadow-xl active:scale-95">
              {t('services.cta')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SERVICES.map((service, idx) => (
              <div 
                key={service.id} 
                className={`bg-white p-12 rounded-[4rem] shadow-[0_20px_50px_rgba(0,109,119,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,109,119,0.15)] transition-all duration-700 group relative overflow-hidden border border-white/50 flex flex-col ${isVisible ? `animate-fade-in-up stagger-${idx+1}` : 'opacity-0'}`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-20 h-20 bg-[#EDF6F9] rounded-[2.5rem] flex items-center justify-center text-[#006D77] mb-10 group-hover:bg-[#006D77] group-hover:text-white transition-all duration-500 transform group-hover:rotate-[10deg] shadow-inner">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-black text-[#006D77] mb-6 leading-tight group-hover:text-[#E29578] transition-colors">{t(`services.item.${service.id}.title` as TranslationKeys) || service.title}</h3>
                  <p className="text-lg text-gray-500 mb-12 font-medium leading-relaxed">{t(`services.item.${service.id}.desc` as TranslationKeys) || service.description}</p>
                  <Link 
                    to={`/services?dept=${service.id}`}
                    className="mt-auto pt-10 border-t border-gray-50 flex items-center justify-between group/link cursor-pointer"
                  >
                     <span className="text-[#006D77] font-black text-[10px] uppercase tracking-[0.3em] group-hover/link:text-[#E29578] transition-colors">{t('services.profile')}</span>
                     <div className="w-12 h-12 rounded-full bg-[#EDF6F9] flex items-center justify-center text-[#006D77] group-hover:bg-[#006D77] group-hover:text-white group-hover/link:scale-110 transition-all shadow-sm">
                        <ArrowRight className="w-5 h-5" />
                     </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Carousel */}
      <FacilityCarousel />

      {/* VR360 Section */}
      <section className="py-32 px-4 md:px-8 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24 items-center relative z-10">
          <div className="lg:col-span-1 space-y-10">
            <div className="space-y-6">
              <span className="text-[#E29578] font-black tracking-widest uppercase text-sm">{t('vr.badge')}</span>
              <h2 className="text-5xl md:text-6xl font-bold text-[#006D77] leading-tight">{t('vr.title')}</h2>
              <p className="text-xl text-[#2C3E50]/70 leading-relaxed font-medium">{t('vr.desc')}</p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <HeartPulse className="text-[#E29578] w-8 h-8" />, title: t('vr.feat1.title'), desc: t('vr.feat1.desc') },
                { icon: <Clock className="text-[#E29578] w-8 h-8" />, title: t('vr.feat2.title'), desc: t('vr.feat2.desc') }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 p-6 bg-[#EDF6F9] rounded-[2rem] border border-[#83C5BE]/20 hover:scale-105 transition-transform cursor-default">
                   <div className="bg-white p-3 rounded-2xl shadow-sm">{item.icon}</div>
                   <div>
                     <h4 className="font-bold text-[#006D77]">{item.title}</h4>
                     <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <VirtualTour />
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="px-4 md:px-8 py-20 pb-40">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 bg-[#006D77] rounded-[4rem] transition-all group-hover:scale-[1.02] duration-700 shadow-[0_40px_100px_-15px_rgba(0,109,119,0.4)]"></div>
          <div className="relative z-10 p-12 md:p-24 flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">{t('emergency.title')}</h2>
              <p className="text-[#83C5BE] text-2xl font-bold max-w-lg">{t('emergency.desc')}</p>
            </div>
            <div className="flex flex-col gap-6 w-full md:w-auto">
              <a href="tel:+6097477000" className="bg-[#E29578] hover:bg-white hover:text-[#006D77] text-white px-12 py-6 rounded-full font-black text-center shadow-2xl transition-all text-2xl active:scale-95">
                {t('emergency.cta')}
              </a>
              <p className="text-white/50 text-center text-sm font-bold uppercase tracking-widest">{t('emergency.addr')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
