import React from 'react';
import PropTypes from 'prop-types';

const notification = str =>
  <div className="RepeatVote alert alert-danger py-0" role="alert">
    {str}
  </div>;

class VoteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {choiceNum: '', newChoice: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const {_id, thunkVote} = this.props;
    thunkVote(_id, this.state);
    this.setState({choiceNum: '', newChoice: ''});
  }
  handleDelete(event) {
    event.preventDefault();
    const {_id, thunkDelete} = this.props;
    thunkDelete(_id);
  }
  render() {
    const { _id, choiceNameArr, fbggId, isFetching, deleteBool, fetchError} = this.props;
    const newChoiceTrimmed = this.state.newChoice && 
      this.state.newChoice.trim().replace(/\s+/g, ' ').toLowerCase();
    const itsAlreadyThere = newChoiceTrimmed && choiceNameArr.find(choiceName => 
      choiceName.toLowerCase() === newChoiceTrimmed
    );
    const newSubmit = 
      <div className="input-group">
        <input 
          type="text" 
          name="newChoice" 
          value={this.state.newChoice} 
          onChange={this.handleChange} 
          className="form-control"
          aria-label="New choice..." 
          placeholder="New choice..." 
          maxLength="30" 
          required
        />
        <span className="input-group-append">
          <input
            type="submit"
            className="btn btn-primary"
            value="Vote"
            disabled={!newChoiceTrimmed || itsAlreadyThere}
          />
        </span>
      </div>;

    const voteButton = 
      <input
        type="submit"
        value="Vote"
        disabled={!this.state.choiceNum}
        className="btn btn-primary btn-block"
      />;

    const deleteButton = 
      <button 
        onClick={this.handleDelete} 
        className="btn btn-danger btn-block" 
        type="button"
      >
        Delete Poll
      </button>;

    const voteNdelete = deleteBool
      ? 
      <div className="container">
        <div className="row">
          <div className="col-sm">
            {voteButton}
          </div>
          <div className="col-sm">
            {deleteButton}
          </div>
        </div>
      </div>
      :
      voteButton;

    return (
      <form className="position-relative" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <select 
            className="form-control" 
            name="choiceNum" 
            value={this.state.choiceNum} 
            onChange={this.handleChange} 
            required
          >
            <option value="">Select your choice</option>
            {choiceNameArr.map((choiceName, index) => 
              <option key={index} value={index+1}>{choiceName}</option>
            )}
            {fbggId && <option value="new">Add a new choice and vote for it</option>}
          </select>
        </div>
        {this.state.choiceNum==='new' ? newSubmit : voteNdelete}
        {(isFetching.slice(5)===_id) && (notification(isFetching.slice(0,5)+'ing...'))}
        {fetchError===_id && notification('You have already voted in this Poll!')}
        {itsAlreadyThere && notification('This choice exists! Try another.')}
      </form>
    );
  }
}

VoteComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  choiceNameArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  fbggId: PropTypes.string.isRequired,
  isFetching: PropTypes.string.isRequired,
  fetchError: PropTypes.string.isRequired, 
  deleteBool: PropTypes.bool.isRequired,
  thunkVote: PropTypes.func,
  thunkDelete: PropTypes.func
};

export default VoteComponent;
