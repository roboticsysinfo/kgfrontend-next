

"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/slices/categorySlice';
import { fetchProductsByShopId, fetchShopByShopId } from "@/redux/slices/shopSlice";
import slugify from 'slugify';
import OptimizedImage from '@/components/OptimizedImage';
import { useParams } from 'next/navigation';
import Link from "next/link"

const ShopDetailsScreen = () => {

    const dispatch = useDispatch();

    // Categories state
    const { categories, status: categoryStatus, error: categoryError } = useSelector((state) => state.categories);
    const { products, status, error } = useSelector((state) => state.shop);
    const { shop } = useSelector(state => state.shop);
    const { reviews } = useSelector((state) => state.reviews);
    const { slug } = useParams(); // Get Shop Id From URL
    const slugParts = slug.split('-');
    const shopId = slugParts[slugParts.length - 1]; // last part productId 

    // Fetch categories when the component mounts
    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, categoryStatus]);

    // Fetch shop details when the component mounts
    useEffect(() => {
        dispatch(fetchShopByShopId(shopId));
    }, [dispatch, shopId]);

    useEffect(() => {
        dispatch(fetchProductsByShopId(shopId));
    }, [dispatch, shopId]);

    // Handle loading and error states for categories
    if (categoryStatus === 'loading') {
        return <p>Loading categories...</p>;
    }
    if (categoryStatus === 'failed') {
        return <p>Error: {categoryError}</p>;
    }

    // Handle loading and error states for shop
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;


    return (

        <>

            <section className="vendor-two-details py-80">
                <div className="side-overlay false" />
                <div className="container container-lg">
                    <div className="vendor-two-details-wrapper d-flex flex-wrap align-items-start gap-24">
                        <div className="shop-sidebar false">
                            <button
                                type="button"
                                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 text-white border-main-600"
                            >
                                <i className="ph ph-x" />
                            </button>

                            <div className="d-flex flex-column gap-12 px-lg-0 px-3 py-lg-0 py-4">
                                <div className="bg-neutral-600 rounded-8 p-24">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="w-80 h-80 flex-center bg-white rounded-8 flex-shrink-0">

                                            <OptimizedImage
                                                imageUrl={shop?.shop_profile_image}
                                                alt={shop?.shop_name}
                                                width={100}
                                                height={100}
                                                quality={80}
                                                format="webp" // Can be 'auto', 'webp', or 'avif'
                                                className="w-auto max-w-unset"
                                            />

                                        </span>
    
                                    </div>
                                    <div className="mt-32">
                                        <h6 className="text-white fw-semibold mb-12">
                                            {shop?.shop_name}
                                        </h6>
                                        <div className="flex-align gap-6">
                                            <div className="flex-align gap-8">
                                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                                    <i className="ph-fill ph-star" />
                                                </span>
                                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                                    <i className="ph-fill ph-star" />
                                                </span>
                                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                                    <i className="ph-fill ph-star" />
                                                </span>
                                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                                    <i className="ph-fill ph-star" />
                                                </span>
                                                <span className="text-15 fw-medium text-warning-600 d-flex">
                                                    <i className="ph-fill ph-star" />
                                                </span>
                                            </div>
                                            <span className="text-xs fw-medium text-white">
                                                {reviews.averageRating ? reviews.averageRating.toFixed(1) : "0.0"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-32 d-flex flex-column gap-8">
                                        <a
                                            className="active px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"

                                        >
                                            About Shop
                                        </a>
                                        <a
                                            className="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"

                                        >
                                            Products
                                        </a>

                                    </div>
                                </div>

                                <div className="border border-gray-50 rounded-8 p-24">
                                    <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                        Product Category
                                    </h6>

                                    <ul className="max-h-540 overflow-y-auto scroll-sm">

                                        {categories.map((category) => (
                                            <li key={category._id} className="mb-24">
                                                <Link
                                                    href={`/category/${category._id}`} // Assuming a route structure like /shop/categoryId
                                                    className="text-gray-900 hover-text-main-600"
                                                >
                                                    {category.name} ({category.productCount || 0}) {/* Adjust if you have product counts */}
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>

                                </div>

                            </div>

                        </div>
                        <div className="vendor-two-details__contents h-200" >

                            <div
                                className="inner-banner-two bg-img mb-30 rounded-16 overflow-hidden"
                                style={{
                                    backgroundImage: `url(${shop?.shop_cover_image ? `${shop?.shop_cover_image}?tr=w-300,h-300,q-80,f-webp` : "assets/images/thumbs/inner-banner-two-bg.png"})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >

                                <div className="row">
                                    <div className="col-6 d-xl-block d-none" />
                                    <div className="col-xl-6 d-xl-flex">
                                    </div>
                                </div>

                            </div>

                            <div class="shop_about_section">
                                <h4 className=''>About Us</h4>
                                <hr />
                                <p>
                                    {shop?.shop_description}
                                </p>
                            </div>

                            <div className='shop_products_section'>

                                <h4>Our Products</h4>
                                <hr />

                                <div className='row'>

                                    {products.length > 0 ? (
                                        products.map((product) => (

                                            <div key={product._id} className='col-lg-4 col-md-6 col-xs-12 col-sm-12 mb-30' >

                                                <div

                                                    className="product-card h-100 p-16  border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                                                >
                                                    <div className="product-card__thumb rounded-8 bg-gray-50 position-relative">
                                                        <Link className="w-100 h-100 flex-center" href={`/product/${slugify(product.name, { lower: true })}-${product._id}`}>
                                                            <OptimizedImage
                                                                imageUrl={product.product_image}
                                                                alt={product.name}
                                                                width={310}
                                                                height={200}
                                                                quality={80}
                                                                format="webp" // Can be 'auto', 'webp', or 'avif'
                                                                className="w-auto max-w-unset"
                                                            />

                                                        </Link>

                                                        <div className="position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8">
                                                            {product.discount && (
                                                                <span className="text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold">
                                                                    {product.discount}%
                                                                </span>
                                                            )}
                                                            {product.label && (
                                                                <span className="text-neutral-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold">
                                                                    {product.label}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="product-card__content mt-16 w-100">

                                                        <h6 className="title text-lg fw-semibold my-16">
                                                            <Link className="link text-line-2" href={`/product/${slugify(product.name, { lower: true })}-${product._id}`}>
                                                                {product.name}
                                                            </Link>
                                                        </h6>

                                                        <span className="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16">
                                                            by {product.shop_id?.shop_name}
                                                        </span>
                                                        <div className="product-card__price mt-16 mb-30">
                                                            <span class="mb-[6px] text-[#191919] text-base font-medium font-['Poppins'] leading-normal">
                                                                Rs{product.price_per_unit}
                                                            </span>

                                                            <span className="text-heading text-md fw-semibold">
                                                                {product.quantity} <span className="text-gray-500 fw-normal">/Qty</span>
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>


                                        ))
                                    ) : (

                                        <p>No products available.</p>

                                    )}

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default ShopDetailsScreen