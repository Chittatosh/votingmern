import * as actions from '../common/actions';

describe('action creators', () => {

  it('requestState should create FETCH_INITIATE action', () => {
    expect(actions.fetchInitiate('newPoll')).toEqual({
      type: 'FETCH_INITIATE',
      fetchId: 'newPoll'
    });
  });

  it('fetchSuccess should create FETCH_SUCCESS action', () => {
    expect(actions.fetchSuccess( { _id: '0', x:4 } )).toEqual({
      type: 'FETCH_SUCCESS',
      body: { _id: '0', x:4 }
    });
  });

  it('fetchFailure should create FETCH_FAILURE action', () => {
    expect(actions.fetchFailure( 'JSON.parse: unexpected character at line 1 column 1 of the JSON data' )).toEqual({
      type: 'FETCH_FAILURE',
      message: 'JSON.parse: unexpected character at line 1 column 1 of the JSON data'
    });
  });

  it('submitSearch should create SUBMIT_SEARCH action', () => {
    expect(actions.submitSearch('xyz')).toEqual({
      type: 'SUBMIT_SEARCH',
      searchTerm: 'xyz'
    });
  });

  it('submitSearch should create ADD_ID action', () => {
    expect(actions.add_id('5a7')).toEqual({
      type: 'ADD_ID',
      _id: '5a7'
    });
  });

  it('submitSearch should create REMOVE_ID action', () => {
    expect(actions.remove_id('5a7')).toEqual({
      type: 'REMOVE_ID',
      _id: '5a7'
    });
  });

});
