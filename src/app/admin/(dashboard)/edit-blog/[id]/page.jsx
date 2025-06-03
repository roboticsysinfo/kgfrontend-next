"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogById,
  updateBlog,
} from "@/redux/slices/blogSlice"; // adjust path if needed
import axiosInstance from "@/utils/axiosInstance";

const EditBlog = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  console.log("id", id)

  const dispatch = useDispatch();

  const { blogDetails, blogloading, blogError } = useSelector(
    (state) => state.blogs
  );

  const [formData, setFormData] = useState({
    blog_title: "",
    blog_content: "",
    blog_category: "",
    imageAltText: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [initialContent, setInitialContent] = useState("");

  // Editor setup
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
    content: "",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setFormData((prev) => ({
        ...prev,
        blog_content: content,
      }));
    },
  });

  // Fetch blog data from Redux on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  console.log("blog details", blogDetails)

  // When blogDetails is loaded, prefill form
  useEffect(() => {
    if (blogDetails) {
      setFormData({
        blog_title: blogDetails.blog_title || "",
        blog_content: blogDetails.blog_content || "",
        blog_category: blogDetails.blog_category || "",
        imageAltText: blogDetails.imageAltText || "",
        metaTitle: blogDetails.metaTitle || "",
        metaDescription: blogDetails.metaDescription || "",
        metaKeywords: blogDetails.metaKeywords?.join(", ") || "",
      });
      setInitialContent(blogDetails.blog_content || "");

      if (blogDetails.blog_image) {
        setPreview(blogDetails.blog_image);
      }
    }
  }, [blogDetails]);

  // Set editor content separately
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  // Fetch categories (unchanged)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/blog-categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        (resized) => {
          setImage(resized);
          setPreview(URL.createObjectURL(resized));
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
        updatedFormData.append(
          key,
          JSON.stringify(formData[key].split(",").map((k) => k.trim()))
        );
      } else {
        updatedFormData.append(key, formData[key]);
      }
    });

    if (image) {
      updatedFormData.append("blog_image", image);
    }

    try {
      // Dispatch Redux updateBlog thunk
      const resultAction = await dispatch(updateBlog({ id, formData: updatedFormData }));

      if (updateBlog.fulfilled.match(resultAction)) {
        alert("Blog updated successfully!");
        router.push("/admin/blogs-list");
      } else {
        alert("Update failed: " + (resultAction.payload || "Unknown error"));
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed due to server error.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-40 border rounded">
      <h3>Edit Blog</h3>

      <Form.Group className="mt-30">
        <Form.Label>Blog Title</Form.Label>
        <Form.Control
          type="text"
          name="blog_title"
          value={formData.blog_title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mt-30">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="blog_category"
          value={formData.blog_category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.Blog_category_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-30">
        <Form.Label>Blog Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" height="150" className="mt-2" />}
      </Form.Group>

      <Form.Group className="mt-30">
        <Form.Label>Image Alt Text</Form.Label>
        <Form.Control
          type="text"
          name="imageAltText"
          value={formData.imageAltText}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mt-30">
        <Form.Label>Meta Title</Form.Label>
        <Form.Control
          type="text"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mt-30">
        <Form.Label>Meta Description</Form.Label>
        <Form.Control
          type="text"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mt-30">
        <Form.Label>Meta Keywords (comma-separated)</Form.Label>
        <Form.Control
          type="text"
          name="metaKeywords"
          value={formData.metaKeywords}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mt-30">
        <Form.Label>Content</Form.Label>
        <div className="tiptap-editor border p-2 rounded bg-white">
          <EditorContent editor={editor} />
        </div>
      </Form.Group>

      <Button type="submit" className="mt-4" disabled={blogloading}>
        {blogloading ? "Updating..." : "Update Blog"}
      </Button>
    </Form>
  );
};

export default EditBlog;
