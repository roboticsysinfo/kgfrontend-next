"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '@/redux/slices/shopSlice'; // Make sure to import the correct path
import Link  from 'next/link';
import slugify from 'slugify';
import OptimizedImage from '@/components//OptimizedImage';

const TopVendorsOne = () => {
  const dispatch = useDispatch();

  // Get shops and status from the Redux store
  const { shops = [], status, error } = useSelector((state) => state.shop);

  // Dispatch fetchShops action on component mount
  useEffect(() => {
    dispatch(fetchShops({ page: 1, limit: 6 }));  // Pass page and limit as needed
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <section className="top-vendors py-80">
      <div className="container container-lg">

        <div className='row justify-content-center'>
          <div className='col-lg-3 col-xs-12 text-center'>
            <h2 className='sectionheading text-4xl'>Farmer's Shops</h2>
          </div>
        </div>

        <div className="row mt-40">

          {shops.length > 0 ? (
            shops.map((shop) => (
              <div key={shop._id} className="col-xxl-3 col-lg-4 col-sm-6">
                <div className="vendor-card text-center px-16 pb-24">
                  <div>

                    <OptimizedImage
                      imageUrl={shop.shop_profile_image}
                      alt={shop.shop_name}
                      width={80}
                      height={80}
                      quality={80}
                      format="webp" // Can be 'auto', 'webp', or 'avif'
                      className="vendor-card__logo m-12 "
                    />
                    <h6 className="title mt-20">{shop.shop_name}</h6>
                    <span className="text-heading text-sm d-block">
                      {shop.shop_description?.split(" ").slice(0, 10).join(" ")}{shop.shop_description?.split(" ").length > 20 ? "..." : ""}
                    </span>

                    <Link href={`/shop/${slugify(shop.shop_name, { lower: true })}-${shop._id}`} className="btn btn-main-two rounded-pill py-6 px-16 text-12 mt-8">
                      View Shop
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No shops available</div>
          )}

        </div>

      </div>
    </section>
  );
};

export default TopVendorsOne;
