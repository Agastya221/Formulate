// formSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: [],
  isSubmitting: false,
  submitError: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    },
    resetFormState: (state) => {
      state.formData = null;
      state.isSubmitting = false;
      state.submitError = null;
    },
  },
});

export const { setFormData, setSubmitting, setSubmitError, resetFormState } = formSlice.actions;

// Export the reducer
export default formSlice.reducer;
