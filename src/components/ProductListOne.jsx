"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchProducts } from '@/redux/slices/productSlice';
import slugify from 'slugify';
import { FaRupeeSign } from "react-icons/fa";
import OptimizedImage from '@/components/OptimizedImage';

// Helper to safely slugify strings
const slugifySafe = (text) => {
    return slugify(typeof text === 'string' ? text : '', { lower: true, strict: true });
};

const ProductListOne = () => {
    const dispatch = useDispatch();

    const { data: products, status: productStatus } = useSelector((state) => state.products);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts({ page: 1, limit: 10, search: '', filter: '' }));
        }
    }, [dispatch, productStatus]);

    if (productStatus === 'loading') {
        return <div>Loading products...</div>;
    }

    if (productStatus === 'failed') {
        return <div>Error loading products</div>;
    }

    return (
        <div className="product mt-60 mb-60">
            <div className="container container-lg">

                <div className='row justify-content-center'>
                    <div className='col-lg-3 col-xs-12 col-sm-12 text-center'>
                        <h2 className="sectionheading">Products</h2>
                    </div>
                </div>

                <div className="row mt-30 gy-4 g-12">
                    {products?.map((product) => {
                        const productSlug = slugifySafe(product.name);

                        return (
                            <div key={product._id} className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                                <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                    <Link
                                        href={`/product/${productSlug}-${product._id}`}
                                        className="product-card__thumb flex-center"
                                    >

                                        <OptimizedImage
                                            imageUrl={product.product_image}
                                            alt={product.name}
                                            width={300}
                                            height={200}
                                            quality={80}
                                            format="webp" // Can be 'auto', 'webp', or 'avif'
                                        />

                                        {/* <img
                                            src={
                                                product.product_image
                                                    ? `${process.env.REACT_APP_BASE_URL_PRIMARY}${product.product_image}`
                                                    : 'https://placehold.co/100x100'
                                            }
                                            alt={product.name || 'Product'}
                                            loading='lazy'
                                            width={300}
                                            height={200}
                                        /> */}
                                    </Link>
                                    <div className="product-card__content mt-12">
                                        <div className="product-card__price mb-16">
                                            <span className="text-heading text-md fw-semibold">
                                                <FaRupeeSign /> {product.price_per_unit}{' '}
                                                <span className="text-gray-500 fw-normal">/ {product.quantity}/ Qty</span>
                                            </span>
                                        </div>

                                        <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                            <Link
                                                href={`/product/${productSlug}-${product._id}`}
                                                className="link text-line-2"
                                            >
                                                {product.name}
                                            </Link>
                                        </h6>
                                        <div className="flex-align gap-4">
                                            <span className="text-main-600 text-md d-flex">
                                                <i className="ph-fill ph-storefront" />
                                            </span>
                                            <span className="text-gray-500 text-xs">
                                                By&ensp;
                                                {product.shop_id?.shop_name && product.shop_id?._id ? (
                                                    <Link
                                                        className="text-success"
                                                        href={`/shop/${slugifySafe(product.shop_id.shop_name)}-${product.shop_id._id}`}
                                                    >
                                                        {product.shop_id.shop_name}
                                                    </Link>
                                                ) : (
                                                    <span className="text-danger">Unknown Shop</span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="mt-12">
                                            <div
                                                className="progress w-100 bg-color-three rounded-pill h-4"
                                                role="progressbar"
                                                aria-label="Basic example"
                                                aria-valuenow={35}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <div
                                                    className="progress-bar bg-main-600 rounded-pill"
                                                    style={{ width: '35%' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductListOne;
