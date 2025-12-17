import React from 'react';
import { Volume2 } from 'lucide-react';
import { IPASymbol } from '../types';

interface IPACardProps {
  symbol: IPASymbol;
  onClick: () => void;
  playAudio: (e: React.MouseEvent, word: string) => void;
}

const IPACard: React.FC<IPACardProps> = ({ symbol, onClick, playAudio }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 cursor-pointer p-4 flex flex-col items-center justify-between group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between w-full items-start mb-2">
         <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{symbol.name}</span>
         <button 
          onClick={(e) => playAudio(e, symbol.sound)}
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-teal-600 transition-colors"
          title={`Listen to sound /${symbol.symbol}/`}
         >
           <Volume2 size={16} />
         </button>
      </div>

      <div 
        className="text-4xl font-bold text-slate-800 mb-2 font-serif hover:text-indigo-600 transition-colors cursor-pointer active:scale-95 transform"
        onClick={(e) => playAudio(e, symbol.sound)} 
        title="Click to hear phoneme sound"
      >
        {symbol.symbol}
      </div>
      
      <div 
        className="text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
        onClick={(e) => playAudio(e, symbol.exampleWord)}
        title={`Listen to word "${symbol.exampleWord}"`}
      >
        {symbol.exampleWord}
      </div>
    </div>
  );
};

export default IPACard;