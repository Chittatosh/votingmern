import { connect } from 'react-redux';
import PieComponent from '../components/PieComponent';

const mapStateToProps = ({normPollObj}, {_id}) => {
  const choiceArr = normPollObj[_id].choiceArr;
  const voteSum = normPollObj[_id].voteSum;
  return { _id, choiceArr, voteSum };
};

const PieContainer = connect(mapStateToProps)(PieComponent);

export default PieContainer;
