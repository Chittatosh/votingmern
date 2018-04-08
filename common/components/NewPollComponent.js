import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const newPollInitState = {
  rowCount: 1,
  pollTitle: '',
  myChoice: '',
  choice1: '',
  choice2: '',
  choice3: '',
};

class NewPollComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = newPollInitState;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      rowCount: prevState.rowCount + 1,
      [`choice${prevState.rowCount * 3 + 1}`]: '',
      [`choice${prevState.rowCount * 3 + 2}`]: '',
      [`choice${prevState.rowCount * 3 + 3}`]: '',
    }));
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { thunkNewPoll, history } = this.props;
    thunkNewPoll(this.state);
    this.setState(newPollInitState);
    history.push('/');
    $('#NewPollComponent').modal('toggle');
  }
  render() {
    const { pollTitleArr } = this.props;
    const pollTitleTrimmed =
      this.state.pollTitle &&
      this.state.pollTitle
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();
    const itsAlreadyThere =
      pollTitleTrimmed &&
      pollTitleArr.find(
        pollTitle => pollTitle.toLowerCase() === pollTitleTrimmed,
      );
    return (
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-light">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create A New Poll
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                Title Of The Poll *:
                {itsAlreadyThere && (
                  <mark>
                    <em> This title exists! Try another. </em>
                  </mark>
                )}
                <input
                  name="pollTitle"
                  value={this.state.pollTitle}
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  id="pollTitle"
                  placeholder="Which Tea Is Your Favorite?"
                  maxLength="100"
                  required
                />
              </div>
              <div className="form-group">
                I Vote For *:
                <input
                  name="myChoice"
                  value={this.state.myChoice}
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  id="myChoice"
                  placeholder="Black Tea"
                  maxLength="30"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="otherChoices" className="col-form-label">
                  Other Choices: &nbsp; &nbsp; &nbsp; &nbsp;
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={this.handleClick}
                  >
                    <i className="fa fa-plus" aria-hidden="true" /> More Input
                    Boxes
                  </button>
                  <div className="container-fluid">
                    {Array.from(Array(this.state.rowCount).keys()).map(rowN => (
                      <div key={rowN} className="row">
                        {[1, 2, 3].map(columnN => (
                          <div key={columnN} className="col-md-4">
                            <input
                              name={`choice${rowN * 3 + columnN}`}
                              value={this.state[`choice${rowN * 3 + columnN}`]}
                              onChange={this.handleChange}
                              type="text"
                              className="form-control my-1"
                              id="otherChoices"
                              maxLength="20"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </label>
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Create poll"
                disabled={
                  !/\w/.test(this.state.pollTitle.trim()) ||
                  !/\w/.test(this.state.myChoice.trim()) ||
                  itsAlreadyThere
                }
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

NewPollComponent.propTypes = {
  pollTitleArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  thunkNewPoll: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NewPollComponent);
