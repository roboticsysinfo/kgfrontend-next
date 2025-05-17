import BlogDetail from "@/components/BlogDetail";
import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

// Helper function to extract blog ID from slug
const extractIdFromSlug = (slug) => {
    const parts = slug.split("-");
    return parts[parts.length - 1];
};

export async function generateMetadata({ params }) {
    const blogId = extractIdFromSlug(params.slug);

    console.log("blogId", blogId)

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/blog/${blogId}`);
        const blog = res.data;

        console.log("blog", blog)

        return {
            title: blog.metaTitle,
            description: blog.metaDescription,
            keywords: blog.metaKeywords,
        };
    } catch (error) {
        return {
            title: "Blog Not Found",
            description: "Blog not available",
        };
    }
}

const Page = async ({ params }) => {
    const blogId = extractIdFromSlug(params.slug);

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/blog/${blogId}`);
        const blog = res.data;

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
