// Vietnamese news RSS feeds
// Fetch directly first (many VN news sites allow CORS), fallback to allorigins proxy

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
    id: 'thanhnien',
    name: 'Thanh Niên',
    color: '#D32F2F',
    feeds: [
      { url: 'https://thanhnien.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://thanhnien.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://thanhnien.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://thanhnien.vn/rss/tai-chinh-kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://thanhnien.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://thanhnien.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://thanhnien.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://thanhnien.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
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
      { url: 'https://kenh14.vn/the-gioi.rss', category: 'Thế giới' },
    ]
  },
  {
    id: 'vietnamnet',
    name: 'VietNamNet',
    color: '#6A1B9A',
    feeds: [
      { url: 'https://vietnamnet.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://vietnamnet.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://vietnamnet.vn/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://vietnamnet.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://vietnamnet.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://vietnamnet.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://vietnamnet.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
      { url: 'https://vietnamnet.vn/rss/doi-song.rss', category: 'Đời sống' },
      { url: 'https://vietnamnet.vn/rss/cong-nghe.rss', category: 'Công nghệ' },
    ]
  },
  {
    id: 'zingnews',
    name: 'ZNews',
    color: '#0277BD',
    feeds: [
      { url: 'https://znews.vn/rss/tin-moi-nhat.rss', category: 'Mới nhất' },
      { url: 'https://znews.vn/rss/xa-hoi.rss', category: 'Thời sự' },
      { url: 'https://znews.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://znews.vn/rss/kinh-doanh-tai-chinh.rss', category: 'Kinh doanh' },
      { url: 'https://znews.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://znews.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://znews.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://znews.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
      { url: 'https://znews.vn/rss/cong-nghe.rss', category: 'Công nghệ' },
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
      { url: 'https://www.nguoiduatin.vn/rss/xa-hoi.rss', category: 'Thời sự' },
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
      { url: 'https://nhandan.vn/rss/vanhoa-1188.rss', category: 'Giải trí' },
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

// Fetch RSS directly - no proxy needed for most Vietnamese news sites
// If direct fails due to CORS, try allorigins as fallback
export async function fetchRSS(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  
  try {
    // Try direct fetch first
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) return await response.text();
  } catch (e) {
    clearTimeout(timeout);
  }
  
  // Fallback to allorigins proxy if direct fetch fails (CORS issue)
  const controller2 = new AbortController();
  const timeout2 = setTimeout(() => controller2.abort(), 10000);
  
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl, { signal: controller2.signal });
    clearTimeout(timeout2);
    if (response.ok) return await response.text();
  } catch (e) {
    clearTimeout(timeout2);
  }
  
  return null;
}

// For article scraping - always needs proxy since we're loading full HTML pages
export function getProxiedUrl(url) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}
