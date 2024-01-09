import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      username: '',
      password: '',
      userId: '',
      token: '',
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = {
        ...state.userData, // Spread the existing state
        ...action.payload, // Merge new values, overwriting any existing fields
      };
    },
    clearUserData: (state, action) => {
      state.userData = {};
    },
  },
});

export const {setUserData, clearUserData} = userSlice.actions;

export default userSlice.reducer;
