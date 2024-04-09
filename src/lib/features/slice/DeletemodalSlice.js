// modalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDeleteOpen: false,
};

const DeletemodalSlice = createSlice({
  name: 'deletemodal',
  initialState,
  reducers: {
    toggleDeleteModal: (state) => {
      state.isDeleteOpen = !state.isDeleteOpen;
    },
  },
});

export const { toggleDeleteModal  } = DeletemodalSlice.actions;

export default DeletemodalSlice.reducer;
