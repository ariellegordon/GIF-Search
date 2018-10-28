import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  fetchSearchResults,
  sortByDate,
  safeSearch,
  sortBySize
} from './store/gifs';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortNewest = this.sortNewest.bind(this);
    this.safeSearch = this.safeSearch.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.fetchSearchResults(this.state.search);
  }

  sortNewest() {
    this.props.sortByDate(this.props.gifs);
  }

  safeSearch() {
    this.props.safeSearch(this.props.gifs);
  }

  handleRadioClick(evt) {
    if (evt.target.value === 'all') {
      this.props.sortBySize(this.props.gifs, null, null, 'all');
    } else {
      let [width, height] = evt.target.value.split('x');

      this.props.sortBySize(this.props.gifs, +width, +height);
    }
  }

  render() {
    return (
      <Fragment>
        <div
          className="input-group mb-3"
          style={{ display: 'flex', justifyContent: 'center' }}
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

        <div>
          {this.props.loading === false && (
            <div>
              <div style={{ textAlign: 'center' }}>
                <p>Sort By:</p>

                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.sortNewest}
                  >
                    Newest
                  </button>
                  <button
                    onClick={this.safeSearch}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Safe For Work
                  </button>
                </div>
              </div>
              <div>
                <div style={{ textAlign: 'center' }}>
                  <p>Filter By Size:</p>
                </div>
                <form
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <div className="form-check form-check-inline">
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      Small
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      value="400x300"
                      name="size-select"
                      onClick={this.handleRadioClick}
                    />
                  </div>
                  <div className="form-check form-check-inline">
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      Medium
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size-select"
                      value="640x480"
                      onClick={this.handleRadioClick}
                    />
                  </div>
                  <div className="form-check form-check-inline">
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox3"
                    >
                      Large
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      value="800x600"
                      name="size-select"
                      onClick={this.handleRadioClick}
                    />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox4"
                    >
                      XL
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size-select"
                      value="1024x768"
                      onClick={this.handleRadioClick}
                      style={{ position: 'absolute', left: '40px' }}
                    />
                  </div>
                  <div className="form-check form-check-inline">
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox5"
                    >
                      All
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      value="all"
                      name="size-select"
                      onClick={this.handleRadioClick}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
          }}
        >
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
    sortedGifs: state.gifs.sortGifs,
    loading: state.gifs.loading,
    sorted: state.gifs.sorted
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSearchResults: searchTerm => dispatch(fetchSearchResults(searchTerm)),
    sortByDate: data => dispatch(sortByDate(data)),
    safeSearch: data => dispatch(safeSearch(data)),
    sortBySize: (data, width, height, type) =>
      dispatch(sortBySize(data, width, height, type))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Main);
