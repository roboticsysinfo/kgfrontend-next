'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Spinner } from 'react-bootstrap';
import { FaCalendar, FaCoins } from 'react-icons/fa6';
import { fetchCustomerById, fetchCustomerPointsTransactions } from '@/redux/slices/customerSlice';
import { useParams } from 'next/navigation';

const borderColors = {
  referral: "#2ECC71",
  redeem: "#E74C3C",
  daily_stay: "#3498DB",
  daily_share: "#F39C12",
  daily_login: "#F1C40F",
  self_register: "#9B59B6",
  new_product_added: "#1ABC9C"
};

const formatDate = (dateStr) => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const groupByDate = (transactions) => {
  return transactions.reduce((groups, tx) => {
    const date = formatDate(tx.createdAt);
    if (!groups[date]) groups[date] = [];
    groups[date].push(tx);
    return groups;
  }, {});
};

const Page = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const customerId = params?.customerId;

  const {
    customer,
    pointsTransactions,
    loading,
    error
  } = useSelector((state) => state.customer);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchCustomerById(customerId));
      dispatch(fetchCustomerPointsTransactions(customerId));
    }
  }, [dispatch, customerId]);

  const customerName = customer?.name || "Customer";
  const totalPoints = customer?.points || 0;
  const groupedTransactions = groupByDate(pointsTransactions || []);

  return (
    <div className='p-4'>
      <h4 className='mb-30'>{customerName}'s Points Transactions</h4>
      <hr />

      <div className="d-flex align-items-center mb-3">
        <FaCoins size={24} color="#f39c12" className="me-2" />
        <h5 className="mb-0">Total Points: <strong>{totalPoints}</strong></h5>
      </div>

      <hr />

      {loading && <Spinner animation='border' variant='success' />}
      {error && <Alert variant='danger'>{error.message || String(error)}</Alert>}

      {!loading && Object.keys(groupedTransactions).length === 0 && (
        <p>No transactions found.</p>
      )}

      <div className="mt-4">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date} className="mb-10 px-40">
            <h5 className='mb-20 text-secondary'><FaCalendar /> {date}</h5>
            {transactions.map((tx) => {
              const color = borderColors[tx.type] || '#ccc';
              return (
                <div
                  key={tx._id}
                  style={{
                    borderLeft: `6px solid ${color}`,
                    padding: '12px 16px',
                    marginBottom: '12px',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    borderRadius: '8px',
                    borderRight: '1px solid #efefef',
                    borderBottom: '1px solid #efefef',
                    borderTop: '1px solid #efefef'
                  }}
                >
                  <div><strong>Points:</strong> {tx.points}</div>
                  <div><strong>Type:</strong> {tx.type.replace(/_/g, ' ')}</div>
                  <div><strong>Description:</strong> {tx.description}</div>
                </div>
              );
            })}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
