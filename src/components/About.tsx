import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Award, Shield, Zap, Target } from 'lucide-react';
import { CONTENT, ASSETS } from '../constants';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-sm">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} className="text-sphinx-red" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = CONTENT[lang].about;
  const faqT = CONTENT[lang].contact; // Reusing FAQ from contact content
  const icons = [<Award size={24} />, <Shield size={24} />, <Zap size={24} />, <Target size={24} />];

  return (
    <div className="p-6 pb-24 space-y-12 overflow-y-auto h-full no-scrollbar">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold text-sphinx-red">{t.title}</h1>
        <div className="relative rounded-3xl overflow-hidden aspect-video mb-6 group">
          <img 
            src={ASSETS.DR_TOKO} 
            alt="Dr Jongwane TOKO" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold">Dr Jongwane TOKO</p>
            <p className="text-white/60 text-xs">Directeur Général - SPHINX Consulting</p>
          </div>
          <div className="ai-scan" />
        </div>
        <p className="text-white/80 leading-relaxed text-lg italic border-l-4 border-sphinx-red pl-6">
          "{t.intro}"
        </p>
      </motion.div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-l-4 border-sphinx-red pl-4">{faqT.faqTitle}</h2>
        <div className="space-y-2">
          {faqT.faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold border-l-4 border-sphinx-red pl-4">{t.values.title}</h2>
        <div className="grid grid-cols-2 gap-4">
          {t.values.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center space-y-3 hover:border-sphinx-red/50 transition-all"
            >
              <div className="p-3 rounded-2xl bg-sphinx-red/10 text-sphinx-red">
                {icons[idx]}
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider">{item.title}</h3>
              <p className="text-[10px] text-white/40 leading-tight">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
