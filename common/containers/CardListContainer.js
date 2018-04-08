import { connect } from 'react-redux';
import CardListComponent from '../components/CardListComponent';

const mapStateToProps = ({ fbggId, isFetching }, { _idArrForPage }) => ({
  _idArrForPage,
  fbggId,
  isFetching,
});

const CardListContainer = connect(mapStateToProps)(CardListComponent);

export default CardListContainer;
