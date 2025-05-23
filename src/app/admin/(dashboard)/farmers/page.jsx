"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarmers } from '@/redux/slices/farmerSlice';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const page = () => {


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


  const filteredFarmers = farmers.filter((farmer) =>
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
      // Example: 23 May 2025, 04:15 PM
    },
    {
      name: 'Referred List',
      cell: (row) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => router.push(`/admin/farmer-referred-list/${row._id}`)}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];



  return (
    <div>

      <div className='row'>

        <div className="col-lg-6">
          <h2>All Farmers List</h2>
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

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <DataTable
        columns={columns}
        data={filteredFarmers}
        pagination
        responsive
      />
    </div>
  );
};

export default page;
