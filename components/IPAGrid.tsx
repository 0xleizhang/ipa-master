import React from 'react';
import IPACard from './IPACard';
import { IPASymbol, IPASection } from '../types';

interface IPAGridProps {
  symbols: IPASymbol[];
  section: IPASection;
  groupingMode: 'manner' | 'voicing';
  onSelect: (symbol: IPASymbol) => void;
  playAudio: (e: React.MouseEvent, word: string) => void;
}

const IPAGrid: React.FC<IPAGridProps> = ({ symbols, section, groupingMode, onSelect, playAudio }) => {
  const filteredSymbols = symbols.filter(s => s.section === section);
  
  // Determine categories based on mode
  let categories: string[] = [];
  
  if (groupingMode === 'voicing' && section === 'Consonants') {
      categories = ['Voiceless', 'Voiced'];
  } else {
      // Default to manner/standard category
      categories = Array.from(new Set(filteredSymbols.map(s => s.category)));
  }

  return (
    <div className="space-y-8">
      {categories.map(category => {
        const categorySymbols = filteredSymbols.filter(s => {
            if (groupingMode === 'voicing' && section === 'Consonants') {
                return s.voicing === category;
            }
            return s.category === category;
        });
        
        if (categorySymbols.length === 0) return null;

        return (
            <div key={category}>
            <h3 className="text-lg font-semibold text-slate-500 mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${category === 'Voiceless' ? 'bg-indigo-400' : 'bg-teal-500'}`}></span>
                {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categorySymbols.map(symbol => (
                    <IPACard 
                    key={symbol.symbol} 
                    symbol={symbol} 
                    onClick={() => onSelect(symbol)}
                    playAudio={playAudio}
                    />
                ))}
            </div>
            </div>
        );
      })}
    </div>
  );
};

export default IPAGrid;
