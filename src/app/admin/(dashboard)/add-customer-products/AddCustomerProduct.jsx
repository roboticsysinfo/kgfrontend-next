import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addCustomerRedeemProduct } from '../../redux/slices/customerRedeemProductSlice';

const AddCustomerProduct = () => {
    
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        requiredPoints: "",
        price_value: "",             // ✅ added price_value
        rc_product_img: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "rc_product_img") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        dispatch(addCustomerRedeemProduct(form));
        setFormData({
            name: "",
            description: "",
            requiredPoints: "",
            price_value: "",         // ✅ reset price_value
            rc_product_img: null
        });
        toast.success("Redeem Product Add Successfully");
    };

    return (
        <div className='p-5 p-40'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h3>Add Customer Redeem Product</h3>
                <hr />

                <div className='form-group mb-3 mb-30'>
                    <input
                        className='form-control'
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                </div>

                <div className='form-group mb-3 mb-30'>
                    <textarea
                        className='form-control'
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        value={formData.description}
                        required
                    />
                </div>

                <div className='form-group mb-3 mb-30'>
                    <input
                        className='form-control'
                        type="number"
                        name="requiredPoints"
                        placeholder="Required Points"
                        onChange={handleChange}
                        value={formData.requiredPoints}
                        required
                    />
                </div>

                <div className='form-group mb-3 mb-30'>
                    <input
                        className='form-control'
                        type="number"
                        name="price_value"
                        placeholder="Price Value (INR)"
                        onChange={handleChange}
                        value={formData.price_value}
                        required
                    />
                </div>

                <div className='form-group mb-3 mb-30'>
                    <input
                        className='form-control'
                        type="file"
                        name="rc_product_img"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group mb-3 mb-30'>
                    <button className='btn btn-success' type="submit">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerProduct;
