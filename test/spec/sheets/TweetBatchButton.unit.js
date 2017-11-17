
import React from 'react';
import TweetBatchButton from '../../../src/sheets/views/SheetsView/TweetBatchButton';
import { expect, sinon } from '../../support/TestUtils';
import { shallow } from 'enzyme';

describe('TweetBatchButton unit tests', () => {

  it('next batch can be started now', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <TweetBatchButton onClick={spy} />
    );
    expect(wrapper.text()).to.equal('Tweet Batch');
  });

  it('waiting for batch throttle', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <TweetBatchButton
        nextBatchMessage='nextBatchMessage value'
        onClick={spy} />
    );
    expect(wrapper.text()).to.equal('Tweet again nextBatchMessage value');
  });

});
