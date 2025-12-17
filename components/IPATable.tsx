import React from 'react';
import { Volume2, Youtube, AlertTriangle } from 'lucide-react';
import { IPASymbol, IPASection } from '../types';

interface IPATableProps {
  symbols: IPASymbol[];
  playAudio: (e: React.MouseEvent, word: string) => void;
  onSelect: (symbol: IPASymbol) => void;
}

const SECTIONS: IPASection[] = ['Vowels', 'Diphthongs', 'Consonants'];

const IPATable: React.FC<IPATableProps> = ({ symbols, playAudio, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-300">
      {SECTIONS.map((section) => {
        const sectionSymbols = symbols.filter(s => s.section === section);
        if (sectionSymbols.length === 0) return null;

        return (
          <div key={section} className="border-b last:border-b-0 border-slate-200">
             <div className="bg-slate-50/80 backdrop-blur px-6 py-4 border-b border-slate-100 sticky top-0 z-10">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    {section}
                    <span className="text-xs font-normal text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                        {sectionSymbols.length}
                    </span>
                </h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                 <thead>
                   <tr className="bg-white text-slate-400 text-xs uppercase tracking-wider">
                     <th className="px-6 py-3 font-medium w-24">Symbol</th>
                     <th className="px-4 py-3 font-medium w-16 text-center">Video</th>
                     <th className="px-6 py-3 font-medium w-1/3">Examples</th>
                     <th className="px-6 py-3 font-medium">Pronunciation Tip (Chinese)</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {sectionSymbols.map((symbol) => (
                     <tr 
                        key={symbol.symbol} 
                        className={`hover:bg-indigo-50/30 transition-colors group cursor-pointer ${symbol.isDifficult ? 'bg-amber-50/30' : ''}`}
                        onClick={() => onSelect(symbol)}
                     >
                       {/* Symbol Column */}
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                             <button 
                                onClick={(e) => playAudio(e, symbol.sound)}
                                className="text-2xl font-serif font-bold text-slate-800 hover:text-indigo-600 transition-colors p-1 rounded-md active:scale-95"
                                title="Play Sound"
                                >
                                {symbol.symbol}
                             </button>
                             {symbol.isDifficult && (
                                <span className="text-amber-500" title="Difficult sound for Chinese speakers">
                                    <AlertTriangle size={16} />
                                </span>
                             )}
                         </div>
                       </td>

                       {/* Video Column */}
                       <td className="px-4 py-4 text-center">
                         <a 
                            href={`https://youtu.be/${symbol.youtubeId}?t=${symbol.videoStartTime || 0}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            onClick={(e) => e.stopPropagation()}
                            title="Watch Video Lesson"
                         >
                            <Youtube size={22} />
                         </a>
                       </td>

                       {/* Examples Column */}
                       <td className="px-6 py-4">
                         <div className="flex flex-wrap gap-2">
                            {symbol.examples.map((ex, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => playAudio(e, ex.word)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-900 rounded-md transition-colors text-xs font-medium border border-slate-200 hover:border-teal-200 flex items-center gap-1.5 group/btn"
                                    title={`Play "${ex.word}"`}
                                >
                                    <span>{ex.word}</span>
                                    <span className="text-slate-400 group-hover/btn:text-teal-600 font-serif opacity-70">
                                        {ex.transcription}
                                    </span>
                                </button>
                            ))}
                         </div>
                       </td>

                       {/* Tips Column */}
                       <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5">
                             {symbol.isDifficult && (
                                 <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-700 w-fit">
                                    Difficulty
                                 </span>
                             )}
                             <p className="text-slate-600 text-sm leading-relaxed">
                                {symbol.chineseTip}
                             </p>
                          </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        );
      })}
    </div>
  );
};

export default IPATable;
