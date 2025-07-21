"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/redux/slices/blogSlice';
import axiosInstance from '@/utils/axiosInstance';
import slugify from 'slugify';
import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';


const Blog = () => {

  const dispatch = useDispatch();
  const { blogs, totalPages, currentPage, blogloading } = useSelector((state) => state.blogs);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);  // Search results state
  const [isSearching, setIsSearching] = useState(false); // Flag for search mode

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchBlogs({ page, limit: 10 })); // Fetch paginated blogs if not searching
    }
  }, [dispatch, page, isSearching]);

  const handleSearch = async (e) => {
    e.preventDefault();  // Prevent form submission reload
    if (search.trim() === "") {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    try {
      setIsSearching(true);
      const res = await axiosInstance.get(`/blogs/search?query=${search}`);
      setSearchResults(res.data); // Set search results
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <section className="blog py-80">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-8 pe-xl-4">
            <div className="blog-item-wrapper">
              {isSearching ? (
                searchResults.length > 0 ? (
                  searchResults.map((blog) => (
                    <BlogItem key={blog._id} blog={blog} />
                  ))
                ) : (
                  <p>No results found.</p>
                )
              ) : (
                blogs.map((blog) => (
                  <BlogItem key={blog._id} blog={blog} />
                ))
              )}
            </div>

            {!isSearching && (
              <div className="pagination flex-align flex-wrap gap-16">
                <button className='btn btn-secondary' disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span> Page {page} of {totalPages} </span>
                <button className='btn btn-success btn-rounded' disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
              </div>
            )}
          </div>

          <div className="col-lg-4 ps-xl-4">
            {/* Search Start */}
            <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
              <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                Search Here
              </h6>
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control common-input bg-color-three"
                    placeholder="Searching..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Item Component

const BlogItem = ({ blog }) => (

  <div className="blog-item">

    <Link href={`/blog/${blog.blog_title.replace(/\s+/g, '-').toLowerCase()}-${blog._id}`} className="w-100 h-100 rounded-16 overflow-hidden">

      <OptimizedImage
        imageUrl={blog.blog_image || "https://via.placeholder.com/600x400"}
        alt={blog.blog_title}
        width={1200}
        height={620}
        quality={80}
        format="webp" // Can be 'auto', 'webp', or 'avif'
      />

    </Link>

    <div className="blog-item__content mt-24">

      <span className="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16">
        {blog.blog_category?.Blog_category_name || "Uncategorized"}
      </span>

      <h6 className="text-2xl mb-24">
        <Link href={`/blog/${blog.blog_title.replace(/\s+/g, '-').toLowerCase()}-${blog._id}`}>
          {blog.blog_title}
        </Link>
      </h6>


        <div className='text-gray-700 text-line-2' dangerouslySetInnerHTML={{ __html: blog.blog_content.substring(0, 500) || "No content available" }} />


      <div className="flex-align flex-wrap gap-24 pt-24 mt-24 border-top border-gray-100">
        <div className="flex-align flex-wrap gap-8">
          <span className="text-lg text-main-600">
            <i className="ph ph-calendar-dots" />
          </span>
          <span className="text-sm text-gray-500">
            <Link href={`/blog/${blog.blog_title.replace(/\s+/g, '-').toLowerCase()}-${blog._id}`} className="text-gray-500 hover-text-main-600">
              {new Date(blog.createdAt).toDateString()}
            </Link>
          </span>
        </div>
        <div className="flex-align flex-wrap gap-8">
          <span className="text-lg text-main-600">
            <i className="ph ph-eye" />
          </span>
          <span className="text-sm text-gray-500">
            <Link href={`/blog/${blog.blog_title.replace(/\s+/g, '-').toLowerCase()}-${blog._id}`} className="text-gray-500 hover-text-main-600">
              {blog.blog_views || 0} Views
            </Link>
          </span>
          <span className="text-sm text-gray-500">
            <Link href={`/blog/${blog.blog_title.replace(/\s+/g, '-').toLowerCase()}-${blog._id}`} className="text-gray-500 hover-text-main-600">
              | Read More
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>
);



export default Blog;
