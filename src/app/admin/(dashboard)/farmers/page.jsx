'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarmers, deleteFarmerById } from '@/redux/slices/farmerSlice';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

const FarmersPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { farmers, loading, error } = useSelector((state) => state.farmers);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchFarmers());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (id) => {
    router.push(`/admin/edit-farmer/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this farmer?');
    if (!confirm) return;

    const res = await dispatch(deleteFarmerById(id));
    if (!res.error) {
      toast.success('Farmer deleted successfully');
    } else {
      toast.error(res.payload || 'Failed to delete farmer');
    }
  };

  const filteredFarmers = [...farmers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phoneNumber.toString().includes(searchQuery)
    );

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
      selector: (row) => (row.isKYCVerified ? 'Verified' : 'Pending'),
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: 'Join Date',
      selector: (row) => row.createdAt,
      sortable: true,
      format: (row) => moment(row.createdAt).format('DD MMM YYYY, hh:mm A'),
    },
    {
      name: 'Referred List',
      cell: (row) => (
        <button
          className="btn btn-sm btn-info"
          onClick={() => router.push(`/admin/farmer-referred-list/${row._id}`)}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-warning" onClick={() => handleEdit(row._id)}>
            <FaEdit />
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row._id)}>
            <FaRegTrashAlt />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className="row mb-3">
        <div className="col-lg-6">
          <h2>All Farmers List</h2>
        </div>
        <div className="col-lg-6">
          <input
            type="text"
            placeholder="Search by Name, Email, or Phone"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
      </div>

      <hr />

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <DataTable
        columns={columns}
        data={filteredFarmers}
        pagination
        responsive
      />
    </div>
  );
};

export default FarmersPage;
