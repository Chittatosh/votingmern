import { connect } from 'react-redux';
import NewPollComponent from '../components/NewPollComponent';
import { thunkNewPoll } from '../actions';

const mapStateToProps = ({ poll_idArr, normPollObj }) => {
  const pollTitleArr = poll_idArr.map(_id => normPollObj[_id].pollTitle);
  return { pollTitleArr };
};

const mapDispatchToProps = { thunkNewPoll };

const NewPollContainer = connect(mapStateToProps, mapDispatchToProps)(
  NewPollComponent,
);

export default NewPollContainer;
