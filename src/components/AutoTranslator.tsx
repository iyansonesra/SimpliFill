import { useState, useEffect } from 'react';

const AutoTranslator = ({ defaultLanguage = 'es', children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

  useEffect(() => {
    // Set the HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Add Google Translate script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/google-translate-element/1.0.0/element.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google Translate
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'auto',
          includedLanguages: currentLanguage,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: true,
        }, 'google_translate_element');
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [currentLanguage]);

  return (
    <div className="w-full">
      <div id="google_translate_element" className="mb-4" />
      <div className="translation-content">
        {children}
      </div>
    </div>
  );
};

export default AutoTranslator;