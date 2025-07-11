import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const KGMobileAppsSection = () => {

    return (

        <>

            <div className='container py-60 my-60'>

                <div className='row'>

                    <div className='col-lg-12 col-xs-12 col-sm-12'>

                        <div className="kissan-growth-app-info">

                            <h1 className='text-5xl'>Kissan Growth Mobile App: Connecting Farmers and Consumers</h1>

                            <h2 className='mb-20 text-3xl'>How does Kissan Growth Farmer and Kissan Growth Customer App Works?</h2>

                            <p>
                                The Kissan Growth Mobile App is a game-changer in Indian agriculture, designed to eliminate middlemen and build a direct <strong>bridge between farmers and consumers.</strong>
                                Whether you're a farmer looking to grow your business or a consumer wanting <strong> fresh, organic produce at fair prices</strong>, this platform makes it simple, convenient, and impactful.
                                The app is available in two versions – one for farmers and one for customers – each tailored to their unique needs.
                            </p>

                        </div>

                    </div>

                    <hr />

                    <div className="row">
                        <div className='kissan-growth-farmer-info'>

                            <h3 className='text-4xl'>Kissan Growth Farmer App: Empowering India’s Farmers</h3>

                            <p className='mb-10'>
                                The <strong>Kissan Growth Farmer App is India’s #1 online farm marketplace</strong>, built specifically for farmers to take control of their sales.
                                It allows farmers to create their own digital shops, list products like <strong>vegetables, fruits, dairy, and crops</strong>, set their own prices, and sell directly to consumers—without interference from middlemen.
                            </p>

                            <p>
                                A unique feature is the <strong>"Adopt a Farmer as Family Farmer"</strong> option, where consumers can choose to support individual farmers and receive fresh produce directly from their chosen farmer.
                                Every transaction earns farmers and supporters rewards, badges, and new tools to grow together.
                            </p>

                        </div>
                    </div>

                    <div className='row justify-content-center my-40'>

                        <div className='col-lg-3 col-xs-12 col-sm-12'>
                            <div className="app-image">
                                <Image src="/assets/app_screenshots/farmer/farmer1.jpg" width={251} height={497} alt="Farmer App" />
                            </div>
                        </div>

                        <div className='col-lg-3 col-xs-12 col-sm-12'>
                            <div className="app-image">
                                <Image src="/assets/app_screenshots/farmer/farmer2.jpg" width={251} height={497} alt="Farmer App" />
                            </div>
                        </div>

                        <div className='col-lg-3 col-xs-12 col-sm-12'>
                            <div className="app-image">
                                <Image src="/assets/app_screenshots/farmer/farmer3.jpg" width={251} height={497} alt="Farmer App" />
                            </div>
                        </div>

                        <div className='col-lg-12 text-center'>
                            <p className='mt-30 fw-bold'>
                                Download the Kissan Growth Farmer App today to sell directly to customers — no middlemen, more profit!
                            </p>
                            <Link
                                href="https://play.google.com/store/apps/details?id=com.kissangrowthfarmer"
                                className="btn btn-main d-inline-flex align-items-center mt-20 mb-30 rounded-pill gap-8"
                                style={{ height: 60 }}
                            >
                                <span className="icon text-xl d-flex">
                                    <i className="ph ph-google-play-logo"></i>
                                </span>
                                Download on Mobile Now

                            </Link>
                        </div>

                    </div>


                    <div className="kissan-growth-farmer-info">

                        <h3 className='text-4xl'>For Farmers – Kissan Growth Farmer App</h3>

                        <h4 className='text-2xl'>Grow Your Network. Grow Your Sales. Earn More!</h4>

                        <p className='mb-10'>
                            The Kissan Growth Farmer App helps farmers reach more customers – and now, you can earn rewards for helping other farmers join.
                        </p>

                        <h4 className='text-2xl mt-20'>How It Works:</h4>

                        <div className='row justify-content-center my-40'>
                            <div className='col-lg-3 col-xs-12 col-sm-12'>
                                <div className="app-image">
                                    <Image src="/assets/app_screenshots/farmer/farmershop.jpg" width={251} height={497} alt="" />
                                </div>
                            </div>
                            <div className='col-lg-3 col-xs-12 col-sm-12'>
                                <div className="app-image">
                                    <Image src="/assets/app_screenshots/farmer/farmerorder.jpg" width={251} height={497} alt="" />
                                </div>
                            </div>
                            <div className='col-lg-3 col-xs-12 col-sm-12'>
                                <div className="app-image">
                                    <Image src="/assets/app_screenshots/farmer/farmerpoints.jpg" width={251} height={497} alt="" />
                                </div>
                            </div>
                        </div>

                        <ul>
                            <li><strong>Refer Another Farmer:</strong> Help a fellow farmer join — <strong>earn 10 points</strong> when they list their first crop.</li>
                            <li><strong>Daily Login:</strong> Stay connected — <strong>earn 1 point</strong> daily for opening the app.</li>
                            <li><strong>Share App to Network:</strong> Share Kissan Growth Farmer App — <strong>5 points</strong> per share.</li>
                            <li><strong>Active Usage Reward:</strong> Stay in-app for 10 minutes — <strong>earn 5 bonus</strong> points.</li>
                            <li><strong>Get Adopted:</strong> When a customer adopts you as their Family Farmer — <strong>earn 20 points</strong> instantly.</li>
                        </ul>

                        <h4 className='text-2xl mt-20'>Redeem Points:</h4>

                        <p className='mb-10'>
                            You can use or redeem your points to purchase any product, and points will <strong>automatically be deducted from your points wallet.</strong>
                        </p>

                        <p><strong>Note: These redeem points are acceptable only at the Kissan Growth App Platforms. These points will not be redeemable or applicable to outside or third parties. </strong></p>

                    </div>



                </div>

                <hr />

                <div className='row'>


                    <div className='row'>
                        <div className='kissan-growth-customer-info'>

                            <h3 className='text-5xl'>Kissan Growth Customer App: Shop Fresh, Support Local</h3>

                            <p className='mb-10'>
                                The <strong>Kissan Growth Customer App</strong> is designed for consumers who care about where their food comes from.
                                With a smooth interface and quick browsing, <strong> customers can contact and shop directly from trusted farmers</strong> across India.
                            </p>

                            <p>
                                The app offers seasonal picks, referral rewards, loyalty points, and meaningful feedback systems that help farmers improve.
                                By using the app, customers don’t just get <strong>fresh produce</strong>—they become part of a growing community that supports ethical farming and <strong>farmer prosperity</strong>.
                            </p>

                        </div>
                    </div>

                    <div className='row justify-content-center my-40'>
                        <div className='col-lg-3 col-xs-12 col-sm-12'>
                            <div className="app-image">
                                <Image src="/assets/app_screenshots/customer/customer1.jpg" width={251} height={497} alt="" />
                            </div>
                        </div>
                        <div className='col-lg-3 col-xs-12 col-sm-12'>
                            <div className="app-image">
                                <Image src="/assets/app_screenshots/customer/customer2.jpg" width={251} height={497} alt="" />
                            </div>
                        </div>
                        <div className='col-lg-3 col-xs-12 col-sm-12'>
                            <div className="app-image">
                                <Image src="/assets/app_screenshots/customer/customer3.jpg" width={251} height={497} alt="" />
                            </div>
                        </div>

                        <div className='col-lg-12 text-center'>
                            <p className='mt-30 fw-bold'>
                               Download the Kissan Growth Customer App today and buy fresh products directly from farms!
                            </p>
                            <Link
                                href="https://play.google.com/store/apps/details?id=com.kissangrowthcustomer"
                                className="btn btn-main d-inline-flex align-items-center mt-20 mb-30 rounded-pill gap-8"
                                style={{ height: 60 }}
                            >
                                <span className="icon text-xl d-flex">
                                    <i className="ph ph-google-play-logo"></i>
                                </span>
                                Download on Mobile Now

                            </Link>
                        </div>

                    </div>

                    <div className='col-lg-12 col-xs-12 col-sm-12'>

                        <div className="kissan-growth-customer-info">

                            <h3 className='text-4xl'>Kissan Growth Refer & Earn Policy</h3>

                            <p className='mb-10'>Empower Farmers. Enjoy Freshness. Earn Rewards.</p>

                            <h4 className='mb-20'>For Customers – Kissan Growth Customer App</h4>

                            <p className='mb-10'>
                                <strong>Share the Goodness, Earn the Rewards!</strong>
                            </p>

                            <p className='mb-10'>
                                Love buying fresh produce directly from farmers? Spread the word and <strong>get rewarded every time a friend joins Kissan Growth through your referral</strong>.
                            </p>

                            <h4 className='mt-30'>How It Works:</h4>


                            <div className='row justify-content-center my-40'>
                                <div className='col-lg-3 col-xs-12 col-sm-12'>
                                    <div className="app-image">
                                        <Image src="/assets/app_screenshots/customer/customerproducts.jpg" width={251} height={497} alt="" />
                                    </div>
                                </div>
                                <div className='col-lg-3 col-xs-12 col-sm-12'>
                                    <div className="app-image">
                                        <Image src="/assets/app_screenshots/customer/customerfamilyfarmer.jpg" width={251} height={497} alt="" />
                                    </div>
                                </div>
                                <div className='col-lg-3 col-xs-12 col-sm-12'>
                                    <div className="app-image">
                                        <Image src="/assets/app_screenshots/customer/customerpoints.jpg" width={251} height={497} alt="" />
                                    </div>
                                </div>
                            </div>


                            <ul>
                                <li><strong>Refer a Friend:</strong> Share your referral link — <strong>earn 10 points</strong> when they sign up & shop.</li>
                                <li><strong>Adopt a Farmer:</strong> Choose a farmer to support — <strong>earn 20 points</strong> instantly.</li>
                                <li><strong>Daily Login:</strong> Open the app every day — <strong>earn 1 point</strong> per login.</li>
                                <li><strong>Stay Active:</strong> Use the app for 10 minutes or more — <strong>get 5 bonus</strong> points daily.</li>
                                <li><strong>Share the App:</strong> Share Kissan Growth on social media or with friends — <strong>earn 5 points</strong> per share (limit applies).</li>
                            </ul>

                            <h4 className='mt-30'>Redeem Points:</h4>

                            <p>
                                You can use or redeem your points to purchase any product, and points will <strong>automatically be deducted from your points wallet.</strong>
                            </p>
                            <br />
                            <p><strong>Note: These redeem points are acceptable only at the Kissan Growth App Platforms. These points will not be redeemable or applicable to outside or third parties. </strong></p>

                        </div>

                    </div>

                </div>

                <hr />

                <div className='row justify-content-center' >
                    <div className='dflexinpugroup justify-content-center mt-60'>
                        <Link className="btn btn-lg btn-success" href="/farmers">Find Farmer Shops</Link>
                        <Link className="btn btn-lg btn-success" href="/farmer/register">Register as Farmer</Link>
                    </div>
                </div>

            </div>


        </>


    )
}

export default KGMobileAppsSection