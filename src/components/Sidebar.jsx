import React from 'react';
import './Sidebar.css';

const categoryIcons = {
  'Tất cả': '🌐',
  'Mới nhất': '⚡',
  'Thời sự': '🏛️',
  'Thế giới': '🌍',
  'Kinh doanh': '📈',
  'Công nghệ': '💻',
  'Giải trí': '🎬',
  'Thể thao': '⚽',
  'Giáo dục': '🎓',
  'Sức khỏe': '❤️',
  'Đời sống': '🌿',
  'Pháp luật': '⚖️',
};

function Sidebar({ isOpen, onClose, selectedCategory, setSelectedCategory, selectedSource, setSelectedSource, sources, categories, articleCount, sourceCount }) {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSource('all');
    onClose();
  };

  const handleSourceClick = (sourceId) => {
    setSelectedSource(sourceId);
    onClose();
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-stats">
          <div className="stat-item">
            <div className="stat-num">{articleCount}</div>
            <div className="stat-label">Tin tức</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{sourceCount}</div>
            <div className="stat-label">Nguồn tin</div>
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Chuyên mục</h3>
          {categories.map(category => (
            <button
              key={category}
              className={`sidebar-item ${selectedCategory === category && selectedSource === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className="category-icon">{categoryIcons[category] || '📄'}</span>
              <span>{category}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Nguồn tin</h3>
          <button
            className={`sidebar-item ${selectedSource === 'all' ? 'active' : ''}`}
            onClick={() => handleSourceClick('all')}
          >
            <span className="source-dot" style={{ background: 'linear-gradient(135deg, #E53935, #FF6D00)' }}></span>
            <span>Tất cả nguồn</span>
          </button>
          {sources.map(source => (
            <button
              key={source.id}
              className={`sidebar-item ${selectedSource === source.id ? 'active' : ''}`}
              onClick={() => handleSourceClick(source.id)}
            >
              <span className="source-dot" style={{ background: source.color }}></span>
              <span>{source.name}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
