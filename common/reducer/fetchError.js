import { FETCH_FAILURE, FETCH_INITIATE } from '../actions/actionTypes';

const fetchError = (state = '', action) => {
  switch (action.type) {
    case FETCH_FAILURE:
      return action.message;
    case FETCH_INITIATE:
      return '';
    default:
      return state;
  }
};

export default fetchError;
