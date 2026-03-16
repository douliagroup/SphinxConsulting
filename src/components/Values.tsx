import React from 'react';
import { motion } from 'motion/react';
import { Shield, Star, Lightbulb, Users } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';

interface ValuesProps {
  lang: Language;
}

export const Values: React.FC<ValuesProps> = ({ lang }) => {
  const t = CONTENT[lang].values;

  const getIcon = (index: number) => {
    const icons = [
      <Star className="text-sphinx-red" size={32} />,
      <Shield className="text-sphinx-red" size={32} />,
      <Lightbulb className="text-sphinx-red" size={32} />,
      <Users className="text-sphinx-red" size={32} />
    ];
    return icons[index];
  };

  return (
    <div className="p-6 pb-24 space-y-8 overflow-y-auto h-full no-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-sphinx-red mb-6">{t.title}</h1>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {t.items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileTap={{ scale: 0.95, rotate: 1 }}
            className="glass-card p-6 flex flex-col items-center text-center space-y-4 aspect-square justify-center"
          >
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              {getIcon(idx)}
            </div>
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-8 glass-card bg-gradient-to-br from-sphinx-red/20 to-transparent border-sphinx-red/30"
      >
        <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
        <p className="text-sm text-white/70 leading-relaxed">
          Être le catalyseur de la transformation stratégique en Afrique et dans le monde, 
          en alliant rigueur académique (PhD) et agilité technologique.
        </p>
      </motion.div>
    </div>
  );
};
