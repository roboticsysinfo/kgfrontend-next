"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers } from "@/redux/slices/customerSlice";
import { fetchFarmers } from "@/redux/slices/farmerSlice";
import { getFarmerRequests } from "@/redux/slices/requestOrderSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    totalFarmers,
  } = useSelector((state) => state.farmers);

  const { customers } = useSelector((state) => state.customer);
  const { requests: orders } = useSelector((state) => state.requestOrder);

  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch all customers
    dispatch(fetchAllCustomers());

    // Fetch farmers just to get totalFarmers count (1st page only, 1 item is enough)
    dispatch(fetchFarmers({ page: 1, limit: 1, search: "" }));

    // Fetch all farmer orders
    dispatch(getFarmerRequests());
  }, [dispatch]);

  // Count only accepted orders
  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      const acceptedOrders = orders.filter(order => order.status === "accepted");
      setTotalOrders(acceptedOrders.length);
    }
  }, [orders]);

  return (
    <>
      <div className="p-4">
        <h4>Welcome to Admin Dashboard</h4>
      </div>

      <hr />

      <div className="container">
        <div className="row">

          <div className="col-lg-4 col-xs-12 col-sm-12">
            <div className="card p-30">
              <h4>Total Farmers</h4>
              <h4 className="text-xxl font-bold" style={{ color: "blue" }}>
                {totalFarmers}
              </h4>
            </div>
          </div>

          <div className="col-lg-4 col-xs-12 col-sm-12">
            <div className="card p-30">
              <h4>Total Customers</h4>
              <h4 className="text-xxl font-bold" style={{ color: "orange" }}>
                {customers.length}
              </h4>
            </div>
          </div>

          <div className="col-lg-4 col-xs-12 col-sm-12">
            <div className="card p-30">
              <h4 className="mb-0">Total Orders</h4>
              <p>( only completed order total )</p>
              <h4 className="text-xxl font-bold mt-10" style={{ color: "green" }}>
                {totalOrders}
              </h4>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
