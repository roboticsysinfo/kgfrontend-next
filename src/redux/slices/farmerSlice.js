// redux/farmersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';


export const fetchFarmers = createAsyncThunk('farmers/fetchFarmers', async () => {
  try {
    const response = await axiosInstance.get('/farmers');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});



// Get Farmer by ID (Separate state for farmer details)
export const getFarmerByIdForAdmin = createAsyncThunk(
  "auth/getFarmerByIdForAdmin",
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/farmer/getbyadmin/${farmerId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch farmer" });
    }
  }
);


// Get Farmer by ID (Separate state for farmer details)

export const getFarmerDetailsById = createAsyncThunk(
  "auth/getFarmerDetailsById",
  async (farmerId, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/get/farmer-details/${farmerId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch farmer" });
    }
  }
);



export const getFarmerReferralDetail = createAsyncThunk(

  "farmer/getFarmerReferralDetail",
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/farmer/referral-details/${farmerId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to fetch");
    }
  }

);


// 🔄 Thunk to fetch point transactions by farmerId
export const fetchPointTransactions = createAsyncThunk(
  "pointTransactions/fetch",
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/farmer/points-transaction/${farmerId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const farmersSlice = createSlice({
  
  name: 'farmers',
  initialState: {
    farmers: [],
    pointsTransactions: [],
    farmerDetails: null,
    farmerDetailsforCustomer: null,
    referralDetail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFarmers.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = action.payload;
      })
      .addCase(fetchFarmers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getFarmerReferralDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFarmerReferralDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.referralDetail = action.payload;
      })
      .addCase(getFarmerReferralDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPointTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPointTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.pointsTransactions = action.payload;
      })
      .addCase(fetchPointTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Get Farmer by ID (Separating from user)
      .addCase(getFarmerByIdForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFarmerByIdForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.farmerDetails = action.payload;
      })
      .addCase(getFarmerByIdForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch farmer";
      })

      // Get Farmer by ID (Separating from user)
      .addCase(getFarmerDetailsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFarmerDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.farmerDetailsforCustomer = action.payload;
      })
      .addCase(getFarmerDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch farmer";
      })


  },
});

export default farmersSlice.reducer;
