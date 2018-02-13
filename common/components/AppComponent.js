import React from 'react';
import PropTypes from 'prop-types';
import NavBarContainer from '../containers/NavBarContainer';
import PaginationComponent from '../components/PaginationComponent';
import CardListContainer from '../containers/CardListContainer';

const AppComponent = ({ pageCount, btwnSlashNPage, numFromUrl, _idsForPageArr }) => (
  <div>
    <NavBarContainer {...{btwnSlashNPage}} />
    <PaginationComponent {...{pageCount, btwnSlashNPage, numFromUrl}} />
    <CardListContainer {...{_idsForPageArr}} />
  </div>
);

AppComponent.propTypes = {
  pageCount: PropTypes.number.isRequired,
  btwnSlashNPage: PropTypes.string.isRequired,
  numFromUrl: PropTypes.number.isRequired,
  _idsForPageArr: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AppComponent;
