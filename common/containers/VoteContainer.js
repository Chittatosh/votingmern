import { connect } from 'react-redux';
import { thunkVote, thunkDelete } from '../actions';
import VoteComponent from '../components/VoteComponent';

const mapStateToProps = ({normPollObj, fbggId, isFetching, fetchError}, {_id}) => {
  const choiceNameArr = normPollObj[_id].choiceArr.map(choiceObj => choiceObj.choiceName);
  const deleteBool = normPollObj[_id].creatorId === fbggId;
  return { _id, choiceNameArr, fbggId, isFetching, deleteBool, fetchError };
};

const mapDispatchToProps = { thunkVote, thunkDelete };

const VoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteComponent);

export default VoteContainer;
