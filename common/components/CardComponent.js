import React from 'react';
import PropTypes from 'prop-types';
import PieContainer from '../containers/PieContainer';
import VoteContainer from '../containers/VoteContainer';

const CardComponent = ({ pollTitle, _id }) => (
  <div className="card bg-light">
    <PieContainer {...{ _id }} />
    <div className="card-body py-1">
      <h4 className="card-title">{pollTitle}</h4>
      <VoteContainer {...{ _id }} />
    </div>
  </div>
);

CardComponent.propTypes = {
  pollTitle: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export default CardComponent;
