import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import api from "@/utils/api";

// Create a request order
export const createRequestOrder = createAsyncThunk(
  "requestOrder/createRequestOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/request-order`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Fetch all farmer requests order request(Admin feature)
export const getFarmerRequests = createAsyncThunk(
  "requestOrder/getFarmerRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/order-requests`, { });

      return response.data.requests;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

// Fetch specific farmer's orders
export const getOrderRequestByFarmerId = createAsyncThunk(
  "requestOrder/getOrderRequestByFarmerId",
  async (farmerId, { rejectWithValue }) => {
    try {
      if (!farmerId) {
        return rejectWithValue("Farmer ID not found");
      }

      const response = await axiosInstance.get(
        `/order-requests/farmer/${farmerId}`,
        {}
      );

      return response.data.requests;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);


export const approveOrderRequest = createAsyncThunk(
  "requestOrder/approveOrderRequest",
  async (orderId, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.put(`/approve/${orderId}`, {

      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to approve order");
    }
  }
);


// Cancel Order Request
export const cancelOrderRequest = createAsyncThunk(
  "requestOrder/cancelOrderRequest",
  async (orderId, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.put(`/cancel/${orderId}`, {}, {
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to cancel order");
    }
  }
);


// Customer orders fetch karne ka async thunk
export const fetchCustomerOrders = createAsyncThunk(
  "orders/fetchCustomerOrders",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/my-orders`, {
      });

      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// --------------------------------------------------------

const requestOrderSlice = createSlice({
  name: "requestOrder",
  initialState: {
    requests: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createRequestOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequestOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload.request);
        state.successMessage = action.payload.message;
      })
      .addCase(createRequestOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all farmer requests (Admin)
      .addCase(getFarmerRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFarmerRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(getFarmerRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get orders for a specific farmer
      .addCase(getOrderRequestByFarmerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderRequestByFarmerId.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(getOrderRequestByFarmerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveOrderRequest.fulfilled, (state, action) => {
        state.requests = state.requests.map((order) =>
          order._id === action.payload._id ? { ...order, status: "accepted" } : order
        );
      })

      // Cancel Order Request
      .addCase(cancelOrderRequest.fulfilled, (state, action) => {
        state.requests = state.requests.map((order) =>
          order._id === action.payload.requestOrder._id ? { ...order, status: "cancelled" } : order
        );
        state.successMessage = action.payload.message;
      })
      .addCase(cancelOrderRequest.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ======= Fetch Customer Order =====
      .addCase(fetchCustomerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.customerOrders = action.payload;
      })
      .addCase(fetchCustomerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearMessages } = requestOrderSlice.actions;
export default requestOrderSlice.reducer;
