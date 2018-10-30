import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../store/gifs';

export class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.fetchSearchResults(this.state.search);
  }
  render() {
    return (
      <div
        className="input-group mb-3"
        style={{ display: 'flex', justifyContent: 'center' }}
        id="submit-form"
      >
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for GIFs"
            aria-label="Search for GIFs"
            aria-describedby="basic-addon2"
            onChange={this.handleChange}
            name="search"
            value={this.state.search}
          />
        </form>
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSearchResults: searchTerm => dispatch(fetchSearchResults(searchTerm))
  };
};

export default connect(
  null,
  mapDispatch
)(SearchForm);
