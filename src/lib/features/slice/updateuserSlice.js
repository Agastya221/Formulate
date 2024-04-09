// updateuserSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const updateuserSlice = createSlice({
  name: 'updateuser',
  initialState,
  reducers: {
    updateUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { updateUsers } = updateuserSlice.actions;

export default updateuserSlice.reducer;
