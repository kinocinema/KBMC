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
            <div className="md:col-span-2 prose prose-slate max-w-none">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: content }} />
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
