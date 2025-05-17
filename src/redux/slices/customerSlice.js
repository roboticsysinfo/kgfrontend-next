import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


// Async thunk to fetch customer by ID
export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/customer/${customerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch customer");
    }
  }
);


// Async thunk to update customer details
export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ customerId, customerData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/update-customer/${customerId}`, customerData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update customer");
    }
  }
);


// Async thunk to get all customers
export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/all-customers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch customers");
    }
  }
);


// Async thunk to delete a customer
export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/delete-customer/${customerId}`);
      return { customerId };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete customer");
    }
  }
);

// fetch customer referral details
export const fetchCustomerReferralDetails = createAsyncThunk(
  "customer/fetchReferralDetails",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/customer/referral-details/${customerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch referral details");
    }
  }
);


// Async thunk to fetch customer points transactions
export const fetchCustomerPointsTransactions = createAsyncThunk(
  "customer/fetchPointsTransactions",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/customer/points-transaction/${customerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch points transactions");
    }
  }
);


const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: null,
    customers: [],
    referralDetails: null,
    pointsTransactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.customer;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(
          (cust) => cust._id !== action.payload.customerId
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch customer referral detials
      .addCase(fetchCustomerReferralDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerReferralDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.referralDetails = action.payload;
      })
      .addCase(fetchCustomerReferralDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch customer points transactions
      .addCase(fetchCustomerPointsTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerPointsTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.pointsTransactions = action.payload;
      })
      .addCase(fetchCustomerPointsTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});


export default customerSlice.reducer;
