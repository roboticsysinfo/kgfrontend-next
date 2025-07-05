'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarmers } from '@/redux/slices/farmerSlice';
import { sendFamilyRequest, getRequestsForCustomer } from '@/redux/slices/farmerFamilySlice';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import slugify from 'slugify';
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const FarmersSection = () => {
  const dispatch = useDispatch();
  const {
    farmers,
    totalFarmers,
    currentPage,
    totalPages,
    loading,
    error,
  } = useSelector((state) => state.farmers);
  const { customerRequests, loading: requestLoading } = useSelector((state) => state.familyfarmer);

  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserId(user?.id);
  }, []);

  useEffect(() => {
    dispatch(fetchFarmers({ page, limit, search }));
    if (userId) dispatch(getRequestsForCustomer(userId));
  }, [dispatch, userId, page, search]);

  const handleSendRequest = (farmerId) => {
    if (userId) {
      dispatch(sendFamilyRequest({ fromCustomer: userId, toFarmer: farmerId }))
        .unwrap()
        .then(() => {
          toast.success('Request sent successfully! 🎉');
          dispatch(getRequestsForCustomer(userId));
        })
        .catch((err) => {
          toast.error(err?.message || 'Failed to send request');
        });
    }
  };

  const getRequestStatus = (farmerId) => {
    const request = customerRequests.find((req) => req.toFarmer?._id === farmerId);
    return request ? request.status : null;
  };

  const sortedFarmers = [...farmers].sort((a, b) => (b.isUpgraded === true) - (a.isUpgraded === true));

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container py-16 my-80">
      {/* Search */}
      <div className="row mb-4">
        <div className="col-12">
          <input
            type="text"
            placeholder="Search farmers by name..."
            value={search}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Farmers */}
      <div className="row">
        {(loading || requestLoading) && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        {!loading && farmers.length === 0 && (
          <div className="text-center col-12">
            <Image src="/emptystate/farmernotfound.png" width={300} height={300} alt="No farmers" />
            <h4>No farmers found.</h4>
            <p>Please check back later.</p>
          </div>
        )}

        {sortedFarmers.map((farmer) => {
          const status = getRequestStatus(farmer._id);
          const farmerSlug = slugify(farmer.name || '', { lower: true, strict: true });

          return (
            <div key={farmer._id} className="col-lg-3 col-sm-6 mb-4">
              <div className="farmer-card">
                <div className="card-content">
                  <img
                    src={farmer.profileImg || 'https://avatar.iran.liara.run/public/boy'}
                    alt={farmer.name}
                    className="farmer-avatar"
                  />

                  <Link href={`/farmer/${farmerSlug}-${farmer._id}`}>
                    <h2 className="farmer-name">
                      {farmer.name}
                      {farmer.isUpgraded && <FaShieldAlt className="upgraded-icon" title="Upgraded Farmer" />}
                    </h2>
                  </Link>

                  <p className={`farmer-status ${farmer.isKYCVerified ? 'verified' : 'unverified'}`}>
                    <FaCheckCircle /> {farmer.isKYCVerified ? 'Verified' : 'Unverified'}
                  </p>

                  <p className="farmer-location">{farmer.city_district || 'N/A'}</p>

                  <hr className="divider" />

                  {status === 'pending' ? (
                    <button className="btn btn-warning w-100" disabled>Pending</button>
                  ) : status === 'accepted' ? (
                    <button className="btn btn-success w-100" disabled>Accepted</button>
                  ) : (
                    <button className="btn btn-primary w-100" onClick={() => handleSendRequest(farmer._id)}>
                      Adopt as Family Farmer
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="row mt-4">
          <div className="col-12 text-center">
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(Math.max(page - 1, 1))}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(Math.min(page + 1, totalPages))}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersSection;
