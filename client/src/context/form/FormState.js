import React, { useReducer } from 'react';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import FormContext from './formContext';
import formReducer from './formReducer';
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

const FormState = (props) => {
  const initialState = {
    forms: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const getallForms = async () => {
    try {
      const res = await axios.get('/api/forms/allforms');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const getForms = async () => {
    try {
      const res = await axios.get('/api/forms');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const addForm = async (form) => {
    //contact.id = uuid;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/forms', form, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteForm = async (id) => {
    try {
      await axios.delete(`/api/forms/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const deleteallForm = async (id) => {
    try {
      await axios.delete(`/api/forms/allforms/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const updateForm = async (form) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/forms/${form._id}`, form, config);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const updateallForm = async (form) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/forms/allforms/${form._id}`,
        form,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const setCurrent = (form) => {
    dispatch({ type: SET_CURRENT, payload: form });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterForms = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearForms = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <FormContext.Provider
      value={{
        forms: state.forms,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addForm,
        deleteForm,
        setCurrent,
        clearCurrent,
        updateForm,
        filterForms,
        clearFilter,
        getForms,
        clearForms,
        getallForms,
        deleteallForm,
        updateallForm,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormState;
