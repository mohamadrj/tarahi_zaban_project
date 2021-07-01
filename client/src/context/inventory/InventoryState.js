import React, { useReducer } from 'react';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import InventoryContext from './inventoryContext';
import inventoryReducer from './inventoryReducer';
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

const InventoryState = (props) => {
  const initialState = {
    inventorys: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const getInventorys = async () => {
    try {
      const res = await axios.get('/api/inventorys');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const addInventory = async (inventory) => {
    //contact.id = uuid;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/inventorys', inventory, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`/api/inventorys/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const updateInventory = async (inventory) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/inventorys/${inventory._id}`,
        inventory,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const setCurrent = (inventory) => {
    dispatch({ type: SET_CURRENT, payload: inventory });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterInventorys = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearInventorys = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <InventoryContext.Provider
      value={{
        inventorys: state.inventorys,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addInventory,
        deleteInventory,
        setCurrent,
        clearCurrent,
        updateInventory,
        filterInventorys,
        clearFilter,
        getInventorys,
        clearInventorys,
      }}
    >
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryState;
