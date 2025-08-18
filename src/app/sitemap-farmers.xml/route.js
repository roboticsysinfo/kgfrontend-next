import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://kissangrowth.com';

  try {
    const res = await fetch('https://kissangrowth.com/api/farmers?limit=50000', {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });

    const json = await res.json();
    const farmers = Array.isArray(json?.farmers) ? json.farmers : [];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    farmers.forEach((farmer) => {
      const safeName = typeof farmer.name === 'string' ? farmer.name : 'unnamed';
      const slug = slugify(safeName, { lower: true, strict: true });
      const id = farmer._id;
      const updatedAt = new Date(farmer.updatedAt || farmer.createdAt || new Date()).toISOString();

      xml += `
  <url>
    <loc>${baseUrl}/farmer/${slug}-${id}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('❌ Error generating farmer sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
