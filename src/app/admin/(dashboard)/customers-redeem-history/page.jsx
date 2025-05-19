"use client"
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCustomerRedeemProductHistory } from '@/redux/slices/customerRedeemProductSlice';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';


const Page = () => {

    const dispatch = useDispatch();
    const { c_redemptionHistory, loading } = useSelector(state => state.customerRedeemProducts);

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchCustomerRedeemProductHistory());
    }, [dispatch]);


    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = c_redemptionHistory.filter(item =>
            item.customerName?.toLowerCase().includes(lowerSearch) ||
            item.referralCode?.toLowerCase().includes(lowerSearch) ||
            item.redeemProductName?.toLowerCase().includes(lowerSearch)
        );
        setFilteredData(filtered);
    }, [search, c_redemptionHistory]);


    // Generate Bill Api

    const columns = [
        {
            name: 'Order Id',
            selector: row => row.orderId,
            sortable: true,
        },
        {
            name: 'Customer Name',
            selector: row => row.customerName,
            sortable: true,
        },
        {
            name: 'Referral Code',
            selector: row => row.referralCode,
        },
        {
            name: 'Product',
            selector: row => row.redeemProductName,
        },
        {
            name: 'Points Deducted',
            selector: row => row.pointsDeducted,
            sortable: true,
        },
        {
            name: 'Total Points',
            selector: row => row.totalPoints,
        },
        {
            name: 'Date',
            selector: row => new Date(row.redeemedAt).toLocaleString(),
            sortable: true,
        },
        {
            name: 'Invoice',
            cell: row => (
                <Link href={`/admin/customer-invoice/${row.orderId}`}>
                    View Invoice
                </Link>
            )
        }
    ];


    return (

        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Redemption History</h2>
            <input
                placeholder="Search by farmer name, referral code, or product name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control mb-3"
            />

            <hr />

            <DataTable
                columns={columns}
                data={filteredData}
                progressPending={loading}
                progressComponent={
                    <div className="d-flex justify-content-center py-4">
                        <Spinner animation="border" role="status" variant='success' />
                    </div>
                }
                pagination
                highlightOnHover
                responsive
                striped
            />
        </div>
    );
};

export default Page;
