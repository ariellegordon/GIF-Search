import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults, sortByDate, safeSearch } from './store/gifs';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.safeSearch = this.safeSearch.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.fetchSearchResults(this.state.search);
  }

  sortByDate() {
    this.props.sortByDate(this.props.gifs);
  }
  safeSearch() {
    this.props.sorted
      ? this.props.safeSearch(this.props.sortedGifs)
      : this.props.safeSearch(this.props.gifs);
  }

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <div>
          <h1>SEARCH FOR GIFS</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </form>
        </div>
        <div>
          {this.props.loading === false && (
            <div>
              <p>Sort By:</p>
              <button onClick={this.sortByDate}>Date Uploaded</button>
              <button onClick={this.safeSearch}>Safe For Work</button>
              <p>Filter By Size:</p>
            </div>
          )}
        </div>
        <div>
          {!this.props.sorted
            ? this.props.gifs &&
              this.props.gifs.map(gif => (
                <iframe src={gif.embed_url} key={gif.id} />
              ))
            : this.props.sortedGifs.map(gif => (
                <iframe src={gif.embed_url} key={gif.id} />
              ))}
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  return {
    gifs: state.gifs.gifs.data,
    sortedGifs: state.gifs.gifs,
    loading: state.gifs.loading,
    sorted: state.gifs.sorted
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSearchResults: searchTerm => dispatch(fetchSearchResults(searchTerm)),
    sortByDate: data => dispatch(sortByDate(data)),
    safeSearch: data => dispatch(safeSearch(data))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Main);
