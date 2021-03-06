import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MyButtonComponent = ({ myPollsBool, fbggId }) => (
  <NavLink
    className={`btn btn-block btn-${myPollsBool ? 'warning' : 'success'} m-1`}
    to={myPollsBool ? '/allpollspage1' : `/mypolls${fbggId}page1`}
  >
    {myPollsBool ? (
      <div>
        <i className="fas fa-hand-point-left" /> Back to All Polls
      </div>
    ) : (
      'Show My Polls'
    )}
  </NavLink>
);

MyButtonComponent.propTypes = {
  myPollsBool: PropTypes.bool.isRequired,
  fbggId: PropTypes.string.isRequired,
};

export default MyButtonComponent;
