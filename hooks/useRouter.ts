import { useCallback, useEffect, useState } from 'react';

export interface Route {
  path: string;
  view: 'grid' | 'list' | 'articles';
  articleId?: string;
}

// Parse the current URL path
const parseRoute = (): Route => {
  const path = window.location.pathname;
  
  // Match /articles/:id
  const articleMatch = path.match(/^\/articles\/([^/]+)$/);
  if (articleMatch) {
    return {
      path,
      view: 'articles',
      articleId: articleMatch[1],
    };
  }
  
  // Match /articles
  if (path === '/articles') {
    return {
      path,
      view: 'articles',
    };
  }
  
  // Match /list
  if (path === '/list') {
    return {
      path,
      view: 'list',
    };
  }
  
  // Default to grid view
  return {
    path: '/',
    view: 'grid',
  };
};

export const useRouter = () => {
  const [route, setRoute] = useState<Route>(parseRoute);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate to a new path
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setRoute(parseRoute());
  }, []);

  // Navigate to home (grid view)
  const goToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Navigate to list view
  const goToList = useCallback(() => {
    navigate('/list');
  }, [navigate]);

  // Navigate to articles list
  const goToArticles = useCallback(() => {
    navigate('/articles');
  }, [navigate]);

  // Navigate to a specific article
  const goToArticle = useCallback((articleId: string) => {
    navigate(`/articles/${articleId}`);
  }, [navigate]);

  return {
    route,
    navigate,
    goToHome,
    goToList,
    goToArticles,
    goToArticle,
  };
};

// SEO helper functions
export const updateDocumentMeta = (options: {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
}) => {
  const { title, description, url, type = 'website' } = options;
  
  // Update title
  if (title) {
    document.title = title;
    updateMetaTag('og:title', title);
    updateMetaTag('twitter:title', title);
  }
  
  // Update description
  if (description) {
    updateMetaTag('description', description);
    updateMetaTag('og:description', description);
    updateMetaTag('twitter:description', description);
  }
  
  // Update URL
  if (url) {
    updateMetaTag('og:url', url);
    updateLinkTag('canonical', url);
  }
  
  // Update type
  updateMetaTag('og:type', type);
};

const updateMetaTag = (name: string, content: string) => {
  // Check both name and property attributes
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement;
  }
  
  if (meta) {
    meta.content = content;
  } else {
    meta = document.createElement('meta');
    // Use property for og: tags, name for others
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    meta.content = content;
    document.head.appendChild(meta);
  }
};

const updateLinkTag = (rel: string, href: string) => {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (link) {
    link.href = href;
  } else {
    link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  }
};

export default useRouter;
