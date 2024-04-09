// modalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditModalOpen: false,
  userId: "",
};

const editmodalSlice = createSlice({
  name: 'editmodal',
  initialState,
  reducers: {
    toggleEditModal: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { toggleEditModal, setUserId  } = editmodalSlice.actions;

export default editmodalSlice.reducer;
