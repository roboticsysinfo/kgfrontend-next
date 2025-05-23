"use client";
import { useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import RecentBlogs from "./RecentBlogs";
import DOMPurify from "isomorphic-dompurify";
import axiosInstance from "@/utils/axiosInstance";

const fixInvalidNesting = (html) => {
    return html
        .replace(/<p[^>]*>(\s*)<div/gi, "<div")
        .replace(/<\/div>(\s*)<\/p>/gi, "</div>");
};

const BlogDetail = ({ blog }) => {
    if (!blog || !blog.data) return null;

    const blogData = blog.data;

    // Client side view count increment
    useEffect(() => {
        if (!blogData._id) return;

        const viewedBlogs = JSON.parse(localStorage.getItem("viewedBlogs") || "[]");

        if (!viewedBlogs.includes(blogData._id)) {
            axiosInstance
                .put(`/blog/view/${blogData._id}`)
                .then(() => {
                    // एक बार view बढ़ने के बाद localStorage में ID स्टोर करो ताकि बार-बार ना बढ़े
                    localStorage.setItem(
                        "viewedBlogs",
                        JSON.stringify([...viewedBlogs, blogData._id])
                    );
                })
                .catch((error) => {
                    console.error("View count increase failed:", error);
                });
        }
    }, [blogData._id]);

    const rawContent = blogData.blog_content || "<p>No content available</p>";
    const fixedHtml = fixInvalidNesting(rawContent);
    const sanitizedHtml = DOMPurify.sanitize(fixedHtml);

    return (
        <section className="blog-details py-80">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
                        <div className="blog-item-wrapper">
                            <div className="blog-item">
                                <OptimizedImage
                                    imageUrl={blogData.blog_image || "https://via.placeholder.com/600x400"}
                                    alt={blogData.imageAltText || "Blog Image"}
                                    width={1200}
                                    height={620}
                                    quality={80}
                                    format="webp"
                                    className="cover-img rounded-16"
                                />

                                <div className="blog-item__content mt-24">
                                    <span className="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16">
                                        {blogData.blog_category?.Blog_category_name || "Uncategorized"}
                                    </span>

                                    <div className="dflexinpugroup my-20">
                                        <div className="flex-align flex-wrap gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-calendar-dots" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(blogData.createdAt).toDateString()}
                                            </span>
                                        </div>

                                        <div className="flex-align flex-wrap gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-eye" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {blogData.blog_views || 0} View{blogData.blog_views > 1 ? "s" : ""}
                                            </span>
                                        </div>
                                    </div>

                                    <h4 className="mb-24">{blogData.blog_title}</h4>

                                    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-xs-12 col-sm-12">
                        <RecentBlogs />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetail;
