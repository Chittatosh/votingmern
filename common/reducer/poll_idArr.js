import { ADD_ID, REMOVE_ID } from '../actions/actionTypes';

const poll_idArr = (state = [], action) => {
  switch (action.type) {
    case ADD_ID:
      return [action._id, ...state];
    case REMOVE_ID:
      return state.filter(item => item !== action._id);
    default:
      return state;
  }
};

export default poll_idArr;
