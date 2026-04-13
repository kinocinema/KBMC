
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Briefcase, GraduationCap, Heart, Users, ArrowRight, Mail, Phone, ExternalLink, HeartPulse, Stethoscope, FlaskConical, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Careers: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const benefits = [
    { title: t('careers.work.progression'), icon: <GraduationCap className="w-6 h-6" /> },
    { title: t('careers.work.workspace'), icon: <Briefcase className="w-6 h-6" /> },
    { title: t('careers.work.benefits'), icon: <Heart className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="bg-[#006D77] py-48 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/igc-health/Career%20Growth%203.jpeg" 
            alt="KBMC Careers Hero" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&q=80&w=2070";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#006D77]/80 via-[#006D77]/60 to-[#006D77]/80"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-[#83C5BE] font-black uppercase tracking-[0.4em] text-sm animate-fade-in">Join the KBMC Expansion Team!</span>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] animate-reveal-up">Grow Your Career in Kelantan's Most Modern Hospital</h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium max-w-3xl mx-auto animate-reveal-up stagger-1">
            As we prepare to open our new 12-storey intelligent medical block, we are looking for 400 passionate professionals to join the KBMC family.
          </p>
        </div>
      </div>

      {/* Why Join Us */}
      <div id="why-work-with-us" className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-[#006D77]">Why Join Us?</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#EDF6F9] rounded-xl flex items-center justify-center text-[#006D77] shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Advanced Environment</h3>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">Work with the latest MRI, CT Scan, and robotic surgical technology.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#EDF6F9] rounded-xl flex items-center justify-center text-[#006D77] shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Community Impact</h3>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">Be part of a project that is redefining healthcare standards for the East Coast.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#EDF6F9] rounded-xl flex items-center justify-center text-[#006D77] shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">Professional Development</h3>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">Continuous clinical training and career progression opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1470" 
                alt="KBMC Team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-xs animate-float">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#83C5BE] rounded-full flex items-center justify-center text-white">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <p className="font-black text-[#2C3E50]">400+ New Roles</p>
              </div>
              <p className="text-sm text-gray-500 font-medium">Join the largest healthcare expansion in Kelantan.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Categories */}
      <div id="current-opportunities" className="bg-[#F8FAFB] py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-[#006D77]">Who We Are Hiring: KBMC</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-6 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#006D77]">Medical & Clinical</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Consultant Specialists, Medical Officers, Staff Nurses, Hospital Aide etc.</p>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-6 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <FlaskConical className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#006D77]">Allied Health</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Pharmacists, Radiographers, Physiotherapists, Optometrist, Dietitian, Audiologist etc.</p>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-gray-100 space-y-6 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#EDF6F9] rounded-2xl flex items-center justify-center text-[#006D77]">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#006D77]">Support & Operations</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Customer Relations Officers, Admin Staff, and Facility Management etc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Apply */}
      <div id="how-to-apply" className="py-32 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-[#006D77]">Direct Call-to-Action</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              You may contact us directly via phone at 016-305 0928 or email doctorsrecruitment@icghealthcare.com.my. For all other positions, please send your resume to hr_department@kbmc.com.my or check our JobStreet page.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a 
              href="mailto:doctorsrecruitment@icghealthcare.com.my" 
              className="flex items-center justify-center gap-4 bg-[#EDF6F9] p-8 rounded-[3rem] border border-[#83C5BE]/20 hover:bg-[#006D77] hover:text-white transition-all group"
            >
              <Mail className="w-6 h-6" />
              <span className="font-black">Consultants: Email Us</span>
            </a>
            <a 
              href="mailto:hr_department@kbmc.com.my" 
              className="flex items-center justify-center gap-4 bg-[#EDF6F9] p-8 rounded-[3rem] border border-[#83C5BE]/20 hover:bg-[#E29578] hover:text-white transition-all group"
            >
              <Briefcase className="w-6 h-6" />
              <span className="font-black">Upload your Resume to our Talent Pool</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
