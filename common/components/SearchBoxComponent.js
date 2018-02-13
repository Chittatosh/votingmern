import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class SearchBoxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.searchTerm};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const { submitSearch, history } = this.props;
    history.push('/');
    submitSearch(this.state.value);
  }
  handleClick() {
    this.setState({value: ''});
    const { submitSearch } = this.props;
    submitSearch('');
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <div className="input-group-prepend">
            <input
              onClick={this.handleClick} 
              className="btn btn-info" 
              type="button"
              value="Reset"
              disabled={!this.props.searchTerm} 
            />
          </div>
          <input 
            type="text" 
            className="form-control"
            placeholder="Search for..." 
            aria-label="Search for..."
            value={this.state.value} 
            onChange={this.handleChange} 
          />
          <span className="input-group-append">
            <input 
              type="submit" 
              value="Go!" 
              className="btn btn-secondary" 
            />
          </span>
        </div>
      </form>
    );
  }
}

SearchBoxComponent.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  submitSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(SearchBoxComponent);
