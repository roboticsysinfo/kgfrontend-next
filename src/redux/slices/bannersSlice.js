import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const fetchBanners = createAsyncThunk("banners/fetchBanners", async () => {
    const response = await axiosInstance.get("/site-details/banners");
    return response.data;
});

export const addBanner = createAsyncThunk("banners/addBanner", async (formData) => {

    const response = await axiosInstance.post("/site-details/add-banner", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
});


export const updateBanner = createAsyncThunk("banners/updateBanner", async ({ bannerId, formData }) => {
    
    const response = await axiosInstance.put(`/site-details/update-banner/${bannerId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
});

export const deleteBanner = createAsyncThunk("banners/deleteBanner", async (bannerId) => {
    await axiosInstance.delete(`/site-details/delete-banner/${bannerId}`, {
    });
    return bannerId;
});

const bannersSlice = createSlice({
    name: "banners",
    initialState: {
        banners: [],
        status: "idle",
        error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.banners = action.payload;
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addBanner.fulfilled, (state, action) => {
                state.banners.push(action.payload);
            })
            .addCase(updateBanner.fulfilled, (state, action) => {
                const index = state.banners.findIndex(b => b._id === action.payload._id);
                if (index !== -1) {
                    state.banners[index] = action.payload;
                }
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.banners = state.banners.filter(b => b._id !== action.payload);
            });

    }
});

export default bannersSlice.reducer;
