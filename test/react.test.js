import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../client/main';
import SearchForm from '../client/components/SearchForm';
import GifList from '../client/components/GifList';
import FilterForm from '../client/components/FilterForm';

const adapter = new Adapter();
Enzyme.configure({ adapter });

describe('REACT TESTS', () => {
  describe('<Main />', () => {
    let main;
    beforeEach('Create component', () => {
      main = shallow(<Main />);
    });
    it('renders components', () => {
      expect(main.find(SearchForm)).to.have.lengthOf(1);
      expect(main.find(GifList)).to.have.lengthOf(1);
      expect(main.find(FilterForm)).to.have.lengthOf(1);
    });
  });
});
