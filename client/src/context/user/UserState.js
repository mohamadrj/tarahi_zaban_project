import React, { useReducer } from 'react';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const UserState = (props) => {
  const initialState = {
    users: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const getallUsers = async () => {
    try {
      const res = await axios.get('/api/auth/allusers');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const deleteallUser = async (id) => {
    try {
      await axios.delete(`/api/auth/allUsers/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const updateallUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/auth/allusers/${user._id}`,
        user,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterUsers = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearUsers = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        filtered: state.filtered,
        error: state.error,

        setCurrent,
        clearCurrent,

        filterUsers,
        clearFilter,

        clearUsers,
        getallUsers,
        deleteallUser,
        updateallUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
