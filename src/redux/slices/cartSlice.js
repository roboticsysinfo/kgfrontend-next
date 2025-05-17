import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        if (typeof window === 'undefined') return rejectWithValue("Not in browser");

        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/cart-items`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Fetch cart failed");
    }
});

// ✅ Add to Cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            if (typeof window === 'undefined') return rejectWithValue("Not in browser");

            const token = localStorage.getItem('token');

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/add-to-cart`,
                { productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return data.cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Add to cart failed");
        }
    }
);

// ✅ Remove from Cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, { rejectWithValue }) => {
    try {
        if (typeof window === 'undefined') return rejectWithValue("Not in browser");

        const token = localStorage.getItem('token');

        await axios.delete(`${process.env.NEXT_PUBLIC_API_URI}/remove-item/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return itemId;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Remove failed");
    }
});

// ✅ Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.items;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
            });
    },
});

export default cartSlice.reducer;
