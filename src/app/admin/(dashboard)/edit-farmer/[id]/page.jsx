'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmerByIdForAdmin, updateFarmerById } from '@/redux/slices/farmerSlice';
import { useParams, useRouter } from 'next/navigation';

const EditFarmerPage = () => {

  const params = useParams();
  const farmerId = params?.id;

  const dispatch = useDispatch();
  const router = useRouter();

  const { farmerDetails, loading, error } = useSelector(state => state.farmers);

console.log("farmerDetails", farmerDetails);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (farmerId) {
      dispatch(getFarmerByIdForAdmin(farmerId));
    }
  }, [dispatch, farmerId]);

  useEffect(() => {
    if (farmerDetails && farmerDetails._id === farmerId) {
      setForm({
        name: farmerDetails.name || '',
        email: farmerDetails.email || '',
        phoneNumber: farmerDetails.phoneNumber || '',
        address: farmerDetails.address || '',
      });
      setPreview(farmerDetails.profileImg);
    }
  }, [farmerDetails, farmerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (profileImg) {
      formData.append('profileImg', profileImg);
    }

    const res = await dispatch(updateFarmerById({ farmerId, formData }));
    if (!res.error) {
      alert('Farmer updated successfully');
      router.push('/admin/farmers');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Farmer</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="form-control" required type="email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="form-control" required type="text" />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input type="file" onChange={handleFileChange} className="form-control" />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" width="120" height="120" style={{ objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">Update Farmer</button>
      </form>
    </div>
  );
};

export default EditFarmerPage;
