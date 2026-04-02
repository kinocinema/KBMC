import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../firebaseErrors';

const newsData = {
  'kbmc-tristar': {
    type: 'news',
    title: 'KBMC Tristar: Redefining Healthcare in the East Coast',
    date: 'March 10, 2026',
    image: 'https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg',
    content: `
      <p>Kota Bharu Medical Centre (KBMC) is proud to announce the near completion of our major expansion project, KBMC Tristar. This state-of-the-art facility is set to redefine healthcare standards in the East Coast region of Malaysia.</p>
      <p>The new wing features intelligent medical systems, expanded ward capacities, and specialized centers of excellence designed to provide comprehensive, patient-centered care. With a focus on integrating advanced technology with our signature compassionate service, KBMC Tristar represents a significant milestone in our commitment to the community.</p>
      <h3>Key Features of KBMC Tristar:</h3>
      <ul>
        <li>Advanced Robotic Surgery Suites</li>
        <li>Expanded Intensive Care Units (ICU) and Neonatal Intensive Care Units (NICU)</li>
        <li>Comprehensive Oncology Center</li>
        <li>Smart Room Technologies for enhanced patient comfort</li>
      </ul>
      <p>We look forward to welcoming our first patients to the new facility in the coming months. Stay tuned for official launch dates and further announcements.</p>
    `
  },
  'world-heart-day': {
    type: 'events',
    title: 'World Heart Day Wellness Campaign',
    date: 'February 28, 2026',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80',
    content: `
      <p>In conjunction with World Heart Day, KBMC is hosting a comprehensive Wellness Campaign aimed at raising awareness about cardiovascular health and promoting preventive care.</p>
      <p>Join us at our Main Lobby for a series of engaging activities and educational sessions led by our esteemed cardiologists and healthcare professionals.</p>
      <h3>Event Highlights:</h3>
      <ul>
        <li>Free basic health screenings (Blood Pressure, BMI, Glucose)</li>
        <li>Expert talks on heart-healthy diets and lifestyle modifications</li>
        <li>Interactive CPR and First Aid demonstrations</li>
        <li>Special discounts on comprehensive cardiac screening packages</li>
      </ul>
      <p>Your heart health is our priority. Don't miss this opportunity to take charge of your cardiovascular well-being. The event is open to the public, and no prior registration is required.</p>
    `
  },
  'healthcare-asia': {
    type: 'media',
    title: 'KBMC Featured in Healthcare Asia Magazine',
    date: 'January 15, 2026',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    content: `
      <p>We are honored to be featured in the latest issue of Healthcare Asia Magazine, a leading publication covering the healthcare industry across the Asia Pacific region.</p>
      <p>The extensive feature highlights KBMC's remarkable journey, our commitment to clinical excellence, and our innovative approach to patient-centered care. It also delves into our recent technological advancements and our role as a pioneer private specialist hospital in Kelantan.</p>
      <p>"This recognition is a testament to the hard work and dedication of our entire team," said the CEO of KBMC. "We remain steadfast in our mission to deliver world-class healthcare with heart to our community and beyond."</p>
      <p>Read the full article in the January 2026 edition of Healthcare Asia Magazine or visit their official website for the digital version.</p>
    `
  },
  'new-mri': {
    type: 'news',
    title: 'New MRI 3.0T System Now Operational',
    date: 'December 20, 2025',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
    content: `
      <p>KBMC is thrilled to announce the successful installation and operationalization of our new 3.0 Tesla Magnetic Resonance Imaging (MRI) system. This latest generation imaging technology significantly enhances our diagnostic capabilities.</p>
      <p>The 3.0T MRI provides exceptional image quality and detail, allowing our radiologists and specialists to detect and diagnose conditions with unprecedented precision. This is particularly beneficial for neurological, musculoskeletal, and cardiovascular imaging.</p>
      <h3>Benefits for Patients:</h3>
      <ul>
        <li>Faster scan times, reducing discomfort and anxiety</li>
        <li>Wider bore design for a more spacious and less claustrophobic experience</li>
        <li>Quieter operation compared to older models</li>
        <li>Higher resolution images for more accurate diagnoses</li>
      </ul>
      <p>The addition of the 3.0T MRI system underscores our ongoing investment in cutting-edge medical technology to ensure our patients receive the best possible care.</p>
    `
  }
};

const NewsArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [article, setArticle] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          setArticle(getArticleData(id));
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `news/${id}`);
        setArticle(getArticleData(id));
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const getArticleData = (id: string) => {
    const data = newsData[id as keyof typeof newsData];
    if (!data) return null;
    return {
      ...data,
      title: t(`news.item.${id}.title`),
      content: t(`news.item.${id}.content`)
    };
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#006D77]" /></div>;
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#EDF6F9]">
        <h2 className="text-3xl font-black text-[#2C3E50] mb-4">{t('news.article.notfound')}</h2>
        <Link to="/news-gallery" className="text-[#006D77] font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {t('news.article.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[60vh] relative">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[#006D77] rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-6">
              {t(`news.filter.${article.type}`)}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-widest">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <Link to="/news-gallery" className="inline-flex items-center gap-2 text-[#006D77] font-bold hover:gap-3 transition-all mb-12 uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" /> {t('news.article.back_gallery')}
        </Link>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="md:w-3/4 prose prose-lg prose-headings:font-black prose-headings:text-[#2C3E50] prose-p:text-gray-600 prose-a:text-[#006D77] max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4 space-y-8">
            <div className="bg-[#F8FAFB] p-6 rounded-3xl border border-gray-100">
              <h4 className="text-sm font-black text-[#2C3E50] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> {t('news.article.share')}
              </h4>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006D77] hover:bg-[#006D77] hover:text-white transition-colors shadow-sm">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006D77] hover:bg-[#006D77] hover:text-white transition-colors shadow-sm">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006D77] hover:bg-[#006D77] hover:text-white transition-colors shadow-sm">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
