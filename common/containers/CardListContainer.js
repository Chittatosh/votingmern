import { connect } from 'react-redux';
import CardListComponent from '../components/CardListComponent';

const mapStateToProps = ({fbggId, isFetching}, {_idsForPageArr}) => {
  return { _idsForPageArr, fbggId, isFetching };
};

const CardListContainer = connect(
  mapStateToProps
)(CardListComponent);

export default CardListContainer;
