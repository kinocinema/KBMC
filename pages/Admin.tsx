import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Plus, Trash2, Edit, X, Briefcase, Activity, MessageSquare, Menu } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../firebaseErrors';
import { compressImage } from '../utils/imageUpload';
import { menuData as defaultMenuData } from '../data/menuData';

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user is admin
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else if (currentUser.email === 'hellokinocinema@gmail.com') {
            // Bootstrap admin
            await setDoc(doc(db, 'users', currentUser.uid), {
              email: currentUser.email,
              role: 'admin'
            });
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, 'users');
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D77]"></div></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h1 className="text-3xl font-black text-[#006D77] mb-6">Admin Portal</h1>
          <p className="text-gray-600 mb-8">Please sign in to access the administration dashboard.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-[#006D77] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#005a63] transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h1 className="text-3xl font-black text-red-600 mb-6">Access Denied</h1>
          <p className="text-gray-600 mb-8">You do not have administrator privileges to access this area.</p>
          <button 
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-black text-[#006D77]">KBMC Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('doctors')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'doctors' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users className="w-5 h-5" /> Doctors
          </button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'services' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Activity className="w-5 h-5" /> Services
          </button>
          <button onClick={() => setActiveTab('careers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'careers' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Briefcase className="w-5 h-5" /> Careers
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'news' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText className="w-5 h-5" /> News & Gallery
          </button>
          <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'inquiries' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <MessageSquare className="w-5 h-5" /> Inquiries
          </button>
          <button onClick={() => setActiveTab('pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'pages' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText className="w-5 h-5" /> Pages
          </button>
          <button onClick={() => setActiveTab('menu')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'menu' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Menu className="w-5 h-5" /> Menu
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'settings' ? 'bg-[#EDF6F9] text-[#006D77]' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4 px-4">
            <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Administrator</p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'doctors' && <DoctorsTab />}
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'careers' && <CareersTab />}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'inquiries' && <InquiriesTab />}
          {activeTab === 'pages' && <PagesTab />}
          {activeTab === 'menu' && <MenuTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

// --- Tabs Components ---

import { DOCTORS, SERVICES } from '../constants';

const DashboardTab = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSyncData = async () => {
    setSyncing(true);
    setSyncStatus('Syncing doctors...');
    try {
      // Sync Doctors
      for (const doctor of DOCTORS) {
        await setDoc(doc(db, 'doctors', doctor.id), doctor);
      }

      setSyncStatus('Syncing services...');
      // Sync Services
      for (const service of SERVICES) {
        await setDoc(doc(db, 'services', service.id), {
          id: service.id,
          title: service.title,
          description: service.description,
          icon: (service as any).iconName || 'Activity',
          features: service.features || []
        });
      }

      setSyncStatus('Syncing news...');
      // Sync News
      const defaultNews = [
        {
          id: 'kbmc-tristar',
          type: 'news',
          title: 'KBMC Tristar: Redefining Healthcare in the East Coast',
          date: 'March 10, 2026',
          image: 'https://kbmc.com.my/wp-content/uploads/2025/09/KBMC-PERSPECTIVE-OPD_15jan2024-add-on-kbmc-logo-scaled.jpg',
          content: `<p>Kota Bharu Medical Centre (KBMC) is proud to announce the near completion of our major expansion project, KBMC Tristar. This state-of-the-art facility is set to redefine healthcare standards in the East Coast region of Malaysia.</p><p>The new wing features intelligent medical systems, expanded ward capacities, and specialized centers of excellence designed to provide comprehensive, patient-centered care. With a focus on integrating advanced technology with our signature compassionate service, KBMC Tristar represents a significant milestone in our commitment to the community.</p><h3>Key Features of KBMC Tristar:</h3><ul><li>Advanced Robotic Surgery Suites</li><li>Expanded Intensive Care Units (ICU) and Neonatal Intensive Care Units (NICU)</li><li>Comprehensive Oncology Center</li><li>Smart Room Technologies for enhanced patient comfort</li></ul><p>We look forward to welcoming our first patients to the new facility in the coming months. Stay tuned for official launch dates and further announcements.</p>`
        },
        {
          id: 'world-heart-day',
          type: 'events',
          title: 'World Heart Day Wellness Campaign',
          date: 'February 28, 2026',
          image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80',
          content: `<p>In conjunction with World Heart Day, KBMC is hosting a comprehensive Wellness Campaign aimed at raising awareness about cardiovascular health and promoting preventive care.</p><p>Join us at our Main Lobby for a series of engaging activities and educational sessions led by our esteemed cardiologists and healthcare professionals.</p><h3>Event Highlights:</h3><ul><li>Free basic health screenings (Blood Pressure, BMI, Glucose)</li><li>Expert talks on heart-healthy diets and lifestyle modifications</li><li>Interactive CPR and First Aid demonstrations</li><li>Special discounts on comprehensive cardiac screening packages</li></ul><p>Your heart health is our priority. Don't miss this opportunity to take charge of your cardiovascular well-being. The event is open to the public, and no prior registration is required.</p>`
        },
        {
          id: 'healthcare-asia',
          type: 'media',
          title: 'KBMC Featured in Healthcare Asia Magazine',
          date: 'January 15, 2026',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
          content: `<p>We are honored to be featured in the latest issue of Healthcare Asia Magazine, a leading publication covering the healthcare industry across the Asia Pacific region.</p><p>The extensive feature highlights KBMC's remarkable journey, our commitment to clinical excellence, and our innovative approach to patient-centered care. It also delves into our recent technological advancements and our role as a pioneer private specialist hospital in Kelantan.</p><p>"This recognition is a testament to the hard work and dedication of our entire team," said the CEO of KBMC. "We remain steadfast in our mission to deliver world-class healthcare with heart to our community and beyond."</p><p>Read the full article in the January 2026 edition of Healthcare Asia Magazine or visit their official website for the digital version.</p>`
        },
        {
          id: 'new-mri',
          type: 'news',
          title: 'New MRI 3.0T System Now Operational',
          date: 'December 20, 2025',
          image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
          content: `<p>KBMC is thrilled to announce the successful installation and operationalization of our new 3.0 Tesla Magnetic Resonance Imaging (MRI) system. This latest generation imaging technology significantly enhances our diagnostic capabilities.</p><p>The 3.0T MRI provides exceptional image quality and detail, allowing our radiologists and specialists to detect and diagnose conditions with unprecedented precision. This is particularly beneficial for neurological, musculoskeletal, and cardiovascular imaging.</p><h3>Benefits for Patients:</h3><ul><li>Faster scan times, reducing discomfort and anxiety</li><li>Wider bore design for a more spacious and less claustrophobic experience</li><li>Quieter operation compared to older models</li><li>Higher resolution images for more accurate diagnoses</li></ul><p>The addition of the 3.0T MRI system underscores our ongoing investment in cutting-edge medical technology to ensure our patients receive the best possible care.</p>`
        }
      ];

      for (const news of defaultNews) {
        await setDoc(doc(db, 'news', news.id), {
          title: news.title,
          content: news.content,
          date: news.date,
          imageUrl: news.image,
          category: news.type
        });
      }

      setSyncStatus('Syncing settings...');
      // Sync Settings
      await setDoc(doc(db, 'settings', 'global'), {
        emergencyPhone: '+60 9-743 9999',
        mainLine: '+60 9-743 3399',
        whatsapp: '+60 19-967 0799',
        address: 'Lot 179-184, Jalan Sultan Yahya Petra, 15200 Kota Bharu, Kelantan'
      });

      setSyncStatus('Data synced successfully!');
      setTimeout(() => setSyncStatus(null), 3000);
    } catch (error) {
      console.error("Error syncing data:", error);
      setSyncStatus('Error syncing data. Check console.');
    }
    setSyncing(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-500 mb-2">Welcome to KBMC Admin</h3>
          <p className="text-gray-800 mb-4">Select a category from the sidebar to manage website content.</p>
          <button 
            onClick={handleSyncData} 
            disabled={syncing}
            className="bg-[#006D77] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50 transition-colors w-full"
          >
            {syncing ? 'Syncing...' : 'Sync Initial Data'}
          </button>
          {syncStatus && (
            <p className={`mt-3 text-sm font-medium ${syncStatus.includes('Error') ? 'text-red-600' : 'text-[#006D77]'}`}>
              {syncStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const DoctorsTab = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'doctors'), (snapshot) => {
      setDoctors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'doctors');
    });
    return () => unsub();
  }, []);

  const handleAdd = () => {
    setFormData({
      name: "",
      department: "",
      designation: "",
      qualification: "",
      clinicSuite: "",
      isFemale: false,
      bio: "",
      focus: [],
      imageUrl: "",
      status: "Resident",
      phone: "",
      operationHours: []
    });
    setIsEditing(true);
  };

  const handleEdit = (doctor: any) => {
    setFormData(doctor);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await deleteDoc(doc(db, 'doctors', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `doctors/${id}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docId = formData.id || doc(collection(db, 'doctors')).id;
      const dataToSave = { ...formData, id: docId };
      await setDoc(doc(db, 'doctors', docId), dataToSave);
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'doctors');
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const base64Image = await compressImage(file, 800, 800, 0.8);
      setFormData({ ...formData, imageUrl: base64Image });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to process image. Please try a smaller file.");
    }
    setUploadingImage(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-gray-800">Manage Doctors</h2>
        <button onClick={handleAdd} className="bg-[#006D77] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#005a63]">
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600">Name</th>
              <th className="p-4 font-bold text-gray-600">Department</th>
              <th className="p-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doc => (
              <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{doc.name}</td>
                <td className="p-4 text-gray-600">{doc.department}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(doc)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(doc.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-gray-500">No doctors found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">{formData.id ? 'Edit Doctor' : 'Add Doctor'}</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                  <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                  <input required type="text" value={formData.department || ''} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Designation</label>
                  <input required type="text" value={formData.designation || ''} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Qualification</label>
                  <input type="text" value={formData.qualification || ''} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Clinic Suite</label>
                  <input type="text" value={formData.clinicSuite || ''} onChange={e => setFormData({...formData, clinicSuite: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                  <input type="text" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Photo</label>
                  <div className="flex items-center gap-4">
                    {formData.imageUrl && (
                      <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EDF6F9] file:text-[#006D77] hover:file:bg-[#e0f0f4]"
                      />
                      {uploadingImage && <p className="text-xs text-[#006D77] mt-1">Processing image...</p>}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Or provide an image URL directly:</p>
                  <input type="text" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <select value={formData.status || 'Resident'} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option value="Resident">Resident</option>
                    <option value="Visiting">Visiting</option>
                  </select>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="isFemale" checked={formData.isFemale || false} onChange={e => setFormData({...formData, isFemale: e.target.checked})} className="w-4 h-4 text-[#006D77] rounded" />
                  <label htmlFor="isFemale" className="text-sm font-bold text-gray-700">Is Female (For Shariah-Friendly Badge)</label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Bio</label>
                  <textarea value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={4}></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Focus Areas (comma separated)</label>
                  <input type="text" value={(formData.focus || []).join(', ')} onChange={e => setFormData({...formData, focus: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. Cardiology, Pediatrics" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#006D77] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const NewsTab = () => {
  const [news, setNews] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'news'), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
    });
    return () => unsub();
  }, []);

  const handleAdd = () => {
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split('T')[0],
      category: "news",
      imageUrl: ""
    });
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docId = formData.id || doc(collection(db, 'news')).id;
      const dataToSave = { ...formData };
      delete dataToSave.id;
      await setDoc(doc(db, 'news', docId), dataToSave);
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'news');
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const base64Image = await compressImage(file, 1200, 800, 0.8);
      setFormData({ ...formData, imageUrl: base64Image });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to process image. Please try a smaller file.");
    }
    setUploadingImage(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-gray-800">Manage News & Gallery</h2>
        <button onClick={handleAdd} className="bg-[#006D77] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#005a63]">
          <Plus className="w-4 h-4" /> Add Article
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600">Title</th>
              <th className="p-4 font-bold text-gray-600">Date</th>
              <th className="p-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{item.title}</td>
                <td className="p-4 text-gray-600">{item.date}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-gray-500">No news found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">{formData.id ? 'Edit Article' : 'Add Article'}</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input required type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                  <input required type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <select value={formData.category || 'news'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option value="news">News</option>
                    <option value="events">Events</option>
                    <option value="media">Media</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Photo</label>
                <div className="flex items-center gap-4">
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" className="w-24 h-16 object-cover rounded-lg border border-gray-200" />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EDF6F9] file:text-[#006D77] hover:file:bg-[#e0f0f4]"
                    />
                    {uploadingImage && <p className="text-xs text-[#006D77] mt-1">Processing image...</p>}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Or provide an image URL directly:</p>
                <input type="text" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Content (HTML allowed)</label>
                <textarea required value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm" rows={8}></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#006D77] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    emergencyPhone: '+60 9-743 9999',
    mainLine: '+60 9-743 3399',
    whatsapp: '+60 19-967 0799',
    address: 'Lot 179-184, Jalan Sultan Yahya Petra, 15200 Kota Bharu, Kelantan'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as any);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), settings);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/global');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-gray-800">Site Settings</h2>
        <button onClick={handleSave} disabled={saving} className="bg-[#006D77] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Emergency Phone</label>
          <input type="text" value={settings.emergencyPhone} onChange={e => setSettings({...settings, emergencyPhone: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#006D77] focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Main Line</label>
          <input type="text" value={settings.mainLine} onChange={e => setSettings({...settings, mainLine: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#006D77] focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp</label>
          <input type="text" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#006D77] focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
          <textarea value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#006D77] focus:border-transparent outline-none" rows={3}></textarea>
        </div>
      </div>
    </div>
  );
};

const ServicesTab = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'services'), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'services');
    });
    return () => unsub();
  }, []);

  const handleAdd = () => {
    setFormData({
      title: "",
      description: "",
      icon: "Activity",
      features: []
    });
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docId = formData.id || doc(collection(db, 'services')).id;
      const dataToSave = { ...formData, id: docId };
      await setDoc(doc(db, 'services', docId), dataToSave);
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'services');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-gray-800">Manage Services</h2>
        <button onClick={handleAdd} className="bg-[#006D77] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#005a63]">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600">Title</th>
              <th className="p-4 font-bold text-gray-600">Description</th>
              <th className="p-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{item.title}</td>
                <td className="p-4 text-gray-600 truncate max-w-xs">{item.description}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-gray-500">No services found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">{formData.id ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input required type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Icon Name (Lucide)</label>
                <input type="text" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. Heart, Activity, Brain" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={4}></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Features (comma separated)</label>
                <input type="text" value={(formData.features || []).join(', ')} onChange={e => setFormData({...formData, features: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. 24/7 Care, Advanced Tech" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#006D77] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const CareersTab = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'careers'), (snapshot) => {
      setCareers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'careers');
    });
    return () => unsub();
  }, []);

  const handleAdd = () => {
    setFormData({
      title: "",
      department: "",
      type: "Full-time",
      description: "",
      requirements: [],
      isActive: true,
      datePosted: new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await deleteDoc(doc(db, 'careers', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `careers/${id}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docId = formData.id || doc(collection(db, 'careers')).id;
      const dataToSave = { ...formData };
      delete dataToSave.id;
      await setDoc(doc(db, 'careers', docId), dataToSave);
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'careers');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-gray-800">Manage Careers</h2>
        <button onClick={handleAdd} className="bg-[#006D77] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#005a63]">
          <Plus className="w-4 h-4" /> Add Job
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600">Job Title</th>
              <th className="p-4 font-bold text-gray-600">Department</th>
              <th className="p-4 font-bold text-gray-600">Status</th>
              <th className="p-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{item.title}</td>
                <td className="p-4 text-gray-600">{item.department}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {item.isActive ? 'Active' : 'Closed'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">No job postings found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">{formData.id ? 'Edit Job' : 'Add Job'}</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Job Title</label>
                  <input required type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                  <input required type="text" value={formData.department || ''} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                  <select value={formData.type || 'Full-time'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" id="isActive" checked={formData.isActive ?? true} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 text-[#006D77] rounded" />
                  <label htmlFor="isActive" className="text-sm font-bold text-gray-700">Active (Visible on site)</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={4}></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Requirements (comma separated)</label>
                <input type="text" value={(formData.requirements || []).join(', ')} onChange={e => setFormData({...formData, requirements: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. 3+ years experience, Bachelor's degree" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#006D77] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InquiriesTab = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'inquiries');
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
    }
  };

  const handleMarkRead = async (id: string, currentStatus: string) => {
    try {
      await setDoc(doc(db, 'inquiries', id), { status: currentStatus === 'new' ? 'read' : 'new' }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `inquiries/${id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-gray-800">Patient Inquiries</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600">Date</th>
              <th className="p-4 font-bold text-gray-600">Name</th>
              <th className="p-4 font-bold text-gray-600">Subject</th>
              <th className="p-4 font-bold text-gray-600">Status</th>
              <th className="p-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(item => (
              <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50 ${item.status === 'new' ? 'bg-blue-50/30' : ''}`}>
                <td className="p-4 text-gray-600 whitespace-nowrap">{item.date}</td>
                <td className="p-4 font-medium text-gray-800">
                  {item.name}
                  <div className="text-xs text-gray-500 font-normal">{item.email}</div>
                  <div className="text-xs text-gray-500 font-normal">{item.phone}</div>
                </td>
                <td className="p-4 text-gray-600">
                  <div className="font-medium text-gray-800">{item.subject}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{item.message}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {item.status === 'new' ? 'New' : 'Read'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleMarkRead(item.id, item.status)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Toggle Read Status">
                    <Activity className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No inquiries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PagesTab = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pages'), (snapshot) => {
      setPages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'pages');
    });
    return () => unsub();
  }, []);

  const handleAdd = () => {
    setFormData({
      id: "", // For pages, we might want to manually set the ID (e.g., 'home', 'health-screening')
      title: "",
      content: "",
      sections: []
    });
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    try {
      await deleteDoc(doc(db, 'pages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `pages/${id}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docId = formData.id || doc(collection(db, 'pages')).id;
      const dataToSave = { ...formData };
      // Don't save the id inside the document if it's the document key, or do it for consistency
      await setDoc(doc(db, 'pages', docId), dataToSave);
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'pages');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-gray-800">Manage Pages</h2>
        <button onClick={handleAdd} className="bg-[#006D77] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#005a63]">
          <Plus className="w-4 h-4" /> Add Page
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600">Page ID (URL Slug)</th>
              <th className="p-4 font-bold text-gray-600">Title</th>
              <th className="p-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{item.id}</td>
                <td className="p-4 text-gray-600">{item.title}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-gray-500">No pages found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">{formData.id ? 'Edit Page' : 'Add Page'}</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Page ID (URL Slug)</label>
                  <input required type="text" value={formData.id || ''} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. health-screening" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Page Title</label>
                  <input required type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Main Content (HTML allowed)</label>
                <textarea value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm" rows={8}></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#006D77] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuTab = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const docRef = doc(db, 'settings', 'menu');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().items) {
          setMenuItems(docSnap.data().items);
        } else {
          setMenuItems(defaultMenuData);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'settings/menu');
      }
      setLoading(false);
    };
    fetchMenu();
  }, []);

  const handleSave = async () => {
    if (!window.confirm('Are you sure you want to save these menu changes?')) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'menu'), { items: menuItems }, { merge: true });
      alert('Menu saved successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/menu');
    }
    setSaving(false);
  };

  const addCategory = () => {
    setMenuItems([...menuItems, { title: 'New Category', links: [] }]);
  };

  const removeCategory = (index: number) => {
    const newItems = [...menuItems];
    newItems.splice(index, 1);
    setMenuItems(newItems);
  };

  const updateCategoryTitle = (index: number, title: string) => {
    const newItems = [...menuItems];
    newItems[index].title = title;
    setMenuItems(newItems);
  };

  const addLink = (categoryIndex: number) => {
    const newItems = [...menuItems];
    newItems[categoryIndex].links.push({ name: 'New Link', path: '/new-link', content: '' });
    setMenuItems(newItems);
  };

  const removeLink = (categoryIndex: number, linkIndex: number) => {
    const newItems = [...menuItems];
    newItems[categoryIndex].links.splice(linkIndex, 1);
    setMenuItems(newItems);
  };

  const updateLink = (categoryIndex: number, linkIndex: number, field: string, value: string) => {
    const newItems = [...menuItems];
    newItems[categoryIndex].links[linkIndex][field] = value;
    setMenuItems(newItems);
  };

  if (loading) return <div className="p-8 text-center">Loading menu...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Navigation Menu</h2>
          <p className="text-gray-500">Manage the website's main navigation menu and dropdowns.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addCategory} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </button>
          <button onClick={handleSave} disabled={saving} className="bg-[#006D77] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#005a63] disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {menuItems.map((category, catIndex) => (
          <div key={catIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={category.title}
                onChange={(e) => updateCategoryTitle(catIndex, e.target.value)}
                className="text-xl font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-[#006D77] focus:outline-none px-1 py-1"
              />
              <button onClick={() => removeCategory(catIndex)} className="text-red-500 hover:text-red-700 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {category.links.map((link: any, linkIndex: number) => (
                <div key={linkIndex} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
                  <button 
                    onClick={() => removeLink(catIndex, linkIndex)} 
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Link Name</label>
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) => updateLink(catIndex, linkIndex, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Path (e.g. /about)</label>
                      <input
                        type="text"
                        value={link.path}
                        onChange={(e) => updateLink(catIndex, linkIndex, 'path', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Page Content (Optional, for dynamic pages)</label>
                    <textarea
                      value={link.content || ''}
                      onChange={(e) => updateLink(catIndex, linkIndex, 'content', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <button 
                onClick={() => addLink(catIndex)} 
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl font-bold hover:border-[#006D77] hover:text-[#006D77] transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
