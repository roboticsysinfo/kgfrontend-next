import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all admins
export const fetchAdmins = createAsyncThunk("admins/fetchAdmins", async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data.admins;
});

// Create a new admin
export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admin/register", adminData);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete an admin
export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (adminId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/user/${adminId}`);
      return adminId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update an admin
export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async ({ adminId, adminData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/user/${adminId}`, adminData);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



// Fetch all help support tickets
export const fetchHelpSupportTickets = createAsyncThunk(
  "admins/fetchHelpSupportTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get-helpsupport-tickets");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch support tickets");
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    admins: [],
    supportTickets: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter((admin) => admin._id !== action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const updatedAdmin = action.payload;
        const index = state.admins.findIndex((admin) => admin._id === updatedAdmin._id);
        if (index !== -1) {
          state.admins[index] = updatedAdmin;
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Help Support Tickets
      .addCase(fetchHelpSupportTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHelpSupportTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.supportTickets = action.payload;
      })
      .addCase(fetchHelpSupportTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

  },
});

export default adminSlice.reducer;
