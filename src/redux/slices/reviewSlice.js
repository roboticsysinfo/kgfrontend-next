import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


// ✅ Submit Review (Async Action)
export const submitReview = createAsyncThunk(

  "reviews/submitReview",
  async ({ shop_id, rating, comment }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/create_review",
        { shop_id, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error submitting review");
    }
  }
);


// ✅ Fetch Shop Reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (shop_id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/reviews/shop/${shop_id}`);
      return res.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching reviews");
    }
  }
);

// ✅ Fetch Shop Reviews by Shop ID
export const fetchReviewsbyShopId = createAsyncThunk(
  "reviews/fetchReviewsbyShopId",
  async (shop_id, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/review/${shop_id}`);

      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching reviews");
    }
  }
);


// ✅ Delete Review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.delete(`/delete_review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting review");
    }
  }
);

// ✅ Fetch Reviews by Customer ID
export const fetchReviewsByCustomerId = createAsyncThunk(
  "reviews/fetchReviewsByCustomerId",
  async (customerId, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get(`/reviews/${customerId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching customer reviews");
    }
  }
);

// --------------------------------------------

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      // ✅ Submit Review
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.reviews.push(action.payload.review);
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // ✅ Fetch Reviews (fetchReviews)
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Reviews by Shop ID (fetchReviewsbyShopId)
      .addCase(fetchReviewsbyShopId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsbyShopId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsbyShopId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Reviews by Customer ID
      .addCase(fetchReviewsByCustomerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByCustomerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(review => review._id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearMessage } = reviewSlice.actions;
export default reviewSlice.reducer;
