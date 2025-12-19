import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import React from 'react';
import { ARTICLES } from '../constants/articles';

interface ArticleListProps {
  onSelectArticle: (articleId: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ onSelectArticle }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Articles</h2>
        <p className="text-slate-500 max-w-2xl">
          Learn more about English pronunciation through our curated articles on IPA phonetics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-indigo-200"
            onClick={() => onSelectArticle?.(article.id)}
          >
            {/* Cover Image Placeholder */}
            <div className="h-40 bg-gradient-to-br from-indigo-100 to-teal-50 flex items-center justify-center">
              <BookOpen size={48} className="text-indigo-300" />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                {article.description}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span>{article.date}</span>
                  {article.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-indigo-500 font-medium">
                  Read <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state for when articles are added */}
      {ARTICLES.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={64} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">No Articles Yet</h3>
          <p className="text-slate-400">Check back soon for new articles on IPA phonetics.</p>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
