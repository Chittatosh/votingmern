import { combineReducers } from 'redux';
import poll_idArr from './poll_idArr';
import normPollObj from './normPollObj';
import fbggId from './fbggId';
import displayName from './displayName';
import isFetching from './isFetching';
import fetchError from './fetchError';
import searchTerm from './searchTerm';

const reducer = combineReducers({
  poll_idArr,
  normPollObj,
  fbggId, 
  displayName,
  isFetching,
  fetchError,
  searchTerm
});

export default reducer;
