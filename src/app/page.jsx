

import ColorInit from "@/helper/ColorInit";
// No lazy loading for these (critical content for FCP)
import HeaderOne from "@/components/HeaderOne";
import StaticBanner from "@/components/StaticBanner";
import React, { Suspense } from "react";


// Lazy load for non-critical components
const CategorySlider = React.lazy(() => import("@/components/CategorySlider"));
const PromotionalOne = React.lazy(() => import("@/components/PromotionalOne"));
const ProductListOne = React.lazy(() => import("@/components/ProductListOne"));
const TopVendorsOne = React.lazy(() => import("@/components/TopVendorsOne"));
const FooterOne = React.lazy(() => import("@/components/FooterOne"));
const BottomFooter = React.lazy(() => import("@/components/BottomFooter"));
const HomeContent = require("@/components/HomeContent").default;
const WhyKissanGrowthCards = require("@/components/WhyKissanGrowthCards").default;
const HowItWorksCards = require("@/components/HowItWorksCards").default;

export async function generateMetadata() {

  return {

    title: "Kissan Growth: India’s #1 Farm Online Marketplace",

    description: "Kissan Growth, India’s #1 Farm Online Marketplace connecting local farmers and consumers.",
    keywords:

      "Kissan Growth, fresh produce, buy from farmers, organic fruits and vegetables, local farm marketplace",
  };
}


const page = () => {

  return (

    <>

      <ColorInit color={false} />

      {/* Critical for initial paint */}
      <HeaderOne />

      <StaticBanner />

      {/* Lazy components rendered individually to avoid full page blocking */}

      <Suspense fallback={<div>Loading Home Content...</div>}>
        <HomeContent />
      </Suspense>

      <Suspense fallback={<div>Loading Why Kissan Growth...</div>}>
        <WhyKissanGrowthCards />
      </Suspense>

      <Suspense fallback={<div>Loading How it Works...</div>}>
        <HowItWorksCards />
      </Suspense>

      <Suspense fallback={<div>Loading Features...</div>}>
        <CategorySlider />
      </Suspense>

      <Suspense fallback={<div>Loading Promotions...</div>}>
        <PromotionalOne />
      </Suspense>


      <Suspense fallback={<div>Loading Products...</div>}>
        <ProductListOne />
      </Suspense>

      <Suspense fallback={<div>Loading Top Vendors...</div>}>
        <TopVendorsOne />
      </Suspense>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <FooterOne />
      </Suspense>

      <Suspense fallback={<div>Loading Bottom Footer...</div>}>
        <BottomFooter />
      </Suspense>
    </>

  );
};

export default page;
