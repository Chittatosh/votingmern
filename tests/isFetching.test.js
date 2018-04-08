import isFetching from '../common/reducer/isFetching';
import { fetchInitiate, fetchSuccess, fetchFailure } from '../common/actions';

describe('isFetching reducer', () => {
  it('should handle initial state', () => {
    expect(isFetching(undefined, {})).toEqual('');
  });

  it('should handle FETCH_INITIATE', () => {
    expect(isFetching('', fetchInitiate('newpoll_id'))).toEqual('newpoll_id');
  });

  it('should handle FETCH_SUCCESS', () => {
    expect(
      isFetching(
        'newpoll_id',
        fetchSuccess({ _id: '1', x: 'Title1', y: 8, z: [1, 2, 3, 4, 5, 6] }),
      ),
    ).toEqual('');
  });

  it('should handle FETCH_FAILURE', () => {
    expect(isFetching('newpoll_id', fetchFailure('message'))).toEqual('');
  });
});
