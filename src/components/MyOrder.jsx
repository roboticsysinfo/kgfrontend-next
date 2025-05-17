"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {  fetchCustomerOrders } from "@/redux/slices/requestOrderSlice";
import { toast } from "react-hot-toast";

const MyOrder = () => {
    
  const dispatch = useDispatch();
  const { customerOrders, loading, error } = useSelector((state) => state.requestOrder);


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
      name: "Shop Name",
      selector: (row) => row.shop_name,
    },
    {
      name: "Order Date",
      selector: (row) => row.created_At,
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

  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">My Orders</h2>

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

export default MyOrder;
