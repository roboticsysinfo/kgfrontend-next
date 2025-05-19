import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { fetchAllFarmerPlans } from '../../../redux/slices/planPointsHistorySlice';

const FarmerPlansHistory = () => {

    const dispatch = useDispatch();
    const { plans, loading, error } = useSelector((state) => state.planPointsData);
    

    useEffect(() => {
        dispatch(fetchAllFarmerPlans());
    }, [dispatch]);


    const columns = [
        {
            name: 'Payment Id',
            selector: (row) => row.paymentId || 'N/A',
            sortable: true,
        },
        {
            name: 'Farmer Name',
            selector: (row) => row.farmerId?.name || 'N/A',
            sortable: true,
        },
        {
            name: 'Phone',
            selector: (row) => row.farmerId?.phoneNumber || 'N/A',
        },
        {
            name: 'Plan Name',
            selector: (row) => row.planName,
        },
        {
            name: 'Amount (₹)',
            selector: (row) => `₹${row.planAmount}`,
            sortable: true,
        },
        {
            name: 'Validity (Days)',
            selector: (row) => row.planValidityDays,
        },
        {
            name: 'Purchased At',
            selector: (row) => new Date(row.purchasedAt).toLocaleDateString(),
        },
        {
            name: 'Expires At',
            selector: (row) => new Date(row.expiresAt).toLocaleDateString(),
        },
        {
            name: 'Payment Status',
            selector: (row) => row.paymentStatus,
            cell: (row) => (
                <span style={{ color: row.paymentStatus === 'success' ? 'green' : row.paymentStatus === 'failed' ? 'red' : 'orange' }}>
                    {row.paymentStatus}
                </span>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Farmer Plans Transactions</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            <DataTable
                columns={columns}
                data={plans}
                pagination
                highlightOnHover
                striped
                responsive
                persistTableHead
            />
        </div>
    );
};

export default FarmerPlansHistory;
