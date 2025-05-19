"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '@/redux/slices/customerSlice';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


const CustomerPointsTable = () => {


    const dispatch = useDispatch();
    const router = useRouter();
    const { customers, loading, error } = useSelector((state) => state.customer);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        dispatch(fetchAllCustomers());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const filteredCustomers = customers
        .filter((customer) =>
            customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phoneNumber?.toString().includes(searchQuery)
        )
        .sort((a, b) => b.points - a.points);

    const columns = [
        {
            name: 'Referral Code',
            selector: (row) => row.referralCode,
            sortable: true,
        },
        {
            name: "Profile Image",
            selector: (row) =>
                row.profile_image ? (
                    <img
                        src={`${process.env.REACT_APP_BASE_URL_PRIMARY}/${row.profile_image}`}
                        alt={row.name}
                        width={50}
                        height={50}
                    />
                ) : (
                    "No Image"
                ),
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: (row) => row.phoneNumber,
            sortable: true,
        },

        {
            name: 'Total Points',
            selector: (row) => row.points,
            sortable: true,
            cell: (row) => (
                <span style={{ "color": "#fff", "fontWeight": "bold", "background": "#28a745", "padding": "5px 10px", "borderRadius": "100px" }}>
                    <FaCoins style={{ marginRight: '5px' }} />
                    {row.points}
                </span>
            ),
        },

        {
            name: 'Referred By',
            selector: (row) => row.referredBy?.name || 'N/A',
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => router.push(`/admin/customer-points/${row._id}`)}
                    >
                        View Referred
                    </button>
                </div>
            ),
        },

    ];


    return (
        <div className="px-5">
            <div className="row mb-3">
                <div className="col-lg-6">
                    <h2>Customer Points Table</h2>
                </div>
                <div className="col-lg-6">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="form-control"
                    />
                </div>
            </div>

            <hr />

            {loading ? (
                <div className="text-center my-3">
                    <Spinner animation="grow" role="status" variant="success">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={filteredCustomers}
                    pagination
                    responsive
                    highlightOnHover
                    striped
                />
            )}
        </div>
    );
};


export default CustomerPointsTable;
