import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";


// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit, search, filter }) => {
    const response = await axiosInstance.get("/products", {
      params: { page, limit, search, filter },
    });
    return response.data;
  }
);


// Fetch product by ID
export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Fetch product by farmer ID
export const getProductByFarmerId = createAsyncThunk(
  "products/getProductByFarmerId",
  async (farmerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/farmer-products/${farmerId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch product"
      );
    }
  }
);


// Add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/create-product", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to add product"
      );
    }
  }
);


// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, shopData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/product/${id}`, shopData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);


// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/product/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete product"
      );
    }
  }
);


// Fetch products by Category ID
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/category/${categoryId}`);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    categoryProducts: [],
    productByFarmer: null,
    totalPages: 0,
    currentPage: 1,
    status: "idle",
    productcategoryStatus: "idle",
    error: null,
    addProductStatus: "idle",
    addProductError: null,
    fetchProductByFarmerStatus: "idle",
    deleteProductStatus: "idle",
    updateProductStatus: "idle",
    updateProductError: null,
    selectedProduct: null,
  },
  reducers: {
    resetAddProductState: (state) => {
      state.addProductStatus = "idle";
      state.addProductError = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch product by farmer ID
      .addCase(getProductByFarmerId.pending, (state) => {
        state.fetchProductByFarmerStatus = "loading";
      })
      .addCase(getProductByFarmerId.fulfilled, (state, action) => {
        state.fetchProductByFarmerStatus = "succeeded";
        state.productByFarmer = action.payload;
      })
      .addCase(getProductByFarmerId.rejected, (state, action) => {
        state.fetchProductByFarmerStatus = "failed";
        state.error = action.payload;
      })

      // Add product
      .addCase(addProduct.pending, (state) => {
        state.addProductStatus = "loading";
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatus = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = "failed";
        state.addProductError = action.payload;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.updateProductStatus = "loading";
        state.updateProductError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStatus = "succeeded";
        const index = state.data.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.selectedProduct = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStatus = "failed";
        state.updateProductError = action.payload;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductStatus = "succeeded";
        state.data = state.data.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductStatus = "failed";
        state.error = action.payload;
      })

      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.productcategoryStatus = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productcategoryStatus = "succeeded";
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.productcategoryStatus = "failed";
        state.error = action.payload;
      })

      // Fetch product by ID
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = "succeeded";
      });
  },
});

export const { resetAddProductState, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
