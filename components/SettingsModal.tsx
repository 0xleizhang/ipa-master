import React, { useState, useEffect } from 'react';
import { X, Key, Check, AlertCircle } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, apiKey, setApiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(inputKey);
    localStorage.setItem('gemini_api_key', inputKey);
    setSaved(true);
    setTimeout(() => {
        setSaved(false);
        onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Key size={24} className="text-indigo-600" />
                API Settings
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                <X size={20} />
            </button>
        </div>

        <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-sm text-indigo-900">
                <div className="flex gap-2 items-start">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <p>
                        To use the AI Pronunciation Checker, you need a Google Gemini API Key. 
                        Your key is stored locally in your browser and sent directly to Google APIs.
                    </p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gemini API Key
                </label>
                <input 
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
            </div>

            <button 
                onClick={handleSave}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                    saved 
                    ? 'bg-green-600 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                }`}
            >
                {saved ? <><Check size={20} /> Saved</> : 'Save Settings'}
            </button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">
                    Get an API Key here
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
