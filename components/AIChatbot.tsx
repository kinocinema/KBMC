
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Minus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatbot: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ 
      role: 'model', 
      text: t('ai.welcome') 
    }]);
  }, [language]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are the KBMC (Kota Bharu Medical Centre) Virtual Assistant. 
          Respond in the language of the user (English or Bahasa Malaysia). 
          Current UI Language: ${language === 'en' ? 'English' : 'Bahasa Malaysia'}.
          Info: Located in Lundang, KB. Pioneer private hospital since 1997. Shariah-compliant.
          Tone: Professional, compassionate. Mention you give general info only.`,
        },
      });

      const response = await chat;
      setMessages(prev => [...prev, { role: 'model', text: response.text || '' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting. Please call +60 9-743 9999." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-[90vw] sm:w-[400px] h-[600px] bg-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-white">
          <div className="bg-[#006D77] p-8 text-white flex justify-between items-center">
            <h3 className="font-black text-lg">KBMC Assistant</h3>
            <button onClick={() => setIsOpen(false)}><Minus /></button>
          </div>
          <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-5 rounded-[2rem] text-sm ${msg.role === 'user' ? 'bg-[#006D77] text-white' : 'bg-[#F8FAFB]'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 border-t">
            <input 
              className="w-full p-4 rounded-full bg-gray-50 font-bold text-sm outline-none" 
              placeholder={t('ai.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-20 h-20 rounded-[2rem] bg-[#006D77] flex items-center justify-center text-white shadow-2xl">
        <MessageSquare />
      </button>
    </div>
  );
};

export default AIChatbot;
