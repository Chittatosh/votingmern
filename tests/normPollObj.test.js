import normPollObj from '../common/reducer/normPollObj';
import { fetchSuccess } from '../common/actions';

describe('normPollObj reducer', () => {

  it('should handle initial state', () => {
    expect(
      normPollObj(undefined, {})
    ).toEqual({});
  });

  it('should handle FETCH_SUCCESS', () => {
    expect(
      normPollObj({
        0: { _id: '0', x: 2 }, 
        1: { _id: '1', x: 4 }
      }, fetchSuccess( { _id: '1', x: 8 }))
    ).toEqual({
      0: { _id: '0', x: 2 }, 
      1: { _id: '1', x: 8 }
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    expect(
      normPollObj({
        0: { _id: '0', x: 2 }, 
        1: { _id: '1', x: 4 }
      }, fetchSuccess({ _id: '2', x: 8 }))
    ).toEqual({
      0: { _id: '0', x: 2 }, 
      1: { _id: '1', x: 4 }, 
      2: { _id: '2', x: 8 }
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    expect(
      normPollObj({
        0: { _id: '0', x:'Title0', y:4, z: [0, 1, 2] }, 
        1: { _id: '1', x:'Title1', y:16, z: [1, 2] }, 
        2: { _id: '2', x:'Title2', y:64, z: [2, 3, 4, 5] }
      }, fetchSuccess( { _id: '1', x:'Title1', y:8, z: [1, 2, 3, 4, 5, 6] }))
    ).toEqual({
      0: { _id: '0', x:'Title0', y:4, z: [0, 1, 2] }, 
      1: { _id: '1', x:'Title1', y:8, z: [1, 2, 3, 4, 5, 6] }, 
      2: { _id: '2', x:'Title2', y:64, z: [2, 3, 4, 5] }
    });
  });

});
