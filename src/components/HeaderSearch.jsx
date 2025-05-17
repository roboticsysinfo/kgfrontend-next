"use client"
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance"; // Axios instance import karein
import slugify from "slugify";
import Link from "next/link";

const HeaderSearch = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {

        if (searchQuery.trim() === "") {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults();
        }, 500); // 500ms delay for debounce

        return () => clearTimeout(delayDebounceFn);

    }, [searchQuery]);

    const fetchSearchResults = async () => {
        try {
            const res = await axiosInstance.get(`/search-products-shops?query=${searchQuery}`);
            setSearchResults(res.data);
            setShowResults(true);
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    return (
        <>
            <div className="search-bar">

                <div className="search-category d-flex h-48 select-border-end-0 radius-end-0 search-form d-sm-flex d-none">
                    <div className="search-form__wrapper position-relative">
                        <input
                            type="text"
                            className="search-form__input common-input py-13 ps-16 pe-18 pe-44"
                            placeholder="Search for a product or shops"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            onClick={fetchSearchResults}
                            className="w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
                        >
                            <i className="ph ph-magnifying-glass" />
                        </button>
                    </div>
                </div>

                {showResults && (
                    <div className="search-results">
                        {searchResults.products.length === 0 && searchResults.shops.length === 0 ? (
                            <p>No results found</p>
                        ) : (
                            <>
                                {searchResults.products.length > 0 && (
                                    <>
                                        <h4>Products</h4>
                                        <hr />
                                        {searchResults.products.map((product) => {
                                            const productSlug = slugify(product.name || "", { lower: true, strict: true });
                                            return (
                                                <Link
                                                    href={`/product/${productSlug}-${product._id}`}
                                                    className="search_item"
                                                    key={product._id}
                                                >
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL_PRIMARY}${product.product_image}`}
                                                        width={32}
                                                        height={32}
                                                        alt={product.name}
                                                    />
                                                    <span>{product.name}</span>
                                                </Link>
                                            );
                                        })}
                                    </>
                                )}

                                {searchResults.shops.length > 0 && (
                                    <>
                                        <h4>Shops</h4>
                                        <hr />
                                        {searchResults.shops.map((shop) => {
                                            const shopSlug = slugify(shop.shop_name || "", { lower: true, strict: true });
                                            return (
                                                <Link
                                                    href={`/shop/${shopSlug}-${shop._id}`}
                                                    className="search_item"
                                                    key={shop._id}
                                                >
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL_PRIMARY}${shop.shop_profile_image}`}
                                                        width={32}
                                                        height={32}
                                                        alt={shop.shop_name}
                                                    />
                                                    <span>{shop.shop_name}</span>
                                                </Link>
                                            );
                                        })}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}


            </div>
        </>
    );
};

export default HeaderSearch;
