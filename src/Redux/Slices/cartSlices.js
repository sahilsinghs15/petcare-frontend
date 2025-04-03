import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

// Async thunks
export const addToCart = createAsyncThunk('/cart/addToCart', async ({productId,quantity}, { rejectWithValue }) => {
    
    const promise = axiosInstance.post(`/cart/add/${productId}`, {quantity});
    toast.promise(promise, {
      loading: 'Item getting added to the cart...',
      success: 'Item Added to the Cart successfully!',
      error: 'Failed to Add in the Cart'
    });
    
    const response = await promise;
    console.log("Cart :",response);
    return response.data.data;  
    
});

export const updateCartItem = createAsyncThunk('/cart/updateCartItem', async ({ productId, quantity }, { rejectWithValue }) => {
    
    const promise = axiosInstance.put(`/cart/update/${productId}`, { quantity });
    toast.promise(promise, {
          loading: 'Updating Cart...',
          success: 'Updated Cart successfully!',
          error: 'Failed to Update Cart appointment'
        });
    
        const response = await promise;
        console.log("Updated cart :",response.data);
        return response.data.data;
});

export const removeFromCart = createAsyncThunk('/cart/removeFromCart', async (productId, { rejectWithValue }) => {
    
    const promise = axiosInstance.delete(`/cart/delete/${productId}`);
    toast.promise(promise, {
      loading: 'Removing Item From the Cart...',
      success: 'Item Removed from the cart successfully!,Reload The Page!',
      error: 'Failed to Removing item from the cart'
    });

    await promise;
    return productId;
});

export const getCart = createAsyncThunk('/cart/getCart', async (_, { rejectWithValue }) => {
    
    const promise = axiosInstance.get('/cart/');
    toast.promise(promise, {
      loading: 'Loading Cart...',
      success: 'Cart Loaded successfully!',
      error: 'Failed to Load the Cart'
    });
    
    const response = await promise;
    console.log(response.data);
    return response.data.data;
});

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export default cartSlice.reducer;
