import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const StaticBanner = () => {

    return (
        <>

            <div className="banner">
                <div className="container container-lg">
                    <div className="banner-item rounded-24 overflow-hidden position-relative arrow-center">
                        <a
                            href="#featureSection"
                            className="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800"
                        >
                            <span className="icon line-height-0">
                                <i className="ph ph-caret-double-down" />
                            </span>
                        </a>
                        <div className="banner-slider">

                            <div className="banner-slider__item">
                                <div className="banner-slider__inner flex-between position-relative">

                                    <div className="banner-item__content">

                                        <h1 className="banner-item__title bounce mb-20">Har Kisan, Har Khushi, <br/>Strong India</h1>
                                        <Link
                                            href="/products"
                                            className="btn btn-main d-inline-flex align-items-center mb-30 rounded-pill gap-8"
                                        >
                                            Explore Shop
                                            <span className="icon text-xl d-flex">
                                                <i className="ph ph-shopping-cart-simple" />
                                            </span>
                                        </Link>

                                    </div>

                                    <div className="banner-item__thumb">
                                        <Image src="/assets/images/farmer.png" alt="Kissan Growth" width={350} height={350} />
                                    </div>

                                </div>
                            </div>



                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default StaticBanner