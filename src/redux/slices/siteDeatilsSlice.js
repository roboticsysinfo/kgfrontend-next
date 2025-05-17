import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance"; // Axios instance


// ✅ Get Site Details API
export const fetchSiteDetails = createAsyncThunk("siteDetails/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/fetch-site-details");
        return response.data.siteDetails; 
    } catch (siteDetailsError) {
        return rejectWithValue(siteDetailsError.response?.data?.message || "siteDetailsError fetching site details");
    }
});


// update side logo
export const updateSiteLogo = createAsyncThunk(
    "siteDetails/updateLogo",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/site-details/logo", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            return response.data.siteLogo; // ✅ Ensure it updates with the correct string URL
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating site logo");
        }
    }
);


//  Update About Section (Fixed Payload Structure)
export const updateSiteAbout = createAsyncThunk(
    "siteDetails/updateAbout",
    async (aboutData, { rejectWithValue }) => {
        try {

            const formattedData = {
                title: aboutData.aboutTitle, 
                content: aboutData.aboutContent,
                footer_text: aboutData.footerContent
            };

            const response = await axiosInstance.put("/site-details/update-about", formattedData);



            return response.data;
        } catch (siteDetailsError) {
            return rejectWithValue(
                siteDetailsError.response?.data?.message || "Error updating about section"
            );
        }
    }
);
    

export const updateContactDetails = createAsyncThunk(
    "siteDetails/updateContact",
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/site-details/contact", contactData);

            return response.data.contactDetails; // ✅ Make sure it updates the Redux state correctly
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating contact details");
        }
    }
);


// ✅ Update Social Media Links
export const updateSocialMedia = createAsyncThunk(
    "siteDetails/updateSocialMedia",
    async (socialMediaData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/site-details/update-social-media", {
                socialMedia: socialMediaData, // Ensure it's an array
            });

            return response.data.socialMedia; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating social media links");
        }
    }
);


// update site banner
export const updateSiteBanner = createAsyncThunk(
    "site/updateSiteBanner",
    async (formData, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.put("/site-details/banner", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            return response.data.banners; // ✅ Ensure it returns updated banners
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating banner");
        }
    }
);


// ✅ Update Terms and Conditions
export const updateTermsAndConditions = createAsyncThunk(
    "siteDetails/updateTermsAndConditions",
    async (termsContent, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/update/site-termsconditions", { termsAndConditions: termsContent });
            return response.data.termsAndConditions;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating terms and conditions");
        }
    }
);

// ✅ Update Privacy Policy
export const updatePrivacyPolicy = createAsyncThunk(
    "siteDetails/updatePrivacyPolicy",
    async (privacyContent, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put("/update/site-privacypolicy", { privacyPolicy: privacyContent });
            return response.data.privacyPolicy;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating privacy policy");
        }
    }
);


// ✅ Slice (Reducer)
const siteDetailsSlice = createSlice({
    name: "siteDetails",
    initialState: {
        data: null, // API response
        siteDetailsLoading: false,
        siteDetailsError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSiteDetails.pending, (state) => {
                state.siteDetailsLoading = true;
            })
            .addCase(fetchSiteDetails.fulfilled, (state, action) => {
                state.siteDetailsLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchSiteDetails.rejected, (state, action) => {
                state.siteDetailsLoading = false;
                state.siteDetailsError = action.payload;
            })
            .addCase(updateSiteAbout.fulfilled, (state, action) => {
                if (state.data) {
                    state.data.about = action.payload; // About section update
                }
            })
            .addCase(updateSiteLogo.fulfilled, (state, action) => {
                if (state.data) {
                    state.data.siteLogo = action.payload; // Update logo in state
                }
            })
            .addCase(updateContactDetails.fulfilled, (state, action) => {
                if (state.data) {
                    state.data.contactDetails = action.payload; // Update logo in state
                }
            })
            .addCase(updateSocialMedia.fulfilled, (state, action) => {
                if (state.data) {
                    state.data.socialMedia = action.payload; // ✅ Update social media in state
                }
            })

            .addCase(updateSiteBanner.fulfilled, (state, action) => {
                if (state.data) {
                    state.data.banners = [...state.data.banners, ...action.payload]; // ✅ Append new banners
                }
            })

            .addCase(updateTermsAndConditions.fulfilled, (state, action) => {
                if (state.data) {
                    state.data.termsAndConditions = action.payload; // ✅ Update terms in state
                }
            })
            .addCase(updatePrivacyPolicy.fulfilled, (state, action) => {
                if (state.data) {
                    state.data.privacyPolicy = action.payload; // ✅ Update privacy in state
                }
            });
            

    }
});

export default siteDetailsSlice.reducer;
