const author = '华盛通';
const shareImages = `${process.env.VUE_APP_RES_OLD_URL}/commons/images/h5/share_default.png`;
const description =
  '华盛通是为华盛证券量身打造的集“行情、交易、资讯、社区”为一体的一站式服务平台，自主研发港股软件、美股软件，提供线上港股、美股、A股资讯、股票实时行情等服务，为您时刻紧跟美国股市、香港股市';
const time = (function getDate() {
  const date = new Date();
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate();
  const h = date.getHours() + ':';
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + ' ' + h + m + s;
})();

module.exports = {
  // Open Graph Tags [Facebook, Google+, LinkedIn, Twitter, Pinterest，钉钉]
  'og:title': { property: 'og:title', content: author, 'data-hid': 'og:title' },
  'og:site_name': { property: 'og:site_name', content: author, 'data-hid': 'og:site_name' },
  'og:type': { property: 'og:type', content: 'website', 'data-hid': 'og:type' },
  'og:image': { property: 'og:image', content: shareImages, 'data-hid': 'og:image' },
  'og:updated_time': { property: 'og:updated_time', content: time, 'data-hid': 'og:updated_time' },
  'og:rich_attachment': {
    property: 'og:rich_attachment',
    content: 'true',
    'data-hid': 'og:rich_attachment',
  },
  'og:description': {
    property: 'og:description',
    content: description,
    'data-hid': 'og:description',
  },
  'og:url': { property: 'og:url', content: '', 'data-hid': 'og:url' },

  // Schema : Google+, Pinterest, QQ 分享
  'itemprop:image': { itemprop: 'image', content: shareImages, 'data-hid': 'itemprop:image' },
  'itemprop:author': { itemprop: 'author', content: author, 'data-hid': 'itemprop:author' },
  'itemprop:headline': {
    itemprop: 'headline',
    content: author,
    'data-hid': 'itemprop:headline',
  },
  'itemprop:publisher': {
    itemprop: 'publisher',
    content: author,
    'data-hid': 'itemprop:publisher',
  },
  'itemprop:datePublished': {
    itemprop: 'datePublished',
    content: time,
    'data-hid': 'itemprop:datePublished',
  },
  'itemprop:description': {
    itemprop: 'description',
    content: description,
    'data-hid': 'itemprop:description',
  },
  'itemprop:mainEntityOfPage': {
    itemprop: 'mainEntityOfPage',
    content: '',
    'data-hid': 'itemprop:mainEntityOfPage',
  },

  // Twitter Card
  'twitter:card': { name: 'twitter:card', content: 'summary' },
  'twitter:card': { name: 'twitter:site', content: '@' + author },
  'twitter:card': { name: 'twitter:creator', content: '@' + author },
};
