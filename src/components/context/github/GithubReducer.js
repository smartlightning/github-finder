
//alternative to useState 
// dispatch actions to 
const githubReducer = (state, action) =>{
    switch (action.type) {
      // case for getting all the users (testing purposes)
      case 'GET_USERS':
        return {
          // return current state
          ...state,
          //fill users array with users
          users: action.payload,
          loading: false,
        };
      case 'GET_USER_AND_REPOS':
        return {
          ...state,
          user: action.payload.user,
          repos: action.payload.repos,
          loading: false,
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: true,
        };
      // clear users from users array
      case 'CLEAR_USERS':
        return {
          ...state,
          users: [],
          loading: false,
        };
      default:
        return state;
    }
}
export default githubReducer