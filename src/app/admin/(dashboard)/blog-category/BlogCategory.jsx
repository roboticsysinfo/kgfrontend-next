import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogCategories,
  addBlogCategory,
  deleteBlogCategory,
} from "../../redux/slices/blogCategorySlice";

const BlogCategory = () => {
  const dispatch = useDispatch();
  const { blogcategories, loading } = useSelector((state) => state.blogCategory);

  const [categoryName, setCategoryName] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    dispatch(addBlogCategory({ Blog_category_name: categoryName }));
    setCategoryName("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteBlogCategory(id));
    }
  };

  const columns = [
    { name: "Category Name", selector: (row) => row.Blog_category_name, sortable: true },
    { name: "Created At", selector: (row) => new Date(row.createdAt).toLocaleDateString(), sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button onClick={() => handleDelete(row._id)} className="btn btn-danger btn-sm">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-40 border rounded-lg bg-white">
      {/* Add Category Form */}
      <h2 className="text-xl font-semibold mb-20">Add Blog Category</h2>
      <hr />
      <form onSubmit={handleSubmit} className="space-y-3 dflexinpugroup">
        <div className="form-group mb-30">
          <label className="block text-sm font-medium">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded-lg form-control"
            placeholder="Enter category name"
            required
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      <hr />

      {/* Blog Categories List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Blog Categories</h2>
        <DataTable
          columns={columns}
          data={blogcategories}
          progressPending={loading}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default BlogCategory;
