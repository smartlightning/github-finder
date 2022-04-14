import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  // initialise the state
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  // trigger state changes
  const [state, dispatch] = useReducer(githubReducer, initialState);




  return (
    <GithubContext.Provider
      //global state for whole application to access
      value={{
        ...state,
        dispatch,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
