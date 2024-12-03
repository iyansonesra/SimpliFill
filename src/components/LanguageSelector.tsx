import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageSelector = ({ onLanguageSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [canContinue, setCanContinue] = useState(false);

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Español', code: 'es' },
    { name: 'Русский', code: 'ru' },
    { name: '中文', code: 'zh' },
    { name: 'اردو', code: 'ur' },
    { name: 'العربية', code: 'ar' },
    { name: '한국어', code: 'ko' },
    { name: '日本語', code: 'ja' },
    { name: 'Deutsch', code: 'de' }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsOpen(false);
    setCanContinue(true);
    onLanguageSelect(language.code);
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-900/20 to-black flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold text-white mb-12"
      >
        SimpliFill
      </motion.h1>

      <div className="relative w-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-purple-900/30 text-white px-4 py-3 rounded-lg flex items-center justify-between hover:bg-purple-900/40 transition-colors border border-purple-500/30"
          >
            <span>{selectedLanguage}</span>
            <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-2 w-full bg-purple-900/30 border border-purple-500/30 rounded-lg overflow-hidden backdrop-blur-sm"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className="w-full px-4 py-2 text-left text-white hover:bg-purple-500/30 transition-colors"
                >
                  {language.name}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: canContinue ? 1 : 0.5 }}
        onClick={() => canContinue && onLanguageSelect(languages.find(l => l.name === selectedLanguage).code)}
        className={`mt-8 flex items-center gap-2 px-6 py-3 rounded-lg ${canContinue
            ? 'bg-purple-600 hover:bg-purple-500 cursor-pointer'
            : 'bg-purple-900/30 cursor-not-allowed'
          } text-white transition-colors`}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default LanguageSelector;