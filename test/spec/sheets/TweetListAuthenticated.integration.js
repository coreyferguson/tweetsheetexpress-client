
import React from 'react';
import { expect } from '../../support/TestUtils';
import TweetListAuthenticated from '../../../src/sheets/views/SheetsView/TweetListAuthenticated';
import { mount } from 'enzyme';

describe('TweetListAuthenticated integration tests', () => {

  it('shows index and rendered tweet message', () => {
    const userSheet = {
      sheet: {
        tweet: 'hello @handle',
      },
      completions: [
        { completed: true, handle: '@one' },
        { completed: false, handle: '@two' }
      ]
    };
    const wrapper = mount(<TweetListAuthenticated userSheet={userSheet} />);
    expect(wrapper.text())
      .to.contain('hello @one')
      .and.to.contain('hello @two');
    expect(wrapper.html())
      .to.match(/fa fa-check-square-o.*hello%20%40one.*fa fa-square-o.*hello%20%40two/);
  });

});
