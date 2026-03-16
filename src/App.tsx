import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatInterface } from './components/ChatInterface';
import { Expertise } from './components/Expertise';
import { Innovation } from './components/Innovation';
import { Values } from './components/Values';
import { Contact } from './components/Contact';
import { BottomNav } from './components/BottomNav';
import { Language, Tab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [lang, setLang] = useState<Language>('fr');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <ChatInterface lang={lang} setLang={setLang} />;
      case 'expertise':
        return <Expertise lang={lang} />;
      case 'solutions':
        return <Innovation lang={lang} />;
      case 'values':
        return <Values lang={lang} />;
      case 'contact':
        return <Contact lang={lang} />;
      default:
        return <ChatInterface lang={lang} setLang={setLang} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-sphinx-black overflow-hidden relative shadow-2xl">
      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-sphinx-red/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-sphinx-red/20 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
