import React from 'react';
import { motion } from 'motion/react';
import { AIScanImage } from './AIScanImage';
import { CONTENT } from '../constants';
import { Language } from '../types';
import { MessageSquare } from 'lucide-react';

interface ExpertiseProps {
  lang: Language;
  onAskAI?: (prompt: string) => void;
}

export const Expertise: React.FC<ExpertiseProps> = ({ lang, onAskAI }) => {
  const t = CONTENT[lang].expertise;

  return (
    <div className="p-6 pb-24 space-y-8 overflow-y-auto h-full no-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-sphinx-red mb-2">{t.title}</h1>
        <p className="text-white/60 text-sm leading-relaxed">{t.subtitle}</p>
      </motion.div>

      <div className="space-y-6">
        {t.domains.map((domain, idx) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-4 flex flex-col gap-4"
          >
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 shrink-0">
                <AIScanImage src={domain.image} alt={domain.title} className="w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight">{domain.title}</h3>
                <p className="text-white/60 text-xs mt-1">{domain.desc}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {domain.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-1 bg-sphinx-red/10 text-sphinx-red border border-sphinx-red/20 rounded-full font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end pt-2 border-t border-white/5">
                <button 
                  onClick={() => onAskAI?.(`Parle-moi de votre expertise en : ${domain.title}. ${domain.desc}`)}
                  className="flex items-center gap-1 text-sphinx-red text-[10px] font-bold uppercase hover:underline"
                >
                  <MessageSquare size={12} />
                  {lang === 'fr' ? 'EN SAVOIR PLUS ?' : 'LEARN MORE ?'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 glass-card border-sphinx-red/20 bg-sphinx-red/5"
      >
        <p className="text-center italic text-sm text-white/80">
          "L'excellence n'est pas un acte, mais une habitude."
        </p>
      </motion.div>
    </div>
  );
};
