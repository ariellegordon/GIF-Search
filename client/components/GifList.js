import React, { Component } from 'react';
import { connect } from 'react-redux';

class GifList extends Component {
  render() {
    return (
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

export default connect(mapState)(GifList);
