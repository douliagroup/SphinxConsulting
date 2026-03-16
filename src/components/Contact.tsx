import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { CONTENT } from '../constants';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual feedback for haptic feel
    const btn = e.currentTarget.querySelector('button');
    if (btn) {
      btn.classList.add('animate-ping');
      setTimeout(() => btn.classList.remove('animate-ping'), 500);
    }
    alert(lang === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
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
        </div>
      </div>
    </div>
  );
};
