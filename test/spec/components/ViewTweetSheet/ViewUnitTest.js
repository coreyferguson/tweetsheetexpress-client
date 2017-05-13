
import React from 'react';
import { shallow } from 'enzyme';
import View from '../../../../src/components/ViewTweetSheet/View';
import { expect, sinon } from '../../../support/TestUtils';

describe('ViewTweetSheet/View Unit Test', () => {

  it('render 3 tweet messages', () => {
    const wrapper = shallow(
      <View
        handles={[
          '@Corey', '@Zoe', '@Julian'
        ]}
        tweet='Hello @handle!'
      />
    );
    expect(wrapper.find('.tweet-message')).to.have.length(3);
    expect(wrapper.find('.tweet-message').at(0).text()).to.equal('Hello @Corey!');
    expect(wrapper.find('.tweet-message').at(1).text()).to.equal('Hello @Zoe!');
    expect(wrapper.find('.tweet-message').at(2).text()).to.equal('Hello @Julian!');
  });

  it('uri encode tweet', () => {
    const wrapper = shallow(
      <View handles={['@Corey']} tweet='mention @someone with #hashtag' />
    );
    expect(wrapper.find('.tweet-link').at(0).html())
      .to.match(/mention%20%40someone%20with%20%23hashtag/);
  });

});
