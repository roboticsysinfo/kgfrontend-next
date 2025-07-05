'use client';
import React, { useEffect, useState } from 'react';
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

  const {
    farmers,
    loading,
    error,
    totalFarmers,
    currentPage,
  } = useSelector((state) => state.farmers);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchFarmers({ page, limit, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on search
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
      dispatch(fetchFarmers({ page, limit, search: searchQuery }));
    } else {
      toast.error(res.payload || 'Failed to delete farmer');
    }
  };

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
        key={page} // Force re-render on page change
        columns={columns}
        data={farmers}
        pagination
        paginationServer
        paginationTotalRows={totalFarmers}
        paginationPerPage={limit}
        paginationDefaultPage={page}
        onChangePage={(newPage) => setPage(newPage)}
        responsive
        highlightOnHover
        striped
      />
    </div>
  );
};

export default FarmersPage;
