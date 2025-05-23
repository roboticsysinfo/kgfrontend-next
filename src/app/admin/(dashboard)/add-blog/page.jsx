"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "@/redux/slices/blogSlice";
import { fetchBlogCategories } from "@/redux/slices/blogCategorySlice";
import Resizer from "react-image-file-resizer";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Page = ({ initialData = {} }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { blogcategories, loading: categoryLoading } = useSelector((state) => state.blogCategory);
  const { loading, error } = useSelector((state) => state.blogs);

  const [formData, setFormData] = useState({
    blog_title: initialData.blog_title || "",
    blog_content: initialData.blog_content || "",
    blog_category: initialData.blog_category || "",
    blog_image: initialData.blog_image || "",
    imageAltText: initialData.imageAltText || "",
    metaTitle: initialData.metaTitle || "",
    metaDescription: initialData.metaDescription || "",
    metaKeywords: initialData.metaKeywords ? initialData.metaKeywords.join(", ") : "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showQuill, setShowQuill] = useState(false); // <-- Lazy load ReactQuill

  useEffect(() => {
    dispatch(fetchBlogCategories());

    // Delay ReactQuill render to avoid findDOMNode error
    const timer = setTimeout(() => {
      setShowQuill(true);
    }, 0);

    return () => clearTimeout(timer);
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
        "jpeg",
        80,
        0,
        (resizedImage) => {
          setImage(resizedImage);
          setPreview(URL.createObjectURL(resizedImage));
        },
        "file"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "metaKeywords") {
        // Append metaKeywords as array
        blogData.append(key, formData[key].split(",").map((item) => item.trim()));
      } else {
        blogData.append(key, formData[key]);
      }
    });

    if (image) {
      blogData.append("blog_image", image);
    }

    const resultAction = await dispatch(createBlog(blogData));

    if (createBlog.fulfilled.match(resultAction)) {
      alert("Blog added successfully!");
      router.push("/admin/blogs-list");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label htmlFor="blog_title" className="form-label">Blog Title</label>
        <input
          type="text"
          className="form-control"
          id="blog_title"
          name="blog_title"
          value={formData.blog_title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="blog_category" className="form-label">Category</label>
        <select
          className="form-control"
          id="blog_category"
          name="blog_category"
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

      <div className="mb-3">
        <label htmlFor="blog_image" className="form-label">Blog Image</label>
        <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
        {preview && <img src={preview} alt="Preview" height="150" className="mt-2" />}
      </div>

      <div className="mb-3">
        <label htmlFor="imageAltText" className="form-label">Image Alt Text</label>
        <input
          type="text"
          className="form-control"
          name="imageAltText"
          value={formData.imageAltText}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="metaTitle" className="form-label">Meta Title</label>
        <input
          type="text"
          className="form-control"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="metaDescription" className="form-label">Meta Description</label>
        <input
          type="text"
          className="form-control"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="metaKeywords" className="form-label">Meta Keywords (comma separated)</label>
        <input
          type="text"
          className="form-control"
          name="metaKeywords"
          value={formData.metaKeywords}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Blog Content</label>
        {showQuill ? (
          <ReactQuill
            value={formData.blog_content}
            onChange={handleQuillChange}
            theme="snow"
            modules={modules}
            style={{ height: "300px" }}
          />
        ) : (
          <div>Loading editor...</div>
        )}
      </div>

      {error && <div className="text-danger mb-3">{error}</div>}

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Adding..." : "Add Blog"}
      </button>
    </form>
  );
};

export default Page;
