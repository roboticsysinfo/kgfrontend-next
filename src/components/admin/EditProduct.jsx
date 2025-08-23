'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { updateProduct } from '@/redux/slices/productSlice';
import { fetchCategories } from '@/redux/slices/categorySlice';

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedProduct } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    season: 'seasonal',
    price_per_unit: '',
    quantity: '',
    unit: 'kg', // ✅ default unit
    description: '',
    harvest_date: '',
    product_image: null,
  });

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Prefill form from selected product
  useEffect(() => {
    if (!selectedProduct || selectedProduct._id !== id) {
      toast.error('No product selected. Redirecting...');
      router.push('/admin/products');
    } else {
      setFormData({
        name: selectedProduct.name || '',
        category_id: selectedProduct.category_id?._id || '',
        season: selectedProduct.season || 'seasonal',
        price_per_unit: selectedProduct.price_per_unit || '',
        quantity: selectedProduct.quantity || '',
        unit: selectedProduct.unit || 'kg',   // ✅ Prefill unit
        description: selectedProduct.description || '',
        harvest_date: selectedProduct.harvest_date?.split('T')[0] || '',
        product_image: null,
      });
    }
  }, [selectedProduct, id, router]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category_id', formData.category_id);
    data.append('season', formData.season);
    data.append('price_per_unit', formData.price_per_unit);
    data.append('quantity', formData.quantity);
    data.append('unit', formData.unit);  // ✅ Add unit
    data.append('description', formData.description);
    data.append('harvest_date', formData.harvest_date);
    if (formData.product_image) {
      data.append('product_image', formData.product_image);
    }

    const res = await dispatch(updateProduct({ id, shopData: data }));

    if (!res.error) {
      toast.success('Product updated!');
      router.push('/admin/products-list');
    } else {
      toast.error(res.payload || 'Failed to update');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Product Name */}
        <div className="mb-30">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-30">
          <label className="form-label">Category</label>
          <select
            name="category_id"
            className="form-select"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Season */}
        <div className="mb-30">
          <label className="form-label">Season</label>
          <select
            name="season"
            className="form-select"
            value={formData.season}
            onChange={handleChange}
          >
            <option value="seasonal">Seasonal</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        {/* Price per Unit */}
        <div className="mb-30">
          <label className="form-label">Price per Unit</label>
          <input
            type="number"
            name="price_per_unit"
            className="form-control"
            value={formData.price_per_unit}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-30">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ Unit */}
        <div className="mb-30">
          <label className="form-label">Unit</label>
          <select
            name="unit"
            className="form-select"
            value={formData.unit}
            onChange={handleChange}
            required
          >
            <option value="">Select Unit</option>
            <option value="kg">Kg</option>
            <option value="quintal">Quintal</option>
            <option value="liters">Liters</option>
            <option value="tons">Tons</option>
            <option value="pieces">Pieces</option>
          </select>
        </div>

        {/* Harvest Date */}
        <div className="mb-30">
          <label className="form-label">Harvest Date</label>
          <input
            type="date"
            name="harvest_date"
            className="form-control"
            value={formData.harvest_date}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-30">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-30">
          <label className="form-label">Change Image</label>
          <input
            type="file"
            name="product_image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
