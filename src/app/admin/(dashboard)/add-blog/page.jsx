'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '@/redux/slices/blogSlice';
import { fetchBlogCategories } from '@/redux/slices/blogCategorySlice';
import Resizer from 'react-image-file-resizer';
import { useRouter } from 'next/navigation';
import BlogQuill from '@/components/admin/BlogQuill';

export default function BlogFormPage({ initialData = {} }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { blogcategories, loading: categoryLoading } = useSelector((state) => state.blogCategory);
  const { loading, error } = useSelector((state) => state.blogs);

  const [formData, setFormData] = useState({
    blog_title: initialData.blog_title || '',
    blog_content: initialData.blog_content || '',
    blog_category: initialData.blog_category || '',
    blog_image: initialData.blog_image || '',
    imageAltText: initialData.imageAltText || '',
    metaTitle: initialData.metaTitle || '',
    metaDescription: initialData.metaDescription || '',
    metaKeywords: initialData.metaKeywords ? initialData.metaKeywords.join(', ') : '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, blog_content: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        1200,
        620,
        'jpeg',
        80,
        0,
        (resized) => {
          setImage(resized);
          setPreview(URL.createObjectURL(resized));
        },
        'file'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = new FormData();

    console.log("blogData", blogData)

    Object.keys(formData).forEach((key) => {
      if (key === 'metaKeywords') {
        blogData.append(key, formData[key].split(',').map((k) => k.trim()));
      } else {
        blogData.append(key, formData[key]);
      }
    });

    if (image) {
      blogData.append('blog_image', image);
    }

    const result = await dispatch(createBlog(blogData));

    console.log("result", result)

    if (createBlog.fulfilled.match(result)) {
      alert('✅ Blog created!');
      router.push('/admin/blogs-list');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-60 border rounded">

      <div className="mb-30">
        <label className="form-label">Blog Title</label>
        <input
          type="text"
          name="blog_title"
          className="form-control"
          value={formData.blog_title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-30">
        <label className="form-label">Category</label>
        <select
          name="blog_category"
          className="form-control"
          value={formData.blog_category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categoryLoading ? (
            <option>Loading...</option>
          ) : (
            blogcategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.Blog_category_name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="mb-30">
        <label className="form-label">Blog Image</label>
        <input type="file" className="form-control" onChange={handleImageChange} />
        {preview && <img src={preview} height="150" className="mt-2" alt="Preview" />}
      </div>

      <div className="mb-30">
        <label className="form-label">Image Alt Text</label>
        <input
          type="text"
          name="imageAltText"
          className="form-control"
          value={formData.imageAltText}
          onChange={handleChange}
        />
      </div>

      <div className="mb-30">
        <label className="form-label">Meta Title</label>
        <input
          type="text"
          name="metaTitle"
          className="form-control"
          value={formData.metaTitle}
          onChange={handleChange}
        />
      </div>

      <div className="mb-30">
        <label className="form-label">Meta Description</label>
        <input
          type="text"
          name="metaDescription"
          className="form-control"
          value={formData.metaDescription}
          onChange={handleChange}
        />
      </div>

      <div className="mb-30">
        <label className="form-label">Meta Keywords (comma-separated)</label>
        <input
          type="text"
          name="metaKeywords"
          className="form-control"
          value={formData.metaKeywords}
          onChange={handleChange}
        />
      </div>

      <div className="mb-30">
        <label className="form-label">Blog Content</label>
        <BlogQuill value={formData.blog_content} onChange={handleQuillChange} />

      </div>

      {error && <div className="text-danger mb-3">{error}</div>}

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? 'Adding...' : 'Add Blog'}
      </button>
    </form>
  );
}
