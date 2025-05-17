"use client";

import React, { useEffect, useState } from 'react';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import RequestOrderModal from '@/components/RequestOrderModal';
import { Button } from 'react-bootstrap';
import { getProductById, setSelectedProduct } from '@/redux/slices/productSlice';
import OptimizedImage from '@/components/OptimizedImage';
import { useParams, useRouter } from 'next/navigation';


const ProductDetailsOne = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const { slug } = useParams();

    const slugParts = slug?.split('-');
    const productId = slugParts?.[slugParts.length - 1];
    const { product } = useSelector((state) => state.products);
    const { loading } = useSelector((state) => state.requestOrder);

    useEffect(() => {
        if (productId) {
            dispatch(getProductById(productId));
        }
    }, [dispatch, productId]);

    const handleSubmit = (data) => {
        // Send form data to backend
    };

    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : quantity);

    const handleRequestOrderClick = () => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                dispatch(setSelectedProduct(product));
                setShowModal(true);
            } else {
                router.push('/login');
            }
        }
    };

    return (
      
        <>
            <section className="product-details py-80">
                <div className="container container-lg">
                    <div className="row gy-4">
                        <div className="col-lg-12">
                            <div className="row gy-4">
                                <div className="col-xl-4">
                                    <div className="product-details__left">
                                        <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                                            <div className="product-details__thumb flex-center h-100">
                                                <OptimizedImage
                                                    imageUrl={product?.product_image}
                                                    alt={product?.name}
                                                    width={300}
                                                    height={300}
                                                    quality={80}
                                                    format="webp"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-8">
                                    <div className="product-details__content">
                                        <h5 className="mb-12">{product?.name}</h5>
                                        <p className="text-gray-700">{product?.description}</p>

                                        <div className="mt-16"><strong>Category:</strong> {product?.category_id?.name || 'N/A'}</div>
                                        <div className="mt-8"><strong>Farmer:</strong> {product?.farmer_id?.name || 'N/A'}</div>
                                        <div className="mt-8"><strong>Shop Name:</strong> {product?.shop_id?.shop_name || 'N/A'}</div>
                                        <div className="mt-8"><strong>Price:</strong> ₹{product?.price_per_unit} / {product?.unit}</div>
                                        <div className="mt-8"><strong>Available Quantity:</strong> {product?.quantity} {product?.unit}</div>
                                        <div className="mt-8"><strong>Season:</strong> {product?.season || 'N/A'}</div>
                                        <div className="mt-8"><strong>Harvest Date:</strong> {product?.harvest_date ? new Date(product?.harvest_date).toLocaleDateString() : 'N/A'}</div>

                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />

                                        <div className="flex-between gap-16 flex-wrap">
                                            <div className="flex-align flex-wrap gap-16">
                                                <Button className="btn btn-success btn-block w-100" onClick={handleRequestOrderClick}>
                                                    Request Order
                                                </Button>
                                            </div>
                                        </div>

                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-80">
                        <div className="product-dContent border rounded-24">
                            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
                                <ul className="nav common-tab nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-description-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-description"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-description"
                                            aria-selected="true"
                                        >
                                            Description
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="product-dContent__box">
                                <div className="tab-content show" id="pills-tabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-description"
                                        role="tabpanel"
                                        aria-labelledby="pills-description-tab"
                                        tabIndex={0}
                                    >
                                        <div className="mb-40">
                                            <h6 className="mb-24">Product Description</h6>
                                            {product?.description || "Not Available"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RequestOrderModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default ProductDetailsOne;
