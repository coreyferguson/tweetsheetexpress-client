
import React from 'react';
import { shallow } from 'enzyme';
import CreateView from '../../../../src/components/CreateTweetSheet/CreateView';
import { expect, sinon } from '../../../support/TestUtils';

describe('CreateTweetSheet/CreateView Unit Test', () => {

  const sandbox = sinon.sandbox.create();

  after(() => {
    sandbox.restore();
  });

  it('handlesToArray', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    wrapper.setState({
      handles: '@one @two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with prepended spaces', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    wrapper.setState({
      handles: '  @one @two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with appended spaces', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    wrapper.setState({
      handles: '@one @two  ',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with extra spaces in middle', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    wrapper.setState({
      handles: '@one  @two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with prepended newlines', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    wrapper.setState({
      handles: '\n\n@one\n@two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with appended newlines', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    wrapper.setState({
      handles: '@one\n@two\n\n',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

  it('handlesToArray with extra newlines in middle', () => {
    const wrapper = shallow(<CreateView onCreate={() => {}} />);
    wrapper.setState({
      handles: '@one\n\n@two',
      tweet: 'hello @handle'
    });
    expect(wrapper.instance().handlesToArray()).to.eql(['@one', '@two']);
  });

});
