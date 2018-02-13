import { FETCH_SUCCESS } from '../actions/actionTypes';

const normPollObj = (state = {}, action) => {
  switch (action.type) {
  case FETCH_SUCCESS:
    return Object.assign({}, state, {[action.body._id]: action.body});
  default:
    return state;
  }
};

export default normPollObj;
