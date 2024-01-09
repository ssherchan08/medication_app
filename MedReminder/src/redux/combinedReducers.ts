import {combineReducers} from '@reduxjs/toolkit';
import calendarSlice from './reducers/calendarSlice';
import intakesSlice from './reducers/intakesSlice';
import userSlice from './reducers/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
  calendar: calendarSlice,
  intakes: intakesSlice,
});

export {rootReducer};
