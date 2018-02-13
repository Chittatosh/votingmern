import React from 'react';
import PropTypes from 'prop-types';
import CardContainer from '../containers/CardContainer';

const alert = message =>
  <div className="card alert alert-primary alert-dismissible fade show" role="alert">
    {message}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>;

const CardListComponent = ({ _idsForPageArr, fbggId, isFetching }) => (
  <div className="card-columns">
    {!fbggId && alert('Sign in to create new polls or to add new choices to existing polls!')}
    {isFetching==='newpoll_id' && alert('Fetching...')}
    {_idsForPageArr.map(_id => 
      <CardContainer key={_id} {...{_id}}/>
    )}
  </div>
);

CardListComponent.propTypes = {
  _idsForPageArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  fbggId: PropTypes.string.isRequired,
  isFetching: PropTypes.string.isRequired
};

export default CardListComponent;
