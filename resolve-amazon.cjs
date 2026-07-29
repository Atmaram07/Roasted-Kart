const https = require('https');
const urls = [
  'https://amzn.in/d/0hhNl7NF',
  'https://amzn.in/d/0gIyrvYl',
  'https://amzn.in/d/0fn6W1AU',
  'https://amzn.in/d/0dhNk689',
  'https://amzn.in/d/01Nd6Hm8',
  'https://amzn.in/d/0g9o9KVK',
];
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};
const request = (url) => new Promise((resolve, reject) => {
  https.get(url, { headers }, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body, url }));
    res.on('error', reject);
  }).on('error', reject);
});
const follow = async (url, max = 10) => {
  let current = url;
  for (let i = 0; i < max; i++) {
    const res = await request(current);
    if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
      const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, current).href;
      current = next;
      continue;
    }
    return { finalUrl: current, statusCode: res.statusCode, body: res.body };
  }
  throw new Error('Too many redirects');
};
(async () => {
  for (const url of urls) {
    try {
      const result = await follow(url);
      console.log('===', url);
      console.log('final', result.finalUrl, 'status', result.statusCode);
      const images = [...new Set([...result.body.matchAll(/https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9_\.\-]+\.(?:jpg|webp)/g)].map(m => m[0]))];
      console.log('images', images.length);
      console.log(images.slice(0, 20).join('\n'));
      console.log('');
    } catch (err) {
      console.error('ERROR', url, err.message);
    }
  }
})();
