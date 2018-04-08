import React from 'react';
import PropTypes from 'prop-types';
import NavBarContainer from '../containers/NavBarContainer';
import PaginationComponent from '../components/PaginationComponent';
import CardListContainer from '../containers/CardListContainer';

const AppComponent = ({
  totalPages,
  btwnSlashNPage,
  pageNumFromUrl,
  _idArrForPage,
}) => (
  <div>
    <NavBarContainer {...{ btwnSlashNPage }} />
    <PaginationComponent {...{ totalPages, btwnSlashNPage, pageNumFromUrl }} />
    <CardListContainer {...{ _idArrForPage }} />
  </div>
);

AppComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  btwnSlashNPage: PropTypes.string.isRequired,
  pageNumFromUrl: PropTypes.number.isRequired,
  _idArrForPage: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AppComponent;
