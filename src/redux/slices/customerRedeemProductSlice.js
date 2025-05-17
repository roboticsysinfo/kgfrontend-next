import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Thunks
export const fetchCustomerRedeemProducts = createAsyncThunk(
  'redeemProducts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/get/customer/redeem-products');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addCustomerRedeemProduct = createAsyncThunk(
  'redeemProducts/create',
  async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/customer/add-redeem-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateCustomerRedeemProduct = createAsyncThunk(
  'redeemProducts/update',
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/customer/update-redeem-product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCustomerRedeemProduct = createAsyncThunk(
  'redeemProducts/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/customer/delete-redeem-product/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Thunk to fetch redeem product history for farmers
export const fetchCustomerRedeemProductHistory = createAsyncThunk(
  'redeemProducts/fetchHistory',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/get/customer/redeem-product-history');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Slice
const customerRedeemProductSlice = createSlice({
  name: 'customerRedeemProducts',
  initialState: {
    rcproducts: [],
    c_redemptionHistory: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCustomerRedeemProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCustomerRedeemProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.rcproducts = action.payload;
      })
      .addCase(fetchCustomerRedeemProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCustomerRedeemProduct.fulfilled, (state, action) => {
        state.rcproducts.unshift(action.payload);
      })

      .addCase(updateCustomerRedeemProduct.fulfilled, (state, action) => {
        const index = state.rcproducts.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.rcproducts[index] = action.payload;
        }
      })

      .addCase(deleteCustomerRedeemProduct.fulfilled, (state, action) => {
        state.rcproducts = state.rcproducts.filter(p => p._id !== action.payload);
      })

      .addCase(fetchCustomerRedeemProductHistory.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCustomerRedeemProductHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.c_redemptionHistory = action.payload;
      })
      .addCase(fetchCustomerRedeemProductHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default customerRedeemProductSlice.reducer;
