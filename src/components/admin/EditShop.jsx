'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopByShopId, updateShop } from '@/redux/slices/shopSlice';
import toast from 'react-hot-toast';

const EditShop = () => {


    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const shopId = params?.id;

    const { shop, status, error } = useSelector(state => state.shop);

    const [form, setForm] = useState({
        shop_name: '',
        phoneNumber: '',
        whatsappNumber: '',
        city_district: '',
        state: '',
        village_name: '',
        shop_address: '',
        shop_description: '',
        pricing_preference: '',
        preferred_buyers: '',
    });

    const [shopProfileImage, setShopProfileImage] = useState(null);
    const [shopCoverImage, setShopCoverImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

    useEffect(() => {
        if (shopId) {
            dispatch(fetchShopByShopId(shopId));
        }
    }, [shopId]);

    useEffect(() => {
        if (shop) {
            setForm({
                shop_name: shop.shop_name || '',
                phoneNumber: shop.phoneNumber || '',
                whatsappNumber: shop.whatsappNumber || '',
                city_district: shop.city_district || '',
                state: shop.state || '',
                village_name: shop.village_name || '',
                shop_address: shop.shop_address || '',
                shop_description: shop.shop_description || '',
                pricing_preference: shop.pricing_preference || '',
                preferred_buyers: shop.preferred_buyers || '',
            });
            setProfilePreview(shop?.shop_profile_image ? shop?.shop_profile_image : '');
            setCoverPreview(shop?.shop_cover_image ? shop?.shop_cover_image : '');
        }
    }, [shop]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'profile') {
            setShopProfileImage(file);
            setProfilePreview(URL.createObjectURL(file));
        } else {
            setShopCoverImage(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (shopProfileImage) {
            formData.append('shop_profile_image', shopProfileImage);
        }
        if (shopCoverImage) {
            formData.append('shop_cover_image', shopCoverImage);
        }

        const res = await dispatch(updateShop({ id: shopId, shopData: formData }));

        if (!res.error) {
            toast.success('Shop updated successfully');
            router.push('/admin/shops-list');
        } else {
            toast.error('Failed to update shop');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Shop</h2>

            {status === 'loading' ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-30">
                        <label className="form-label">Shop Name</label>
                        <input name="shop_name" value={form.shop_name} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Phone Number</label>
                        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">WhatsApp Number</label>
                        <input name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">City/District</label>
                        <input name="city_district" value={form.city_district} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">State</label>
                        <input name="state" value={form.state} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Village Name</label>
                        <input name="village_name" value={form.village_name} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Shop Address</label>
                        <input name="shop_address" value={form.shop_address} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Shop Description</label>
                        <textarea name="shop_description" value={form.shop_description} onChange={handleChange} className="form-control" rows={3} />
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Pricing Preference</label>
                        <select name="pricing_preference" value={form.pricing_preference} onChange={handleChange} className="form-control">
                            <option value="fixed_price">Fixed Price</option>
                            <option value="negotiation_price">Negotiation Price</option>
                        </select>
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Preferred Buyers</label>
                        <select name="preferred_buyers" value={form.preferred_buyers} onChange={handleChange} className="form-control">
                            <option value="retail_customers">Retail Customers</option>
                            <option value="wholesalers">Wholesalers</option>
                            <option value="distributors">Distributors</option>
                        </select>
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Profile Image</label>
                        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'profile')} />
                        {profilePreview && <img src={profilePreview} alt="Profile" width={100} height="100" className="mt-2" />}
                    </div>

                    <div className="mb-30">
                        <label className="form-label">Cover Image</label>
                        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'cover')} />
                        {coverPreview && <img src={coverPreview} alt="Cover" className="mt-2" style={{width: 100, height: 100}} />}
                    </div>

                    <button type="submit" className="btn btn-success">Update Shop</button>
                </form>
            )}
        </div>
    );
};

export default EditShop;
