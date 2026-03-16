import React from 'react';
import { motion } from 'motion/react';
import { AIScanImage } from './AIScanImage';
import { CONTENT } from '../constants';
import { Language } from '../types';

interface ExpertiseProps {
  lang: Language;
}

export const Expertise: React.FC<ExpertiseProps> = ({ lang }) => {
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
        {t.experts.map((expert, idx) => (
          <motion.div
            key={expert.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-4 flex gap-4 items-center"
          >
            <div className="w-20 h-20 shrink-0">
              <AIScanImage src={expert.image} alt={expert.name} className="w-full h-full" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{expert.name}</h3>
              <p className="text-sphinx-red text-xs font-semibold uppercase tracking-wider mb-1">{expert.title}</p>
              <p className="text-white/50 text-xs">{expert.specialty}</p>
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
