'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface NextViewProps {
  selectedForm: number;
  files: File[];
}

const formTypes = ['W-4', "Driver's License", 'SNAP'];

const NextView = ({ selectedForm, files }: NextViewProps) => {
  const [analyzedFiles, setAnalyzedFiles] = useState<Set<number>>(new Set());
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const pdfUrl = '/DL.pdf';  


  useEffect(() => {
    files.forEach((_, index) => {
      setTimeout(() => {
        setAnalyzedFiles(prev => new Set([...prev, index]));
        if (index === files.length - 1) {
          setTimeout(() => setIsAnalyzing(false), 1000);
        }
      }, (index + 1) * 2000);
    });
  }, [files]);

  return (
    <div className="flex h-screen w-full bg-black">
      {/* Left Side - Chat Interface */}
      <div className="w-1/2 bg-gradient-to-br from-black via-purple-900/20 to-black relative">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnalyzing ? 1 : 0 }}
          className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center"
        >
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-6">Analyzing Documents</h2>
            <div className="space-y-4">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between bg-black/40 border border-purple-500/20 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span className="text-gray-300">{file.name}</span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {analyzedFiles.has(index) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Check className="text-purple-400" size={20} />
                      </motion.div>
                    ) : (
                      <Loader2 className="animate-spin text-purple-400/50" size={20} />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnalyzing ? 0 : 1 }}
          transition={{ delay: 0.5 }}
          className="h-full flex flex-col p-4"
        >
          <div className="flex-grow bg-black/40 border border-purple-500/20 rounded-lg p-4 mb-4 overflow-y-auto">
            <div className="text-gray-300">
              Analysis complete! How can I help you with your {formTypes[selectedForm]}?
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow p-2 rounded-lg bg-black/40 text-white border border-purple-500/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-colors"
            />
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Send
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Side - PDF Viewer */}
      <div className="w-1/2 bg-gradient-to-br from-black via-purple-900/20 to-black p-4">
        <div className="h-full bg-black/40 border border-purple-500/20 rounded-lg overflow-hidden">
          <object
            data={pdfUrl}
            type="https://www.dps.texas.gov/internetforms/forms/dl-14a.pdf"
            className="w-full h-full"
            style={{
              border: 'none',
              background: 'transparent',
            }}
          >
            <embed
              src="https://www.dps.texas.gov/internetforms/forms/dl-14a.pdf"
              type="application/pdf"
              className="w-full h-full"
              style={{
                border: 'none',
                background: 'transparent',
              }}
            />
            <p className="text-gray-400 text-center">
              Unable to load PDF viewer.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
};

export default NextView;