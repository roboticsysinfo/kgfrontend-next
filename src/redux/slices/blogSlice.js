import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// Fetch all blogs
// export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (_, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.get("/blogs");
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to fetch blogs");
//     }
// });

// Fetch blogs with pagination

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/blogs?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch blogs");
    }
});



// Create a new blog
export const createBlog = createAsyncThunk("blogs/createBlog", async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/add_blog", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to create blog");
    }
});

// Update an existing blog
export const updateBlog = createAsyncThunk("blogs/updateBlog", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/update-blog/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update blog");
    }
});

// Delete a blog
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id, { rejectWithValue }) => {
    try {

        await axiosInstance.delete(`/delete-blog/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete blog");
    }
});

// Fetch a single blog by ID
export const fetchBlogById = createAsyncThunk("blogs/fetchBlogById", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/blog/${id}`);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch blog");
    }
});

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        blogDetails: null,
        blogloading: false,
        blogError: null,
        totalBlogs: 0,
        totalPages: 1,
        currentPage: 1, // Default Page 1
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchBlogs.pending, (state) => {
                state.blogloading = true;
                state.blogError = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.blogloading = false;
                state.blogs = action.payload.blogs;
                state.totalBlogs = action.payload.totalBlogs;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.blogloading = false;
                state.blogError = action.payload;
            })

            // .addCase(fetchBlogs.pending, (state) => {
            //     state.blogloading = true;
            //     state.blogError = null;
            // })
            // .addCase(fetchBlogs.fulfilled, (state, action) => {
            //     state.blogloading = false;
            //     state.blogs = action.payload;
            // })
            // .addCase(fetchBlogs.rejected, (state, action) => {
            //     state.blogloading = false;
            //     state.blogError = action.payload;
            // })
            
            .addCase(createBlog.fulfilled, (state, action) => {
                state.blogs.unshift(action.payload.blog);
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const index = state.blogs.findIndex(blog => blog._id === action.payload.blog._id);
                if (index !== -1) {
                    state.blogs[index] = action.payload.blog;
                }
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
            })

            .addCase(fetchBlogById.pending, (state) => {
                state.blogloading = true;
                state.blogError = null;
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.blogloading = false;
                state.blogDetails = action.payload;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.blogloading = false;
                state.blogError = action.payload;
            })

    },
});

export default blogSlice.reducer;
