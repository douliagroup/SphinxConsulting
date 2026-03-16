import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, ChevronDown, Globe } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';

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

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  const [form, setForm] = useState({ name: '', firstName: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual feedback for haptic feel
    const btn = e.currentTarget.querySelector('button');
    if (btn) {
      btn.classList.add('animate-ping');
      setTimeout(() => btn.classList.remove('animate-ping'), 500);
    }
    alert(lang === 'fr' ? 'Demande envoyée avec succès !' : 'Request sent successfully!');
    setForm({ name: '', firstName: '', email: '', message: '' });
  };

  return (
    <div className="p-6 pb-24 space-y-8 overflow-y-auto h-full no-scrollbar">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-bold text-sphinx-red mb-2">{t.title}</h1>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-white/40 ml-1">{t.name}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-sphinx-red/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-white/40 ml-1">{t.firstName}</label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={e => setForm({...form, firstName: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-sphinx-red/50 transition-colors"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-white/40 ml-1">{t.email}</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-sphinx-red/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-white/40 ml-1">{t.message}</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-sphinx-red/50 transition-colors resize-none"
          />
        </div>
        <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
          <Send size={18} />
          {t.send}
        </button>
      </form>

      <div className="space-y-6 pt-4">
        <h2 className="text-xl font-bold border-l-4 border-sphinx-red pl-4">{t.info}</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 glass-card p-4">
            <MapPin className="text-sphinx-red shrink-0" size={20} />
            <p className="text-sm text-white/70">{t.address}</p>
          </div>
          <div className="flex items-center gap-4 glass-card p-4">
            <Phone className="text-sphinx-red shrink-0" size={20} />
            <p className="text-sm text-white/70">{t.phone}</p>
          </div>
          <div className="flex items-center gap-4 glass-card p-4">
            <Mail className="text-sphinx-red shrink-0" size={20} />
            <p className="text-sm text-white/70">{t.emailAddr}</p>
          </div>
          <div className="flex items-center gap-4 glass-card p-4">
            <Globe className="text-sphinx-red shrink-0" size={20} />
            <p className="text-sm text-white/70">{t.web}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
