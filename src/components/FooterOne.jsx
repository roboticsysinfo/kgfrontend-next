"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSiteDetails } from '@/redux/slices/siteDeatilsSlice';
import { Spinner } from 'react-bootstrap';
import Link from "next/link"


const FooterOne = () => {

    const dispatch = useDispatch();
    const { data: siteDetails, siteDetailsLoading, siteDetailsError } = useSelector((state) => state.siteDetails);

    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);


    if (siteDetailsLoading) return <Spinner variant='success' />;
    if (siteDetailsError) return <p>siteDetailsError: {siteDetailsError}</p>;


    return (

        <footer className="footer py-120 pb-60">
            <img
                src="/assets/images/bg/body-bottom-bg.png"
                alt="BG"
                className="body-bottom-bg"
            />
            <div className="container container-lg">
                <div className="row">

                    <div className="col-lg-3 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <div className="footer-item__logo">
                                <Link href="/">
                                    {" "}
                                    <img src={`${process.env.NEXT_PUBLIC_BASE_URL_PRIMARY}${siteDetails?.siteLogo}`} alt="" />
                                </Link>
                            </div>
                            <p className="mb-24">
                                {siteDetails?.about?.footer_text}
                            </p>
                            <div className="flex-align gap-16 mb-16">
                                <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                    <i className="ph-fill ph-map-pin" />
                                </span>
                                <span className="text-md text-gray-900 ">
                                    {siteDetails?.contactDetails?.address}
                                </span>
                            </div>
                            <div className="flex-align gap-16 mb-16">
                                <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                    <i className="ph-fill ph-envelope" />
                                </span>
                                <Link
                                    href="/mailto:{siteDetails?.address}"
                                    className="text-md text-gray-900 hover-text-main-600"
                                >
                                    {siteDetails?.contactDetails?.email}
                                </Link>
                            </div>

                        </div>

                    </div>

                    <div className="col-lg-2 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <h6 className="footer-item__title">Quick Links</h6>
                            <ul className="footer-menu">
                                <li className="mb-16">
                                    <Link href="/farmer/register" className="text-gray-600 hover-text-main-600">
                                        Register as Farmer
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link href="/farmer/login" className="text-gray-600 hover-text-main-600">
                                        Login as Farmer
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link href="/about-us" className="text-gray-600 hover-text-main-600">
                                        About
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link href="/blogs" className="text-gray-600 hover-text-main-600">
                                        Blogs
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>

                    <div className="col-lg-2 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <h6 className="footer-item__title">Customer Support</h6>
                            <ul className="footer-menu">
                                <li className="mb-16">
                                    <Link href="/contact" className="text-gray-600 hover-text-main-600">
                                        Help Center
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link
                                        href="/contact"
                                        className="text-gray-600 hover-text-main-600"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover-text-main-600"
                                    >
                                        Customer Login
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link
                                        href="/register"
                                        className="text-gray-600 hover-text-main-600"
                                    >
                                        Register as a Customer
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>

                    <div className="col-lg-2 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <h6 className="footer-item__title">Information</h6>
                            <ul className="footer-menu">

                                <li className="mb-16">
                                    <Link href="/terms-and-conditions" className="text-gray-600 hover-text-main-600">
                                        Terms & Conditions
                                    </Link>
                                </li>

                                <li className="mb-16">
                                    <Link href="/privacy-policy" className="text-gray-600 hover-text-main-600">
                                        Privacy Policy
                                    </Link>
                                </li>

                                <li className="mb-16">
                                    <Link href="#" className="text-gray-600 hover-text-main-600">
                                        Sitemap
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>

                    <div className="col-lg-3 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <h6 className="">Download Kissan Growth Apps</h6>
                            <p className="mb-16">Get it on Play Store Now</p>
                            <div className="flex-align gap-8 my-32">
                                <Link href="/https://www.apple.com/store" className="appcontent">
                                    <img src="/assets/images/google-play-store.svg" alt="Farmer App" />
                                    <p>Download App for Farmer</p>
                                </Link>
                                <Link href="/https://play.google.com/store/apps?hl=en" className="appcontent">
                                    <img src="/assets/images/google-play-store.svg" alt="Customer App" />
                                    <p>Download App for Customer</p>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>
                <div className='row'>
                    <div className='col-lg-12 col-xs-12 col-sm-12'>


                        <ul className="flex-align gap-16">
                            {siteDetails?.socialMedia?.map((item, index) => {
                                const platform = item.platform?.toLowerCase();

                                // Map platform to Phosphor icon class
                                const iconMap = {
                                    instagram: "ph-instagram-logo",
                                    twitter: "ph-twitter-logo", // or "ph-x-logo" if you use X icon
                                    youtube: "ph-youtube-logo",
                                    pinterest: "ph-pinterest-logo",
                                    linkedin: "ph-linkedin-logo",
                                };

                                const iconClass = iconMap[platform] || "ph-link"; // fallback icon

                                return (
                                    <li key={index}>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-44 h-44 flex-center bg-main-two-50 text-main-600 text-xl rounded-8 hover-bg-main-600 hover-text-white"
                                        >
                                            <i className={`ph-fill text-3xl ${iconClass}`} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>
            </div>
        </footer>

    )
}

export default FooterOne