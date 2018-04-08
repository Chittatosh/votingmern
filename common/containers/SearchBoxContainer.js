import { connect } from 'react-redux';
import SearchBoxComponent from '../components/SearchBoxComponent';
import { submitSearch } from '../actions';

const mapStateToProps = ({ searchTerm }) => ({ searchTerm });

const mapDispatchToProps = { submitSearch };

const SearchBoxContainer = connect(mapStateToProps, mapDispatchToProps)(
  SearchBoxComponent,
);

export default SearchBoxContainer;
