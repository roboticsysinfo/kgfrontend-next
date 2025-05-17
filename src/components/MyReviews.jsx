"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchReviewsByCustomerId, deleteReview } from "@/redux/slices/reviewSlice";

const MyReviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.reviews);
  const [customerId, setCustomerId] = useState(null); // new state

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setCustomerId(user?.id);
    }
  }, []);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchReviewsByCustomerId(customerId));
    }
  }, [dispatch, customerId]);

  const handleDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId));
    }
  };

  const columns = [
    {
      name: "Shop Name",
      selector: (row) => row.shop_id?.shop_name || "N/A",
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      wrap: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(row._id)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h4>My Reviews</h4>
      <hr />
      <DataTable
        columns={columns}
        data={reviews}
        progressPending={loading}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default MyReviews;
