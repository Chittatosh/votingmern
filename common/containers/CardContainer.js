import { connect } from 'react-redux';
import CardComponent from '../components/CardComponent';

const mapStateToProps = ({ normPollObj }, { _id }) => {
  const { pollTitle } = normPollObj[_id];
  return { pollTitle, _id };
};

const CardContainer = connect(mapStateToProps)(CardComponent);

export default CardContainer;
