import React from 'react';
import './ArticleReader.css';

function ArticleReader({ article, onClose, toggleBookmark, isBookmarked }) {
  if (!article) return null;

  // Use Google's web cache or direct link for ad-free reading
  const getCleanUrl = (url) => {
    // Google webcache strips most ads and tracking
    return `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(url)}&strip=1`;
  };

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
              title="Lưu tin"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isBookmarked(article.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="reader-btn" title="Mở bài gốc">
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
            <img className="reader-hero" src={article.image} alt="" onError={(e) => e.target.style.display = 'none'} />
          )}
          
          {article.description && (
            <p className="reader-description">{article.description}</p>
          )}
          
          {/* Iframe to load the article in a clean way */}
          <div className="reader-iframe-wrap">
            <iframe
              src={article.link}
              title={article.title}
              className="reader-iframe"
              sandbox="allow-same-origin allow-scripts"
              referrerPolicy="no-referrer"
            />
            <div className="reader-iframe-overlay">
              <p>Đang hiển thị bài viết từ <strong>{article.source}</strong></p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="reader-open-btn">
                Mở toàn màn hình →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleReader;
