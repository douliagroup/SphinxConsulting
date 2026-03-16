import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Briefcase, Rocket, ShieldCheck, Mail } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <MessageSquare size={20} />, label: 'AI' },
    { id: 'expertise', icon: <Briefcase size={20} />, label: 'Expertise' },
    { id: 'solutions', icon: <Rocket size={20} />, label: 'Solutions' },
    { id: 'values', icon: <ShieldCheck size={20} />, label: 'Valeurs' },
    { id: 'contact', icon: <Mail size={20} />, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-sphinx-black/80 backdrop-blur-xl border-t border-white/10 px-4 pb-8 pt-3 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all relative ${
              activeTab === tab.id ? 'text-sphinx-red' : 'text-white/40'
            }`}
          >
            <motion.div
              whileTap={{ scale: 0.8, rotate: 5 }}
              className="p-1"
            >
              {tab.icon}
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-1 w-1 h-1 bg-sphinx-red rounded-full shadow-[0_0_10px_#E31E24]"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
