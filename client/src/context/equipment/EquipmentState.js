import React, { useReducer } from 'react';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import EquipmentContext from './equipmentContext';
import equipmentReducer from './equipmentReducer';
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

const EquipmentState = (props) => {
  const initialState = {
    equipments: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(equipmentReducer, initialState);

  const getEquipments = async () => {
    try {
      const res = await axios.get('/api/equipments');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const addEquipment = async (equipment) => {
    //contact.id = uuid;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/equipments', equipment, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteEquipment = async (id) => {
    try {
      await axios.delete(`/api/equipments/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const updateEquipment = async (equipment) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/equipments/${equipment._id}`,
        equipment,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const setCurrent = (equipment) => {
    dispatch({ type: SET_CURRENT, payload: equipment });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterEquipments = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearEquipments = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <EquipmentContext.Provider
      value={{
        equipments: state.equipments,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addEquipment,
        deleteEquipment,
        setCurrent,
        clearCurrent,
        updateEquipment,
        filterEquipments,
        clearFilter,
        getEquipments,
        clearEquipments,
      }}
    >
      {props.children}
    </EquipmentContext.Provider>
  );
};

export default EquipmentState;
