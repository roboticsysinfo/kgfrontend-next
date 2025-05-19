"use client"
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "@/redux/slices/blogSlice";
import { Button } from "react-bootstrap";
import Link from "next/link";

const Page = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { blogs, totalPages, currentPage, blogloading, loading, error } = useSelector((state) => state.blogs);
    const [page, setPage] = useState(1);


    useEffect(() => {
        dispatch(fetchBlogs({ page, limit: 10 }));
    }, [dispatch]);

    // Delete Blog
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteBlog(id));
        }
    };

    // Define Table Columns
    const columns = [
        {
            name: "Image",
            selector: (row) => row.blog_image,
            cell: (row) => (
                <img
                    src={ row.blog_image || "https://via.placeholder.com/50"}
                    alt={row.imageAltText || "Blog Image"}
                    className="w-100 h-100 rounded-md object-cover"
                />
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
            selector: (row) => new Date(row.createdAt).toDateString() || "N/A",
            sortable: true,
        },

        {
            name: "Actions",
            cell: (row) => (

                <div className="flex gap-2">
                    <Button as={Link} to={`/admin/edit-blog/${row._id}`} variant="warning">
                        Edit
                    </Button>
                    <Button className="btn btn-danger" size="sm" variant="destructive" onClick={() => handleDelete(row._id)}>
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

            {error && <p className="text-red-500">{error}</p>}

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
