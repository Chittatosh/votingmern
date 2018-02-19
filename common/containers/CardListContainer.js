import { connect } from 'react-redux';
import CardListComponent from '../components/CardListComponent';

const mapStateToProps = ({fbggId, isFetching}, {_idArrForPage}) => {
  return { _idArrForPage, fbggId, isFetching };
};

const CardListContainer = connect(
  mapStateToProps
)(CardListComponent);

export default CardListContainer;
