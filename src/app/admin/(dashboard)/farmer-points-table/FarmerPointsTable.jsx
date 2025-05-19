import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarmers } from '../../../redux/slices/farmerSlice';
import DataTable from 'react-data-table-component';
import { Spinner } from 'react-bootstrap';
import { FaCoins } from 'react-icons/fa'; // For coin icon
import { useNavigate } from 'react-router-dom';

const FarmerPointsTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { farmers, loading, error } = useSelector((state) => state.farmers);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchFarmers());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const filteredFarmers = farmers
        .filter((farmer) =>
            farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            farmer.phoneNumber.toString().includes(searchQuery) ||
            farmer.registrationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            farmer.referralCode?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => b.points - a.points);



    const columns = [
        {
            name: 'Registration Number',
            selector: (row) => row.registrationNumber,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Total Points',
            selector: (row) => row.points,
            sortable: true,
            cell: (row) => (
                <span style={{ "color": "#fff", "fontWeight": "bold", "background": "#f39c12", "padding": "5px 10px", "borderRadius": "100px" }}>
                    <FaCoins style={{ marginRight: '5px' }} />
                    {row.points}
                </span>
            ),
            sortFunction: (a, b) => b.points - a.points,
        },
        {
            name: 'Referral Code',
            selector: (row) => row.referralCode,
            sortable: true,
        },
        {
            name: 'Referred By',
            selector: (row) => row.referredBy?.name || 'N/A',
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: (row) => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'KYC Status',
            selector: (row) => row.isKYCVerified,
            sortable: true,
            cell: (row) => (
                <span className={`badge ${row.isKYCVerified ? 'bg-success' : 'bg-secondary'}`}>
                    {row.isKYCVerified ? 'Verified' : 'Pending'}
                </span>
            ),
        },
        {
            name: 'Point Transactions List',
            cell: (row) => (
                <button
                    className="btn btn-sm btn-success"
                    onClick={() => navigate(`/admin/points-transactions-list/${row._id}`)}
                >
                    View
                </button>
            ),
            ignoreRowClick: true,
            button: true,
        },
    ];

    return (
        <div className='px-5'>
            <div className='row'>
                <div className="col-lg-6">
                    <h2>Farmer Points Table</h2>
                </div>

                <div className='col-lg-6'>
                    <div className='my-20'>
                        <input
                            type="text"
                            placeholder="Search by Name, Email, or Phone"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className='form-control'
                        />
                    </div>
                </div>
            </div>

            <hr />

            {loading && (
                <div className="text-center my-3">
                    <Spinner animation="grow" role="status" variant='success'>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {error && <p className="text-danger">{error}</p>}

            <DataTable
                columns={columns}
                data={filteredFarmers}
                pagination
                responsive
                highlightOnHover
                striped
                loading={loading}
            />
        </div>
    );
};

export default FarmerPointsTable;
