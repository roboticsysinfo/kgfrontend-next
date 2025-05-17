
import BottomFooter from "@/components/BottomFooter";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import KGMobileAppsSection from "@/components/KGMobileAppsSection";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {

  title: "Kissan Growth App: India’s #1 Farm Online Marketplace",
    description: "Download Kissan Growth – the leading farm marketplace app in India. Shop fresh fruits, vegetables, crops, and dairy directly from farmers.",
    keywords: "Kissan Growth, farm app India, buy from farmers, fresh produce app, local farm marketplace, organic fruits vegetables India, dairy products online, Indian farmers app, support local farmers, farm-to-table, sustainable farming India, direct from farm, agricultural marketplace, customer farmer app, farm fresh India, no middlemen"

  };


const page = () => {

  return (

    <>
      {/* Preloader */}
      <Preloader />

      {/* ScrollToTop */}
      <ScrollToTopInit color='#299E60' />

      {/* ColorInit */}
      <ColorInit color={false} />

      {/* HeaderOne */}
      <HeaderOne />

      <KGMobileAppsSection />

      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />
    </>
    
  );
};

export default page;
