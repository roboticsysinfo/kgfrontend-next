import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteRedeemProduct,
  fetchRedeemProducts,
  updateRedeemProduct,
} from '../../../redux/slices/redeemProductSlice';
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

const RedeemProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.redeemProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    requiredPoints: '',
    price_value: '',
    r_product_img: null,
  });

  useEffect(() => {
    dispatch(fetchRedeemProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteRedeemProduct(id));
      toast.success("Product Deleted Successfully");
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      requiredPoints: product.requiredPoints,
      price_value: product.price_value || "", // ✅ pre-fill price
      r_product_img: null, // new image will be selected
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'r_product_img') {
      setFormData((prev) => ({ ...prev, r_product_img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('name', formData.name);
    updateData.append('requiredPoints', formData.requiredPoints);
    updateData.append('price_value', formData.price_value); // ✅ added
    if (formData.r_product_img) {
      updateData.append('r_product_img', formData.r_product_img);
    }

    dispatch(updateRedeemProduct({ id: selectedProduct._id, formData: updateData }));
    closeModal();
    toast.success("Product Updated Successfully");
  };

  const columns = [
    {
      name: "Image",
      selector: (row) =>
        row.r_product_img ? (
          <img
            src={row.r_product_img}
            alt={row.name}
            width="50"
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
      name: 'Price Value (₹)', // ✅ new column
      selector: (row) => row.price_value ? `₹${row.price_value}` : '—',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button className="btn btn-sm btn-primary" onClick={() => openEditModal(row)} style={{ marginRight: 10 }}>
            Edit
          </button>
          <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row._id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className='p-4'>
      <h3>Redeem Product List</h3>
      <hr />
      <DataTable
        columns={columns}
        data={products}
        progressPending={loading}
        pagination
      />

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Edit Product">
        <h2>Edit Product</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
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
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              name="r_product_img"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          {formData.r_product_img && typeof formData.r_product_img === 'object' && (
            <div style={{ marginTop: '10px' }}>
              <p>Selected Image Preview:</p>
              <img src={URL.createObjectURL(formData.r_product_img)} alt="Preview" width={100} />
            </div>
          )}
          <div style={{ marginTop: '20px' }}>
            <button type="submit">Update</button>
            <button onClick={closeModal} type="button" style={{ marginLeft: 10 }}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RedeemProductsList;
