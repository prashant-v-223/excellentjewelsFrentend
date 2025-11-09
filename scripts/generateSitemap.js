const { generateSitemap } = require('../src/utils/sitemapGenerator');

generateSitemap()
  .then(() => console.log('✅ Sitemap generated successfully'))
  .catch(err => console.error('❌ Sitemap generation failed:', err));