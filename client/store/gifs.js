import axios from 'axios';

const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
const SORT_DATA = 'SORT_DATA';
const SAFE_SEARCH_DATA = 'SAFE_SEARCH_DATA';
const SIZE_DATA = 'SIZE_DATA';

const initialFetch = gifs => ({
  type: FETCH_SEARCH_RESULTS,
  gifs
});

const sortData = gifs => ({
  type: SORT_DATA,
  gifs
});

const safeSearchData = gifs => ({
  type: SAFE_SEARCH_DATA,
  gifs
});

const sortSizes = gifs => ({
  type: SIZE_DATA,
  gifs
});

const utilSetStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const fetchSearchResults = searchTerm => {
  return async dispatch => {
    try {
      if (window.localStorage[searchTerm]) {
        let data = JSON.parse(window.localStorage.getItem(`${searchTerm}`));
        dispatch(initialFetch(data));
      } else {
        let { data } = await axios.get(`/api/${searchTerm}`);
        utilSetStorage(`${searchTerm}`, JSON.stringify(data));
        dispatch(initialFetch(data));
      }
    } catch (e) {
      console.error('Error fetching gifs', e.message);
    }
  };
};

export const sortByDate = data => {
  return dispatch => {
    let sortedData = data.sort((elem1, elem2) => {
      if (elem1.import_datetime > elem2.import_datetime) return -1;
      if (elem1.import_datetime < elem2.import_datetime) return 1;
      return 0;
    });
    dispatch(sortData(sortedData));
  };
};

export const safeSearch = data => {
  return dispatch => {
    let safeData = data.filter(datum => datum.rating !== 'r');
    dispatch(safeSearchData(safeData));
  };
};

export const sortBySize = (data, width, height, type) => {
  return dispatch => {
    if (type === 'all') {
      dispatch(sortSizes(data));
    } else {
      let sizeData = data.filter(
        datum =>
          +datum.images.original.height < height &&
          +datum.images.original.height > height - 200 &&
          +datum.images.original.width < width
      );
      dispatch(sortSizes(sizeData));
    }
  };
};

const initialState = {
  gifs: [],
  sorted: false,
  sortGifs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      return {
        ...state,
        gifs: action.gifs,
        loading: false,
        sorted: false
      };
    case SORT_DATA:
      return {
        ...state,
        sortGifs: action.gifs,
        sorted: true
      };
    case SAFE_SEARCH_DATA: {
      return {
        ...state,
        sortGifs: action.gifs,
        sorted: true
      };
    }
    case SIZE_DATA: {
      return {
        ...state,
        sortGifs: action.gifs,
        sorted: true
      };
    }
    default:
      return state;
  }
};
