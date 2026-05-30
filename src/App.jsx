import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NEWS_SOURCES, CATEGORIES, fetchFeedsInBatches } from './newsSources';
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
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('vn-dark') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vn-bookmarks') || '[]'); }
    catch { return []; }
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

  const fetchAllFeeds = useCallback(async () => {
    setLoading(true);

    // Build flat list of all feeds with source info
    const allFeedRequests = [];
    for (const source of NEWS_SOURCES) {
      for (const feed of source.feeds) {
        allFeedRequests.push({ source, feed });
      }
    }

    // Fetch in batches of 3 with 1.5s delay (avoids rss2json 429 rate limit)
    const allArticles = await fetchFeedsInBatches(allFeedRequests, 3, 1500);

    // Sort by date, deduplicate
    allArticles.sort((a, b) => b.pubDate - a.pubDate);
    const seen = new Set();
    const unique = allArticles.filter(a => {
      const key = a.title.toLowerCase().replace(/\s+/g, '').slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    setArticles(unique);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllFeeds();
    const interval = setInterval(fetchAllFeeds, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAllFeeds]);

  const filteredArticles = useMemo(() => {
    if (showBookmarks) return bookmarks;
    let filtered = articles;
    if (selectedCategory !== 'Tất cả') filtered = filtered.filter(a => a.category === selectedCategory);
    if (selectedSource !== 'all') filtered = filtered.filter(a => a.sourceId === selectedSource);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
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

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        darkMode={darkMode} setDarkMode={setDarkMode}
        setSidebarOpen={setSidebarOpen} onRefresh={fetchAllFeeds}
        showBookmarks={showBookmarks} setShowBookmarks={setShowBookmarks}
        articleCount={articles.length} bookmarkCount={bookmarks.length}
      />
      <div className="main-layout">
        <Sidebar
          isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          selectedSource={selectedSource} setSelectedSource={setSelectedSource}
          sources={NEWS_SOURCES} categories={CATEGORIES}
          articleCount={articles.length} sourceCount={NEWS_SOURCES.length}
        />
        <main className="content">
          <div className="mobile-search">
            <div className="search-box">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Tìm kiếm..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              {searchQuery && <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>}
            </div>
          </div>
          <NewsFeed
            articles={filteredArticles} loading={loading}
            toggleBookmark={toggleBookmark} isBookmarked={isBookmarked}
            onReadArticle={setReadingArticle}
          />
        </main>
      </div>
      {readingArticle && (
        <ArticleReader article={readingArticle} onClose={() => setReadingArticle(null)}
          toggleBookmark={toggleBookmark} isBookmarked={isBookmarked} />
      )}
    </div>
  );
}

export default App;
