"use client"
import React, { useState, useEffect, Suspense } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "@/redux/slices/blogSlice";
import { fetchBlogCategories } from "@/redux/slices/blogCategorySlice";
import Resizer from "react-image-file-resizer"; // ✅ Import Resizer
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";


const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // ✅ disables server-side rendering for this component
});
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
  const [preview, setPreview] = useState(null); // ✅ For preview

  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, blog_content: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        1200, // max width
        620, // max height
        "jpeg",
        80, // quality
        0,
        (resizedImage) => {
          setImage(resizedImage);
          setPreview(URL.createObjectURL(resizedImage)); // ✅ Set preview
        },
        "file" // output type
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "metaKeywords") {
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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  return (
    <Form onSubmit={handleSubmit} className="p-40 border rounded">
      <Form.Group controlId="blog_title">
        <Form.Label>Blog Title</Form.Label>
        <Form.Control type="text" name="blog_title" value={formData.blog_title} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="blog_category" className="mt-20">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="blog_category" value={formData.blog_category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categoryLoading ? (
            <option>Loading categories...</option>
          ) : (
            
              blogcategories.map((category) => (
                <option key={category._id} value={category._id}>{category.Blog_category_name}</option>
              ))
            

          )}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="blog_image" className="mt-20">
        <Form.Label>Blog Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
        {preview && <img src={preview} alt="Preview" height="150" className="mt-2" />}
      </Form.Group>

      <Form.Group controlId="imageAltText" className="mt-20">
        <Form.Label>Image Alt Text</Form.Label>
        <Form.Control type="text" name="imageAltText" value={formData.imageAltText} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="metaTitle" className="mt-20">
        <Form.Label>Meta Title</Form.Label>
        <Form.Control type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="metaDescription" className="mt-20">
        <Form.Label>Meta Description</Form.Label>
        <Form.Control type="text" name="metaDescription" value={formData.metaDescription} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="metaKeywords" className="mt-20">
        <Form.Label>Meta Keywords (comma-separated)</Form.Label>
        <Form.Control type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="blogContent" className="mt-20">
        <Form.Label>Content</Form.Label>
        <ReactQuill
          value={formData.blog_content}
          onChange={handleQuillChange}
          theme="snow"
          style={{ height: "500px" }}
          modules={modules}
        />
      </Form.Group>


      <hr />

      {error && <p className="text-danger mt-2">{error}</p>}

      <Button variant="success" type="submit" className="mt-20" disabled={loading}>
        {loading ? "Adding..." : "Add Blog"}
      </Button>
    </Form>
  );
};

export default Page;
