import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Thunks
export const fetchRedeemProducts = createAsyncThunk(
  'redeemProducts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/redeem-products');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createRedeemProduct = createAsyncThunk(
  'redeemProducts/create',
  async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/add-redeem-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateRedeemProduct = createAsyncThunk(
  'redeemProducts/update',
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/update-redeem-product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteRedeemProduct = createAsyncThunk(
  'redeemProducts/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/delete-redeem-product/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


// Thunk to fetch redeem product history for farmers
export const fetchRedeemProductHistory = createAsyncThunk(
  'redeemProducts/fetchHistory',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/farmer/redeem-product-history');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);



// Slice
const redeemProductSlice = createSlice({
  name: 'redeemProducts',
  initialState: {
    products: [],
    redemptionHistory: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRedeemProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRedeemProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchRedeemProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRedeemProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      .addCase(updateRedeemProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(deleteRedeemProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      })

      .addCase(fetchRedeemProductHistory.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRedeemProductHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.redemptionHistory = action.payload;
      })
      .addCase(fetchRedeemProductHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  }
});


export default redeemProductSlice.reducer;
