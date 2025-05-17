
"use client"
import React from 'react'
import Link  from 'next/link'
import Image from 'next/image';

const PromotionalOne = () => {
    return (
        <section className="promotional-banner pt-80">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-xl-4 col-sm-6 col-xs-6">
                        <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
                            <Image
                                src="/assets/images/thumbs/promotional-banner-img2.webp"
                                alt="Kisaan Growth"
                                className="position-absolute inset-block-start-0 inset-inline-start- object-fit-cover z-n1"
                                loading='lazy'
                                width={426}
                                height={302}
                            />
                            <div className="promotional-banner-item__content">
                                <h6 className="promotional-banner-item__title text-32">
                                    Daily Fresh Vegetables
                                </h6>
                                <Link
                                    href="/category/vegetables-68105aa462837600f93b9c66"
                                    className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
                                >
                                    Shop Now
                                    <span className="icon text-xl d-flex">
                                        <i className="ph ph-arrow-right" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-xs-6">
                        <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
                            <Image
                                src="/assets/images/thumbs/promotional-banner-img3.webp"
                                alt=""
                                className="position-absolute inset-block-start-0 inset-inline-start-0 object-fit-cover z-n1"
                                loading='lazy'
                                width={426}
                                height={302}
                            />
                            <div className="promotional-banner-item__content">
                                <h6 className="promotional-banner-item__title text-32">
                                    Everyday Fresh Milk
                                </h6>
                                <Link
                                    href="/category/fresh-milk-68131fd0b61968263cce58c1"
                                    className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
                                >
                                    Shop Now
                                    <span className="icon text-xl d-flex">
                                        <i className="ph ph-arrow-right" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-xs-6">
                        <div className="promotional-banner-item position-relative rounded-24 overflow-hidden z-1">
                            <Image
                                src="/assets/images/thumbs/promotional-banner-img4.webp"
                                alt=""
                                className="position-absolute inset-block-start-0 inset-inline-start-0 object-fit-cover z-n1"
                                loading='lazy'
                                width={426}
                                height={302}
                            />
                            <div className="promotional-banner-item__content">
                                <h6 className="promotional-banner-item__title text-32">
                                    Everyday Fresh Fruits
                                </h6>
                                <Link
                                    href="/category/fruits-68105ab062837600f93b9c6b"
                                    className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
                                >
                                    Shop Now
                                    <span className="icon text-xl d-flex">
                                        <i className="ph ph-arrow-right" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default PromotionalOne