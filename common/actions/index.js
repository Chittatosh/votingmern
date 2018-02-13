import 'cross-fetch/polyfill';
import url from 'url';
import * as types from './actionTypes';
import serverConfig from '../../server/serverConfig';

const getUrl = endpoint => url.resolve(serverConfig.apiUrl, endpoint);

const getInit = (method, body) => ({
  method, 
  body: JSON.stringify(body), 
  headers: new Headers({'Content-Type': 'application/json'}),
  credentials: 'same-origin'
});

export const fetchInitiate = fetchId => ({type: types.FETCH_INITIATE, fetchId});

export const fetchSuccess = body => ({type: types.FETCH_SUCCESS, body});

export const fetchFailure = message => ({type: types.FETCH_FAILURE, message});

export const add_id = _id => ({type: types.ADD_ID, _id});

export const remove_id = _id => ({type: types.REMOVE_ID, _id});

export const submitSearch = searchTerm => ({type: types.SUBMIT_SEARCH, searchTerm});

export const thunkDelete = _id => dispatch => {
  dispatch(fetchInitiate('Delet'+_id));
  return fetch(getUrl('removepoll/'+_id), getInit('DELETE'))
    .then(res => res.json())
    .then(body => dispatch(remove_id(body._id)))
    .catch(err => dispatch(fetchFailure(err.message)));
};

export const thunkVote = (_id, {choiceNum, newChoice}) => dispatch => {
  const endpoint = choiceNum==='new' ? 'addchoice/' : 'incrementvote/';
  const choiceBody = choiceNum==='new' ? {newChoice} : {choiceNum};
  dispatch(fetchInitiate('Fetch'+_id));
  return fetch(getUrl(endpoint+_id), getInit('PUT', choiceBody))
    .then(res => res.json())
    .then(body => body.repeatVote 
      ? dispatch(fetchFailure(body.repeatVote))
      : dispatch(fetchSuccess(body)))
    .catch(err => dispatch(fetchFailure(err.message)));
};

export const thunkNewPoll = newPollObj => dispatch => {
  dispatch(fetchInitiate('newpoll_id'));
  return fetch(getUrl('newpoll'), getInit('POST', newPollObj))
    .then(res => res.json())
    .then(body => {
      dispatch(fetchSuccess(body));
      dispatch(add_id(body._id));
    })
    .catch(err => dispatch(fetchFailure(err.message)));
};
