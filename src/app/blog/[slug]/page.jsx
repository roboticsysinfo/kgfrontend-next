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

export async function generateMetadata(props) {
  const { params } = await props;
  const blogId = extractIdFromSlug(params.slug);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/blog/${blogId}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch blog metadata");

    const blog = await res.json();

    const cleanDescription = stripHtml(blog.description).slice(0, 160);

    return {
      title: blog.metaTitle || blog.blog_title || "Blog",
      description: blog.metaDescription || cleanDescription || "Blog description not available",
      keywords: blog.metaKeywords || "blog, article, post",
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
      description: "Blog not available",
    };
  }
}

const Page = async (props) => {
  const { params } = await props;
  const blogId = extractIdFromSlug(params.slug);

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
