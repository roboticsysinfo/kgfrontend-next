"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteDetails, updateSocialMedia } from "@/redux/slices/siteDeatilsSlice";
import { toast } from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";

const SocialMediaForm = () => {
    
    const dispatch = useDispatch();
    const siteDetails = useSelector((state) => state.siteDetails.data);
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);

    useEffect(() => {
        if (siteDetails?.socialMedia) {
            setSocialLinks(siteDetails.socialMedia);
        }
    }, [siteDetails]);

    // ✅ Handle Input Change
    const handleChange = (index, field, value) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index][field] = value;
        setSocialLinks(updatedLinks);
    };

    // ✅ Add New Social Media Field
    const addSocialMedia = () => {
        setSocialLinks([...socialLinks, { platform: "", url: "" }]);
    };

    // ✅ Remove Social Media Field
    const removeSocialMedia = (index) => {
        const updatedLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(updatedLinks);
    };

    // ✅ Submit Updated Social Media
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateSocialMedia(socialLinks))
            .then(() => toast.success("Social media updated!"))
            .catch(() => toast.error("Error updating social media"));
    };

    return (
        <div className="p-40 bg-white shadow rounded-lg border border-round">
            <h2 className="text-xl font-semibold mb-4">Update Social Media Links</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                {socialLinks.map((link, index) => (
                    <div key={index} className="mb-30 flex d-flex">
                        <input
                            type="text"
                            placeholder="Platform (e.g., Facebook, Twitter)"
                            value={link.platform}
                            onChange={(e) => handleChange(index, "platform", e.target.value)}
                            className="border p-10 rounded form-control w-1/3"
                            required

                        />
                        <input
                            type="url"
                            placeholder="Profile URL"
                            value={link.url}
                            onChange={(e) => handleChange(index, "url", e.target.value)}
                            className="border p-10 rounded form-control w-2/3"
                            required

                        />
                        <button
                            type="button"
                            onClick={() => removeSocialMedia(index)}
                            className="btn btn-danger btn-sm rounded"
                        >
                            <FaRegTrashAlt />
                        </button>
                    </div>
                ))}

                <hr />

                <div className="d-block justify-content-between">
                    <button type="button" onClick={addSocialMedia} className="btn btn-secondary rounded mb-30">
                        Add More
                    </button>

                    <button type="submit" className="btn btn-success rounded mb-30">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SocialMediaForm;
