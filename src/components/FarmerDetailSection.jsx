"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getFarmerDetailsById } from "@/redux/slices/farmerSlice";
import {
  sendFamilyRequest,
  getRequestsForCustomer,
} from "@/redux/slices/farmerFamilySlice";
import { Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const FarmerDetailSection = () => {

  const { slug } = useParams();
  const dispatch = useDispatch();
  const { farmerDetailsforCustomer, loading } = useSelector((state) => state.farmers);
  const { customerRequests } = useSelector((state) => state.familyfarmer);

  const [userId, setUserId] = useState(null);

  const slugParts = slug?.split("-");
  const farmerId = slugParts?.[slugParts.length - 1];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.id) {
        setUserId(user.id);
        dispatch(getRequestsForCustomer(user.id));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (farmerId) {
      dispatch(getFarmerDetailsById(farmerId));
    }
  }, [dispatch, farmerId]);

  const handleSendRequest = () => {
    if (userId && farmerId) {
      dispatch(sendFamilyRequest({ fromCustomer: userId, toFarmer: farmerId }))
        .unwrap()
        .then(() => {
          toast.success("Request sent successfully! 🎉");
          dispatch(getRequestsForCustomer(userId));
        })
        .catch((err) => {
          toast.error(err?.message || "Failed to send request");
        });
    }
  };

  const getRequestStatus = () => {
    const request = customerRequests?.find(
      (req) => req.toFarmer?._id === farmerId
    );
    return request ? request.status : null;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (!farmerDetailsforCustomer) {
    return (
      <div className="text-center mt-5">
        <h3>Farmer not found.</h3>
      </div>
    );
  }

  const status = getRequestStatus();
  const shop = farmerDetailsforCustomer?.shop || {}
  ;


  return (
    <div className="container py-60 my-60">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow rounded-4 p-40">
            <div className="d-flex flex-column align-items-center">
              <img
                src={farmerDetailsforCustomer.profileImg}
                alt={farmerDetailsforCustomer.name}
                className="rounded-circle object-fit-cover mb-4"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h1 className="text-uppercase fw-bold" style={{ color: "#5a6a3f", fontSize: "2rem" }}>
                {farmerDetailsforCustomer.name}
              </h1>
              <h2 className="text-center fw-semibold mt-1 mb-0" style={{ color: "#305CDE", fontSize: "16px" }}>
                <FaCheckCircle /> {farmerDetailsforCustomer?.isKYCVerified ? "Verified" : "UnVerified"}
              </h2>

              <p className="mt-3 text-dark" style={{ maxWidth: "600px" }}>
                <strong>City/District:</strong> {farmerDetailsforCustomer?.city_district || "N/A"}
              </p>

              <p className="mt-3 text-dark" style={{ maxWidth: "600px" }}>
                <strong>Shop Name:</strong> {shop?.shop_name || "N/A"}
              </p>

              <hr className="w-100 my-4" />

              {status === "pending" ? (
                <button type="button" className="btn btn-warning rounded-pill mt-30" disabled>
                  Pending
                </button>
              ) : status === "accepted" ? (
                <button type="button" className="btn btn-success rounded-pill mt-30" disabled>
                  Accepted
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-main rounded-pill mt-20"
                  onClick={handleSendRequest}
                >
                  Adopt as Family Farmer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetailSection;
