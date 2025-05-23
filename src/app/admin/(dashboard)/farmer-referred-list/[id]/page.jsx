"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFarmerReferralDetail } from "@/redux/slices/farmerSlice";
import DataTable from "react-data-table-component";
import { useParams } from "next/navigation"; // ✅ Next.js App Router
import { FaShare, FaDownload } from "react-icons/fa";

const FarmerReferralDetail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params?.id;

    const { referralDetail, farmers, loading, error } = useSelector(
        (state) => state.farmers
    );

    const ReferralFarmerName = typeof window !== "undefined" ? localStorage.getItem("farmerName") : null;

    useEffect(() => {
        if (id) {
            dispatch(getFarmerReferralDetail(id));
        }
    }, [dispatch, id]);

    const referredColumns = [
        {
            name: "ID",
            selector: (row) => row?._id || "N/A",
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row?.name || "N/A",
            sortable: true,
        },
        {
            name: "Referral Code",
            selector: (row) => row?.referralCode || "N/A",
            sortable: true,
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h4 style={{ textTransform: 'capitalize' }}>Farmer's Referral Details</h4>
            <hr />

            <div className="container mb-40">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card p-30 shadow">
                            <h6>Referral Shares</h6>
                            <p style={{ color: "#00A859", fontSize: 24 }}>
                                <FaShare />&ensp;<strong>{referralDetail?.referralShares ?? "N/A"}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card p-30 shadow">
                            <h6>Referral Downloads</h6>
                            <p style={{ color: "#00A859", fontSize: 24 }}>
                                <FaDownload />&ensp;<strong>{referralDetail?.referralDownloads ?? "N/A"}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <h5>Referral Downloads Farmers</h5>
            {referralDetail?.referredFarmers?.length > 0 ? (
                <DataTable
                    columns={referredColumns}
                    data={referralDetail.referredFarmers}
                    pagination
                />
            ) : (
                <p>No referred farmers yet.</p>
            )}
        </div>
    );
};

export default FarmerReferralDetail;
