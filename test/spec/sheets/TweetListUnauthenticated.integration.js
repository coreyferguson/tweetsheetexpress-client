
import React from 'react';
import { expect } from '../../support/TestUtils';
import TweetListUnauthenticated from '../../../src/sheets/views/SheetsView/TweetListUnauthenticated';
import { mount } from 'enzyme';

describe('TweetListUnauthenticated integration tests', () => {

  it('shows index and rendered tweet message', () => {
    const userSheet = {
      sheet: {
        tweet: 'hello @handle',
        handles: [
          '@one',
          '@two'
        ]
      }
    };
    const wrapper = mount(<TweetListUnauthenticated userSheet={userSheet} />);
    expect(wrapper.text())
      .to.equal('1hello @oneTweetWho is this?2hello @twoTweetWho is this?');
  });

});
