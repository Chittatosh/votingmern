import { connect } from 'react-redux';
import NewPollComponent from '../components/NewPollComponent';
import { thunkNewPoll } from '../actions';

const newPollInitState = {
  rowCount: 1,
  pollTitle: '',
  myChoice: '',
  choice1: '',
  choice2: '',
  choice3: ''
};

const mapStateToProps = ({poll_idArr, normPollObj }) => {
  const pollTitleArr = poll_idArr.map(_id => normPollObj[_id].pollTitle);
  return { pollTitleArr, newPollInitState };
};

const mapDispatchToProps = { thunkNewPoll };

const NewPollContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPollComponent);

export default NewPollContainer;
