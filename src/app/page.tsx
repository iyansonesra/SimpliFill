"use client";
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiX, FiFile, FiUser, FiFolder, FiFileText, FiBell } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Amplify } from 'aws-amplify';
import { post } from "aws-amplify/api";
import logo from '../assets/SimpliFill.png';
import useTranslation from '@/components/useTranslation';
import Profile from '@/components/Profile';
import Documents from '@/components/Documents';
import Forms from '@/components/Forms';

// Keeping your existing Amplify configuration
Amplify.configure({
  API: {
    REST: {
      LLAMA_API: {
        endpoint: 'https://qu3mo7nsml.execute-api.us-east-1.amazonaws.com/prod',
        region: 'us-east-1'
      }
    }
  },
});

const formTypes = ['W-4', "Driver's License", 'SNAP'];

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Français', code: 'fr' },
  { name: 'Español', code: 'es' },
  { name: 'Русский', code: 'ru' },
  { name: '中文', code: 'zh' },
  { name: 'اردو', code: 'ur' },
  { name: 'العربية', code: 'ar' },
  { name: '한국어', code: 'ko' },
  { name: '日本語', code: 'ja' },
  { name: 'Deutsch', code: 'de' }
];


const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${active
      ? 'text-white border-r-2 border-purple-500 bg-purple-500/10'
      : 'text-white/70 hover:text-white hover:bg-purple-500/5'
      }`}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

// Keeping your existing handleFileUpload function
const handleFileUpload = async (file: File) => {
  try {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const base64String = reader.result as string;
          const response = await post({
            apiName: 'LLAMA_API',
            path: '/data',
            options: {
              headers: { 'Content-Type': 'application/json' },
              body: { file: base64String, fileName: file.name }
            }
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default function Dashboard() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedForm, setSelectedForm] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('forms');

  const { t } = useTranslation(language);


  const navigationItems = [
    { id: 'profile', label: t('yourProfile'), icon: FiUser },
    { id: 'documents', label: t('documents'), icon: FiFolder },
    { id: 'forms', label: t('forms'), icon: FiFileText }
  ];



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      try {
        const uploadPromises = acceptedFiles.map(file => handleFileUpload(file));
        await Promise.all(uploadPromises);
        setFiles(prev => [...prev, ...acceptedFiles]);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    },
    multiple: true
  });

  const removeFile = async (index: number) => {
    try {
      setFiles(files.filter((_, i) => i !== index));
      try {
        await post({
          apiName: 'LLAMA_API',
          path: '/data/remove',
          options: {
            headers: { 'Content-Type': 'application/json' },
            body: { fileName: files[index].name }
          }
        });
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    } catch (error) {
      console.error('Error removing file:', error);
    }
  };

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language.name);
    setLanguage(language.code);
    setIsLanguageDropdownOpen(false);
  };

  const handleContinue = () => {
    setShowMainContent(true);
  };

  // Language selection screen
  if (!showMainContent) {
    return (
      <div className="min-h-screen w-full bg-purple-400 overflow-hidden relative flex flex-col items-center justify-center">

        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl font-bold text-white mb-2 relative flex-col "
        >
          <img src={logo.src} width="600" height="auto" alt="SimpliFill Logo" />

        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative w-64 z-10"
        >
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="w-full bg-purple-900/30 text-white px-4 py-3 rounded-lg flex items-center justify-between hover:bg-purple-900/40 transition-colors border border-purple-500/30 backdrop-blur-sm"
          >
            <span>{selectedLanguage}</span>
            <ChevronDown className={`transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLanguageDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-2 w-full bg-purple-900/30 border border-purple-500/30 rounded-lg overflow-hidden backdrop-blur-sm z-50"
            >
              <ScrollArea className="h-48 w-full z-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    className="w-full px-4 py-2 text-left text-white hover:bg-purple-500/30 transition-colors"
                  >
                    {lang.name}
                  </button>
                ))}
              </ScrollArea>
            </motion.div>
          )}
        </motion.div>

        <motion.button
          onClick={handleContinue}
          className="mt-8 flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors relative z-0"
        >
          {t('continue')}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  const TabContent = () => {
    switch (activeTab) {
      case 'forms':
        return <Forms
          language={language}
          files={files}
          setFiles={setFiles}
          handleFileUpload={handleFileUpload}
          removeFile={removeFile}
          formTypes={formTypes}
          selectedForm={selectedForm}
          setSelectedForm={setSelectedForm}
        />;
      case 'profile':
        return <Profile language={language} />;
      case 'documents':
        return <Documents language={language} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-h-screen min-h-screen bg-black bg-gradient-to-br from-black via-purple-900/20 to-black flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 border-b border-purple-500/20 overflow-hidden">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-4">
            <img src={logo.src}
              className="h-10 w-auto absolute left-[-2%]"
              width="160"
              height="auto"
              alt="SimpliFill Logo"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 text-purple-400 hover:text-purple-300 transition-colors">
              <FiBell className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-48 bg-black border-r border-purple-500/20">
          <nav className="flex flex-col">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 text-left text-white hover:bg-purple-500/20 transition-colors flex items-center gap-3
                ${activeTab === id ? 'bg-purple-500/20 rounded-2xl px-2' : ''}`}
              >
                <Icon className="w-5 h-5 text-purple-400" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <TabContent />
        </div>
      </div>
    </div>
  );
}