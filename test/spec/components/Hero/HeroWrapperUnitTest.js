
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from '../../../support/TestUtils';
import HeroWrapper from '../../../../src/Hero/HeroWrapper';

describe('Hero/HeroWrapper Unit Test', () => {

  it('render `tweetsheets` by default', () => {
    const wrapper = shallow(<HeroWrapper />);
    expect(wrapper.find('Hero').exists()).to.be.true;
  });

  it('render overridden text', () => {
    const wrapper = shallow(<HeroWrapper title='override value' />);
    expect(wrapper.find('Hero').exists()).to.be.true;
  });

  it('render children', () => {
    const wrapper = shallow(
      <HeroWrapper>
        <h1>hello world!</h1>
      </HeroWrapper>
    );
    expect(wrapper.find('section').html()).to.match(/<h1>hello world!<\/h1>/);
  });

});
