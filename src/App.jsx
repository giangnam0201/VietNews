import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NEWS_SOURCES, CATEGORIES, getProxiedUrl } from './newsSources';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedSource, setSelectedSource] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const parseRSSFeed = useCallback(async (source, feed) => {
    try {
      const proxyUrl = getProxiedUrl(feed.url);
      const response = await fetch(proxyUrl);
      if (!response.ok) return [];
      
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      
      const items = xml.querySelectorAll('item');
      const parsedArticles = [];
      
      items.forEach((item, index) => {
        if (index >= 15) return; // Limit per feed
        
        const title = item.querySelector('title')?.textContent?.trim() || '';
        const link = item.querySelector('link')?.textContent?.trim() || '';
        const description = item.querySelector('description')?.textContent?.trim() || '';
        const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
        
        // Extract image
        let image = '';
        const enclosure = item.querySelector('enclosure');
        if (enclosure && enclosure.getAttribute('type')?.startsWith('image')) {
          image = enclosure.getAttribute('url') || '';
        }
        if (!image) {
          const mediaContent = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]
            || item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'thumbnail')[0];
          if (mediaContent) {
            image = mediaContent.getAttribute('url') || '';
          }
        }
        if (!image) {
          const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/);
          if (imgMatch) image = imgMatch[1];
        }
        
        // Clean description
        const cleanDesc = description
          .replace(/<[^>]*>/g, '')
          .replace(/&lt;.*?&gt;/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, ' ')
          .trim()
          .slice(0, 200);
        
        if (title) {
          parsedArticles.push({
            id: `${source.id}-${feed.category}-${index}`,
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
      console.warn(`Failed to fetch ${source.name} - ${feed.category}:`, err.message);
      return [];
    }
  }, []);

  const fetchAllFeeds = useCallback(async () => {
    setLoading(true);
    const allArticles = [];
    
    const feedPromises = [];
    for (const source of NEWS_SOURCES) {
      for (const feed of source.feeds) {
        feedPromises.push(parseRSSFeed(source, feed));
      }
    }
    
    const results = await Promise.allSettled(feedPromises);
    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        allArticles.push(...result.value);
      }
    });
    
    // Sort by date, newest first
    allArticles.sort((a, b) => b.pubDate - a.pubDate);
    
    // Remove duplicates by title similarity
    const seen = new Set();
    const unique = allArticles.filter(article => {
      const key = article.title.toLowerCase().slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    
    setArticles(unique);
    setLoading(false);
  }, [parseRSSFeed]);

  useEffect(() => {
    fetchAllFeeds();
    // Refresh every 5 minutes
    const interval = setInterval(fetchAllFeeds, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAllFeeds]);

  const filteredArticles = useMemo(() => {
    if (showBookmarks) {
      return bookmarks;
    }

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
      if (exists) {
        return prev.filter(b => b.id !== article.id);
      }
      return [...prev, article];
    });
  };

  const isBookmarked = (articleId) => {
    return bookmarks.some(b => b.id === articleId);
  };

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
        />
        
        <main className="content">
          <NewsFeed 
            articles={filteredArticles}
            loading={loading}
            toggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
