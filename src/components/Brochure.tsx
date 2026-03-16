import React from 'react';
import { motion } from 'motion/react';
import { X, Download, Printer, FileText, Award, Globe, Zap, Shield } from 'lucide-react';
import { ASSETS, CONTENT } from '../constants';
import { Language } from '../types';

interface BrochureProps {
  lang: Language;
  onClose: () => void;
}

export const Brochure: React.FC<BrochureProps> = ({ lang, onClose }) => {
  const t = CONTENT[lang];

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden"
    >
      {/* Toolbar - Hidden on Print */}
      <div className="p-4 flex justify-between items-center border-b border-white/10 bg-sphinx-black print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="text-sphinx-red" />
          <span className="font-bold text-sm">Brochure Corporate - SPHINX Consulting</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrint}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            title="Imprimer / Sauvegarder en PDF"
          >
            <Printer size={20} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-sphinx-red text-white hover:bg-red-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Brochure Content */}
      <div className="flex-1 overflow-y-auto bg-white text-black p-8 md:p-16 print:p-0 print:overflow-visible">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-4 border-sphinx-red pb-8">
            <div className="space-y-4">
              <img src={ASSETS.LOGO} alt="Sphinx Logo" className="h-20 w-auto" />
              <h1 className="text-4xl font-black uppercase tracking-tighter text-sphinx-red">
                Sphinx Consulting
              </h1>
              <p className="text-xl font-medium text-gray-600 italic">
                {lang === 'fr' ? "L'Excellence Stratégique au Service de l'Afrique" : "Strategic Excellence for Africa"}
              </p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Mbanya, Douala</p>
              <p>Cameroun</p>
              <p>www.sphinxconsulting.cm</p>
            </div>
          </div>

          {/* Intro */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-sphinx-red">
              <Award size={24} />
              {t.about.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              {t.about.intro}
            </p>
          </section>

          {/* Expertise Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-l-8 border-sphinx-red pl-4">
              {t.expertise.title}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {t.expertise.domains.map((domain, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <h3 className="font-bold text-sphinx-red mb-2">{domain.title}</h3>
                  <p className="text-xs text-gray-600">{domain.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Innovation */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-l-8 border-sphinx-red pl-4">
              {t.innovation.title}
            </h2>
            <div className="space-y-4">
              {t.innovation.solutions.map((sol, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-2 bg-sphinx-red text-white rounded-lg">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{sol.title}</h3>
                    <p className="text-sm text-gray-600">{sol.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* International */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold border-l-8 border-sphinx-red pl-4">
              {t.international.title}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {t.international.sections.map((section, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <Globe size={18} className="text-sphinx-red shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm">{section.title}</h4>
                    <p className="text-xs text-gray-500">{section.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer / Contact */}
          <div className="mt-20 pt-8 border-t border-gray-200 flex justify-between items-end">
            <div className="space-y-2 text-xs text-gray-500">
              <p className="font-bold text-black uppercase">Sphinx Consulting - Direction Générale</p>
              <p>Email: {t.contact.emailAddr}</p>
              <p>Tel: {t.contact.phone}</p>
            </div>
            
            {/* PDF Mention for download incentive */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-sphinx-red font-black text-2xl opacity-20">
                <Download size={24} />
                <span>PDF</span>
              </div>
              <p className="text-[10px] text-gray-400 italic">
                {lang === 'fr' ? "Document officiel optimisé pour l'archivage numérique" : "Official document optimized for digital archiving"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action for Mobile - Hidden on Print */}
      <div className="fixed bottom-8 right-8 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-sphinx-red text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
        >
          <Download size={20} />
          {lang === 'fr' ? "Télécharger PDF" : "Download PDF"}
        </button>
      </div>
    </motion.div>
  );
};
