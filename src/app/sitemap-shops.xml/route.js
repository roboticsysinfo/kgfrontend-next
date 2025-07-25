import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://kissangrowth.com';
  const res = await fetch('https://kissangrowth.com/api/farmer-shops?limit=50000');
  const json = await res.json();
  const shops = Array.isArray(json?.data) ? json.data : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  shops.forEach((shop) => {
    const slug = slugify(shop.shop_name || '', { lower: true, strict: true });
    xml += `
  <url>
    <loc>${baseUrl}/shop/${slug}-${shop._id}</loc>
    <lastmod>${new Date(shop.updatedAt || shop.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
