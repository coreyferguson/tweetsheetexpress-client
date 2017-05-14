
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from '../../../support/TestUtils';
import Hero from '../../../../src/components/Hero/Hero';

describe('Hero/Hero Unit Test', () => {

  it('render `tweetsheets` by default', () => {
    const wrapper = shallow(<Hero />);
    expect(wrapper.text()).to.equal('tweetsheets');
  });

  it('render overridden text', () => {
    const wrapper = shallow(<Hero title='override value' />);
    expect(wrapper.text()).to.equal('override value');
  });

});
