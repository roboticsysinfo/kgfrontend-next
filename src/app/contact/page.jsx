// src/app/contact/page.jsx

import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Contact from "@/components/Contact";


export async function generateMetadata() {

  return {
    title: "Contact Us: Kissan Growth",
    description: "Reach out to Kissan Growth for any inquiries, farmer registration support, or customer assistance. Join India’s #1 farm online marketplace to buy fresh produce.",
    keywords: "Contact Kissan Growth, farmer registration India, support Kissan Growth, local farm marketplace, fresh produce, direct from farmers, customer service Kissan Growth, connect with farmers, farm-to-table, Kissan Growth support, agriculture platform India, organic farm products, fresh vegetables, sustainable farming, India’s #1 farm online marketplace",
  };

}

const page = async () => {

  return (

    <ClientLayoutWrapper>
      <Breadcrumb title={"Contact Us"} />
      <Contact />
    </ClientLayoutWrapper>

  );

};

export default page;
