import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '../data/legalContent';

interface LegalModalProps {
  page: 'privacy' | 'terms';
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ page, onClose }) => {
  const content = page === 'privacy' ? PRIVACY_POLICY : TERMS_OF_SERVICE;
  const title = page === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const Icon = page === 'privacy' ? Shield : FileText;

  // Simple markdown-to-jsx parser for the legal content
  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-4">{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold text-slate-800 mt-5 mb-3">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-semibold text-slate-800 mt-4 mb-2">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('* ')) {
        return (
          <li key={index} className="ml-4 list-disc text-slate-600 mb-1 pl-1">
             {parseInline(line.replace('* ', ''))}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      if (line.startsWith('---')) {
        return <hr key={index} className="my-6 border-slate-200" />;
      }
      return <p key={index} className="text-slate-600 mb-3 leading-relaxed">{parseInline(line)}</p>;
    });
  };

  const parseInline = (text: string) => {
    // Very basic bold and link parsing
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-800">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono text-indigo-600">{part.slice(1, -1)}</code>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
          return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{linkMatch[1]}</a>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Icon size={24} className="text-teal-600" />
                {title}
            </h2>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
            >
                <X size={20} />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50">
            <div className="prose prose-slate max-w-none">
                {renderContent(content)}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
