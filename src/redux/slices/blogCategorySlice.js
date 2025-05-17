import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

// Async Thunks
export const fetchBlogCategories = createAsyncThunk(
    "blogCategory/fetchBlogCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/blog-categories");
            return response.data;
        } catch (error) {
            toast.error("Failed to fetch categories!");
            return rejectWithValue(error.response?.data?.message || "Something went wrong!");
        }
    }
);

export const addBlogCategory = createAsyncThunk(
    "blogCategory/addBlogCategory",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstance.post("/add-blog-category", data);
            toast.success("Category added successfully!");
            dispatch(fetchBlogCategories()); // Refresh categories
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteBlogCategory = createAsyncThunk(
    "blogCategory/deleteBlogCategory",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/blog-category-delete/${id}`);
            toast.success("Category deleted successfully!");
            dispatch(fetchBlogCategories()); // Refresh categories
        } catch (error) {
            toast.error("Failed to delete category!");
            return rejectWithValue(error.response?.data);
        }
    }
);

// Slice
const blogCategorySlice = createSlice({
    name: "blogCategory",
    initialState: {
        blogcategories: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.blogcategories = action.payload;
            })
            .addCase(fetchBlogCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBlogCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBlogCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addBlogCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBlogCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBlogCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteBlogCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default blogCategorySlice.reducer;
