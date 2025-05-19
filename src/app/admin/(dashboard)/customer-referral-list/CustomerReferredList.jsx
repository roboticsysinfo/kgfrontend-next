import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { FaShare, FaDownload } from "react-icons/fa";
import { fetchCustomerReferralDetails } from "../../../redux/slices/customerSlice";


const CustomerReferredList = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { referralDetails, loading, error } = useSelector((state) => state.customer);

    console.log("referralDetails", referralDetails)

    useEffect(() => {
        dispatch(fetchCustomerReferralDetails(id));
    }, [id]);

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
                            <p style={{ color: "#00A859", fontSize: 24 }}><FaShare />&ensp;<strong>{referralDetails?.referralShares ?? "N/A"}</strong></p>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card p-30 shadow">
                            <h6>Referral Downloads</h6>
                            <p style={{ color: "#00A859", fontSize: 24 }}><FaDownload />&ensp;<strong>{referralDetails?.referralDownloads ?? "N/A"}</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <h5>Referral Downloads Customers</h5>
            {referralDetails?.referredCustomer?.length > 0 ? (
                <DataTable
                    columns={referredColumns}
                    data={referralDetails.referredCustomer}
                    pagination
                />
            ) : (
                <p>No referred farmers yet.</p>
            )}
        </div>
    );
};

export default CustomerReferredList;
