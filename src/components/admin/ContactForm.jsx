"use client"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteDetails, updateContactDetails } from "@/redux/slices/siteDeatilsSlice";
import { toast } from "react-hot-toast";

const ContactForm = () => {
    const dispatch = useDispatch();

    // Redux state fetch karein
    const { data, siteDetailsLoading } = useSelector((state) => state.siteDetails);

    const [formData, setFormData] = useState({
        phone: "",
        email: "",
        address: ""
    });

    // ✅ Mount hone par site details fetch karo
    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);

    // ✅ Redux state update hone par formData set karein
    useEffect(() => {
        if (data?.contactDetails) {
            setFormData({
                phone: data.contactDetails.phone || "",
                email: data.contactDetails.email || "",
                address: data.contactDetails.address || ""
            });
        }
    }, [data?.contactDetails]); // Jab `contactDetails` update ho, tab form update ho

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateContactDetails(formData)).unwrap();
            toast.success("Contact details updated successfully!");
        } catch (error) {
            toast.error(error || "Failed to update contact details.");
        }
    };

    return (
        <div className="p-40 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold mb-30">Update Contact Details</h2>
            {siteDetailsLoading ? (
                <p>Loading contact details...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-30">
                        <label className="block font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded form-control"
                        />
                    </div>
                    <div className="mb-30">
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded form-control"
                        />
                    </div>
                    <div className="mb-30">
                        <label className="block font-medium">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border rounded form-control"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success text-white rounded hover:bg-blue-600"
                        disabled={siteDetailsLoading}
                    >
                        {siteDetailsLoading ? "Updating..." : "Update Contact"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
