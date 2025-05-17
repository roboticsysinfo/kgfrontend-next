"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { cancelOrderRequest, fetchCustomerOrders } from "@/redux/slices/requestOrderSlice";
import { toast } from "react-hot-toast";

const ManageOrder = () => {
  const dispatch = useDispatch();
  const { customerOrders, loading, error } = useSelector((state) => state.requestOrder);

  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrderRequest(orderId));
    }
  };

  useEffect(() => {
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity_requested,
    },
    {
      name: "Price Per Unit",
      selector: (row) => `₹${row.price_per_unit}`,
    },
    {
      name: "Total Price",
      selector: (row) => `₹${row.total_price}`,
      sortable: true,
    },
    {
      name: "Farmer Name",
      selector: (row) => row.farmer_name,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          style={{
            color:
              row.status === "pending"
                ? "orange"
                : row.status === "accepted"
                ? "green"
                : "red",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className={`btn btn-sm btn-danger px-3 py-1 rounded-md ml-2 ${
              row.status === "pending" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            disabled={row.status !== "pending"}
            onClick={() => handleCancel(row.order_id)}
          >
            Cancel Order
          </button>
        </>
      ),
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Manage Orders</h2>

      <hr />

      <DataTable
        columns={columns}
        data={customerOrders}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        striped
      />

    </div>

  );
};

export default ManageOrder;
