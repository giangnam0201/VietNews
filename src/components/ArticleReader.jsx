import React, { useState, useEffect } from 'react';
import { getProxiedUrl } from '../newsSources';
import './ArticleReader.css';

function ArticleReader({ article, onClose, toggleBookmark, isBookmarked }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!article) return;
    scrapeArticle(article.link);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [article]);

  const scrapeArticle = async (url) => {
    setLoading(true);
    setError(false);
    try {
      const proxyUrl = getProxiedUrl(url);
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Fetch failed');
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Remove unwanted elements
      const removeSelectors = [
        'script', 'style', 'iframe', 'noscript',
        '.ads', '.advertisement', '.ad-wrapper', '.banner',
        '[class*="quangcao"]', '[class*="banner"]', '[class*="sidebar"]',
        '[id*="ads"]', '[id*="banner"]', '.social-share',
        '.related-news', '.comment', '.footer', 'header', 'nav',
        '.breadcrumb', '.tags', '.author-info',
        '[class*="popup"]', '[class*="modal"]',
      ];
      removeSelectors.forEach(sel => {
        doc.querySelectorAll(sel).forEach(el => el.remove());
      });
      
      // Try to extract article content from common selectors
      const contentSelectors = [
        'article .fck_detail',
        '.fck_detail',
        'article .detail-content',
        '.detail-content',
        '.article-content',
        '.content-detail',
        '.post-content',
        'article .entry-content',
        '.entry-content',
        '.main-content article',
        'article .content',
        '.article__body',
        '.detail__content',
        '.singular-content',
        '#article-body',
        '.body-content',
        'article',
        '[class*="article-body"]',
        '[class*="detail-body"]',
        'main',
      ];
      
      let articleContent = null;
      for (const selector of contentSelectors) {
        const el = doc.querySelector(selector);
        if (el && el.textContent.trim().length > 200) {
          articleContent = el;
          break;
        }
      }
      
      if (!articleContent) {
        // Fallback: find largest text block
        const allPs = doc.querySelectorAll('p');
        if (allPs.length > 3) {
          const wrapper = document.createElement('div');
          allPs.forEach(p => {
            if (p.textContent.trim().length > 30) {
              wrapper.appendChild(p.cloneNode(true));
            }
          });
          if (wrapper.textContent.trim().length > 200) {
            articleContent = wrapper;
          }
        }
      }
      
      if (articleContent) {
        // Clean the content
        articleContent.querySelectorAll('script, style, iframe, [class*="ads"], [class*="banner"]').forEach(el => el.remove());
        
        // Process images
        articleContent.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('data-src') || img.getAttribute('src') || '';
          if (src && !src.startsWith('data:')) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.borderRadius = '8px';
            img.style.margin = '12px 0';
          } else {
            img.remove();
          }
        });
        
        // Remove empty elements
        articleContent.querySelectorAll('div, span, p').forEach(el => {
          if (!el.textContent.trim() && !el.querySelector('img')) {
            el.remove();
          }
        });
        
        setContent(articleContent.innerHTML);
      } else {
        setError(true);
      }
    } catch (err) {
      console.warn('Scrape error:', err);
      setError(true);
    }
    setLoading(false);
  };

  if (!article) return null;

  return (
    <div className="reader-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="reader-container">
        <div className="reader-header">
          <button className="reader-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="reader-meta">
            <span className="reader-source" style={{ background: article.sourceColor }}>
              {article.source}
            </span>
            <span className="reader-category">{article.category}</span>
          </div>
          <div className="reader-actions">
            <button 
              className={`reader-btn ${isBookmarked(article.id) ? 'active' : ''}`}
              onClick={() => toggleBookmark(article)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked(article.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="reader-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="reader-body">
          <h1 className="reader-title">{article.title}</h1>
          
          {article.image && (
            <img className="reader-hero" src={article.image} alt="" />
          )}
          
          {loading && (
            <div className="reader-loading">
              <div className="reader-spinner"></div>
              <p>Đang tải nội dung bài viết...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className="reader-error">
              <p>Không thể tải nội dung bài viết.</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="reader-link-btn">
                Đọc trên trang gốc →
              </a>
              {article.description && (
                <div className="reader-fallback">
                  <p>{article.description}</p>
                </div>
              )}
            </div>
          )}
          
          {!loading && !error && content && (
            <div className="reader-content" dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleReader;
