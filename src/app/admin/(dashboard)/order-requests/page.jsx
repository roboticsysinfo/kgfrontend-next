"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { approveOrderRequest, getFarmerRequests } from "@/redux/slices/requestOrderSlice"; // Adjust path as needed

const Page = () => {

  const dispatch = useDispatch();

  // Get orders and loading/error states from Redux
  const { requests: orders, loading, error } = useSelector((state) => state.requestOrder);


  const handleAccepted = (orderId) => {
    if (window.confirm("Are you sure you want to accept this order?")) {
      dispatch(approveOrderRequest(orderId));
    }
  };


  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(getFarmerRequests()); // Fetch all farmer requests (Admin)
  }, [dispatch]);


  // Define table columns
  const columns = [
    { name: "Order ID", selector: (row) => row.request_order_id || "N/A", sortable: true },
    { name: "Customer Name", selector: (row) => row.customer_name || "N/A", sortable: true },
    { name: "Farmer Name", selector: (row) => row.farmer_name || "N/A", sortable: true },
    { name: "Customer Phone", selector: (row) => row.customer_phone || "N/A" },
    { name: "Farmer Phone", selector: (row) => row.farmer_phone || "N/A" },
    { name: "Product Name", selector: (row) => row.product_name || "N/A", sortable: true },
    { name: "Quantity", selector: (row) => row.quantity || "N/A" },
    { name: "Unit", selector: (row) => row.unit || "N/A" },
    { name: "Price per Unit", selector: (row) => row.price_per_unit || "N/A" },
    { name: "Total Price", selector: (row) => row.total_price || "N/A", sortable: true },
    { name: "Status", selector: (row) => row.status || "N/A" },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className={`btn btn-sm btn-success px-3 py-1 rounded-md ${
            row.status === "pending"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          disabled={row.status !== "pending"}
          onClick={() => handleAccepted(row.request_order_id)}
        >
          Approve
        </button>
      ),
    },
  ];


  return (
    <div className="p-4 bg-white rounded-lg shadow-md">

      <h2 className="text-xl font-semibold my-5">Farmer Orders</h2>

      <hr />

      {/* Show loading message */}
      {loading && <p className="text-gray-600">Loading orders...</p>}

      {/* Show error message if any */}
      {error && <p className="text-red-600">{error.message || "An error occurred"}</p>}


      {/* Render orders if available */}
      {!loading && !error && orders.length > 0 ? (
        <DataTable
          columns={columns}
          data={orders}
          pagination
          highlightOnHover
          striped
        />
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default Page;
