
import React from 'react';
import { mount } from 'enzyme';
import { expect } from '../../../support/TestUtils';
import HeroWrapper from '../../../../src/components/Hero/HeroWrapper';

describe('Hero/HeroWrapper Integration Test', () => {

  it('title passed through to Hero component', () => {
    const wrapper = mount(<HeroWrapper title='override value' />);
    expect(wrapper.text()).to.equal('override value');
  });

});
