import React, { useState, useEffect } from 'react';
import { Mic2, Info, Github, Settings, LayoutGrid, List } from 'lucide-react';
import { IPA_DATA } from './constants/ipaData';
import { IPASymbol, IPASection } from './types';
import IPAGrid from './components/IPAGrid';
import IPATable from './components/IPATable';
import IPADetail from './components/IPADetail';
import SettingsModal from './components/SettingsModal';
import LegalModal from './components/LegalModal';


const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<IPASection>('Vowels');
  const [selectedSymbol, setSelectedSymbol] = useState<IPASymbol | null>(null);
  const [groupingMode, setGroupingMode] = useState<'manner' | 'voicing'>('manner');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSettings, setShowSettings] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | null>(null);
  const [apiKey, setApiKey] = useState('');

  // Load API Key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
        setApiKey(storedKey);
    }
  }, []);

  // 查找 IPA 符号数据
  const findSymbolData = (word: string): IPASymbol | undefined => {
    return IPA_DATA.find(s => s.sound === word || s.exampleWord === word);
  };

  // Play audio using filename from IPA_DATA
  const playAudio = (e: React.MouseEvent | React.TouchEvent, word: string) => {
    e.stopPropagation();
    
    // Find the corresponding IPA symbol data
    const symbolData = findSymbolData(word);
    
    // If found and has filename, play the local MP3
    if (symbolData?.filename) {
      try {
        const audioPath = `/mp3/${symbolData.filename}.mp3`;
        const audio = new Audio(audioPath);
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Fallback to browser TTS on error
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-GB';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
          });
        }
        return;
      } catch {
        // Fallback on exception
      }
    }
    
    // Fallback to browser TTS
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-GB'; 
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('grid')}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              IPA
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-600 hidden sm:block">
              Master
            </h1>
          </div>
          
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
             {viewMode === 'grid' ? (
                // Section Tabs (Only visible in Grid mode)
                <nav className="flex gap-1">
                    {(['Vowels', 'Diphthongs', 'Consonants'] as IPASection[]).map((section) => (
                    <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                        activeSection === section
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {section}
                    </button>
                    ))}
                </nav>
             ) : (
                 <span className="px-4 py-1.5 text-sm font-medium text-slate-600">
                    Full List View
                 </span>
             )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
             {/* View Toggle */}
             <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all ${
                        viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Grid View"
                >
                    <LayoutGrid size={18} />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${
                        viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="List View"
                >
                    <List size={18} />
                </button>
             </div>

             <div className="w-px h-6 bg-slate-200 mx-1"></div>

             <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-all"
                title="Settings / API Key"
             >
                <Settings size={20} />
             </button>
             <a href="#" className="text-slate-400 hover:text-slate-600 p-2 hidden sm:block">
                <Github size={20} />
             </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {viewMode === 'grid' ? (
            <>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in slide-in-from-left-4 duration-300">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">{activeSection}</h2>
                        <p className="text-slate-500 max-w-2xl">
                            {activeSection === 'Vowels' && 'Sounds produced with an open vocal tract. No obstruction to the airflow.'}
                            {activeSection === 'Diphthongs' && 'Complex vowels that glide from one sound to another within the same syllable.'}
                            {activeSection === 'Consonants' && 'Sounds articulated with complete or partial closure of the vocal tract.'}
                        </p>
                    </div>
                    
                    {/* Toggle for Consonants Grouping */}
                    {activeSection === 'Consonants' && (
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                            <button
                                onClick={() => setGroupingMode('manner')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${
                                    groupingMode === 'manner' 
                                    ? 'bg-indigo-50 text-indigo-700' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                Manner
                            </button>
                            <div className="w-px h-4 bg-slate-200 mx-1"></div>
                            <button
                                onClick={() => setGroupingMode('voicing')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${
                                    groupingMode === 'voicing' 
                                    ? 'bg-indigo-50 text-indigo-700' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                Voicing
                            </button>
                        </div>
                    )}
                </div>

                <IPAGrid 
                    symbols={IPA_DATA} 
                    section={activeSection} 
                    groupingMode={groupingMode}
                    onSelect={setSelectedSymbol}
                    playAudio={playAudio}
                />
            </>
        ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Full IPA Chart</h2>
                    <p className="text-slate-500">A comprehensive list of all phonemes, examples, and pronunciation tips.</p>
                </div>
                <IPATable 
                    symbols={IPA_DATA}
                    playAudio={playAudio}
                    onSelect={setSelectedSymbol}
                />
            </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedSymbol && (
        <IPADetail 
            symbol={selectedSymbol} 
            onClose={() => setSelectedSymbol(null)}
            playAudio={playAudio}
            apiKey={apiKey}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)}
            apiKey={apiKey}
            setApiKey={setApiKey}
          />
      )}
      
      {/* Legal Page Modal */}
      {legalPage && (
          <LegalModal 
            page={legalPage}
            onClose={() => setLegalPage(null)}
          />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-8 mb-6 text-sm font-medium text-slate-500">
                <button 
                    onClick={() => setLegalPage('privacy')}
                    className="hover:text-indigo-600 transition-colors"
                >
                    Privacy Policy
                </button>
                <button 
                    onClick={() => setLegalPage('terms')}
                    className="hover:text-indigo-600 transition-colors"
                >
                    Terms of Service
                </button>
                <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} IPA Master. Built for learning.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
