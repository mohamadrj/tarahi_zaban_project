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
        forms: [action.payload, ...state.forms],
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        forms: state.forms.map((form) =>
          form._id === action.payload._id ? action.payload : form
        ),
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        forms: state.forms.filter((form) => form._id !== action.payload),
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
        filtered: state.forms.filter((form) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return form.movid.match(regex);
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
        forms: action.payload,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        forms: null,
        current: null,
        filtered: null,
        error: null,
      };
    default:
      return state;
  }
};
