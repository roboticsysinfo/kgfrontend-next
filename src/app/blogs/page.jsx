import Blog from "@/components/Blog";
import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";


export async function generateMetadata() {

  return {

    title: "Kissan Growth Blogs: Farming Tips & Agri-Tech News",
    description: "Explore Kissan Growth's blog for expert articles on digital marketing, farm-to-market strategies, and the latest in agricultural technology.",
    keywords: "Kissan Growth, agriculture blog, farming tips, farmer blog India, digital farming, agri marketing, farm to market, agricultural technology, smart farming, agri tech India, marketing for farmers, sell produce online, Indian farmers blog, Karnal farming, farm growth strategies"
  
  };

}

const page = async () => {

  return (

    <ClientLayoutWrapper>
      <Breadcrumb title={"Blogs"} />
      <Blog />
    </ClientLayoutWrapper>

  );

};

export default page;
