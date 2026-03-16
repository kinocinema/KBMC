
import React, { useState } from 'react';
import { Maximize2, Move, Info, Map as MapIcon, Calendar } from 'lucide-react';

const VirtualTour: React.FC = () => {
  const [activeNode, setActiveNode] = useState('lobby');

  const nodes = [
    { id: 'lobby', name: 'Main Lobby', img: 'https://storage.googleapis.com/igc-health/Welcoming.png' },
    { id: 'maternity', name: 'Maternity Suite', img: 'https://storage.googleapis.com/imageskbmc/Gemini_Generated_Image_15nghg15nghg15ng.png' },
    { id: 'diagnostics', name: 'Diagnostic Imaging', img: 'https://storage.googleapis.com/imageskbmc/Gemini_Generated_Image_mylbwomylbwomylb.png' },
    { id: 'concierge', name: 'Patient Concierge', img: 'https://storage.googleapis.com/imageskbmc/Gemini_Generated_Image_2psi3c2psi3c2psi.png' },
  ];

  return (
    <div className="bg-[#EDF6F9] p-4 md:p-8 rounded-3xl overflow-hidden shadow-inner">
      <div className="relative group overflow-hidden rounded-2xl bg-black h-[400px] md:h-[600px]">
        {/* Placeholder image for 360 view */}
        <img
          src={nodes.find(n => n.id === activeNode)?.img}
          alt="Virtual Tour View"
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
        />
        
        {/* Overlay UI */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none">
          <div className="flex justify-between items-start pointer-events-auto">
            <div className="bg-white/90 backdrop-blur text-[#006D77] px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <Maximize2 className="w-4 h-4" />
              <span>VR360 Experience: {nodes.find(n => n.id === activeNode)?.name}</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur pointer-events-auto">
              <Move className="text-white w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4 pointer-events-auto">
             <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {nodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                      activeNode === node.id 
                      ? 'bg-[#006D77] text-white' 
                      : 'bg-white/90 text-[#2C3E50] hover:bg-white'
                    }`}
                  >
                    {node.name}
                  </button>
                ))}
             </div>
             
             <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-white bg-[#006D77]/80 px-4 py-2 rounded-lg text-sm backdrop-blur">
                    <Info className="w-4 h-4" /> Info Hotspots
                  </button>
                  <button className="flex items-center gap-2 text-white bg-black/40 px-4 py-2 rounded-lg text-sm backdrop-blur">
                    <MapIcon className="w-4 h-4" /> Hospital Map
                  </button>
                </div>
                <button className="bg-[#E29578] text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
                  <Calendar className="w-4 h-4" /> Book This Room
                </button>
             </div>
          </div>
        </div>

        {/* Info Hotspot Simulation */}
        <div className="absolute top-1/2 left-1/3 group pointer-events-auto">
          <div className="relative">
             <div className="w-8 h-8 bg-[#006D77] rounded-full animate-ping absolute inset-0"></div>
             <div className="w-8 h-8 bg-[#006D77] rounded-full flex items-center justify-center text-white relative border-2 border-white cursor-pointer">
                <Info className="w-4 h-4" />
             </div>
             <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <h4 className="font-bold text-[#006D77] text-sm">Patient Concierge</h4>
                <p className="text-xs text-gray-600 mt-1">Our team is available 24/7 to assist with your check-in process.</p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#2C3E50]/70 text-sm">
          * Use your mouse to drag and explore. Click info icons for more details.
        </p>
        <div className="flex items-center gap-2 bg-[#83C5BE]/20 px-4 py-2 rounded-full border border-[#83C5BE]/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold text-[#006D77]">Ibadah-Friendly Features Enabled</span>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
