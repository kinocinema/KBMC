import React from 'react';
import { ArrowRight, CheckCircle2, PhoneCall, Calendar, Activity, HeartPulse, ShieldCheck, Clock } from 'lucide-react';

interface CentreTemplateProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const CentreTemplate: React.FC<CentreTemplateProps> = ({ title, description, features, icon }) => {
  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#006D77] text-white py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -right-20 -top-20 opacity-5">
          {icon}
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex items-center gap-6">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 hidden md:block">
            {icon}
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">{title}</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">About Our Centre</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                The {title} at Kota Bharu Medical Centre is dedicated to providing specialized, comprehensive care. 
                Equipped with state-of-the-art technology and staffed by a team of highly experienced specialists, 
                we offer advanced diagnostics, innovative treatments, and compassionate support tailored to your unique needs.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#EDF6F9] p-6 rounded-2xl border border-[#83C5BE]/30">
                  <Activity className="w-8 h-8 text-[#006D77] mb-4" />
                  <h4 className="font-bold text-[#2C3E50] mb-2">Advanced Diagnostics</h4>
                  <p className="text-sm text-gray-600">Utilizing the latest technology for accurate and early detection.</p>
                </div>
                <div className="bg-[#EDF6F9] p-6 rounded-2xl border border-[#83C5BE]/30">
                  <ShieldCheck className="w-8 h-8 text-[#006D77] mb-4" />
                  <h4 className="font-bold text-[#2C3E50] mb-2">Expert Care Team</h4>
                  <p className="text-sm text-gray-600">Multidisciplinary specialists working together for your health.</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Key Services & Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-[#83C5BE] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#006D77] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Clock className="w-32 h-32" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider mb-2 relative z-10">Operating Hours</h3>
                <div className="space-y-3 relative z-10 text-sm text-white/90">
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Sunday - Thursday</span>
                    <span className="font-bold">8:30 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Friday & Saturday</span>
                    <span className="font-bold">Closed</span>
                  </div>
                  <div className="flex justify-between text-[#E29578] font-bold pt-2">
                    <span>Emergency</span>
                    <span>24 Hours</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#EDF6F9] p-6 rounded-2xl border border-[#83C5BE]/30">
                <h3 className="text-lg font-black text-[#006D77] uppercase tracking-wider mb-4">Need Assistance?</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Our dedicated team is ready to help you schedule an appointment or answer your questions.
                </p>
                <button className="w-full bg-[#006D77] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#2C3E50] transition-colors mb-3">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
                <button className="w-full bg-white text-[#006D77] border border-[#006D77] py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                  Call Clinic
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentreTemplate;
