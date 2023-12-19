import userReducer from './reducers/user';
import intakesReducer from './reducers/intakes';
import calendarReducer from './reducers/calendar';
import {combineReducers, createStore} from 'redux';

const store = createStore(
  combineReducers({
    user: userReducer,
    calendar: calendarReducer,
    intakes: intakesReducer,
  }),
);

export default store;
