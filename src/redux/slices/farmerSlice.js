import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';


// 🚜 Fetch All Farmers with pagination and search
export const fetchFarmers = createAsyncThunk(
  'farmers/fetchFarmers',
  async ({ page = 1, limit = 10, search = '' }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/farmers?page=${page}&limit=${limit}&search=${search}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch farmers');
    }
  }
);




// ✅ Update Farmer by ID (with file support)
export const updateFarmerById = createAsyncThunk(
  'farmers/updateFarmerById',
  async ({ farmerId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/farmer/update/${farmerId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.farmer;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update farmer');
    }
  }
);

// ✅ Delete Farmer by ID
export const deleteFarmerById = createAsyncThunk(
  'farmers/deleteFarmerById',
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/admin/delete-farmer/${farmerId}`);
      return { farmerId, message: res.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete farmer');
    }
  }
);

// ✅ Get Farmer by ID (Admin)
export const getFarmerByIdForAdmin = createAsyncThunk(
  'auth/getFarmerByIdForAdmin',
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/get/farmer-details/${farmerId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch farmer' });
    }
  }
);

// ✅ Get Farmer by ID (Customer view)
export const getFarmerDetailsById = createAsyncThunk(
  'auth/getFarmerDetailsById',
  async (farmerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/get/farmer-details/${farmerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch farmer' });
    }
  }
);

// ✅ Get Referral Detail
export const getFarmerReferralDetail = createAsyncThunk(
  'farmer/getFarmerReferralDetail',
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/farmer/referral-details/${farmerId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch referral detail');
    }
  }
);

// ✅ Get Point Transactions
export const fetchPointTransactions = createAsyncThunk(
  'pointTransactions/fetch',
  async (farmerId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/farmer/points-transaction/${farmerId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const farmersSlice = createSlice({
  name: 'farmers',
  initialState: {
    farmers: [],
    totalFarmers: 0,
    currentPage: 1,
    totalPages: 1,
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

      // 🔄 Fetch All Farmers
      .addCase(fetchFarmers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFarmers.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = action.payload.farmers; // array of farmers
        state.totalFarmers = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchFarmers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // 🔄 Update Farmer By ID
      .addCase(updateFarmerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFarmerById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedFarmer = action.payload;
        const index = state.farmers.findIndex(f => f._id === updatedFarmer._id);
        if (index !== -1) {
          state.farmers[index] = updatedFarmer;
        }
        state.farmerDetails = updatedFarmer;
      })
      .addCase(updateFarmerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Delete Farmer
      .addCase(deleteFarmerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFarmerById.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = state.farmers.filter(farmer => farmer._id !== action.payload.farmerId);
        if (state.farmerDetails?._id === action.payload.farmerId) {
          state.farmerDetails = null;
        }
      })
      .addCase(deleteFarmerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Referral Detail
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

      // 🔄 Point Transactions
      .addCase(fetchPointTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPointTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.pointsTransactions = action.payload;
      })
      .addCase(fetchPointTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })

      // 🔄 Get Farmer By ID (Admin)
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
        state.error = action.payload?.message || 'Failed to fetch farmer';
      })

      // 🔄 Get Farmer By ID (Customer)
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
        state.error = action.payload?.message || 'Failed to fetch farmer';
      });
  },
});

export default farmersSlice.reducer;
