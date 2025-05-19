"use client";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers, deleteCustomer } from "@/redux/slices/customerSlice";
import { useRouter } from "next/navigation";

const Page = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { customers, loading, error } = useSelector((state) => state.customer);

    useEffect(() => {
        dispatch(fetchAllCustomers());
    }, [dispatch]);

    const handleDeleteCustomer = (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(customerId));
        }
    };

    const columns = [
        {
            name: "Profile Image",
            cell: (row) =>
                row.profile_image ? (
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL_PRIMARY}/${row.profile_image}`}
                        alt={row.name}
                        width={50}
                        height={50}
                    />
                ) : (
                    "No Image"
                ),
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phoneNumber,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Address",
            selector: (row) => row.address,
        },
        {
            name: "Referral Code",
            selector: (row) => row.referralCode,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => router.push(`/admin/customer-referred-list/${row._id}`)}
                    >
                        View Referred
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCustomer(row._id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <h2>Customer List</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <DataTable
                columns={columns}
                data={customers || []}
                progressPending={loading}
                pagination
                highlightOnHover
                responsive
                noHeader
            />
        </div>
    );
};

export default Page;
