// src/app/products/page.jsx

import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import ShopSection from "@/components/ShopSection";


export async function generateMetadata() {

  return {
    title: "Shop Fresh Local Products From Kissan Growth",
    description: "Browse and buy fresh, locally sourced products directly from farmers on Kissan Growth. Enjoy high-quality, sustainable produce delivered to your door. Shop now!",
    keywords: "Fresh local products, Buy direct from farmers, Sustainable produce, Kissan Growth products, Online farm shopping, Shop fresh groceries, Local farm products, Support farmers, Fresh produce delivery"
  };

}

const page = async () => {

  return (

    <ClientLayoutWrapper>
      <Breadcrumb title={"Products"} />
      <ShopSection />
    </ClientLayoutWrapper>

  );

};

export default page;
