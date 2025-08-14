import slugify from 'slugify';

export async function GET() {
  const baseUrl = 'https://www.kissangrowth.com';

  const blogsRes = await fetch('https://kissangrowth.com/api/blogs?page=1&limit=50000', {
    next: { revalidate: 60 },
  });

  const blogsJson = await blogsRes.json();
  const blogs = Array.isArray(blogsJson?.blogs) ? blogsJson.blogs : [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  blogs.forEach((blog) => {
    const title = typeof blog.blog_title === 'string' ? blog.blog_title : 'blog';
    const slug = slugify(title, { lower: true, strict: true });
    const lastmod = blog.updatedAt
      ? new Date(blog.updatedAt).toISOString()
      : new Date().toISOString();

    xml += `
  <url>
    <loc>${baseUrl}/blog/${slug}/${blog._id}</loc>
    <lastmod>${lastmod}</lastmod>
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
