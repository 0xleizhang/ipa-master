import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import React from 'react';
import { Article } from '../constants/articles';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

// Simple Markdown-like renderer
const renderContent = (content: string) => {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' = 'ul';

  const flushList = () => {
    if (listItems.length > 0) {
      const ListTag = listType === 'ol' ? 'ol' : 'ul';
      elements.push(
        <ListTag key={`list-${elements.length}`} className={`mb-4 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} list-inside space-y-1 text-slate-700`}>
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
          ))}
        </ListTag>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0 || tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-slate-200 text-sm">
            {tableHeaders.length > 0 && (
              <thead>
                <tr className="bg-slate-100">
                  {tableHeaders.map((header, i) => (
                    <th key={i} className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">
                      {header.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-slate-200 px-4 py-2 text-slate-600" dangerouslySetInnerHTML={{ __html: parseInline(cell.trim()) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableHeaders = [];
      tableRows = [];
      inTable = false;
    }
  };

  const parseInline = (text: string): string => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>');
    // Italic
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Inline code
    text = text.replace(/`(.+?)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 text-sm font-mono">$1</code>');
    // Links
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-indigo-600 hover:underline">$1</a>');
    return text;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Empty line
    if (trimmedLine === '') {
      flushList();
      flushTable();
      continue;
    }

    // Table row
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      flushList();
      const cells = trimmedLine.slice(1, -1).split('|');
      
      // Check if it's a separator row
      if (cells.every(cell => /^[\s-:]+$/.test(cell))) {
        continue;
      }
      
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (trimmedLine.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={`h1-${i}`} className="text-3xl font-bold text-slate-800 mb-6 mt-8 first:mt-0">
          {trimmedLine.slice(2)}
        </h1>
      );
      continue;
    }
    if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl font-bold text-slate-800 mb-4 mt-8">
          {trimmedLine.slice(3)}
        </h2>
      );
      continue;
    }
    if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-semibold text-slate-800 mb-3 mt-6">
          {trimmedLine.slice(4)}
        </h3>
      );
      continue;
    }

    // Horizontal rule
    if (trimmedLine === '---') {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="my-8 border-slate-200" />);
      continue;
    }

    // Unordered list
    if (trimmedLine.startsWith('- ')) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(trimmedLine.slice(2));
      continue;
    }

    // Ordered list
    const orderedMatch = trimmedLine.match(/^\d+\.\s(.+)$/);
    if (orderedMatch) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(orderedMatch[1]);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p 
        key={`p-${i}`} 
        className="text-slate-700 mb-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parseInline(trimmedLine) }}
      />
    );
  }

  flushList();
  flushTable();

  return elements;
};

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        <span>Back to Articles</span>
      </button>

      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>
      </header>

      {/* Article content */}
      <article className="bg-white rounded-xl border border-slate-200 p-6 md:p-10 shadow-sm">
        <div className="max-w-none">
          {renderContent(article.content)}
        </div>
      </article>
    </div>
  );
};

export default ArticleView;
