import React from 'react';
import './NewsFeed.css';

function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return 'Vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
  return date.toLocaleDateString('vi-VN');
}

function NewsCard({ article, toggleBookmark, isBookmarked }) {
  return (
    <article className="news-card fade-in">
      {article.image ? (
        <img 
          className="card-image" 
          src={article.image} 
          alt={article.title}
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : (
        <div className="card-image-placeholder">📰</div>
      )}
      
      <div className="card-body">
        <div className="card-meta">
          <span className="card-source" style={{ background: article.sourceColor }}>
            {article.source}
          </span>
          <span className="card-category">{article.category}</span>
        </div>
        
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          <h3 className="card-title">{article.title}</h3>
        </a>
        
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isBookmarked(article.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="card-action-btn" title="Đọc bài">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

function NewsFeed({ articles, loading, toggleBookmark, isBookmarked }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải tin tức từ các nguồn...</p>
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
      {articles.map(article => (
        <NewsCard
          key={article.id}
          article={article}
          toggleBookmark={toggleBookmark}
          isBookmarked={isBookmarked}
        />
      ))}
    </div>
  );
}

export default NewsFeed;
