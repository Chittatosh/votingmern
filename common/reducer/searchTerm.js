import { SUBMIT_SEARCH } from '../actions/actionTypes';

const searchTerm = (state = '', action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return action.searchTerm;
    default:
      return state;
  }
};

export default searchTerm;
