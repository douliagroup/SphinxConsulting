import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  typeformId?: string; // ID du formulaire Typeform (ex: "abc123")
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose, typeformId = "s8cSIsIH" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl h-[80vh] bg-sphinx-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-white/10 bg-white/5">
              <h2 className="font-bold text-lg text-sphinx-red">Audit Stratégique</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 w-full h-full relative">
              <iframe
                src={`https://form.typeform.com/to/${typeformId}?typeform-embed=embed-widget`}
                className="absolute inset-0 w-full h-full border-none"
                title="Audit Typeform"
                allow="camera; microphone; autoplay; encrypted-media;"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
