import BlogDetail from "@/components/BlogDetails";
import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// Helper to extract ID from slug
const extractIdFromSlug = (slug) => {
  const parts = slug.split("-");
  return parts[parts.length - 1];
};

// Helper to strip HTML tags and trim text
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};

export async function generateMetadata({ params }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/blog/${params.id}`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });
        const data = await res.json();
        const blog = data?.data;

        console.log("data", data);
        console.log("blog", blog);

        return {
            title: blog?.metaTitle || 'Blog Detail',
            description: blog?.metaDescription || 'Blog detail page',
            keywords: blog?.metaKeywords || 'Blog Keywords',
        };
    } catch (error) {
        return {
            title: 'Blog Detail',
            description: 'Blog detail page',
            keywords: blog?.metaKeywords || 'Blog Keywords',
        };
    }
}

const Page = async (props) => {
  const { params } = await props;
  const blogId = extractIdFromSlug(params.id);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/blog/${blogId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch blog");

    const blog = await res.json();

    return (
      <ClientLayoutWrapper>
        <Breadcrumb title={blog.blog_title} />
        <BlogDetail blog={blog} />
      </ClientLayoutWrapper>
    );
  } catch (error) {
    return (
      <ClientLayoutWrapper>
        <Breadcrumb title="Blog Not Found" />
        <p className="text-center py-40">Blog not found.</p>
      </ClientLayoutWrapper>
    );
  }
};

export default Page;
