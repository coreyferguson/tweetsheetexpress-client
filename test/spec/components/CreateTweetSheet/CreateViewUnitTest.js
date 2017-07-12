
import React from 'react';
import { shallow } from 'enzyme';
import CreateView from '../../../../src/components/CreateTweetSheet/CreateView';
import { expect, sinon } from '../../../support/TestUtils';

describe('CreateTweetSheet/CreateView Unit Test', () => {

  const sandbox = sinon.sandbox.create();

  after(() => {
    sandbox.restore();
  });

  it('CreateView with one TweetHandlesTemplate by default', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    expect(wrapper.find('TweetHandlesTemplate').length).to.equal(1);
  });

  it('CreateView with one TweetHandlesTemplate', () => {
    const wrapper = shallow(
      <CreateView
        onCreate={tweetsheet => {
          expect(tweetsheet.handles).to.equal(['@one2']);
          expect(tweetsheet.tweet).to.equal('hello @handle!');
        }}
        tweetSets={
          [{
            handles: '@one',
            tweet: 'hello @handle'
          }]
        }
      />
    );
    expect(wrapper.find('TweetHandlesTemplate').length).to.equal(1);
    wrapper.find('form').simulate('submit', { preventDefault: () => {}});
  });

  it('CreateView with one TweetHandlesTemplate', () => {
    const wrapper = shallow(
      <CreateView
        onCreate={() => {}}
        tweetSets={
          [{
            handles: '@one',
            tweet: 'hello @handle'
          }, {
            handles: '@two',
            tweet: 'hello @handle'
          }]
        }
      />
    );
    expect(wrapper.find('TweetHandlesTemplate').length).to.equal(2);
  });

});
