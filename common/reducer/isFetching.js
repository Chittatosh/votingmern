import {
  FETCH_INITIATE,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from '../actions/actionTypes';

const isFetching = (state = '', action) => {
  switch (action.type) {
    case FETCH_INITIATE:
      return action.fetchId;
    case FETCH_SUCCESS:
      return '';
    case FETCH_FAILURE:
      return '';
    default:
      return state;
  }
};

export default isFetching;
