import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // initialise the state
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };
  // trigger state changes
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search all users
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    // fetch data from the Github API and search by user
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token${GITHUB_TOKEN}`,
      },
    });
    // destructure the return from from Github api to get all users
    const { items } = await response.json();
    // update the state for users  with new data we get from the api call
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // get single user
  const getUser = async (login) => {
    setLoading();

    // fetch data from the Github API and get user
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token${GITHUB_TOKEN}`,
      },
    });
    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const clearUsers = async () =>
    dispatch({
      // get current state of reducer type Clear users
      type: 'CLEAR_USERS',
    });

  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    });

  return (
    <GithubContext.Provider
      //global state for whole application to access
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
