"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { fetchKYCRequests, approveKYCRequest, rejectKYCRequest } from '@/redux/slices/kycRequestsSlice';
import toast from 'react-hot-toast';

const Page = () => {
    const dispatch = useDispatch();
    const { data: kycRequests, loading, error } = useSelector((state) => state.kycRequests);

    useEffect(() => {
        dispatch(fetchKYCRequests());
    }, [dispatch]);

    const handleApprove = async (id) => {
        const response = dispatch(approveKYCRequest(id));
        toast.promise(response, {
            loading: 'Approving...',
            success: 'KYC request approved!',
            error: 'Failed to approve the request.',
        });
    };

    const handleReject = async (id) => {
        const response = dispatch(rejectKYCRequest(id));
        toast.promise(response, {
            loading: 'Rejecting...',
            success: 'KYC request rejected!',
            error: 'Failed to reject the request.',
        });
    };

    const columns = [
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Aadhar Card',
            selector: (row) => row.aadharCard,
        },
        {
            name: 'Aadhar Card Image',
            selector: (row) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL_PRIMARY}${row.uploadAadharCard}`;
                return (
                    <img
                        src={imageUrl}
                        alt="Aadhar"
                        width={80}
                        height={80}
                        style={{ paddingTop: '10px', paddingBottom: '10px' }}
                    />
                );
            },
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-success btn-sm mx-1"
                        onClick={() => handleApprove(row._id)}
                        disabled={row.isKycVerified}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleReject(row._id)}
                        disabled={row.isKycVerified}
                    >
                        Reject
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mt-5">
            <div className="row mt-20">
                <div className="col-lg-12">
                    <h3 className="mb-20">KYC Requests</h3>
                </div>
            </div>

            <hr />

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            <DataTable
                columns={columns}
                data={kycRequests?.farmers || []}
                pagination
                highlightOnHover
                striped
            />
        </div>
    );
};

export default Page;
