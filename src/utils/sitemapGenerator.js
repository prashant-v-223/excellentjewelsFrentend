/**
 * File: public/robots.txt
 * 
 * User-agent: *
 * Allow: /
 * Disallow: /admin/
 * Disallow: /api/
 * Disallow: /cart/
 * Disallow: /checkout/
 * Disallow: /my-account/
 * Disallow: /edit-profile/
 * Disallow: /change-password/
 * Disallow: /my-orders/
 * Disallow: /my-hold-list/
 * Disallow: /order-detail/
 * Disallow: /search?
 * 
 * # Allow all crawlers to access product pages
 * Allow: /diamond/
 * Allow: /jewellery/
 * Allow: /hip-hop-jewellery/
 * Allow: /education/
 * 
 * # Sitemap location
 * Sitemap: https://www.excellentjewels.com/sitemap.xml
 * 
 * # Crawl delay (optional)
 * Crawl-delay: 1
 */

/**
 * Sitemap Generator Utility
 * Use this to generate dynamic sitemap based on your products
 */

import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Static pages configuration
const STATIC_PAGES = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/diamond', changefreq: 'daily', priority: 0.9 },
  { url: '/jewellery', changefreq: 'daily', priority: 0.9 },
  { url: '/hip-hop-jewellery', changefreq: 'weekly', priority: 0.8 },
  { url: '/education', changefreq: 'weekly', priority: 0.7 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.6 },
  { url: '/faqs', changefreq: 'monthly', priority: 0.5 },
  { url: '/events', changefreq: 'weekly', priority: 0.6 },
  
  // Education pages
  { url: '/education/4cs-diamond', changefreq: 'monthly', priority: 0.7 },
  { url: '/education/what-are-lab-grown-diamonds', changefreq: 'monthly', priority: 0.7 },
  { url: '/education/how-are-lab-grown-diamonds-created', changefreq: 'monthly', priority: 0.7 },
  { url: '/education/chemical-vapor-deposition', changefreq: 'monthly', priority: 0.6 },
  { url: '/education/high-pressure-high-temperature', changefreq: 'monthly', priority: 0.6 },
  { url: '/education/cvd-diamond-vs-hpht-diamond', changefreq: 'monthly', priority: 0.6 },
  { url: '/education/natural-diamond-vs-lab-grown-diamond', changefreq: 'monthly', priority: 0.7 },
  { url: '/education/diamond-mm-to-carat-weight-chats', changefreq: 'monthly', priority: 0.6 },
  { url: '/education/advantages-of-lab-grown-diamonds', changefreq: 'monthly', priority: 0.7 },
  { url: '/education/choosing-the-perfect-engagement-ring', changefreq: 'monthly', priority: 0.7 },
  { url: '/education/caring-for-your-lab-grown-diamond-jewelry', changefreq: 'monthly', priority: 0.6 },
  
  // Policy pages
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.3 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/shipping-policy', changefreq: 'yearly', priority: 0.4 },
  { url: '/return-and-refund-policy', changefreq: 'yearly', priority: 0.4 }
];

/**
 * Generate Sitemap
 * Call this function to create sitemap.xml
 */
