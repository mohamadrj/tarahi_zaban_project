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

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        equipments: [action.payload, ...state.equipments],
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        equipments: state.equipments.map((equipment) =>
          equipment._id === action.payload._id ? action.payload : equipment
        ),
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        equipments: state.equipments.filter(
          (equipment) => equipment._id !== action.payload
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
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.equipments.filter((equipment) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return equipment.movid.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_CONTACTS:
      return {
        ...state,
        equipments: action.payload,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        equipments: null,
        current: null,
        filtered: null,
        error: null,
      };
    default:
      return state;
  }
};
