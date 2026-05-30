// Vietnamese news RSS feeds
// Strategy: Use rss2json.com with rate limiting (max 5 concurrent requests)
// Stagger requests to avoid 429 rate limit errors

const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

export const NEWS_SOURCES = [
  {
    id: 'vnexpress',
    name: 'VnExpress',
    color: '#E53935',
    feeds: [
      { url: 'https://vnexpress.net/rss/tin-moi-nhat.rss', category: 'Mới nhất' },
      { url: 'https://vnexpress.net/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://vnexpress.net/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://vnexpress.net/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://vnexpress.net/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://vnexpress.net/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://vnexpress.net/rss/suc-khoe.rss', category: 'Sức khỏe' },
    ]
  },
  {
    id: 'tuoitre',
    name: 'Tuổi Trẻ',
    color: '#1565C0',
    feeds: [
      { url: 'https://tuoitre.vn/rss/tin-moi-nhat.rss', category: 'Mới nhất' },
      { url: 'https://tuoitre.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://tuoitre.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://tuoitre.vn/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://tuoitre.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://tuoitre.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://tuoitre.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
    ]
  },
  {
    id: 'thanhnien',
    name: 'Thanh Niên',
    color: '#D32F2F',
    feeds: [
      { url: 'https://thanhnien.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://thanhnien.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://thanhnien.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://thanhnien.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://thanhnien.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://thanhnien.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
    ]
  },
  {
    id: 'dantri',
    name: 'Dân Trí',
    color: '#2E7D32',
    feeds: [
      { url: 'https://dantri.com.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://dantri.com.vn/rss/xa-hoi.rss', category: 'Thời sự' },
      { url: 'https://dantri.com.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://dantri.com.vn/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://dantri.com.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://dantri.com.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://dantri.com.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
    ]
  },
  {
    id: 'vietnamnet',
    name: 'VietNamNet',
    color: '#6A1B9A',
    feeds: [
      { url: 'https://vietnamnet.vn/rss/tin-moi-nhat.rss', category: 'Mới nhất' },
      { url: 'https://vietnamnet.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://vietnamnet.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://vietnamnet.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://vietnamnet.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
    ]
  },
];

export const CATEGORIES = [
  'Tất cả',
  'Mới nhất',
  'Thời sự',
  'Thế giới',
  'Kinh doanh',
  'Giải trí',
  'Thể thao',
  'Sức khỏe',
];

// Rate-limited fetch: processes array of URLs in batches
const delay = (ms) => new Promise(r => setTimeout(r, ms));

export async function fetchFeedJSON(rssUrl) {
  const url = `${RSS2JSON}${encodeURIComponent(rssUrl)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.status !== 'ok') return null;
  return data.items || [];
}

// Process feeds in small batches with delays to avoid 429
export async function fetchFeedsInBatches(feedsList, batchSize = 3, delayMs = 1200) {
  const results = [];
  for (let i = 0; i < feedsList.length; i += batchSize) {
    const batch = feedsList.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map(({ source, feed }) => fetchOneFeed(source, feed))
    );
    batchResults.forEach(r => {
      if (r.status === 'fulfilled' && r.value) results.push(...r.value);
    });
    // Don't delay after last batch
    if (i + batchSize < feedsList.length) {
      await delay(delayMs);
    }
  }
  return results;
}

async function fetchOneFeed(source, feed) {
  try {
    const items = await fetchFeedJSON(feed.url);
    if (!items) return [];
    
    return items.slice(0, 10).map((item, index) => {
      const title = (item.title || '').trim();
      const link = (item.link || '').trim();
      let desc = (item.description || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      if (desc.length > 160) desc = desc.slice(0, 160) + '...';
      
      let image = item.thumbnail || '';
      if (!image && item.enclosure?.link) image = item.enclosure.link;
      if (!image) {
        const m = (item.description || '').match(/<img[^>]+src=["']([^"']+)["']/i);
        if (m) image = m[1];
      }
      
      return {
        id: `${source.id}-${feed.category}-${index}`,
        title,
        link,
        description: desc,
        image,
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
        source: source.name,
        sourceId: source.id,
        sourceColor: source.color,
        category: feed.category,
      };
    }).filter(a => a.title.length > 5);
  } catch {
    return [];
  }
}

export function getProxiedUrl(url) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}
