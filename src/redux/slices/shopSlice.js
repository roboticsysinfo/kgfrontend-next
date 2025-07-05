import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance'; // Make sure axiosInstance is imported


// Thunks for fetching data
export const fetchShops = createAsyncThunk(
  'shop/fetchShops',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/farmer-shops", { params: { page, limit } });

      return response.data.data || [];  // Assuming the shops are inside the 'data' array
    } catch (error) {

      return rejectWithValue(error.message);  // Handle errors
    }
  }
);


export const fetchShopById = createAsyncThunk(
  'shop/fetchShopById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/farmer-shop/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Create shop
export const createShop = createAsyncThunk(
  'shop/createShop',
  async (shopData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/create-shop', shopData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Assuming the response contains the newly created shop
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Update shop
export const updateShop = createAsyncThunk(
  'shop/updateShop',
  async ({ id, shopData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/shop/${id}`, shopData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Returning updated shop data
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Delete shop
export const deleteShop = createAsyncThunk(
  'shop/deleteShop',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/shop/${id}`);
      return id; // Return shop ID to delete it from the state
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Get shops by category (preferred_buyers or pricing_preference)
export const getShopsByCategory = createAsyncThunk(
  'shop/getShopsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/shops/category?preferred_buyers=${category.preferred_buyers}&pricing_preference=${category.pricing_preference}`);
      return response.data; // Assuming the response contains the shops based on category
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Search shops by keyword, location, and category
export const searchShops = createAsyncThunk(
  'shop/searchShops',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { keyword, city_district, state, category } = searchParams;
      const response = await axiosInstance.get(`/shops/search?keyword=${keyword}&city_district=${city_district}&state=${state}&category=${category}`);
      return response.data; // Assuming the response contains the shops based on search
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);


export const fetchShopByShopId = createAsyncThunk(
  'shop/fetchShopByShopId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/shop/${id}`);

      return response.data.shop; // Ensure ki sirf shop object mile
    } catch (error) {

      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);


export const fetchProductsByShopId = createAsyncThunk(
  "shop/fetchProductsByShopId",
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/shop-products/${shopId}`
      );

      return response.data.data; // Assuming response contains products array
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);


// Fetch Shop by Location
export const fetchShopsByLocation = createAsyncThunk(
  "shop/fetchShopsByLocation",
  async (city_district, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/shop-by-location?city_district=${city_district}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shops"
      );
    }
  }
);


const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: [],
    shop: null,
    products: [],
    status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all shops
    builder
      .addCase(fetchShops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = action.payload || [];  // Ensure payload is valid
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Handle errors from rejected action
      });

    // Fetch shop by ID
    builder
      .addCase(fetchShopById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShopById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shop = action.payload;
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Handle errors from rejected action
      });

    // Create shop
    builder
      .addCase(createShop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops.push(action.payload); // Add new shop to the list
      })
      .addCase(createShop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    
    // Update shop
    builder
      .addCase(updateShop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.shops.findIndex((shop) => shop._id === action.payload._id);
        if (index !== -1) {
          state.shops[index] = action.payload; // Update the shop in the list
        }
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });


    // Delete shop
    builder
      .addCase(deleteShop.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = state.shops.filter((shop) => shop._id !== action.payload); // Remove deleted shop from the list
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Get shops by category
    builder
      .addCase(getShopsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = action.payload;
      })
      .addCase(getShopsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });


    // Search shops
    builder
      .addCase(searchShops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchShops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shops = action.payload;
      })
      .addCase(searchShops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

      
    // Get Shop by SHop id  
    builder
      .addCase(fetchShopByShopId.pending, (state) => {
        state.status = 'loading';
        state.shop = null; // ✅ Clear previous shop data
      })
      .addCase(fetchShopByShopId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shop = action.payload; // ✅ Redux state mein shop set karega
      })
      .addCase(fetchShopByShopId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });


    // Fetch products by shop ID
    builder
      .addCase(fetchProductsByShopId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByShopId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // ✅ Store products in state
      })
      .addCase(fetchProductsByShopId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

      builder
      .addCase(fetchShopsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload.shops || []; // Ensure shops is an array
        state.error = null;
      })
      .addCase(fetchShopsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    

  },
});

export default shopSlice.reducer;
