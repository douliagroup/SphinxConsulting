import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Globe, User } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { ASSETS, CONTENT } from '../constants';
import { Language, Message } from '../types';

interface ChatInterfaceProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ lang, setLang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: CONTENT[lang].chat.welcome,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = CONTENT[lang].chat;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: input,
        config: {
          systemInstruction: `Tu es Sphinx-AI, l'assistant officiel de SPHINX Consulting. 
          Tu es professionnel, stratégique et serviable. 
          Réponds en ${lang === 'fr' ? 'français' : 'anglais'}.
          
          CONSIGNES DE FORMATAGE STRICTES :
          1. Mets les TITRES et les MOTS CLÉS importants en GRAS (utilise la syntaxe Markdown **texte**).
          2. Ne JAMAIS utiliser de balises HTML dans tes réponses.
          3. Ne JAMAIS utiliser d'astérisques (*) pour les listes ou la décoration. L'astérisque ne doit servir QUE pour le gras (syntaxe **).
          4. Pour lister des étapes, des niveaux ou des points, utilise EXCLUSIVEMENT des bulles numériques rondes (①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧, ⑨, ⑩).
          5. Le texte doit être très AÉRÉ. Sépare bien tes paragraphes par des doubles sauts de ligne pour une lecture mobile optimale.
          6. N'utilise pas de caractères spéciaux trop complexes en dehors des bulles numériques.
          
          SPHINX Consulting est un cabinet de conseil spécialisé en Stratégie, Innovation et IA.`,
        }
      });

      const response = await model;
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't process that.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-sphinx-black relative">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-white/10 glass-card rounded-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-sphinx-red">
            <img src={ASSETS.LOGO} alt="Sphinx Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Sphinx-AI</h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-white/60">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium hover:bg-white/20 transition-colors"
        >
          <Globe size={14} />
          {t.switchLang}
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-sphinx-red' : 'bg-white/10 border border-sphinx-red/30'}`}>
                  {msg.role === 'user' ? (
                    <User size={16} />
                  ) : (
                    <img src={ASSETS.LOGO} alt="Sphinx" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-sphinx-red text-white rounded-tr-none' 
                    : 'bg-white/10 text-white/90 rounded-tl-none border border-white/5'
                }`}>
                  <ReactMarkdown 
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-2 items-center bg-white/5 p-3 rounded-2xl rounded-tl-none">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 pb-24">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-4 pr-14 text-sm focus:outline-none focus:border-sphinx-red/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2.5 bg-sphinx-red text-white rounded-xl disabled:opacity-50 active:scale-90 transition-transform"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
