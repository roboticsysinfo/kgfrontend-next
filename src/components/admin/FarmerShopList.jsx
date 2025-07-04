"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
    fetchShops,
    deleteShop,
} from '@/redux/slices/shopSlice';

import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';


const FarmerShopList = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { shops, status, error } = useSelector((state) => state.shop);

    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchShops({ page: 1, limit: 1000 }));
    }, [dispatch]);

    const handleDelete = async (id) => {

        const confirm = window.confirm('Are you sure you want to delete this shop?');
        if (!confirm) return;

        const res = await dispatch(deleteShop(id));
        if (!res.error) {
            toast.success('Shop deleted successfully');
        } else {
            toast.error('Failed to delete shop');
        }

    };

    const handleEdit = (id) => {
        router.push(`/admin/edit-shop/${id}`);
    };

    const filteredShops = [...shops]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Newest first
        .filter((shop) =>
            shop.shop_name.toLowerCase().includes(search.toLowerCase()) ||
            shop.city_district.toLowerCase().includes(search.toLowerCase()) ||
            shop.phoneNumber.toString().includes(search)
        );

    const columns = [

        {
            name: 'Shop Profile',
            selector: (row) =>
                row.shop_profile_image ? (
                    <img src={row.shop_profile_image} alt={row.name} width="50" style={{width: 60, height:60, borderRadius: 100, padding: 5, objectFit: "cover"}} />
                ) : (
                    'No Image'
                ),
        },


        {
            name: 'Shop Name',
            selector: (row) => row.shop_name,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: (row) => row.phoneNumber,
        },
        {
            name: 'City/District',
            selector: (row) => row.city_district,
        },
        {
            name: 'State',
            selector: (row) => row.state,
        },
        {
            name: 'Created At',
            selector: (row) => new Date(row.createdAt).toLocaleString(),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(row._id)}
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(row._id)}
                        title="Delete"
                    >
                        <FaRegTrashAlt />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div className="container mt-4">
            <h2>All Shops</h2>

            <div className="mb-30">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Shop Name, District, or Phone"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <hr />

            {status === 'loading' ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={filteredShops}
                    pagination
                    responsive
                />
            )}
        </div>
    );
};

export default FarmerShopList;
