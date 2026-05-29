// Vietnamese news RSS feeds
// Using CORS proxy for client-side RSS parsing
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const NEWS_SOURCES = [
  {
    id: 'vnexpress',
    name: 'VnExpress',
    logo: 'https://s1.vnecdn.net/vnexpress/restruct/i/v9505/v2_2019/pc/graphics/logo.svg',
    color: '#c0392b',
    feeds: [
      { url: 'https://vnexpress.net/rss/tin-moi-nhat.rss', category: 'Mới nhất' },
      { url: 'https://vnexpress.net/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://vnexpress.net/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://vnexpress.net/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://vnexpress.net/rss/khoa-hoc.rss', category: 'Khoa học' },
      { url: 'https://vnexpress.net/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://vnexpress.net/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://vnexpress.net/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://vnexpress.net/rss/suc-khoe.rss', category: 'Sức khỏe' },
      { url: 'https://vnexpress.net/rss/doi-song.rss', category: 'Đời sống' },
    ]
  },
  {
    id: 'thanhnien',
    name: 'Thanh Niên',
    logo: 'https://static.thanhnien.com.vn/thanhnien.vn/image/logo.svg',
    color: '#e74c3c',
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
    logo: 'https://static.tuoitre.vn/tto/i/s/logo/logo.svg',
    color: '#2980b9',
    feeds: [
      { url: 'https://tuoitre.vn/rss/tin-moi-nhat.rss', category: 'Mới nhất' },
      { url: 'https://tuoitre.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://tuoitre.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://tuoitre.vn/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://tuoitre.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://tuoitre.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://tuoitre.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://tuoitre.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
      { url: 'https://tuoitre.vn/rss/nhip-song-tre.rss', category: 'Đời sống' },
    ]
  },
  {
    id: 'dantri',
    name: 'Dân Trí',
    logo: 'https://icdn.dantri.com.vn/2021/05/05/logodantri-1620205100634.png',
    color: '#27ae60',
    feeds: [
      { url: 'https://dantri.com.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://dantri.com.vn/rss/xa-hoi.rss', category: 'Thời sự' },
      { url: 'https://dantri.com.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://dantri.com.vn/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://dantri.com.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://dantri.com.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://dantri.com.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://dantri.com.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
    ]
  },
  {
    id: 'kenh14',
    name: 'Kênh 14',
    logo: 'https://kenh14cdn.com/assets/default/logo-k14.svg',
    color: '#f39c12',
    feeds: [
      { url: 'https://kenh14.vn/home.rss', category: 'Mới nhất' },
      { url: 'https://kenh14.vn/star.rss', category: 'Giải trí' },
      { url: 'https://kenh14.vn/musik.rss', category: 'Âm nhạc' },
      { url: 'https://kenh14.vn/doi-song.rss', category: 'Đời sống' },
      { url: 'https://kenh14.vn/xa-hoi.rss', category: 'Xã hội' },
      { url: 'https://kenh14.vn/the-gioi.rss', category: 'Thế giới' },
    ]
  },
  {
    id: 'vietnamnet',
    name: 'VietNamNet',
    logo: 'https://static.vietnamnet.vn/w960/images/logo-vietnamnet.svg',
    color: '#8e44ad',
    feeds: [
      { url: 'https://vietnamnet.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://vietnamnet.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://vietnamnet.vn/rss/kinh-doanh.rss', category: 'Kinh doanh' },
      { url: 'https://vietnamnet.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://vietnamnet.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://vietnamnet.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://vietnamnet.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
      { url: 'https://vietnamnet.vn/rss/doi-song.rss', category: 'Đời sống' },
    ]
  },
  {
    id: 'baomoi',
    name: 'Báo Mới',
    logo: 'https://baomoi-static.zadn.vn/favicons/favicon-32x32.png',
    color: '#1abc9c',
    feeds: [
      { url: 'https://baomoi.com/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://baomoi.com/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://baomoi.com/rss/quoc-te.rss', category: 'Thế giới' },
      { url: 'https://baomoi.com/rss/kinh-te.rss', category: 'Kinh doanh' },
      { url: 'https://baomoi.com/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://baomoi.com/rss/the-thao.rss', category: 'Thể thao' },
    ]
  },
  {
    id: 'nguoiduatin',
    name: 'Người Đưa Tin',
    logo: '',
    color: '#e67e22',
    feeds: [
      { url: 'https://www.nguoiduatin.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://www.nguoiduatin.vn/rss/phap-luat.rss', category: 'Pháp luật' },
      { url: 'https://www.nguoiduatin.vn/rss/xa-hoi.rss', category: 'Xã hội' },
    ]
  },
  {
    id: 'zingnews',
    name: 'ZingNews',
    logo: '',
    color: '#3498db',
    feeds: [
      { url: 'https://zingnews.vn/rss/tin-moi-nhat.rss', category: 'Mới nhất' },
      { url: 'https://zingnews.vn/rss/xa-hoi.rss', category: 'Xã hội' },
      { url: 'https://zingnews.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://zingnews.vn/rss/kinh-doanh-tai-chinh.rss', category: 'Kinh doanh' },
      { url: 'https://zingnews.vn/rss/giai-tri.rss', category: 'Giải trí' },
      { url: 'https://zingnews.vn/rss/the-thao.rss', category: 'Thể thao' },
      { url: 'https://zingnews.vn/rss/giao-duc.rss', category: 'Giáo dục' },
      { url: 'https://zingnews.vn/rss/suc-khoe.rss', category: 'Sức khỏe' },
    ]
  },
  {
    id: 'laodong',
    name: 'Lao Động',
    logo: '',
    color: '#d35400',
    feeds: [
      { url: 'https://laodong.vn/rss/home.rss', category: 'Mới nhất' },
      { url: 'https://laodong.vn/rss/thoi-su.rss', category: 'Thời sự' },
      { url: 'https://laodong.vn/rss/the-gioi.rss', category: 'Thế giới' },
      { url: 'https://laodong.vn/rss/kinh-te.rss', category: 'Kinh doanh' },
    ]
  }
];

export const CATEGORIES = [
  'Tất cả',
  'Mới nhất',
  'Thời sự',
  'Thế giới',
  'Kinh doanh',
  'Khoa học',
  'Giải trí',
  'Thể thao',
  'Giáo dục',
  'Sức khỏe',
  'Đời sống',
  'Pháp luật',
  'Xã hội',
];

export function getProxiedUrl(url) {
  return `${CORS_PROXY}${encodeURIComponent(url)}`;
}
