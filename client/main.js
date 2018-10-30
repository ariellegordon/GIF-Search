import React, { Fragment } from 'react';
import SearchForm from './components/SearchForm';
import FilterForm from './components/FilterForm';
import GifList from './components/GifList';

const Main = () => {
  return (
    <Fragment>
      <SearchForm />
      <FilterForm />
      <GifList />
    </Fragment>
  );
};

export default Main;
