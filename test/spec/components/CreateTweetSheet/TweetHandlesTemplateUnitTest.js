
import React from 'react';
import { shallow } from 'enzyme';
import TweetHandlesTemplate from '../../../../src/components/CreateTweetSheet/TweetHandlesTemplate';
import { expect, sinon } from '../../../support/TestUtils';

describe.only('CreateTweetSheet/TweetHandlesTemplate Unit Test', () => {

  const sandbox = sinon.sandbox.create();

  after(() => {
    sandbox.restore();
  });

  it('handlesToArray', () => {
    const wrapper = shallow(<TweetHandlesTemplate />);
    wrapper.setState({
      handles: '@one @two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with prepended spaces', () => {
    const wrapper = shallow(<TweetHandlesTemplate />);
    wrapper.setState({
      handles: '  @one @two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with appended spaces', () => {
    const wrapper = shallow(<TweetHandlesTemplate />);
    wrapper.setState({
      handles: '@one @two  ',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with extra spaces in middle', () => {
    const wrapper = shallow(<TweetHandlesTemplate />);
    wrapper.setState({
      handles: '@one  @two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with prepended newlines', () => {
    const wrapper = shallow(<TweetHandlesTemplate />);
    wrapper.setState({
      handles: '\n\n@one\n@two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with appended newlines', () => {
    const wrapper = shallow(<TweetHandlesTemplate />);
    wrapper.setState({
      handles: '@one\n@two\n\n',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with extra newlines in middle', () => {
    const wrapper = shallow(<TweetHandlesTemplate />);
    wrapper.setState({
      handles: '@one\n\n@two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

});
