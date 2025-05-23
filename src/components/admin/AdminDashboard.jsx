"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers } from "@/redux/slices/customerSlice";
import { getFarmerRequests } from "@/redux/slices/requestOrderSlice"; // ✅ Make sure this path is correct

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [totalFarmers, setTotalFarmers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); // Only accepted orders

  // Redux state
  const { customers } = useSelector((state) => state.customer);
  const { requests: orders } = useSelector((state) => state.requestOrder);

  // Fetch customers on mount
  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  // Fetch farmer requests (orders) on mount
  useEffect(() => {
    dispatch(getFarmerRequests());
  }, [dispatch]);

  // Calculate accepted orders count when orders change
  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      const acceptedOrders = orders.filter(order => order.status === "accepted");
      setTotalOrders(acceptedOrders.length);
    }
  }, [orders]);

  // Fetch total farmers
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get("https://kissangrowth.com/api/farmers");
        if (Array.isArray(response.data)) {
          setTotalFarmers(response.data.length);
        } else if (Array.isArray(response.data.data)) {
          setTotalFarmers(response.data.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch farmers:", error);
      }
    };

    fetchFarmers();
  }, []);

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
              <h4 className="text-xxl font-bold"  style={{color: "blue"}}>{totalFarmers}</h4>
            </div>
          </div>

          <div className="col-lg-4 col-xs-12 col-sm-12">
            <div className="card p-30">
              <h4>Total Customers</h4>
              <h4 className="text-xxl font-bold"  style={{color: "orange"}}>{customers.length}</h4>
            </div>
          </div>

          <div className="col-lg-4 col-xs-12 col-sm-12">
            <div className="card p-30">
              <h4 className="mb-0">Total Orders</h4>
              <p>( only completed order total )</p>
              <h4 className="text-xxl font-bold mt-10" style={{color: "green"}}>{totalOrders}</h4>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
