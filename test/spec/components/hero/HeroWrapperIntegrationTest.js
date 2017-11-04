
import HeroWrapper from '../../../../src/hero/views/Hero/HeroWrapper';
import React from 'react';
import TestProvider from '../../../support/TestProvider';
import { expect, sinon } from '../../../support/TestUtils';
import { mount } from 'enzyme';

describe('Hero/HeroWrapper Integration Test', () => {

  // TODO: Revisit after refactoring `Nav` component
  it('title passed through to Hero component', () => {
    const wrapper = mount(
      <TestProvider>
        <HeroWrapper title='override value' />
      </TestProvider>
    );
    expect(wrapper.text()).to.contain('override value');
  });

});
