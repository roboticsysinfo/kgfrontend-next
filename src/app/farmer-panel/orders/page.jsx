"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { getOrderRequestByFarmerId, approveOrderRequest, cancelOrderRequest } from "@/redux/slices/requestOrderSlice"; // Adjust path as needed
import toast from "react-hot-toast";

const FarmerOrder = () => {

  const dispatch = useDispatch();

  // Get orders and loading/error states from Redux
  const { requests: orders, loading, error } = useSelector((state) => state.requestOrder);

  
  const handleAccepted = async (orderId) => {
    if (window.confirm("Are you sure you want to accept this order?")) {
      const result = await dispatch(approveOrderRequest(orderId));

      if (approveOrderRequest.fulfilled.match(result)) {
        toast.success("Order approved successfully!");
      } else {
        toast.error(result.payload?.message || "Failed to approve order.");
      }
    }
  };


  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrderRequest(orderId));
    }
  };


  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(getOrderRequestByFarmerId());
  }, [dispatch]);


  const columns = [

    { name: "Order ID", selector: (row) => row._id, sortable: true },
    { name: "Customer Name", selector: (row) => row.customer_id?.name || "N/A", sortable: true },
    { name: "Customer Address", selector: (row) => row.customer_id?.address || "N/A", sortable: true },
    { name: "Product Name", selector: (row) => row.product_id?.name || "N/A", sortable: true },
    { name: "Price Per Unit", selector: (row) => row.product_id?.price_per_unit || "N/A", sortable: true },
    { name: "Unit", selector: (row) => row.product_id?.unit || "N/A", sortable: true },
    { name: "Quantity Requested", selector: (row) => row.quantity_requested, sortable: true },
    { name: "Status", selector: (row) => row.status || "N/A" },
    {
      name: "Actions",
      cell: (row) => (
        <>

          <button
            className={`btn btn-sm btn-success px-3 py-1 rounded-md ${row.status === "pending" ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            disabled={row.status !== "pending"}
            onClick={() => handleAccepted(row._id)}
          >
            Approve
          </button>

          <button
            className={`btn btn-sm btn-danger px-3 py-1 rounded-md ml-2 ${row.status === "pending" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            disabled={row.status !== "pending"}
            onClick={() => handleCancel(row._id)}
          >
            Cancel
          </button>

        </>
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
      {error && <p className="text-red-600">{error}</p>}

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

export default FarmerOrder;
