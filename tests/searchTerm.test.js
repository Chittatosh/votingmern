import searchTerm from '../common/reducer/searchTerm';
import { submitSearch } from '../common/actions';

describe('searchTerm reducer', () => {
  it('should handle initial state', () => {
    expect(searchTerm(undefined, {})).toEqual('');
  });

  it('should handle SUBMIT_SEARCH', () => {
    expect(searchTerm('', submitSearch('xyz'))).toEqual('xyz');
  });

  it('should handle SUBMIT_SEARCH', () => {
    expect(searchTerm('abc', submitSearch(''))).toEqual('');
  });
});
