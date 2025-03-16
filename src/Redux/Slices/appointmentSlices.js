import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

// Create appointment
export const createAppointment = createAsyncThunk(
  '/appointments/create',
  async (appointmentData) => {
    const promise = axiosInstance.post('/appointment/create-appointment', appointmentData);
    
    toast.promise(promise, {
      loading: 'Creating appointment...',
      success: 'Appointment created successfully!',
      error: 'Failed to create appointment'
    });

    const response = await promise;
    return response.data;
  }
);

// Get my appointments
export const getMyAppointments = createAsyncThunk(
  '/appointments/getMyAppointments',
  async () => {
    const promise = axiosInstance.get('/appointment/my-appointments');
    
    toast.promise(promise, {
      loading: 'Loading appointments...',
      success: 'Appointments loaded successfully!',
      error: 'Failed to load appointments'
    });

    const response = await promise
    console.log(response);
    return response.data.appointments;
  }
);

// Delete appointment
export const deleteAppointment = createAsyncThunk(
  '/appointments/delete/',
  async (appointmentId) => {
    const promise = axiosInstance.delete(`/delete-appointment/${appointmentId}`);
    
    toast.promise(promise, {
      loading: 'Deleting appointment...',
      success: 'Appointment deleted successfully!',
      error: 'Failed to delete appointment'
    });

    await promise;
    return appointmentId;
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get my appointments
      .addCase(getMyAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete appointment
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        );
      });
  },
});

export default appointmentSlice.reducer;
