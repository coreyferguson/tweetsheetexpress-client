
import React from 'react';
import { shallow } from 'enzyme';
import View from '../../../../src/sheets/views/SheetsView/SheetsView';
import { expect, sinon } from '../../../support/TestUtils';

describe('ViewTweetSheet/View Unit Test', () => {

  it('render 3 tweet messages', () => {
    const userSheet = {
      sheet: {
        id: 1,
        tweet: 'Hello @handle!',
        handles: [
          '@Corey', '@Zoe', '@Julian'
        ]
      }
    };
    const wrapper = shallow(
      <View
        loading={false}
        userSheet={userSheet}
        sheetId='1234'
      />
    );
    expect(wrapper.find('.tweet-message')).to.have.length(3);
    expect(wrapper.find('.tweet-message').at(0).text()).to.equal('Hello @Corey!');
    expect(wrapper.find('.tweet-message').at(1).text()).to.equal('Hello @Zoe!');
    expect(wrapper.find('.tweet-message').at(2).text()).to.equal('Hello @Julian!');
    expect(wrapper.find('.tweet-index').at(0).text()).to.equal('1');
    expect(wrapper.find('.tweet-index').at(1).text()).to.equal('2');
    expect(wrapper.find('.tweet-index').at(2).text()).to.equal('3');
  });

  it('uri encode tweet', () => {
    const userSheet = {
      sheet: {
        id: '1234',
        tweet: 'mention @someone with #hashtag',
        handles: ['@Corey']
      }
    };
    const wrapper = shallow(
      <View
        loading={false}
        userSheet={userSheet}
      />
    );
    expect(wrapper.find('.tweet-link').at(0).html())
      .to.match(/mention%20%40someone%20with%20%23hashtag/);
  });

});
