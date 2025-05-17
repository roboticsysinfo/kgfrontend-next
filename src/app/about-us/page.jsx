// src/app/about/page.jsx
import AboutSection from "@/components/AboutSection";
import AppInfoSection from "@/components/AppInfoSection";
import Breadcrumb from "@/components/Breadcrumb";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";


export async function generateMetadata() {

  return {

    title: "Kissan Growth: India’s #1 Farm Online Marketplace",

    description: "Kissan Growth, India’s #1 Farm Online Marketplace connecting local farmers and consumers.",
    keywords:

      "Kissan Growth, fresh produce, buy from farmers, organic fruits and vegetables, local farm marketplace",
  };
}


const AboutPage = async () => {

  return (

    <ClientLayoutWrapper>
      <Breadcrumb title={"About Kissan Growth"} />
      <AboutSection />
      {/* <AppInfoSection /> */}
    </ClientLayoutWrapper>

  );

};

export default AboutPage;
