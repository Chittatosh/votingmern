import fetchError from '../common/reducer/fetchError';
import { fetchFailure, fetchInitiate } from '../common/actions';

describe('fetchError reducer', () => {

  it('should handle initial state', () => {
    expect(
      fetchError(undefined, {})
    ).toEqual('');
  });

  it('should handle FETCH_FAILURE', () => {
    expect(
      fetchError('', fetchFailure('JSON.parse: unexpected character at line 1 column 1 of the JSON data'))
    ).toEqual('JSON.parse: unexpected character at line 1 column 1 of the JSON data');
  });

  it('should handle FETCH_INITIATE', () => {
    expect(
      fetchError('message', fetchInitiate())
    ).toEqual('');
  });

});
