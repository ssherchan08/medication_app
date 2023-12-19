const initialState = {
  date: new Date(),
  selectedDay: null,
};

const calendarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SELECTED_DAY':
      return {
        ...state,
        selectedDay: {...action.payload},
      };
    default:
      return state;
  }
};

export default calendarReducer;
