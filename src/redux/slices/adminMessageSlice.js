import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// ✅ Fetch all admin messages
export const fetchAdminMessages = createAsyncThunk(
  "adminMessages/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/messages");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
    }
  }
);

// ✅ Create a new message
export const createAdminMessage = createAsyncThunk(
  "adminMessages/create",
  async ({ title, message, type }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admin/message", { title, message, type });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create message");
    }
  }
);

// ✅ Update a message
export const updateAdminMessage = createAsyncThunk(
  "adminMessages/update",
  async ({ id, title, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/message/${id}`, { title, message });
      return { id, title, message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update message");
    }
  }
);

// ✅ Delete a message
export const deleteAdminMessage = createAsyncThunk(
  "adminMessages/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/message/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete message");
    }
  }
);

const adminMessageSlice = createSlice({
  name: "adminMessages",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchAdminMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(createAdminMessage.fulfilled, (state, action) => {
        state.messages.unshift(action.payload);
      })
      .addCase(createAdminMessage.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateAdminMessage.fulfilled, (state, action) => {
        const index = state.messages.findIndex(msg => msg._id === action.payload.id);
        if (index !== -1) {
          state.messages[index] = { ...state.messages[index], ...action.payload };
        }
      })
      .addCase(updateAdminMessage.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteAdminMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(msg => msg._id !== action.payload);
      })
      .addCase(deleteAdminMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminMessageSlice.reducer;
