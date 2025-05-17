// src/components/ClientLayoutWrapper.jsx
"use client";

import Preloader from "@/helper/Preloader";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "@/helper/ColorInit";
import HeaderOne from "@/components/HeaderOne";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import BottomFooter from "@/components/BottomFooter";
import ShippingOne from "@/components/ShippingOne";


const ClientLayoutWrapper = ({ children }) => {

  return (

    <>
      <ColorInit color={true} />
      <ScrollToTop smooth color="#FA6400" />
      <Preloader />
      <HeaderOne  />
      
      {children}
      <ShippingOne />
      <FooterOne />
      <BottomFooter />
    </>
    
  );

};

export default ClientLayoutWrapper;
