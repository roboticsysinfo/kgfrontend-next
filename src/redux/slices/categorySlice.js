import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Define async thunks for API calls
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await  axiosInstance.get('/categories');
  return response.data;
});

export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (id) => {
  const response = await  axiosInstance.get(`/category/${id}`);
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (category) => {
  const response = await  axiosInstance.post('/category', category, {
    headers: { "Content-Type": "multipart/form-data" }, // Ensure proper headers for FormData
  });
  return response.data.category;
});

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, category }) => {
    const response = await  axiosInstance.put(`/category/${id}`, category, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Ensure the API returns the updated category object
  }
);


export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  await  axiosInstance.delete(`/category/${id}`);
  return id;
});

// Initial state
const initialState = {
  categories: [],
  category: null,
  status: 'idle',
  error: null,
};

// Create slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
