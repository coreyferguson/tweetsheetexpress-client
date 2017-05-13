
import React from 'react';
import RootView from '../../../../src/components/Root/RootView';
import { shallow } from 'enzyme';
import { expect } from '../../../support/TestUtils';

describe('RootView Unit Test', () => {
  it('RootView to render Router and 2 Routes', () => {
    const wrapper = shallow(<RootView />);
    expect(wrapper.find('Router').length).to.equal(1);
    expect(wrapper.find('Route').length).to.equal(2);
  });
});
