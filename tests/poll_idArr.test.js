import poll_idArr from '../common/reducer/poll_idArr';
import { add_id, remove_id } from '../common/actions';

describe('poll_idArr reducer', () => {

  it('should handle initial state', () => {
    expect(
      poll_idArr(undefined, {})
    ).toEqual([]);
  });

  it('should handle ADD_ID', () => {
    expect(
      poll_idArr(['0', '1'], add_id('4'))
    ).toEqual(['4', '0', '1']);
  });

  it('should handle REMOVE_ID', () => {
    expect(
      poll_idArr(['8', '2', '6', '4'], remove_id('6'))
    ).toEqual(['8', '2', '4']);
  });

});
