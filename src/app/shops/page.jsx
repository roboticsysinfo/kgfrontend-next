import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import FarmersShopSection from "@/components/FarmersShopSection";


export async function generateMetadata() {

  return {
    title: "Shop Fresh Farm Products: Kissan Growth",
    description: "Discover a wide range of farm-fresh, locally grown product shops on Kissan Growth. Buy directly from trusted farmers to your doorstep.",
    keywords: "Farm-fresh produce, Local organic products, Farmer direct shopping, Natural groceries, Buy fresh online, Healthy local foods, Farm to table delivery, Kissan Growth store, Fresh from the farm"
  };

}

const page = async () => {

  return (

    <ClientLayoutWrapper>
      <Breadcrumb title={"Farmer's Shops"} />
      <FarmersShopSection />
    </ClientLayoutWrapper>

  );

};

export default page;
