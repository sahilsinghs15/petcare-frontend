import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
export const cancelAppointment = createAsyncThunk(
  '/appointments/cancel/',
  async (appointmentId) => {
    const promise = axiosInstance.patch(`/appointment/cancel-appointment/${appointmentId}`);
    
    toast.promise(promise, {
      loading: 'Cancelling appointment...',
      success: 'Appointment cancelled successfully!',
      error: 'Failed to cancel appointment'
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
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(
          (appointment) => appointment.id !== action.payload
        );
      });
  },
});

export default appointmentSlice.reducer;
