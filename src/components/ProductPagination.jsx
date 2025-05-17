'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/redux/slices/productSlice';
import { useRouter, useSearchParams } from 'next/navigation';

const ProductPagination = () => {
    const dispatch = useDispatch();
    const { totalPages, currentPage } = useSelector((state) => state.products);
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            const current = new URLSearchParams(searchParams.toString()); // नया instance
            current.set('page', newPage);
            router.push(`?${current.toString()}`);

            dispatch(fetchProducts({ page: newPage, limit: 10 }));
        }
    };


    return (
        <ul className="ProductPagination flex-center flex-wrap gap-16">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                    onClick={() => changePage(currentPage - 1)}
                >
                    <i className="ph-bold ph-arrow-left" />
                </button>
            </li>

            {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button
                            className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                            onClick={() => changePage(page)}
                        >
                            {page < 10 ? `0${page}` : page}
                        </button>
                    </li>
                );
            })}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                    onClick={() => changePage(currentPage + 1)}
                >
                    <i className="ph-bold ph-arrow-right" />
                </button>
            </li>
        </ul>
    );
};

export default ProductPagination;
