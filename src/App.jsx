import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NEWS_SOURCES, CATEGORIES, getProxiedUrl, rotateProxy, fetchWithFallback } from './newsSources';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import Sidebar from './components/Sidebar';
import ArticleReader from './components/ArticleReader';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedSource, setSelectedSource] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('vn-dark') === 'true';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('vn-bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [readingArticle, setReadingArticle] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('vn-dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('vn-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const parseRSSFeed = useCallback(async (source, feed) => {
    try {
      const proxyUrl = getProxiedUrl(feed.url);
      const response = await fetchWithFallback(proxyUrl);
      if (!response.ok) return [];
      
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      
      // Check for parse errors
      if (xml.querySelector('parsererror')) return [];
      
      const items = xml.querySelectorAll('item');
      const parsedArticles = [];
      
      items.forEach((item, index) => {
        if (index >= 12) return;
        
        const title = item.querySelector('title')?.textContent?.trim() || '';
        const link = item.querySelector('link')?.textContent?.trim() || 
                     item.querySelector('link')?.getAttribute('href') || '';
        const description = item.querySelector('description')?.textContent?.trim() || '';
        const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
        
        // Extract image from multiple sources
        let image = '';
        const enclosure = item.querySelector('enclosure[type^="image"]');
        if (enclosure) {
          image = enclosure.getAttribute('url') || '';
        }
        if (!image) {
          const media = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]
            || item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'thumbnail')[0];
          if (media) image = media.getAttribute('url') || '';
        }
        if (!image) {
          const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (imgMatch) image = imgMatch[1];
        }
        if (!image) {
          const content = item.querySelector('content\\:encoded')?.textContent || '';
          const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (imgMatch) image = imgMatch[1];
        }
        
        // Clean description
        const cleanDesc = description
          .replace(/<!\[CDATA\[|\]\]>/g, '')
          .replace(/<[^>]*>/g, '')
          .replace(/&lt;.*?&gt;/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 180);
        
        if (title && title.length > 5) {
          parsedArticles.push({
            id: `${source.id}-${index}-${title.slice(0, 20).replace(/\s/g, '')}`,
            title,
            link,
            description: cleanDesc,
            image,
            pubDate: pubDate ? new Date(pubDate) : new Date(),
            source: source.name,
            sourceId: source.id,
            sourceColor: source.color,
            category: feed.category,
          });
        }
      });
      
      return parsedArticles;
    } catch (err) {
      return [];
    }
  }, []);

  const fetchAllFeeds = useCallback(async () => {
    setLoading(true);
    const allArticles = [];
    
    // Batch feeds - fetch only "Mới nhất" feeds first for speed
    const priorityFeeds = [];
    const otherFeeds = [];
    
    for (const source of NEWS_SOURCES) {
      for (const feed of source.feeds) {
        if (feed.category === 'Mới nhất') {
          priorityFeeds.push({ source, feed });
        } else {
          otherFeeds.push({ source, feed });
        }
      }
    }
    
    // Fetch priority feeds first
    const priorityResults = await Promise.allSettled(
      priorityFeeds.map(({ source, feed }) => parseRSSFeed(source, feed))
    );
    
    priorityResults.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        allArticles.push(...result.value);
      }
    });
    
    // If no results, try rotating proxy
    if (allArticles.length === 0) {
      rotateProxy();
      const retryResults = await Promise.allSettled(
        priorityFeeds.slice(0, 3).map(({ source, feed }) => parseRSSFeed(source, feed))
      );
      retryResults.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          allArticles.push(...result.value);
        }
      });
    }
    
    // Sort & deduplicate
    allArticles.sort((a, b) => b.pubDate - a.pubDate);
    const seen = new Set();
    const unique = allArticles.filter(article => {
      const key = article.title.toLowerCase().replace(/\s+/g, '').slice(0, 60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    
    setArticles(unique);
    setLoading(false);
    
    // Then fetch remaining feeds in background
    const otherResults = await Promise.allSettled(
      otherFeeds.map(({ source, feed }) => parseRSSFeed(source, feed))
    );
    
    const moreArticles = [];
    otherResults.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        moreArticles.push(...result.value);
      }
    });
    
    if (moreArticles.length > 0) {
      setArticles(prev => {
        const all = [...prev, ...moreArticles];
        all.sort((a, b) => b.pubDate - a.pubDate);
        const seenSet = new Set();
        return all.filter(article => {
          const key = article.title.toLowerCase().replace(/\s+/g, '').slice(0, 60);
          if (seenSet.has(key)) return false;
          seenSet.add(key);
          return true;
        });
      });
    }
  }, [parseRSSFeed]);

  useEffect(() => {
    fetchAllFeeds();
    const interval = setInterval(fetchAllFeeds, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAllFeeds]);

  const filteredArticles = useMemo(() => {
    if (showBookmarks) return bookmarks;

    let filtered = articles;
    
    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    
    if (selectedSource !== 'all') {
      filtered = filtered.filter(a => a.sourceId === selectedSource);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.description.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  }, [articles, selectedCategory, selectedSource, searchQuery, showBookmarks, bookmarks]);

  const toggleBookmark = (article) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === article.id);
      if (exists) return prev.filter(b => b.id !== article.id);
      return [...prev, article];
    });
  };

  const isBookmarked = (articleId) => bookmarks.some(b => b.id === articleId);

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setSidebarOpen={setSidebarOpen}
        onRefresh={fetchAllFeeds}
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
        articleCount={articles.length}
        bookmarkCount={bookmarks.length}
      />
      
      <div className="main-layout">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          sources={NEWS_SOURCES}
          categories={CATEGORIES}
          articleCount={articles.length}
          sourceCount={NEWS_SOURCES.length}
        />
        
        <main className="content">
          <div className="mobile-search">
            <div className="search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>
          <NewsFeed 
            articles={filteredArticles}
            loading={loading}
            toggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            onReadArticle={setReadingArticle}
          />
        </main>
      </div>
      
      {readingArticle && (
        <ArticleReader
          article={readingArticle}
          onClose={() => setReadingArticle(null)}
          toggleBookmark={toggleBookmark}
          isBookmarked={isBookmarked}
        />
      )}
    </div>
  );
}

export default App;
