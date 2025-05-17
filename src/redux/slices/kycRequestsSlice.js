// src/redux/slices/kycRequestsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance'

// Fetch KYC requests
export const fetchKYCRequests = createAsyncThunk("admin/fetchKYCRequests", async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }
  
    try {
      const response = await axiosInstance.get("/admin/kyc-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch KYC requests");
    }
  });

// Approve KYC request
export const approveKYCRequest = createAsyncThunk(
  "kycRequests/approveKYCRequest",
  async (id, { rejectWithValue }) => {
    try {


      const response = await axiosInstance.put(
        `/admin/kyc-request/approve/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



// Reject KYC request
export const rejectKYCRequest = createAsyncThunk(
  'kycRequests/rejectKYCRequest',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/kyc-request/reject/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const kycRequestsSlice = createSlice({
  name: 'kycRequests',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKYCRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKYCRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchKYCRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveKYCRequest.fulfilled, (state, action) => {
        state.data = state.data.filter((req) => req._id !== action.payload.id);
      })
      .addCase(rejectKYCRequest.fulfilled, (state, action) => {
        state.data = state.data.filter((req) => req._id !== action.payload.id);
      });
  },
});

export default kycRequestsSlice.reducer;
