import {createSlice} from '@reduxjs/toolkit';

export const intakesSlice = createSlice({
  name: 'intakes',
  initialState: {
    pressedIntake: '',
    editedIntake: '',
    intakesForToday: {
      amount: '',
      dose: '',
      id: '',
      medType: '',
      name: '',
      reminder: '',
      reminderDays: [],
      takenOn: [],
      user: '',
    },
  },
  reducers: {
    pressOnIntake: (state, action) => {
      state.pressedIntake = action.payload;
    },
    editIntake: (state, action) => {
      state.editedIntake = action.payload;
    },
    setIntakesForToday: (state, action) => {
      state.intakesForToday = action.payload;
    },
  },
});

export const {pressOnIntake, editIntake, setIntakesForToday} =
  intakesSlice.actions;

export default intakesSlice.reducer;
