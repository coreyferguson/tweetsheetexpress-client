
import HeroWrapper from '../../../../src/hero/views/Hero/HeroWrapper';
import React from 'react';
import TestProvider from '../../../support/TestProvider';
import { expect, sinon } from '../../../support/TestUtils';
import { mount } from 'enzyme';

describe('Hero/HeroWrapper Integration Test', () => {

  it('title passed through to Hero component', () => {
    const wrapper = mount(
      <TestProvider>
        <HeroWrapper title='override value' />
      </TestProvider>
    );
    // console.log('HeroWrapper:', HeroWrapper);
    // console.log(NavReduxConnect);
    // sandbox.stub(NavReduxConnect, 'default').returns(<NavView />);
    // console.log('wrapper:', wrapper);
    expect(wrapper.text()).to.eql('override value');
  });

});
