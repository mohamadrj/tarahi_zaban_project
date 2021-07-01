import React, { useReducer } from 'react';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ProcessContext from './processContext';
import processReducer from './processReducer';
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

const ProcessState = (props) => {
  const initialState = {
    processs: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(processReducer, initialState);

  const getProcesss = async () => {
    try {
      const res = await axios.get('/api/processs');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const addProcess = async (process) => {
    //contact.id = uuid;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/processs', process, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteProcess = async (id) => {
    try {
      await axios.delete(`/api/processs/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const updateProcess = async (process) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/processs/${process._id}`,
        process,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const setCurrent = (process) => {
    dispatch({ type: SET_CURRENT, payload: process });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterProcesss = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearProcesss = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <ProcessContext.Provider
      value={{
        processs: state.processs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addProcess,
        deleteProcess,
        setCurrent,
        clearCurrent,
        updateProcess,
        filterProcesss,
        clearFilter,
        getProcesss,
        clearProcesss,
      }}
    >
      {props.children}
    </ProcessContext.Provider>
  );
};

export default ProcessState;
