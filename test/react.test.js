import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import actualStore from '../client/store';
import { Main } from '../client/main';

const adapter = new Adapter();
Enzyme.configure({ adapter });

describe('REACT TESTS', () => {
  describe('<Main/ >', () => {
    let main;
    beforeEach('Create component', () => {
      main = shallow(<Main />);
    });
    it('renders', () => {
      expect(main.find('div#submit-form')).to.have.lengthOf(1);
    });
    it('has a `search` field on state', () => {
      expect(main.state()).to.be.an('object');
      expect(main.state().search).to.exist;
      expect(main.state().search).to.be.a('string');
    });
  });
});
