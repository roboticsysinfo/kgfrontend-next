
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSiteDetails } from '@/redux/slices/siteDeatilsSlice';
import { Spinner } from 'react-bootstrap';
import { createHelpSupport } from '@/redux/slices/customerHelpSupportSlice';
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import Link from 'next/link';


const Contact = () => {


    const dispatch = useDispatch();
    const captchaRef = useRef(null); // ✅ ReCAPTCHA ref
    const [captchaValue, setCaptchaValue] = useState(null);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });


    const { loading, successMessage, error } = useSelector((state) => state.customerHelpSupport);
    const { data: siteDetails, siteDetailsLoading, siteDetailsError } = useSelector((state) => state.siteDetails);


    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);


    if (siteDetailsLoading) return <Spinner style={{ margin: "auto" }} variant='success' />
    if (siteDetailsError) return <p>siteDetailsError: {siteDetailsError}</p>;


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); // ✅ Update captcha value
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaValue) {
            toast.error("Please complete the CAPTCHA");
            return;
        }

        const fullData = {
            ...formData,
            captchaValue,
        };

        try {
          
            await dispatch(createHelpSupport(fullData)).unwrap();
            toast.success("Your message has been sent successfully!");

            // Optional: Clear form
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });

            captchaRef.current.reset();
            setCaptchaValue(null);

        } catch (err) {
            toast.error(err?.message || "Something went wrong while submitting.");
            captchaRef.current.reset();
            setCaptchaValue(null);
        }
    };


    return (

        <section className="contact py-80">

            <div className="container container-lg">

                <div className="row">
                    <div className='col-lg-12 col-xs-12 text-center'>
                        <h1 className='page_heading mb-60'>Contact Us - Kissan Growth: India’s #1 Farm Online Marketplace</h1>
                    </div>
                </div>

                <div className="row gy-5">
                    <div className="col-lg-8">
                        <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                            <form onSubmit={handleSubmit}>
                                <h6 className="mb-20">Get in Touch with Us</h6>
                                <p>If you have any questions, concerns, or feedback, our team is here to assist you! We value your input and are committed to ensuring you have the best experience as a part of the Kissan Growth platform.</p>

                                <div className="row gy-4 mt-40">
                                    {/* Name */}
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="name" className="text-sm fw-semibold mb-4">
                                            Full Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input px-16"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="email" className="text-sm fw-semibold mb-4">
                                            Email Address <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="common-input px-16"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email address"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="phone" className="text-sm fw-semibold mb-4">
                                            Phone Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="common-input px-16"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div className="col-sm-6 col-xs-6">
                                        <label htmlFor="subject" className="text-sm fw-semibold mb-4">
                                            Subject <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input px-16"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Subject"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="col-sm-12">
                                        <label htmlFor="message" className="text-sm fw-semibold mb-4">
                                            Message <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="common-input px-16"
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Type your message"
                                        />
                                    </div>

                                    {/* ✅ reCAPTCHA */}
                                    <div className="mb-30">
                                        <ReCAPTCHA
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                            onChange={handleCaptchaChange}
                                            ref={captchaRef}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="col-sm-12 mt-32">
                                        <button
                                            type="submit"
                                            className="btn btn-main py-18 px-32 rounded-8"
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>

                                    <div className="col-sm-12 mt-32">
                                        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                                        {error && <p className="text-danger mt-3">{error}</p>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-4">
                        <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                            <h6 className="mb-10">Contact Information</h6>
                            <p className='mb-30'>Contact Nodal Officer for Any Queries</p>

                            <div className="flex-align gap-16 mb-16">
                                <span className="icon">
                                    <i className="ph-fill ph-envelope" />
                                </span>
                                <Link href="/mailto:support24@marketpro.com">
                                    {siteDetails?.contactDetails?.email}
                                </Link>
                            </div>

                            <div className="flex-align gap-16">
                                <span className="icon">
                                    <i className="ph-fill ph-map-pin" />
                                </span>
                                <span>{siteDetails?.contactDetails?.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>

    );
};

export default Contact;
