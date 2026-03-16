import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Shield, Zap, Target, CheckCircle2, FileText, MessageSquare } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';
import { Brochure } from './Brochure';
import { AnimatePresence } from 'motion/react';

interface InternationalProps {
  lang: Language;
  onAskAI?: (prompt: string) => void;
}

export const International: React.FC<InternationalProps> = ({ lang, onAskAI }) => {
  const t = CONTENT[lang].international;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const [email, setEmail] = useState('');

  const handleBrochureRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowBrochure(true);
    }, 1000);
  };

  const icons = [<Shield size={24} />, <Globe size={24} />, <Zap size={24} />, <Target size={24} />];

  return (
    <div className="p-6 pb-24 space-y-12 overflow-y-auto h-full no-scrollbar">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold text-sphinx-red leading-tight">{t.title}</h1>
        <p className="text-white/60 text-lg leading-relaxed">{t.subtitle}</p>
      </motion.div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 gap-4">
        {t.sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 flex gap-4 items-start group hover:border-sphinx-red/30 transition-all"
          >
            <div className="p-3 rounded-2xl bg-sphinx-red/10 text-sphinx-red group-hover:scale-110 transition-transform">
              {icons[idx]}
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{section.title}</h3>
                <button 
                  onClick={() => onAskAI?.(`Explique-moi votre rôle international concernant : ${section.title}. ${section.desc}`)}
                  className="flex items-center gap-1 text-sphinx-red text-[10px] font-bold uppercase hover:underline"
                >
                  <MessageSquare size={12} />
                  Sphinx-AI
                </button>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">{section.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-sphinx-red pl-4">{t.projects.title}</h2>
        <div className="space-y-3">
          {t.projects.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5"
            >
              <CheckCircle2 size={18} className="text-sphinx-red shrink-0" />
              <span className="text-sm text-white/80">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partner Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 border-sphinx-red/20 bg-gradient-to-br from-sphinx-red/10 to-transparent space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{t.partner.title}</h2>
          <p className="text-sm text-white/60">{t.partner.desc}</p>
        </div>
        
        <form onSubmit={handleBrochureRequest} className="space-y-4">
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-sphinx-red/50 transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4"
          >
            <FileText size={18} />
            {isSubmitting ? (lang === 'fr' ? 'Génération...' : 'Generating...') : t.partner.btn}
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showBrochure && (
          <Brochure lang={lang} onClose={() => setShowBrochure(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
