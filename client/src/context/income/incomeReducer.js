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

export default (state, action) => {
  switch (action.type) {
    case ADD_INCOME:
      return {
        ...state,
        incomes: [action.payload, ...state.incomes],
        loading: false,
      };
    case UPDATE_INCOME:
      return {
        ...state,
        incomes: state.incomes.map((income) =>
          income._id === action.payload._id ? action.payload : income
        ),
        loading: false,
      };
    case DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter(
          (income) => income._id !== action.payload
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_INCOMES:
      return {
        ...state,
        filtered: state.incomes.filter((income) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return income.num.match(regex) || income.spend.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case INCOME_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_INCOMES:
      return {
        ...state,
        incomes: action.payload,
        loading: false,
      };
    case CLEAR_INCOMES:
      return {
        ...state,
        incomes: null,
        current: null,
        filtered: null,
        error: null,
      };
    default:
      return state;
  }
};
