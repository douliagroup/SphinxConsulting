import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Globe, User, Mic, MicOff, MessageSquare, History, Phone, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { ASSETS, CONTENT } from '../constants';
import { Language, Message } from '../types';
import { AuditModal } from './AuditModal';

interface ChatInterfaceProps {
  lang: Language;
  setLang: (lang: Language) => void;
  initialPrompt?: string | null;
  clearPrompt?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ lang, setLang, initialPrompt, clearPrompt }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('sphinx_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      } catch (e) {
        return [{ id: '1', role: 'assistant', content: CONTENT[lang].chat.welcome, timestamp: new Date() }];
      }
    }
    return [{ id: '1', role: 'assistant', content: CONTENT[lang].chat.welcome, timestamp: new Date() }];
  });
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const t = CONTENT[lang].chat;

  const handleSummarize = async () => {
    if (messages.length < 2) return;
    
    setIsSummarizing(true);
    setIsTyping(true);

    const conversationHistory = messages
      .map(m => `${m.role === 'user' ? 'Utilisateur' : 'Sphinx-AI'}: ${m.content}`)
      .join('\n\n');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: `Fais un résumé synthétique et professionnel de notre conversation ci-dessous. 
        Le résumé doit être clair pour la direction du cabinet SPHINX.
        Termine en invitant l'utilisateur à cliquer sur le bouton WhatsApp pour finaliser l'échange avec la direction.
        
        CONVERSATION :
        ${conversationHistory}`,
        config: {
          systemInstruction: "Tu es Sphinx-AI. Ton rôle est de synthétiser les besoins de l'utilisateur pour faciliter la prise de contact avec la direction de SPHINX Consulting.",
        }
      });

      const response = await model;
      const summary = response.text || "Résumé indisponible.";
      
      const aiMsg: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: summary,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Summary Error:", error);
    } finally {
      setIsSummarizing(false);
      setIsTyping(false);
    }
  };

  const openWhatsApp = (content: string) => {
    const phone = "237672004201";
    const text = encodeURIComponent(`Bonjour SPHINX Consulting, voici le résumé de mon échange avec Sphinx-AI :\n\n${content}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  // Text to Speech Function
  const speak = (text: string) => {
    if (!isTtsEnabled) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    
    // Try to find a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      (v.lang.includes(lang === 'fr' ? 'fr' : 'en')) && 
      (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('aurelie') || v.name.toLowerCase().includes('thomas') === false)
    );
    
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.pitch = 1.1;
    utterance.rate = 0.95; // Slightly slower for professional emphasis
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (initialPrompt && !isTyping) {
      sendMessage(initialPrompt);
      clearPrompt?.();
    }
  }, [initialPrompt]);

  useEffect(() => {
    localStorage.setItem('sphinx_chat_history', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    // Speak the last message if it's from assistant
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && !isTyping) {
      speak(lastMessage.content.replace(/\*\*/g, '')); // Remove markdown bold for speech
    }
  }, [messages, isTyping]);

  // Voice Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Keep listening until manual stop
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = lang === 'fr' ? 'fr-FR' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInput(prev => prev + (prev ? ' ' : '') + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        // If we want it to truly never stop until send, we could restart it here if isListening is still true
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }
    
    // Load voices
    window.speechSynthesis.getVoices();
  }, [lang]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Stop listening when sending
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: text,
        config: {
          systemInstruction: `Tu es Sphinx-AI, l'assistant officiel de SPHINX Consulting. 
          Tu es professionnel, stratégique, empathique et serviable. 
          Réponds en ${lang === 'fr' ? 'français' : 'anglais'}.
          
          CONSIGNES DE FORMATAGE CRUCIALES :
          1. Mets TOUJOURS les TITRES et les MOTS CLÉS importants en GRAS (utilise la syntaxe Markdown **texte**).
          2. Ne JAMAIS utiliser de balises HTML dans tes réponses.
          3. Ne JAMAIS utiliser d'astérisques (*) pour les listes ou la décoration. L'astérisque ne doit servir QUE pour le gras (syntaxe **).
          4. Pour lister des étapes, des niveaux ou des points, utilise EXCLUSIVEMENT des bulles numériques rondes (①, ②, ③, ④, ⑤, ⑥, ⑦, ⑧, ⑨, ⑩).
          5. Le texte doit être très AÉRÉ. Sépare bien tes paragraphes par des doubles sauts de ligne.
          
          SPHINX Consulting est un cabinet de conseil spécialisé en Stratégie, Innovation et IA.`,
        }
      });

      const response = await model;
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "Désolé, je n'ai pas pu traiter votre demande.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-sphinx-black relative">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-white/10 glass-card rounded-none z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-sphinx-red">
            <img src={ASSETS.LOGO} alt="Sphinx Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Sphinx Consulting</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-white/60">Sphinx-AI Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsTtsEnabled(!isTtsEnabled);
              if (isTtsEnabled) window.speechSynthesis.cancel();
            }}
            className={`p-2 rounded-full transition-all ${isTtsEnabled ? 'bg-sphinx-red text-white' : 'bg-white/5 text-white/40'}`}
            title={isTtsEnabled ? "Désactiver la voix" : "Activer la voix"}
          >
            {isTtsEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button 
            onClick={() => setIsAuditOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-sphinx-red text-white text-xs font-bold hover:bg-red-700 transition-all active:scale-95 shadow-[0_0_15px_rgba(227,30,36,0.3)]"
          >
            <Globe size={14} />
            {t.switchLang}
          </button>
        </div>
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
                <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10 border border-white/10' : 'bg-white/10 border border-sphinx-red/30'}`}>
                  {msg.role === 'user' ? (
                    <img src={ASSETS.USER_ICON} alt="User" className="w-full h-full object-cover" />
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
                      strong: ({node, ...props}) => <strong className="font-bold text-sphinx-red" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>

                  {/* WhatsApp Button for Summaries */}
                  {msg.role === 'assistant' && (msg.content.toLowerCase().includes('résumé') || msg.content.toLowerCase().includes('summary')) && (
                    <button 
                      onClick={() => openWhatsApp(msg.content)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-[#25D366] text-white rounded-xl font-bold text-xs hover:scale-[1.02] transition-transform"
                    >
                      <Phone size={14} />
                      {lang === 'fr' ? 'Contacter la Direction (WhatsApp)' : 'Contact Management (WhatsApp)'}
                    </button>
                  )}
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

      {/* Summary Action Button */}
      {messages.length >= 2 && !isTyping && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 flex justify-center"
        >
          <button 
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <History size={14} />
            {lang === 'fr' ? 'Résumer & Contacter la Direction' : 'Summarize & Contact Management'}
          </button>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="p-4 pb-24">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:border-sphinx-red/50 transition-colors"
            />
            <button
              onClick={toggleListening}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                isListening ? 'text-sphinx-red bg-sphinx-red/10 animate-pulse' : 'text-white/40 hover:text-white'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3.5 bg-sphinx-red text-white rounded-2xl disabled:opacity-50 active:scale-90 transition-transform shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[8px] text-center mt-2 text-white/20 uppercase tracking-[0.2em] font-bold">
          Propulsé par Doulia
        </p>
      </div>

      <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
    </div>
  );
};
