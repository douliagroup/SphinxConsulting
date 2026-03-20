import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Share2, MessageSquare } from 'lucide-react';
import { AIScanImage } from './AIScanImage';
import { CONTENT, ASSETS } from '../constants';
import { Language } from '../types';

interface InnovationProps {
  lang: Language;
  onAskAI?: (prompt: string) => void;
}

export const Innovation: React.FC<InnovationProps> = ({ lang, onAskAI }) => {
  const t = CONTENT[lang].innovation;

  const getIcon = (id: string) => {
    switch (id) {
      case 'insight': return <Cpu className="text-sphinx-red" />;
      case 'process': return <Zap className="text-sphinx-red" />;
      case 'connect': return <Share2 className="text-sphinx-red" />;
      default: return <Cpu />;
    }
  };

  return (
    <div className="p-6 pb-24 space-y-8 overflow-y-auto h-full no-scrollbar">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AIScanImage src={ASSETS.INNOVATION} alt="Innovation Hub" className="h-48 mb-6" />
        <h1 className="text-3xl font-bold text-sphinx-red mb-2">{t.title}</h1>
      </motion.div>

      <div className="grid gap-6">
        {t.solutions.map((sol, idx) => (
          <motion.div
            key={sol.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {getIcon(sol.id)}
              </div>
              <h3 className="text-xl font-bold">{sol.title}</h3>
            </div>
            <p className="text-white/60 text-sm">{sol.description}</p>
            <div className="flex flex-wrap gap-2">
              {sol.features.map(f => (
                <span key={f} className="text-[10px] px-2 py-1 bg-sphinx-red/10 text-sphinx-red border border-sphinx-red/20 rounded-full font-bold uppercase">
                  {f}
                </span>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-white/5">
              <button 
                onClick={() => onAskAI?.(`Détaille-moi la solution d'innovation : ${sol.title}. ${sol.description}`)}
                className="flex items-center gap-1 text-sphinx-red text-[10px] font-bold uppercase hover:underline"
              >
                <MessageSquare size={12} />
                {lang === 'fr' ? 'EN SAVOIR PLUS ?' : 'LEARN MORE ?'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-40">
        <AIScanImage src={ASSETS.RESEARCH} alt="Research" className="h-full" />
      </div>
    </div>
  );
};
