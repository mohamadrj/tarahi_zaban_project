import React, { useReducer } from 'react';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import IncomeContext from './incomeContext';
import incomeReducer from './incomeReducer';
import {
  ADD_INCOME,
  DELETE_INCOME,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_INCOME,
  FILTER_INCOMES,
  CLEAR_FILTER,
  INCOME_ERROR,
  GET_INCOMES,
  CLEAR_INCOMES,
} from '../types';

const IncomeState = (props) => {
  const initialState = {
    incomes: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(incomeReducer, initialState);

  const getIncomes = async () => {
    try {
      const res = await axios.get('/api/incomes');
      dispatch({ type: GET_INCOMES, payload: res.data });
    } catch (err) {
      dispatch({ type: INCOME_ERROR, payload: err.response.msg });
    }
  };

  const addIncome = async (income) => {
    //income.id = uuid;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/incomes', income, config);
      dispatch({ type: ADD_INCOME, payload: res.data });
    } catch (err) {
      dispatch({ type: INCOME_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`/api/incomes/${id}`);
      dispatch({ type: DELETE_INCOME, payload: id });
    } catch (err) {
      dispatch({ type: INCOME_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const updateIncome = async (income) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/incomes/${income._id}`, income, config);
      dispatch({ type: UPDATE_INCOME, payload: res.data });
    } catch (err) {
      dispatch({ type: INCOME_ERROR, payload: err.response.msg });
    }
    //dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  const setCurrent = (income) => {
    dispatch({ type: SET_CURRENT, payload: income });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterIncomes = (text) => {
    dispatch({ type: FILTER_INCOMES, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const clearIncomes = () => {
    dispatch({ type: CLEAR_INCOMES });
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes: state.incomes,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addIncome,
        deleteIncome,
        setCurrent,
        clearCurrent,
        updateIncome,
        filterIncomes,
        clearFilter,
        getIncomes,
        clearIncomes,
      }}
    >
      {props.children}
    </IncomeContext.Provider>
  );
};

export default IncomeState;
