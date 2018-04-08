import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const PageNumComponent = ({ btwnSlashNPage, pageNumFromUrl, buttonText }) => {
  const linkNum = navText => {
    switch (navText) {
      case 'Next':
        return pageNumFromUrl + 1;
      case 'Previous':
        return pageNumFromUrl - 1;
      default:
        return buttonText;
    }
  };

  return (
    <NavLink
      activeStyle={{
        color: '#fff',
        background: '#007bff',
        borderColor: '#007bff',
      }}
      className="page-link"
      to={
        btwnSlashNPage === 'allpolls' &&
        pageNumFromUrl === 1 &&
        buttonText === '1'
          ? '/'
          : `/${btwnSlashNPage}page${linkNum(buttonText)}`
      }
    >
      {buttonText}
    </NavLink>
  );
};

PageNumComponent.propTypes = {
  btwnSlashNPage: PropTypes.string.isRequired,
  pageNumFromUrl: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PageNumComponent;
