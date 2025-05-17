'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/redux/slices/blogSlice';

const RecentBlogs = () => {
    const dispatch = useDispatch();
    const { blogs, blogloading } = useSelector((state) => state.blogs);

    useEffect(() => {
        // Load first 5 latest blogs (descending order from backend ideally)
        dispatch(fetchBlogs({ page: 1, limit: 5 }));
    }, [dispatch]);

    return (
        <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
            {/* Search Start */}
            <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                    Search Here
                </h6>
                <form action="#">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control common-input bg-color-three"
                            placeholder="Searching..."
                        />
                        <button
                            type="submit"
                            className="btn btn-main text-2xl h-56 w-56 flex-center text-2xl input-group-text"
                        >
                            <i className="ph ph-magnifying-glass" />
                        </button>
                    </div>
                </form>
            </div>
            {/* Search End */}

            <hr />

            <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                Recent Blogs
            </h6>

            {blogloading ? (
                <p>Loading...</p>
            ) : (
                blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16"
                    >
                        <Link
                            href={`/blog/${blog._id}`}
                            className="w-100 h-100 rounded-4 overflow-hidden w-120 h-120 flex-shrink-0"
                        >
                            <img
                                src={
                                    blog.blog_image ||
                                    'https://via.placeholder.com/300'
                                }
                                alt={blog.imageAltText || 'Blog Image'}
                                className="cover-img"
                            />
                        </Link>

                        <div className="flex-grow-1">
                            <h6 className="text-lg">
                                <Link href={`/blog/${blog._id}`}>{blog.blog_title}</Link>
                            </h6>
                            <div className="flex-align flex-wrap gap-8">
                                <span className="text-lg text-main-600">
                                    <i className="ph ph-calendar-dots" />
                                </span>
                                <span className="text-sm text-gray-500">
                                    {new Date(blog.createdAt).toDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecentBlogs;
