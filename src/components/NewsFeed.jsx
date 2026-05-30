import React from 'react';
import './NewsFeed.css';

function timeAgo(date) {
  if (!date || isNaN(date)) return '';
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return 'Vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
  return date.toLocaleDateString('vi-VN');
}

function NewsCard({ article, toggleBookmark, isBookmarked, onReadArticle, index }) {
  return (
    <article className="news-card" style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}>
      <div className="card-image-wrap">
        {article.image ? (
          <img 
            className="card-image" 
            src={article.image} 
            alt=""
            loading="lazy"
            onError={(e) => { e.target.parentElement.innerHTML = '<div class="card-no-image">📰</div>'; }}
          />
        ) : (
          <div className="card-no-image">📰</div>
        )}
        <span className="card-source-badge" style={{ background: article.sourceColor }}>
          {article.source}
        </span>
      </div>
      
      <div className="card-body">
        <span className="card-category-tag">{article.category}</span>
        
        <h3 className="card-title" onClick={() => onReadArticle(article)} style={{ cursor: 'pointer' }}>
          {article.title}
        </h3>
        
        {article.description && (
          <p className="card-description">{article.description}</p>
        )}
        
        <div className="card-footer">
          <span className="card-time">{timeAgo(article.pubDate)}</span>
          <div className="card-actions">
            <button 
              className={`card-action-btn ${isBookmarked(article.id) ? 'bookmarked' : ''}`}
              onClick={() => toggleBookmark(article)}
              title="Lưu tin"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isBookmarked(article.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button className="card-action-btn" onClick={() => onReadArticle(article)} title="Đọc bài">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </button>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="card-action-btn" title="Mở nguồn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
}

function NewsFeed({ articles, loading, toggleBookmark, isBookmarked, onReadArticle }) {
  if (loading) {
    return (
      <div className="loading-grid">
        {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }
  
  if (articles.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>Không tìm thấy tin tức</h3>
        <p>Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
      </div>
    );
  }
  
  return (
    <div className="news-feed">
      {articles.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          toggleBookmark={toggleBookmark}
          isBookmarked={isBookmarked}
          onReadArticle={onReadArticle}
          index={index}
        />
      ))}
    </div>
  );
}

export default NewsFeed;
