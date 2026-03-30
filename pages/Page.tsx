import React from 'react';
import { ArrowRight, CheckCircle2, PhoneCall, Calendar } from 'lucide-react';

interface PageProps {
  title: string;
  content: string;
}

const Page: React.FC<PageProps> = ({ title, content }) => {
  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#006D77] text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">{title}</h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              {content}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Welcome to the {title} page. We are committed to providing you with the most up-to-date and comprehensive information regarding our services and facilities. 
                Our dedicated team ensures that every aspect of your experience with Kota Bharu Medical Centre meets the highest standards of quality and care.
              </p>
              
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4 mt-8">Key Information</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'Comprehensive and patient-centric approach',
                  'State-of-the-art facilities and equipment',
                  'Experienced and dedicated healthcare professionals',
                  'Commitment to continuous improvement and excellence'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#83C5BE] shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-gray-600 leading-relaxed">
                For more specific details or personalized assistance, please do not hesitate to reach out to our support staff. We are here to help you navigate your healthcare journey with ease and confidence.
              </p>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#EDF6F9] p-6 rounded-2xl border border-[#83C5BE]/30">
                <h3 className="text-lg font-black text-[#006D77] uppercase tracking-wider mb-4">Need Assistance?</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Our dedicated team is ready to help you with any questions or concerns you may have.
                </p>
                <button className="w-full bg-[#006D77] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#2C3E50] transition-colors">
                  <PhoneCall className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-black text-[#2C3E50] uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-[#EDF6F9] hover:text-[#006D77] transition-colors flex items-center justify-between group">
                    Book an Appointment
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#006D77]" />
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-[#EDF6F9] hover:text-[#006D77] transition-colors flex items-center justify-between group">
                    Find a Doctor
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#006D77]" />
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-[#EDF6F9] hover:text-[#006D77] transition-colors flex items-center justify-between group">
                    View Room Rates
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#006D77]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
