export async function GET() {
  const baseUrl = 'https://www.kissangrowth.com';
  const staticPages = [
    '',
    '/about-us',
    '/contact',
    '/kissan-growth-mobile-apps',
    '/products',
    '/farmers',
    '/blogs',
    '/terms-and-conditions',
    '/privacy-policy',
    '/login',
    '/register',
    '/farmer/register',
    'farmer/login'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
