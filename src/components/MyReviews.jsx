"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchReviewsByCustomerId, deleteReview } from "@/redux/slices/reviewSlice";

const MyReviews = () => {

  const dispatch = useDispatch();
  const { reviews, loading, successMessage, error } = useSelector((state) => state.reviews);
  const user = JSON.parse(localStorage.getItem("user"));
  const customerId = user?.id;

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

  console.log("Customer Reviews", reviews)

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
      <hr/>
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
