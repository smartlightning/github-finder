const alertReducer = (state, action) => {
  switch (action.type) {
    // set alert that returns payload
    case 'SET_ALERT':
      return action.payload;

    // clears the alert banner
    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};
export default alertReducer;
