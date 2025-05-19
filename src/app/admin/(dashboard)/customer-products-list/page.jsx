'use client'; // ✅ अगर आप इसे app directory में client component के रूप में इस्तेमाल कर रहे हैं

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  deleteCustomerRedeemProduct,
  fetchCustomerRedeemProducts,
  updateCustomerRedeemProduct,
} from '@/redux/slices/customerRedeemProductSlice'; // ✅ Next.js alias path

const Page = () => {
  const dispatch = useDispatch();
  const { rcproducts, loading } = useSelector((state) => state.customerRedeemProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    requiredPoints: '',
    price_value: '',
    rc_product_img: null,
  });

  useEffect(() => {
    dispatch(fetchCustomerRedeemProducts());
  }, [dispatch]);

  // ✅ SSR-safe Modal configuration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next'); // Next.js default root element
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCustomerRedeemProduct(id));
      toast.success("Product Deleted Successfully");
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      requiredPoints: product.requiredPoints,
      price_value: product.price_value || '',
      rc_product_img: null,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'rc_product_img') {
      setFormData((prev) => ({ ...prev, rc_product_img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('name', formData.name);
    updateData.append('requiredPoints', formData.requiredPoints);
    updateData.append('price_value', formData.price_value);
    if (formData.rc_product_img) {
      updateData.append('rc_product_img', formData.rc_product_img);
    }

    dispatch(updateCustomerRedeemProduct({ id: selectedProduct._id, formData: updateData }));
    closeModal();
    toast.success("Product Updated Successfully");
  };

  const columns = [
    {
      name: "Image",
      selector: (row) =>
        row.rc_product_img ? (
          <img
            src={row.rc_product_img}
            alt={row.name}
            width="50"
            height="50"
            style={{ objectFit: 'cover', borderRadius: '6px' }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      name: 'Product Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Required Points',
      selector: (row) => row.requiredPoints,
      sortable: true,
    },
    {
      name: 'Price Value (₹)',
      selector: (row) => row.price_value ? `₹${row.price_value}` : '—',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={() => openEditModal(row)}>
            Edit
          </button>
          <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className='p-4'>
      <h3>Redeem Product List</h3>
      <hr />
      <DataTable
        columns={columns}
        data={rcproducts}
        progressPending={loading}
        pagination
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Product"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Edit Product</h2>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div>
            <label>Required Points:</label>
            <input
              type="number"
              name="requiredPoints"
              value={formData.requiredPoints}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div>
            <label>Price Value (INR):</label>
            <input
              type="number"
              name="price_value"
              value={formData.price_value}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div>
            <label>Product Image:</label>
            <input
              type="file"
              name="rc_product_img"
              accept="image/*"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success mt-3 me-2">Update</button>
          <button onClick={closeModal} type="button" className="btn btn-secondary mt-3">Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default Page;
