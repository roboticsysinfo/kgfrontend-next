// src/components/AboutSection.jsx
import React from "react";
import Link from "next/link";
import { fetchSiteDetailsSSR } from "@/utils/server/fetchSiteDetails";

const AboutSection = async () => {

  const siteDetails = await fetchSiteDetailsSSR();

  if (!siteDetails) return <p>Failed to load site details</p>;

  return (
    
    <div className="container my-60 py-40">

      <h1 style={styles.heading}>
        {siteDetails?.about?.title || "No title"}
      </h1>

      <hr />

      <div
        className="page_content"
        dangerouslySetInnerHTML={{
          __html: siteDetails?.about?.content || "No content available",
        }}
      />

      <hr />
      
      <div className="row justify-content-center">
        <div className="dflexinpugroup justify-content-center mt-60">
          <Link href="/farmers" className="btn btn-lg btn-success">
            Find Farmer Shops
          </Link>
          <Link href="/farmer/register" className="btn btn-lg btn-success ms-3">
            Register as Farmer
          </Link>
        </div>
      </div>

    </div>
    
  );
};

const styles = {
  heading: {
    fontSize: 42,
    marginBottom: 30,
  },
};

export default AboutSection;
