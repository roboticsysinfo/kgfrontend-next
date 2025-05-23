"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "@/redux/slices/blogSlice";
import { Button } from "react-bootstrap";
import Link from "next/link";
import moment from "moment";

const Page = () => {
    
  const dispatch = useDispatch();
  const { blogs, totalPages, currentPage, blogloading, loading, error } = useSelector(
    (state) => state.blogs
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogs({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => row.blog_image,
      cell: (row) => (
        <div style={{ width: 50, height: 50 }}>
          <img
            src={row.blog_image || "https://via.placeholder.com/50"}
            alt={row.imageAltText || "Blog Image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
    {
      name: "Title",
      selector: (row) => row.blog_title,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.blog_category?.Blog_category_name || "N/A",
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      format: (row) => moment(row.createdAt).format("DD MMM YYYY, hh:mm A"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Link href={`/admin/edit-blog/${row._id}`} passHref legacyBehavior>
            <Button variant="warning" size="sm">Edit</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Blogs List</h2>

      {error && <p className="text-danger">{error}</p>}

      <DataTable
        columns={columns}
        data={blogs}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default Page;
