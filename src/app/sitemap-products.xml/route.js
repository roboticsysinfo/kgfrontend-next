import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://www.kissangrowth.com';

  try {
    const res = await fetch('https://kissangrowth.com/api/products?limit=50000', {
      next: { revalidate: 60 }, // revalidates every 60s
    });

    const json = await res.json();
    const products = Array.isArray(json?.products) ? json.products : [];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    products.forEach((product) => {
      const name = typeof product.name === 'string' ? product.name : 'product';
      const slug = slugify(name, { lower: true, strict: true });
      const id = product._id;
      const updatedAt = new Date(product.updatedAt || product.createdAt || new Date()).toISOString();

      xml += `
  <url>
    <loc>${baseUrl}/product/${slug}-${id}</loc>
    <lastmod>${updatedAt}</lastmod>
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
  } catch (error) {
    console.error('❌ Error generating product sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
