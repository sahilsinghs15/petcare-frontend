import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

// Create Order
export const createOrder = createAsyncThunk(
    'orders/create',
    async (orderData, { rejectWithValue }) => {
        return toast.promise(
            axiosInstance.post('/order/', orderData)
                .then(response => response.data)
                .catch(error => {
                    throw rejectWithValue(error.response.data);
                }),
            {
                loading: 'Creating your order...',
                success: 'Order placed successfully!',
                error: 'Failed to create order'
            }
        );
    }
);

// Get Order by ID
export const getOrderById = createAsyncThunk(
    'orders/getById',
    async (orderId, { rejectWithValue }) => {
        return toast.promise(
            axiosInstance.get(`/api/v1/orders/${orderId}`)
                .then(response => response.data)
                .catch(error => {
                    throw rejectWithValue(error.response.data);
                }),
            {
                loading: 'Fetching order details...',
                success: 'Order details loaded',
                error: 'Could not fetch order details'
            }
        );
    }
);

// Get User Orders
export const getUserOrders = createAsyncThunk(
    'orders/getUserOrders',
    async (_, { rejectWithValue }) => {
        return toast.promise(
            axiosInstance.get('/api/v1/order/orders')
                .then(response => response.data)
                .catch(error => {
                    throw rejectWithValue(error.response.data);
                }),
            {
                loading: 'Fetching your orders...',
                success: 'Orders loaded successfully',
                error: 'Failed to fetch orders'
            }
        );
    }
);

// Update Order Status (Admin)
export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async ({ orderId, orderStatus }, { rejectWithValue }) => {
        return toast.promise(
            axiosInstance.put(`/api/v1/orders/${orderId}`, { orderStatus })
                .then(response => response.data)
                .catch(error => {
                    throw rejectWithValue(error.response.data);
                }),
            {
                loading: 'Updating order status...',
                success: 'Order status updated!',
                error: 'Failed to update order status'
            }
        );
    }
);

// Delete Order (Admin)
export const deleteOrder = createAsyncThunk(
    'orders/delete',
    async (orderId, { rejectWithValue }) => {
        return toast.promise(
            axiosInstance.delete(`/api/v1/orders/${orderId}`)
                .then(response => response.data)
                .catch(error => {
                    throw rejectWithValue(error.response.data);
                }),
            {
                loading: 'Deleting order...',
                success: 'Order deleted successfully',
                error: 'Failed to delete order'
            }
        );
    }
);

// Get All Orders (Admin)
export const getAllOrders = createAsyncThunk(
    'orders/getAll',
    async (_, { rejectWithValue }) => {
        return toast.promise(
            axiosInstance.get('/api/v1/orders')
                .then(response => response.data)
                .catch(error => {
                    throw rejectWithValue(error.response.data);
                }),
            {
                loading: 'Fetching all orders...',
                success: 'All orders loaded',
                error: 'Failed to fetch orders'
            }
        );
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
        resetOrderSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentOrder = action.payload.order;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Order creation failed';
            })

            // Get Order by ID
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload.order;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch order';
            })

            // Get User Orders
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch user orders';
            })

            // Update Order Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentOrder = action.payload.order;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update order status';
            })

            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.orders = state.orders.filter(order => order._id !== action.meta.arg);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to delete order';
            })

            // Get All Orders
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch all orders';
            });
    }
});

export const { clearOrderError, resetOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer;