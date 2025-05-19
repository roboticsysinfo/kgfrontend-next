import React, { useState, useEffect, Suspense } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, fetchBlogById } from "../../../redux/slices/blogSlice";
import { fetchBlogCategories } from "../../../redux/slices/blogCategorySlice";
import { useParams, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import "react-quill/dist/quill.snow.css";

const ReactQuill = React.lazy(() => import("react-quill"));

const EditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 Blog ID from URL

  const { blogDetails, blogloading, blogError } = useSelector((state) => state.blogs);
  const { blogcategories } = useSelector((state) => state.blogCategory);

  const [formData, setFormData] = useState({
    blog_title: "",
    blog_content: "",
    blog_category: "",
    blog_image: "",
    imageAltText: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogCategories());
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blogDetails) {
      setFormData({
        blog_title: blogDetails.blog_title || "",
        blog_content: blogDetails.blog_content || "",
        blog_category: blogDetails.blog_category || "",
        blog_image: blogDetails.blog_image || "",
        imageAltText: blogDetails.imageAltText || "",
        metaTitle: blogDetails.metaTitle || "",
        metaDescription: blogDetails.metaDescription || "",
        metaKeywords: blogDetails.metaKeywords ? blogDetails.metaKeywords.join(", ") : "",
      });
      if (blogDetails.blog_image) {
        setPreview(blogDetails.blog_image); // Preload existing image
      }
    }
  }, [blogDetails]);

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
    const updatedFormData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "metaKeywords") {
        updatedFormData.append(key, formData[key].split(",").map((item) => item.trim()));
      } else {
        updatedFormData.append(key, formData[key]);
      }
    });

    if (image) {
      updatedFormData.append("blog_image", image);
    }

    const result = await dispatch(updateBlog({ id, formData: updatedFormData }));
    if (updateBlog.fulfilled.match(result)) {
      alert("Blog updated successfully!");
      navigate("/admin/blogs-list");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"]
    ]
  };

  return (
    <Form onSubmit={handleSubmit} className="p-40 border rounded">
      <h3>Edit Blog</h3>

      <Form.Group controlId="blog_title">
        <Form.Label>Blog Title</Form.Label>
        <Form.Control
          type="text"
          name="blog_title"
          value={formData.blog_title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="blog_category" className="mt-20">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="blog_category"
          value={formData.blog_category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {blogcategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.Blog_category_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="blog_image" className="mt-20">
        <Form.Label>Blog Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
        {preview && <img src={preview} alt="Preview" height="150" className="mt-2" />}
      </Form.Group>

      <Form.Group controlId="imageAltText" className="mt-20">
        <Form.Label>Image Alt Text</Form.Label>
        <Form.Control
          type="text"
          name="imageAltText"
          value={formData.imageAltText}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="metaTitle" className="mt-20">
        <Form.Label>Meta Title</Form.Label>
        <Form.Control
          type="text"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="metaDescription" className="mt-20">
        <Form.Label>Meta Description</Form.Label>
        <Form.Control
          type="text"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="metaKeywords" className="mt-20">
        <Form.Label>Meta Keywords (comma-separated)</Form.Label>
        <Form.Control
          type="text"
          name="metaKeywords"
          value={formData.metaKeywords}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="blogContent" className="mt-20">
        <Form.Label>Content</Form.Label>
        <Suspense fallback={<div>Loading editor...</div>}>
          <ReactQuill
            value={formData.blog_content}
            onChange={handleQuillChange}
            theme="snow"
            style={{ height: "400px" }}
            modules={modules}
          />
        </Suspense>
      </Form.Group>

      {blogError && <p className="text-danger mt-2">{blogError}</p>}

      <Button variant="primary" type="submit" className="mt-3" disabled={blogloading}>
        {blogloading ? "Updating..." : "Update Blog"}
      </Button>
    </Form>
  );
};

export default EditBlog;
