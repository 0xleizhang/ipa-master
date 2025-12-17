import React from 'react';
import { X, Volume2, Youtube, BookOpen, Layers, MessageCircle } from 'lucide-react';
import { IPASymbol } from '../types';
import PronunciationTester from './PronunciationTester';

interface IPADetailProps {
  symbol: IPASymbol;
  onClose: () => void;
  playAudio: (e: React.MouseEvent | React.TouchEvent, word: string) => void;
  apiKey: string;
}

const IPADetail: React.FC<IPADetailProps> = ({ symbol, onClose, playAudio, apiKey }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <div 
                    className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-3xl font-serif font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    onClick={(e) => playAudio(e, symbol.sound)}
                    title="Click to hear sound"
                >
                    {symbol.symbol}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{symbol.name}</h2>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <span>{symbol.category}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className={`${symbol.voicing === 'Voiceless' ? 'text-indigo-500' : 'text-teal-600'} font-medium`}>
                            {symbol.voicing}
                        </span>
                    </div>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
            >
                <X size={24} />
            </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            
            {/* Description & Audio */}
            <section className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <Volume2 className="text-indigo-600" />
                    How to pronounce
                </h3>
                
                <p className="text-slate-700 text-lg mb-4">{symbol.description}</p>
                
                {/* Chinese Tip */}
                <div className="bg-white/80 border border-indigo-100 rounded-lg p-4 mb-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageCircle size={16} className="text-amber-500" />
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pronunciation Tip (Chinese)</span>
                    </div>
                    <p className="text-slate-800 font-medium">{symbol.chineseTip}</p>
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={(e) => playAudio(e, symbol.sound)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
                    >
                        <Volume2 size={18} />
                        Hear /{symbol.symbol}/
                    </button>
                    <button 
                        onClick={(e) => playAudio(e, symbol.exampleWord)}
                        className="flex items-center gap-2 bg-white border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors font-medium shadow-sm"
                    >
                        <Volume2 size={18} />
                        Hear Word "{symbol.exampleWord}"
                    </button>
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Examples & Spelling */}
                <div className="space-y-8">
                    {/* Common Words */}
                    <section>
                         <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <BookOpen size={20} className="text-teal-600" />
                            Common Words
                        </h3>
                        <div className="space-y-3">
                            {symbol.examples.map((ex, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-800 text-lg">{ex.word}</span>
                                        <span className="text-slate-400 font-mono text-sm">{ex.transcription}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => playAudio(e, ex.word)}
                                        className="p-2 text-slate-400 hover:text-teal-600"
                                    >
                                        <Volume2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Common Spellings */}
                    <section>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <Layers size={20} className="text-amber-600" />
                            Common Spellings
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {symbol.commonSpellings.map((spelling, idx) => (
                                <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-100 rounded-md font-mono font-medium">
                                    {spelling}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Example Sentence */}
                    <section className="bg-slate-50 p-4 rounded-lg border-l-4 border-teal-500">
                         <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Example Sentence</h4>
                         <p className="text-lg text-slate-800 italic">"{symbol.sentence}"</p>
                    </section>
                </div>

                {/* Right Column: Video & Practice */}
                <div className="space-y-8">
                    {/* Video Embed */}
                    <section>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Youtube size={20} className="text-red-600" />
                            Video Lesson
                        </h3>
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${symbol.youtubeId}?rel=0&start=${symbol.videoStartTime || 0}`} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>

                    {/* AI Tester */}
                    <PronunciationTester symbol={symbol} apiKey={apiKey} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IPADetail;
