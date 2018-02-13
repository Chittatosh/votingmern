import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const PageNumComponent = ({ btwnSlashNPage, numFromUrl, buttonText }) => {

  const linkNum = (buttonText) => {
    switch (buttonText) {
    case 'Next':
      return numFromUrl + 1;
    case 'Previous':
      return numFromUrl - 1;
    default:
      return buttonText;
    }
  };

  return (
    <NavLink 
      activeStyle={{
        color: '#fff',
        background: '#007bff',
        borderColor: '#007bff'
      }} 
      className="page-link" 
      to={
        btwnSlashNPage==='allpolls' && numFromUrl===1 && buttonText==='1'
          ? '/'
          : ('/' + btwnSlashNPage + 'page' + linkNum(buttonText))
      }
    >
      {buttonText}
    </NavLink>
  );

};

PageNumComponent.propTypes = {
  btwnSlashNPage: PropTypes.string.isRequired,
  numFromUrl: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default PageNumComponent;
