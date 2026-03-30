
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Home from './pages/Home';
import FindDoctor from './pages/FindDoctor';
import PatientGuide from './pages/PatientGuide';
import Services from './pages/Services';
import About from './pages/About';
import DoctorProfile from './pages/DoctorProfile';
import RoomRates from './pages/RoomRates';
import InsurancePanels from './pages/InsurancePanels';
import ContactUs from './pages/ContactUs';
import MedicalTourism from './pages/MedicalTourism';
import FAQ from './pages/FAQ';
import NewsGallery from './pages/NewsGallery';
import NewsArticle from './pages/NewsArticle';
import CentreOfExcellence from './pages/CentreOfExcellence';
import CentreTemplate from './pages/CentreTemplate';
import Careers from './pages/Careers';
import CurrentOpportunities from './pages/CurrentOpportunities';
import HealthScreening from './pages/HealthScreening';
import Page from './pages/Page';
import { menuData } from './data/menuData';
import { Heart, Activity, Stethoscope, Baby, Eye } from 'lucide-react';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#EDF6F9]">
          <Navbar />
          <main className="flex-grow pt-32 md:pt-36 lg:pt-40">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find-doctor" element={<FindDoctor />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/patient-guide" element={<PatientGuide />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/current-opportunities" element={<CurrentOpportunities />} />
              <Route path="/services" element={<Services />} />
              <Route path="/room-rates" element={<RoomRates />} />
              <Route path="/insurance-panels" element={<InsurancePanels />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/medical-tourism" element={<MedicalTourism />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/news-gallery" element={<NewsGallery />} />
              <Route path="/news-gallery/:id" element={<NewsArticle />} />
              <Route path="/centre-of-excellence" element={<CentreOfExcellence />} />
              <Route path="/heart-centre" element={<CentreTemplate title="centre.heart.title" description="centre.heart.desc" features={['centre.heart.f1', 'centre.heart.f2', 'centre.heart.f3', 'centre.heart.f4', 'centre.heart.f5', 'centre.heart.f6']} icon={<Heart className="w-12 h-12 text-white" />} />} />
              <Route path="/cancer-centre" element={<CentreTemplate title="centre.cancer.title" description="centre.cancer.desc" features={['centre.cancer.f1', 'centre.cancer.f2', 'centre.cancer.f3', 'centre.cancer.f4', 'centre.cancer.f5', 'centre.cancer.f6']} icon={<Activity className="w-12 h-12 text-white" />} />} />
              <Route path="/women-child-centre" element={<CentreTemplate title="centre.women.title" description="centre.women.desc" features={['centre.women.f1', 'centre.women.f2', 'centre.women.f3', 'centre.women.f4', 'centre.women.f5', 'centre.women.f6']} icon={<Baby className="w-12 h-12 text-white" />} />} />
              <Route path="/eyes-centre" element={<CentreTemplate title="centre.eyes.title" description="centre.eyes.desc" features={['centre.eyes.f1', 'centre.eyes.f2', 'centre.eyes.f3', 'centre.eyes.f4', 'centre.eyes.f5', 'centre.eyes.f6']} icon={<Eye className="w-12 h-12 text-white" />} />} />
              <Route path="/digestive-health" element={<CentreTemplate title="centre.digestive.title" description="centre.digestive.desc" features={['centre.digestive.f1', 'centre.digestive.f2', 'centre.digestive.f3', 'centre.digestive.f4', 'centre.digestive.f5', 'centre.digestive.f6']} icon={<Stethoscope className="w-12 h-12 text-white" />} />} />
              <Route path="/health-screening-2026" element={<HealthScreening />} />
              {/* Dynamic routes from menuData */}
              {menuData.flatMap((menu) =>
                menu.links
                  .filter(link => !link.path.includes('#'))
                  .map((link) => (
                    <React.Fragment key={link.name}>
                      <Route
                        path={link.path}
                        element={<Page title={link.name} content={link.content} />}
                      />
                    </React.Fragment>
                  ))
              )}
            </Routes>
          </main>

          <footer className="bg-[#2C3E50] text-white py-20 px-4 md:px-8 border-t border-[#006D77]/20">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <img 
                      src="https://kbmc.com.my/wp-content/uploads/2025/09/KBMC_Logo_Hi-Res_2022_CS6-01-scaled.png" 
                      alt="KBMC Logo" 
                      className="h-14 w-auto object-contain brightness-0 invert"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-white text-3xl font-bold tracking-tight">KBMC</span>
                      <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Kota Bharu Medical Centre</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Established in 1997, KBMC is the pioneer private specialist hospital in Kelantan, delivering world-class care with heart.
                  </p>
                  <div className="pt-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Follow Us</h4>
                    <div className="flex gap-3">
                      <a href="https://www.facebook.com/kbmofficial?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#006D77] transition-all group">
                        <Facebook className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
                      </a>
                      <a href="https://www.instagram.com/kbmc_official?igsh=MW14OWZubG9vYmpycQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#006D77] transition-all group">
                        <Instagram className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
                      </a>
                      <a href="https://www.tiktok.com/@kbmc_official?_t=8p32vlGZMpO&_r=1" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#006D77] transition-all group">
                        <img 
                          src="https://storage.googleapis.com/igc-health/logoinsurance/tik-tok%20line%202.png" 
                          alt="TikTok" 
                          className="w-3.5 h-3.5 brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity"
                          referrerPolicy="no-referrer"
                        />
                      </a>
                      <a href="https://www.youtube.com/@kotabharumedicalcentre" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#006D77] transition-all group">
                        <Youtube className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li><Link to="/about-us" className="hover:text-[#83C5BE] transition-colors">About KBMC</Link></li>
                    <li><Link to="/directory-specialist-doctors" className="hover:text-[#83C5BE] transition-colors">Our Specialists</Link></li>
                    <li><Link to="/room-rates-facilities" className="hover:text-[#83C5BE] transition-colors">Room Rates</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-6 text-lg">Patient Support</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li><Link to="/admission-discharge" className="hover:text-[#83C5BE] transition-colors">Admission Guide</Link></li>
                    <li><Link to="/insurance-panel-partners" className="hover:text-[#83C5BE] transition-colors">Insurance Panels</Link></li>
                    <li><Link to="/contact-us" className="hover:text-[#83C5BE] transition-colors">Contact Us</Link></li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-lg">Visit Us</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Lot 179 & 184, Seksyen 25, <br />
                    Jalan Sultan Yahya Petra, Lundang, <br />
                    15150 Kota Bharu, Kelantan.
                  </p>
                  <div className="flex items-center gap-3 text-[#E29578] font-bold">
                    <span className="text-xs uppercase tracking-widest">Open 24/7 for Emergencies</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
                <p>© 2026 Kota Bharu Medical Centre. All rights reserved. PDPA 2010 Compliant.</p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
