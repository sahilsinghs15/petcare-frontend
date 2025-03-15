import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Create appointment
export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData) => {
    const promise = axios.post('/api/appointments', appointmentData);
    
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
  'appointments/getMyAppointments',
  async () => {
    const promise = axios.get('/api/appointments/my-appointments');
    
    toast.promise(promise, {
      loading: 'Loading appointments...',
      success: 'Appointments loaded successfully!',
      error: 'Failed to load appointments'
    });

    const response = await promise;
    return response.data;
  }
);

// Delete appointment
export const deleteAppointment = createAsyncThunk(
  'appointments/delete',
  async (appointmentId) => {
    const promise = axios.delete(`/api/appointments/${appointmentId}`);
    
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
        state.appointments = action.payload;
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