export const generateSitemap = async () => {
  try {
    const sitemap = new SitemapStream({ hostname: 'https://www.excellentjewels.com' });
    const writeStream = createWriteStream(resolve('./public/sitemap.xml'));

    sitemap.pipe(writeStream);

    // Add static pages
    STATIC_PAGES.forEach(page => {
      sitemap.write({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString()
      });
    });

    // Fetch and add dynamic diamond pages
    const diamonds = await fetchAllDiamonds(); // Replace with your API call
    diamonds.forEach(diamond => {
      sitemap.write({
        url: `/diamond-detail/${diamond.id}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: diamond.updatedAt || new Date().toISOString(),
        img: [
          {
            url: diamond.image,
            title: `${diamond.carat} Carat ${diamond.shape} Diamond`,
            caption: `${diamond.color} color, ${diamond.clarity} clarity`
          }
        ]
      });
    });

    // Fetch and add dynamic jewelry pages
    const jewelry = await fetchAllJewelry(); // Replace with your API call
    jewelry.forEach(item => {
      sitemap.write({
        url: `/jewellery-detail/${item.id}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: item.updatedAt || new Date().toISOString(),
        img: [
          {
            url: item.image,
            title: item.name,
            caption: item.description
          }
        ]
      });
    });

    // Fetch and add hip hop jewelry pages
    const hipHopItems = await fetchAllHipHopJewelry(); // Replace with your API call
    hipHopItems.forEach(item => {
      sitemap.write({
        url: `/hip-hop-jewellery-detail/${item.id}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: item.updatedAt || new Date().toISOString()
      });
    });

    sitemap.end();

    await streamToPromise(sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

/**
 * React Component for Dynamic Sitemap Route
 * Add this to your Express server or Next.js API route
 */
export const SitemapRoute = async (req, res) => {
  try {
    const sitemap = new SitemapStream({ hostname: 'https://www.excellentjewels.com' });
    
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    sitemap.pipe(res);

    // Add all pages
    STATIC_PAGES.forEach(page => {
      sitemap.write({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority
      });
    });

    // Add dynamic pages (fetch from database)
    const diamonds = await fetchAllDiamonds();
    diamonds.forEach(diamond => {
      sitemap.write({
        url: `/diamond-detail/${diamond.id}`,
        changefreq: 'weekly',
        priority: 0.8
      });
    });

    sitemap.end();
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
};

// Mock functions - replace with actual API calls
async function fetchAllDiamonds() {
  // Replace with your actual database query
  return [
    { id: '1', carat: 1.5, shape: 'Round', color: 'D', clarity: 'VS1', image: '/images/diamonds/1.jpg', updatedAt: '2024-10-01' },
    { id: '2', carat: 2.0, shape: 'Princess', color: 'E', clarity: 'VVS1', image: '/images/diamonds/2.jpg', updatedAt: '2024-10-05' }
  ];
}

async function fetchAllJewelry() {
  // Replace with your actual database query
  return [
    { id: '1', name: 'Solitaire Ring', description: 'Classic engagement ring', image: '/images/jewelry/1.jpg', updatedAt: '2024-09-15' },
    { id: '2', name: 'Halo Ring', description: 'Diamond halo setting', image: '/images/jewelry/2.jpg', updatedAt: '2024-09-20' }
  ];
}

async function fetchAllHipHopJewelry() {
  // Replace with your actual database query
  return [
    { id: '1', name: 'Cuban Chain', updatedAt: '2024-09-10' },
    { id: '2', name: 'Tennis Chain', updatedAt: '2024-09-12' }
  ];
}

/**
 * XML Sitemap Template (if you prefer manual creation)
 * Save this as public/sitemap.xml
 */
export const MANUAL_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>https://www.excellentjewels.com/</loc>
    <lastmod>2024-10-10</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Diamond Pages -->
  <url>
    <loc>https://www.excellentjewels.com/diamond</loc>
    <lastmod>2024-10-10</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Jewellery Pages -->
  <url>
    <loc>https://www.excellentjewels.com/jewellery</loc>
    <lastmod>2024-10-10</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Education -->
  <url>
    <loc>https://www.excellentjewels.com/education</loc>
    <lastmod>2024-10-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Add more URLs as needed -->
  
</urlset>`;

/**
 * Integration Instructions:
 * 
 * 1. Install dependencies:
 *    npm install sitemap
 * 
 * 2. Add to package.json scripts:
 *    "generate-sitemap": "node scripts/generateSitemap.js"
 * 
 * 3. Create scripts/generateSitemap.js:
 *    import { generateSitemap } from '../src/utils/sitemapGenerator';
 *    generateSitemap();
 * 
 * 4. Run before deployment:
 *    npm run generate-sitemap
 * 
 * 5. For dynamic sitemap in Express:
 *    app.get('/sitemap.xml', SitemapRoute);
 * 
 * 6. Submit to Google Search Console:
 *    https://search.google.com/search-console
 */