import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import NewPollContainer from '../containers/NewPollContainer';
import MyButtonContainer from '../containers/MyButtonContainer';

const NavBarComponent = ({ idProvider, displayName, btwnSlashNPage }) => {
  const loggedIn = (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <button
        type="button"
        className="btn btn-block btn-primary m-1"
        data-toggle="modal"
        data-target="#NewPollComponent"
      >
        New Poll
      </button>
      <div
        className="modal fade"
        id="NewPollComponent"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <NewPollContainer />
      </div>
      <MyButtonContainer {...{ btwnSlashNPage }} />
      <a
        className={`btn btn-block btn-social btn-${idProvider} m-1`}
        href="/logout"
      >
        <span className={`fab fa-${idProvider}`} />Logout {displayName}
      </a>
    </div>
  );

  const loggedOut = (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {['facebook', 'google', 'twitter'].map(provider => (
        <a
          key={provider}
          className={`btn btn-block btn-social btn-${provider} m-1`}
          href={`/${provider}login`}
        >
          <span className={`fab fa-${provider}`} />
          {`Sign in with ${provider}`}
        </a>
      ))}
    </div>
  );

  const navbarBrand = (
    <NavLink className="navbar-brand" to="/">
      FCC Voting App
    </NavLink>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light mb-3">
      {navbarBrand}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {displayName ? loggedIn : loggedOut}
    </nav>
  );
};

NavBarComponent.propTypes = {
  idProvider: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  btwnSlashNPage: PropTypes.string.isRequired,
};

export default NavBarComponent;
