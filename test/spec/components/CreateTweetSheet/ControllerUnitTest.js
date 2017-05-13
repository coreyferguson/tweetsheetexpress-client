
import React from 'react';
import { shallow } from 'enzyme';
import Controller from '../../../../src/components/CreateTweetSheet/Controller';
import { expect, sinon } from '../../../support/TestUtils';

describe('CreateTweetSheet/Controller Unit Test', () => {

  const sandbox = sinon.sandbox.create();

  after(() => {
    sandbox.restore();
  });

  it('render CreateView by default', () => {
    const wrapper = shallow(<Controller />);
    expect(wrapper.find('CreateView').length).to.equal(1);
  });

  it('render SuccessView after sheet creation', () => {
    const wrapper = shallow(<Controller />);
    const instance = wrapper.instance();
    sinon.stub(instance, '_axios').returns(Promise.resolve({
      data: {
        id: '1234'
      }
    }));
    return instance.handleCreate().then(() => {
      expect(wrapper.find('SuccessView').length).to.equal(1);
    });
  });

});
