"use client"

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
  setSelectedProduct,
} from '@/redux/slices/productSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

const ProductsList = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: products, status } = useSelector((state) => state.products);

  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 100, search: '', filter: '' }));
  }, [dispatch]);

  // Search filtering
  useEffect(() => {
    if (search) {
      setFilteredProducts(
        products.filter((item) =>
          item.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([...products].reverse()); // Newest first
    }
  }, [search, products]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    const res = await dispatch(deleteProduct(id));
    if (!res.error) toast.success('Product deleted');
    else toast.error('Failed to delete product');
  };

  const handleEdit = (product) => {
    dispatch(setSelectedProduct(product));
    router.push(`/admin/edit-product/${product._id}`);
  };

  const columns = [
    {
      name: 'Image',
      selector: (row) => (
        <img
          src={row.product_image}
          alt={row.name}
          width="60"
          height="60"
          style={{ objectFit: 'cover', borderRadius: 5 }}
        />
      ),
      width: '80px',
    },
    {
      name: 'Name',
      selector: (row) => <strong>{row.name}</strong>,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category_id?.name || '—',
    },
    {
      name: 'Price (₹)',
      selector: (row) => row.price_per_unit,
    },
    {
      name: 'Qty',
      selector: (row) => row.quantity,
    },
    {
      name: 'Farmer',
      selector: (row) => row.farmer_id?.name || '—',
    },
    {
      name: 'Shop',
      selector: (row) => row.shop_id?.shop_name || '—',
    },

    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row._id)}
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
      <h2>Product List</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="form-control my-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        highlightOnHover
        progressPending={status === 'loading'}
        noDataComponent="No products found"
        defaultSortFieldId={0}
      />
    </div>
  );
};

export default ProductsList;
