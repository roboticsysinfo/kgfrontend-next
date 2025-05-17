"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import { Button } from "react-bootstrap";
import RequestOrderModal from "@/components/RequestOrderModal";
import { fetchProductsByCategory, setSelectedProduct } from "@/redux/slices/productSlice";
import slugify from "slugify";
import { FaRupeeSign } from "react-icons/fa";
import Link from "next/link";

const CategoryProductsSection = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const { slug } = useParams(); // Get categoryId from URL
    const slugParts = slug?.split("-");
    const categoryId = slugParts ? slugParts[slugParts.length - 1] : null; // safely get last part

    // Products state
    const { categoryProducts, productcategoryStatus, error } = useSelector((state) => state.products);

    // Categories state
    const { categories, status: categoryStatus, error: categoryError } = useSelector((state) => state.categories);

    const [grid, setGrid] = useState(false);
    const [active, setActive] = useState(false);

    const sidebarController = () => {
        setActive(!active);
    };

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByCategory(categoryId));
        }
    }, [categoryId, dispatch]);

    useEffect(() => {
        if (categoryStatus === "idle") {
            dispatch(fetchCategories());
        }
    }, [dispatch, categoryStatus]);

    if (productcategoryStatus === "loading") return <p>Loading...</p>;
    if (productcategoryStatus === "failed") return <p>Error: {error}</p>;

    if (categoryStatus === "loading") return <p>Loading categories...</p>;
    if (categoryStatus === "failed") return <p>Error: {categoryError}</p>;

    const handleAddToCart = (productId) => {
        if (!productId) {
            console.error("❌ Error: Product ID is undefined!");
            return;
        }
        dispatch(addToCart({ productId, quantity: 1 }));
        toast.success("Product Added Successfully");
    };

    // Check user on client side only
    const isUserLoggedIn = () => {
        if (typeof window === "undefined") return false;
        const user = localStorage.getItem("user");
        if (!user) return false;
        try {
            const userObj = JSON.parse(user);
            return userObj?.id ? true : false;
        } catch {
            return false;
        }
    };

    const handleRequestOrderClick = (product) => {
        if (isUserLoggedIn()) {
            dispatch(setSelectedProduct(product));
            setShowModal(true);
        } else {
            window.location.href = "/login";
        }
    };

    return (
        <>
            <section className="shop py-80">
                <div className={`side-overlay ${active && "show"}`}></div>
                <div className="container container-lg">
                    <div className="row">
                        {/* Sidebar Start */}
                        <div className="col-lg-3">
                            <div className={`shop-sidebar ${active && "active"}`}>
                                <button
                                    onClick={sidebarController}
                                    type="button"
                                    className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                                >
                                    <i className="ph ph-x" />
                                </button>
                                <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                    <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Category</h6>

                                    <ul className="max-h-540 overflow-y-auto scroll-sm">
                                        {categories.map((category) => {
                                            const categorySlug = slugify(category.name || "", { lower: true, strict: true });
                                            return (
                                                <li key={category._id} className="mb-24">
                                                    <Link
                                                        href={`/category/${categorySlug}-${category._id}`}
                                                        className="text-gray-900 hover-text-main-600"
                                                    >
                                                        {category.name} ({category.productCount || 0})
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar End */}

                        {/* Content Start */}
                        <div className="col-lg-9">
                            {/* Top Start */}
                            <div className="flex-between gap-16 flex-wrap mb-40 ">
                                <div className="position-relative flex-align gap-16 flex-wrap">
                                    <div className="list-grid-btns flex-align gap-16">
                                        <button
                                            onClick={() => setGrid(true)}
                                            type="button"
                                            className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${grid === true ? "border-main-600 text-white bg-main-600" : ""
                                                }`}
                                        >
                                            <i className="ph-bold ph-list-dashes" />
                                        </button>
                                        <button
                                            onClick={() => setGrid(false)}
                                            type="button"
                                            className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${grid === false ? "border-main-600 text-white bg-main-600" : ""
                                                }`}
                                        >
                                            <i className="ph ph-squares-four" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={sidebarController}
                                        type="button"
                                        className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                                    >
                                        <i className="ph-bold ph-funnel" />
                                    </button>
                                </div>
                            </div>
                            {/* Top End */}

                            <div className={`list-grid-wrapper ${grid ? "list-view" : ""}`}>
                                {categoryProducts?.length > 0 ? (
                                    categoryProducts.map((product) => (
                                        <div
                                            key={product._id}
                                            className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                                        >
                                            <Link
                                                href={`/product/${product._id}`}
                                                className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                                            >

                                                <img
                                                    src={product.product_image ? `${product.product_image}?tr=w-300,h-250,q-80,f-webp` : 'https://placehold.co/100x100'}
                                                    alt={product.name}
                                                    className="w-auto max-w-unset"
                                                />

                                            </Link>
                                            <div className="product-card__content mt-16">
                                                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                                    <Link href={`/product/${product._id}`} className="link text-line-2">
                                                        {product.name}
                                                    </Link>
                                                </h6>
                                                <div className="product-card__price my-20">
                                                    <span className="text-heading text-md fw-semibold">
                                                        <FaRupeeSign /> {product.price_per_unit}
                                                    </span>
                                                    <span className="text-heading text-md fw-semibold">
                                                        {" "}
                                                        per {product.unit} / {product.quantity} /Qty
                                                    </span>
                                                </div>

                                                <Button
                                                    className="btn btn-success btn-block w-100"
                                                    onClick={() => handleRequestOrderClick(product)}
                                                >
                                                    Request Order
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No products found</p>
                                )}
                            </div>
                        </div>
                        {/* Content End */}
                    </div>
                </div>
            </section>

            <RequestOrderModal show={showModal} handleClose={() => setShowModal(false)} handleSubmit={() => { }} />
        </>
    );
};

export default CategoryProductsSection;
