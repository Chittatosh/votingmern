import React from 'react';
import PropTypes from 'prop-types';
import PageNumComponent from './PageNumComponent';
import SearchBoxContainer from '../containers/SearchBoxContainer';

const PaginationComponent = ({
  totalPages,
  btwnSlashNPage,
  pageNumFromUrl,
}) => {
  const iteratorButton = (hiddenBool, buttonText) => {
    if (hiddenBool) {
      return (
        <li className="page-item disabled invisible">
          <a className="page-link">{buttonText}</a>
        </li> /*Maintains layout when hidden*/
      );
    }
    return (
      <li>
        <PageNumComponent
          className="page-item"
          {...{ btwnSlashNPage, pageNumFromUrl, buttonText }}
        />
      </li>
    );
  };
  const pagination = (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {iteratorButton(pageNumFromUrl === 1, 'Previous')}
        {Array.from(Array(totalPages).keys()).map(index => (
          <li key={index}>
            <PageNumComponent
              className="page-item"
              {...{
                btwnSlashNPage,
                pageNumFromUrl,
                buttonText: `${index + 1}`,
              }}
            />
          </li>
        ))}
        {iteratorButton(pageNumFromUrl === totalPages, 'Next')}
      </ul>
    </nav>
  );

  return (
    <div className="container mb-1">
      <div className="row">
        <div className="col-md">{pagination}</div>
        <div className="col-md">
          <SearchBoxContainer />
        </div>
      </div>
    </div>
  );
};

PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  btwnSlashNPage: PropTypes.string.isRequired,
  pageNumFromUrl: PropTypes.number.isRequired,
};

export default PaginationComponent;
