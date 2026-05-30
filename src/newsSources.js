// VietNews - Our own Cloudflare Worker proxy (no third-party dependencies)
const PROXY = 'https://vietnews-proxy.giangnam020100.workers.dev/?url=';

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
      { url: 'https://vnexpress.net/rss/khoa-hoc.rss', category: 'Công nghệ' },
      { url: 'https://vnexpress.net/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://vnexpress.net/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://vnexpress.net/rss/giao-duc.rss', category: 'Giáo dục' },
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
      { url: 'https://tuoitre.vn/rss/giao-duc.rss', category: 'Giáo dục' },
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
      { url: 'https://thanhnien.vn/rss/giao-duc.rss', category: 'Giáo dục' },
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
      { url: 'https://dantri.com.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://dantri.com.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
      { url: 'https://dantri.com.vn/rss/suc-manh-so.rss', category: 'Công nghệ' },
    ]
  },
  {
    id: 'kenh14',
    name: 'Kênh 14',
    color: '#F57C00',
    feeds: [
      { url: 'https://kenh14.vn/home.rss', category: 'Mới nhất' },
      { url: 'https://kenh14.vn/star.rss', category: 'Giải trí' },
      { url: 'https://kenh14.vn/doi-song.rss', category: 'Đời sống' },
      { url: 'https://kenh14.vn/xa-hoi.rss', category: 'Thời sự' },
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
      { url: 'https://vietnamnet.vn/rss/cong-nghe.rss', category: 'Công nghệ' },
    ]
  },
  {
    id: 'laodong',
    name: 'Lao Động',
    color: '#BF360C',
    feeds: [
      { url: 'https://laodong.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://laodong.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://laodong.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://laodong.vn/rss/kinh-te.rss', category: 'Kinh doanh' },
    ]
  },
  {
    id: 'nguoiduatin',
    name: 'Người Đưa Tin',
    color: '#E65100',
    feeds: [
      { url: 'https://www.nguoiduatin.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://www.nguoiduatin.vn/rss/phap-luat.rss', category: 'Pháp luật' },
    ]
  },
  {
    id: 'nhandan',
    name: 'Nhân Dân',
    color: '#C62828',
    feeds: [
      { url: 'https://nhandan.vn/rss/chinhtri-1185.rss', category: 'Thời sự' },
      { url: 'https://nhandan.vn/rss/thegioi-1186.rss', category: 'Thế giới' },
      { url: 'https://nhandan.vn/rss/kinhte-1187.rss', category: 'Kinh doanh' },
      { url: 'https://nhandan.vn/rss/thethao-1190.rss', category: 'Thể thao' },
    ]
  },
];

export const CATEGORIES = [
  'Tất cả',
  'Mới nhất',
  'Thời sự',
  'Thế giới',
  'Kinh doanh',
  'Công nghệ',
  'Giải trí',
  'Thể thao',
  'Giáo dục',
  'Sức khỏe',
  'Đời sống',
  'Pháp luật',
];

// Fetch RSS via OUR OWN proxy - no rate limits, no CORS issues
export function proxyUrl(url) {
  return `${PROXY}${encodeURIComponent(url)}`;
}

// Parse RSS XML text into article objects
export function parseRSSItems(xmlText, source, feed) {
  try {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');
    if (xml.querySelector('parsererror')) return [];

    const items = xml.querySelectorAll('item');
    const articles = [];

    items.forEach((item, i) => {
      if (i >= 10) return;
      const title = item.querySelector('title')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const desc = item.querySelector('description')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';

      let image = '';
      const enc = item.querySelector('enclosure[type^="image"]');
      if (enc) image = enc.getAttribute('url') || '';
      if (!image) {
        const media = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]
          || item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'thumbnail')[0];
        if (media) image = media.getAttribute('url') || '';
      }
      if (!image) {
        const m = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (m) image = m[1];
      }

      const cleanDesc = desc.replace(/<[^>]*>/g, '').replace(/&\w+;/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);

      if (title.length > 5) {
        articles.push({
          id: `${source.id}-${feed.category}-${i}`,
          title, link, image,
          description: cleanDesc,
          pubDate: pubDate ? new Date(pubDate) : new Date(),
          source: source.name,
          sourceId: source.id,
          sourceColor: source.color,
          category: feed.category,
        });
      }
    });
    return articles;
  } catch { return []; }
}
