import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
  USER_LOADED,
  LOGOUT,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loaduser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  const register = async (FormData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.post('/api/users', FormData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loaduser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const login = async (FormData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await axios.post('/api/auth', FormData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loaduser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const clearErrors = () =>
    dispatch({
      type: CLEAR_ERROR,
    });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loaduser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
