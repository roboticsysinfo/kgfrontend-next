"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteDetails, updateSiteLogo } from "@/redux/slices/siteDeatilsSlice";

const SiteLogoForm = () => {
    
    const dispatch = useDispatch();
    const { data: siteDetails, siteDetailsLoading } = useSelector((state) => state.siteDetails);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);

    const handleFileChange = (e) => {
        setLogo(e.target.files[0]); // Store selected file
    };

    const handleUpload = () => {
        if (!logo) {
            alert("Please select a logo to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("siteLogo", logo);

        dispatch(updateSiteLogo(formData));
    };

    return (
        
        <div className="logo-uploader p-40 border">

            <h4>Update Site Logo</h4>

            <hr />

            {/* Show current logo */}
            {siteDetails?.siteLogo && <img src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${siteDetails.siteLogo}`} alt="Site Logo" width="100" />}

            <div className="row">
                <input type="file" onChange={handleFileChange} accept="image/*" className="form-control"/>
                <button className="btn btn-success" onClick={handleUpload} disabled={siteDetailsLoading}>
                    {siteDetailsLoading ? "Uploading..." : "Upload Logo"}
                </button>
            </div>


        </div>
    );
};

export default SiteLogoForm;
