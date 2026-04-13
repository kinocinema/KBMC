import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, PhoneCall, Calendar } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface PageProps {
  slug: string;
  defaultTitle: string;
  defaultContent: string;
}

const Page: React.FC<PageProps> = ({ slug, defaultTitle, defaultContent }) => {
  const [pageData, setPageData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'pages', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPageData(docSnap.data() as any);
        } else {
          setPageData(null);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
      setLoading(false);
    };

    fetchPage();
  }, [slug]);

  const title = pageData?.title || defaultTitle;
  const content = pageData?.content || defaultContent;

  return (
    <div className="bg-[#EDF6F9] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#006D77] text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">{title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <>
                  {/* Check if content is likely just the short default text (no HTML tags and short) */}
                  {!content.includes('<') && content.length < 300 ? (
                    <div className="space-y-10">
                      <p className="text-2xl font-light text-gray-600 leading-relaxed">
                        {content}
                      </p>
                      
                      <div className="aspect-video rounded-3xl overflow-hidden shadow-lg relative bg-gray-100">
                        <img 
                          src={`https://picsum.photos/seed/${slug}/800/450?blur=2`} 
                          alt={title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                          <h3 className="text-white text-2xl font-bold">Discover {title}</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-[#EDF6F9] p-6 rounded-2xl">
                          <CheckCircle2 className="w-8 h-8 text-[#006D77] mb-4" />
                          <h4 className="font-bold text-[#2C3E50] mb-2">Expert Care</h4>
                          <p className="text-sm text-gray-600">Our team of dedicated professionals is committed to providing the highest standard of care.</p>
                        </div>
                        <div className="bg-[#EDF6F9] p-6 rounded-2xl">
                          <Calendar className="w-8 h-8 text-[#006D77] mb-4" />
                          <h4 className="font-bold text-[#2C3E50] mb-2">Easy Scheduling</h4>
                          <p className="text-sm text-gray-600">Book your appointments conveniently through our online portal or by contacting our support team.</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-600 leading-relaxed">
                        <p>
                          At KBMC, our approach to <strong className="text-[#006D77]">{title}</strong> is rooted in our core values of compassion, excellence, and patient-centric care. We understand that navigating healthcare can sometimes be overwhelming, which is why we are dedicated to providing you with clear guidance, state-of-the-art resources, and unwavering support every step of the way.
                        </p>
                        <p>
                          Our facilities are designed with your comfort and well-being in mind, integrating advanced technology with a healing environment. Whether you are a local resident or an international visitor, our multidisciplinary team works collaboratively to ensure that your experience is seamless, safe, and tailored to your unique needs.
                        </p>
                        <p>
                          We are continuously expanding our services and refining our processes to serve you better. If you have specific questions, require personalized assistance, or wish to learn more about how we can support your healthcare journey, our dedicated customer service and medical teams are always ready to help. Your health and peace of mind remain our highest priority.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
                  )}
                </>
              )}
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
