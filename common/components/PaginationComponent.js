import React from 'react';
import PropTypes from 'prop-types';
import PageNumComponent from './PageNumComponent';
import SearchBoxContainer from '../containers/SearchBoxContainer';

const PaginationComponent = ({ pageCount, btwnSlashNPage, numFromUrl }) => {

  const iteratorButton = (hiddenBool, buttonText) =>
    hiddenBool 
      ?
      <li className="page-item disabled invisible">
        <a className="page-link">{buttonText}</a>
      </li>/*Maintains layout when hidden*/
      :
      <PageNumComponent 
        className="page-item"
        {...{btwnSlashNPage, numFromUrl, buttonText}} 
      />;

  const pagination = 
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {iteratorButton(numFromUrl===1, 'Previous')}
        {Array.from(Array(pageCount).keys()).map(index => 
          <PageNumComponent 
            key={index} 
            className="page-item"
            {...{btwnSlashNPage, numFromUrl, buttonText: ''+(index+1)}} 
          />
        )}
        {iteratorButton(numFromUrl===pageCount, 'Next')}
      </ul>
    </nav>;

  return (
    <div className="container mb-1">
      <div className="row">
        <div className="col-md">
          {pagination}
        </div>
        <div className="col-md">
          <SearchBoxContainer />
        </div>
      </div>
    </div>
  );
};

PaginationComponent.propTypes = {
  pageCount: PropTypes.number.isRequired,
  btwnSlashNPage: PropTypes.string.isRequired,
  numFromUrl: PropTypes.number.isRequired
};

export default PaginationComponent;
