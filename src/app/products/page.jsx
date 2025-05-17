import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import ShopSection from "@/components/ShopSection";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Shop Fresh Local Products From Kissan Growth",
    description: "Browse and buy fresh, locally sourced products directly from farmers on Kissan Growth...",
    keywords: "Fresh local products, Buy direct from farmers, Sustainable produce...",
  };
}

const page = async () => {
  return (
    <ClientLayoutWrapper>
      <Breadcrumb title={"Products"} />

      {/* Suspense for client components inside ShopSection */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ShopSection />
      </Suspense>
    </ClientLayoutWrapper>
  );
};

export default page;
