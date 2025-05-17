"use client";
import OptimizedImage from "@/components/OptimizedImage";
import RecentBlogs from "./RecentBlogs";
import DOMPurify from "isomorphic-dompurify";

const fixInvalidNesting = (html) => {
    return html
        .replace(/<p[^>]*>(\s*)<div/gi, "<div")
        .replace(/<\/div>(\s*)<\/p>/gi, "</div>");
};

const BlogDetail = ({ blog }) => {
    if (!blog) return null;

    const rawHtml = fixInvalidNesting(blog.blog_content || "No content available");
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);

    console.log("sanitized blog content:", sanitizedHtml);

    return (

        <section className="blog-details py-80">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
                        <div className="blog-item-wrapper">
                            <div className="blog-item">
                                <OptimizedImage
                                    imageUrl={blog?.blog_image || "https://via.placeholder.com/600x400"}
                                    alt={blog.imageAltText || "Blog Image"}
                                    width={1200}
                                    height={620}
                                    quality={80}
                                    format="webp"
                                    className="cover-img rounded-16"
                                />

                                <div className="blog-item__content mt-24">
                                    <span className="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16">
                                        {blog.blog_category?.Blog_category_name}
                                    </span>

                                    <div className='dflexinpugroup my-20'>
                                        <div className="flex-align flex-wrap gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-calendar-dots" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(blog.createdAt).toDateString()}
                                            </span>
                                        </div>

                                        <div className="flex-align flex-wrap gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-eye" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {blog.blog_views || 0} View
                                            </span>
                                        </div>
                                    </div>

                                    <h4 className="mb-24">{blog.blog_title}</h4>

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
