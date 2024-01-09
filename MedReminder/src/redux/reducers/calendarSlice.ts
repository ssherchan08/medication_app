import {createSlice} from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    date: new Date(),
    selectedDay: {
      date: new Date(),
      day: '',
      formatted: '',
      id: '',
    },
  },
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = {
        ...state.selectedDay, // Spread the existing state
        ...action.payload, // Merge new values, overwriting any existing fields
      };
    },
  },
});

export const {setSelectedDay} = calendarSlice.actions;

export default calendarSlice.reducer;
