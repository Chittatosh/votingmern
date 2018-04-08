import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';

import { thunkDelete, thunkVote, thunkNewPoll } from '../common/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Thunk async actions', () => {
  it('dispatches thunkDelete => dispatches FETCH_INITIATE and REMOVE_ID', () => {
    fetch.mockResponse(JSON.stringify({ _id: '4a8server' }));
    const expectedActions = [
      { type: 'FETCH_INITIATE', fetchId: 'Delet4a8client' },
      { type: 'REMOVE_ID', _id: '4a8server' },
    ];
    const store = mockStore({ todos: [] });
    return store.dispatch(thunkDelete('4a8client')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches thunkVote => dispatches FETCH_INITIATE and FETCH_SUCCESS', () => {
    fetch.mockResponse(JSON.stringify({ _id: '4a8server', arr: [0, 1] }));
    const expectedActions = [
      { type: 'FETCH_INITIATE', fetchId: 'Fetch4a8client' },
      { type: 'FETCH_SUCCESS', body: { _id: '4a8server', arr: [0, 1] } },
    ];
    const store = mockStore({ todos: [] });
    return store
      .dispatch(thunkVote('4a8client', { choiceNum: 'new', newChoice: 'chai' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches thunkVote => dispatches FETCH_INITIATE and FETCH_FAILURE', () => {
    fetch.mockResponse(JSON.stringify({ repeatVote: '4a8server' }));
    const expectedActions = [
      { type: 'FETCH_INITIATE', fetchId: 'Fetch4a8client' },
      { type: 'FETCH_FAILURE', message: '4a8server' },
    ];
    const store = mockStore({ todos: [] });
    return store
      .dispatch(thunkVote('4a8client', { choiceNum: 'new', newChoice: 'chai' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches thunkNewPoll => dispatches FETCH_INITIATE, FETCH_SUCCESS and ADD_ID', () => {
    fetch.mockResponse(JSON.stringify({ _id: '4a8server', arr: [0, 1] }));
    const expectedActions = [
      { type: 'FETCH_INITIATE', fetchId: 'newpoll_id' },
      { type: 'FETCH_SUCCESS', body: { _id: '4a8server', arr: [0, 1] } },
      { type: 'ADD_ID', _id: '4a8server' },
    ];
    const store = mockStore({ todos: [] });
    return store.dispatch(thunkNewPoll()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
