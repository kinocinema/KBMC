
import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, PhoneCall, Mail } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const faqData = [
    {
      category: 'General Information',
      questions: [
        {
          q: 'What are the visiting hours at KBMC?',
          a: 'General ward visiting hours are from 12:30 PM to 2:00 PM and 4:30 PM to 7:00 PM daily. For ICU/HDU, visiting is restricted to immediate family members only, with a maximum of 2 visitors at a time.'
        },
        {
          q: 'Is parking available at the hospital?',
          a: 'Yes, free parking is available for all patients and visitors in our dedicated multi-story car park located in the Specialist Complex (Block B).'
        },
        {
          q: 'Does KBMC provide 24-hour emergency services?',
          a: 'Yes, our Accident & Emergency (A&E) department is open 24 hours a day, 7 days a week, including public holidays.'
        }
      ]
    },
    {
      category: 'Billing & Insurance',
      questions: [
        {
          q: 'Which insurance panels are accepted at KBMC?',
          a: 'We are paneled with most major insurance providers in Malaysia, including AIA, Prudential, Great Eastern, Allianz, and more. We also work with various Third Party Administrators (TPA).'
        },
        {
          q: 'How do I use my Guarantee Letter (GL) for admission?',
          a: 'Please present your valid GL at the Admission Registry desk during registration. Our team will verify the coverage with your provider.'
        }
      ]
    },
    {
      category: 'KBMC Tristar (Expansion)',
      questions: [
        {
          q: 'What is KBMC Tristar?',
          a: 'KBMC Tristar is our major expansion project featuring a new 12-storey intelligent medical block and an 11-storey specialist complex, designed to redefine healthcare standards in the East Coast.'
        },
        {
          q: 'When will the new facilities be fully operational?',
          a: 'The expansion is currently in its final stages of commissioning. We expect to launch various departments progressively throughout 2026.'
        }
      ]
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const allQuestions = faqData.flatMap(cat => cat.questions);
  const filteredQuestions = allQuestions.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFB] pb-24">
      {/* Hero Section */}
      <div className="relative py-32 px-4 md:px-8 overflow-hidden bg-[#006D77]">
        <img 
          src="https://storage.googleapis.com/igc-health/FAQ.jpeg" 
          alt="FAQ Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#006D77]/70 to-[#006D77]"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[#83C5BE] text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
            {t('faq.hero.badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            {t('faq.hero.title')} <span className="text-[#E29578]">{t('faq.hero.title2')}</span>
          </h1>
          <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto">
            {t('faq.hero.desc')}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-8">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#006D77] transition-colors" />
              <input 
                type="text" 
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-full px-16 py-6 font-bold text-[#2C3E50] shadow-2xl outline-none focus:ring-4 focus:ring-[#83C5BE]/20 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="space-y-4">
          {searchQuery ? (
            <div className="space-y-4">
              <p className="text-sm font-black text-[#006D77] uppercase tracking-widest mb-6">Search Results ({filteredQuestions.length})</p>
              {filteredQuestions.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg font-black text-[#2C3E50] group-hover:text-[#006D77] transition-colors">{item.q}</span>
                    {openIndex === idx ? <ChevronUp className="text-[#006D77]" /> : <ChevronDown className="text-gray-400" />}
                  </button>
                  {openIndex === idx && (
                    <div className="px-8 pb-8 animate-fade-in">
                      <div className="h-px bg-gray-100 mb-6"></div>
                      <p className="text-gray-500 font-medium leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            faqData.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-4 pt-8">
                <h2 className="text-xs font-black text-[#006D77] uppercase tracking-[0.3em] ml-4">{cat.category}</h2>
                {cat.questions.map((item, qIdx) => {
                  const globalIdx = catIdx * 10 + qIdx;
                  return (
                    <div key={qIdx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <button 
                        onClick={() => toggleFaq(globalIdx)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                      >
                        <span className="text-lg font-black text-[#2C3E50] group-hover:text-[#006D77] transition-colors">{item.q}</span>
                        {openIndex === globalIdx ? <ChevronUp className="text-[#006D77]" /> : <ChevronDown className="text-gray-400" />}
                      </button>
                      {openIndex === globalIdx && (
                        <div className="px-8 pb-8 animate-fade-in">
                          <div className="h-px bg-gray-100 mb-6"></div>
                          <p className="text-gray-500 font-medium leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-24 bg-white rounded-[3rem] p-12 text-center space-y-8 border border-gray-100 shadow-xl">
          <div className="w-20 h-20 bg-[#EDF6F9] rounded-3xl flex items-center justify-center mx-auto">
            <HelpCircle className="w-10 h-10 text-[#006D77]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-[#2C3E50]">Still have questions?</h3>
            <p className="text-gray-500 font-medium">Our patient relations team is here to help you 24/7.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+6097458000" className="flex items-center gap-3 bg-[#006D77] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#E29578] transition-all">
              <PhoneCall className="w-4 h-4" />
              Call Support
            </a>
            <a href="mailto:kbmc@kbmc.com.my" className="flex items-center gap-3 bg-[#F8FAFB] text-[#2C3E50] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
