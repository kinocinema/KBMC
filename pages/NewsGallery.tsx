
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Play, Image as ImageIcon, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const NewsGallery: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'events' | 'media'>('all');

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const items = [
    {
      id: 'kbmc-tristar',
      type: 'news',
      title: t('news.item.kbmc-tristar.title'),
      date: 'March 10, 2026',
      image: 'https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg',
      desc: t('news.item.kbmc-tristar.desc')
    },
    {
      id: 'world-heart-day',
      type: 'events',
      title: t('news.item.world-heart-day.title'),
      date: 'February 28, 2026',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80',
      desc: t('news.item.world-heart-day.desc')
    },
    {
      id: 'healthcare-asia',
      type: 'media',
      title: t('news.item.healthcare-asia.title'),
      date: 'January 15, 2026',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
      desc: t('news.item.healthcare-asia.desc')
    },
    {
      id: 'new-mri',
      type: 'news',
      title: t('news.item.new-mri.title'),
      date: 'December 20, 2025',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
      desc: t('news.item.new-mri.desc')
    }
  ];

  const filteredItems = activeTab === 'all' ? items : items.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="relative py-32 px-4 md:px-8 overflow-hidden bg-[#006D77]">
        <img 
          src="https://storage.googleapis.com/igc-health/News%20Gallery%202.png" 
          alt="News & Gallery Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#006D77]/70 to-[#006D77]"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className={`max-w-7xl mx-auto text-center space-y-6 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[#83C5BE] text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
            {t('news.hero.badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            {t('news.hero.title')} <span className="text-[#E29578]">{t('news.hero.title2')}</span>
          </h1>
          <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto">
            {t('news.hero.desc')}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-full p-2 shadow-2xl border border-gray-100 flex flex-wrap justify-center gap-2">
          {(['all', 'news', 'events', 'media'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#006D77] text-white shadow-lg' : 'text-gray-400 hover:text-[#006D77] hover:bg-[#EDF6F9]'}`}
            >
              {t(`news.filter.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredItems.map((item, idx) => (
            <Link to={`/news-gallery/${item.id}`} key={idx} className="group cursor-pointer block">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[#006D77] text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {t(`news.filter.${item.type}`)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#006D77] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.type === 'media' ? <Play className="w-5 h-5 ml-1" /> : <ImageIcon className="w-5 h-5" />}
                  </div>
                </div>
              </div>
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-[#E29578] uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
                <h3 className="text-xl font-black text-[#2C3E50] leading-tight group-hover:text-[#006D77] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
                <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-[#006D77] uppercase tracking-widest group-hover:gap-4 transition-all">
                  {t('news.read_more')} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Press Releases Section */}
        <div className="mt-32 space-y-12">
          <div className="flex items-center justify-between border-b border-gray-100 pb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-[#006D77] tracking-tight">{t('news.press.title')}</h2>
              <p className="text-gray-500 font-medium">{t('news.press.desc')}</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[10px] font-black text-[#006D77] uppercase tracking-widest hover:gap-4 transition-all">
              {t('news.press.view_archive')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              t('news.press.item1'),
              t('news.press.item2'),
              t('news.press.item3'),
              t('news.press.item4')
            ].map((title, idx) => (
              <div key={idx} className="flex items-center justify-between p-8 bg-[#F8FAFB] rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#006D77]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-[#2C3E50] group-hover:text-[#006D77] transition-colors">{title}</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('news.press.pdf')} • 2.4 MB</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#E29578] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsGallery;
