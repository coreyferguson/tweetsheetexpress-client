
import moment from 'moment';
import React from 'react';
import SheetsView from '../../../src/sheets/views/SheetsView/SheetsView';
import TestProvider from '../../support/TestProvider';
import { expect } from '../../support/TestUtils';
import { mount } from 'enzyme';
import { sinon } from '../../support/TestUtils';

describe('SheetsView integration tests - authorized', () => {

  const sandbox = sinon.sandbox.create();
  const match = { params: { id: '1234' } };
  const batch = (working, nextTweetTime) => {
    return {
      working,
      nextTweetTime: nextTweetTime || moment()
    };
  };

  let onTweet;
  let onBatchStart;
  let onBatchStop;

  beforeEach(() => {
    onTweet = sandbox.spy();
    onBatchStart = sandbox.spy();
    onBatchStop = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('`loading` data from backend api', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={batch(false)}
          loading={true}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop} />
      </TestProvider>
    );
    expect(wrapper.find('.navbar-item a').html()).to.contain('is-loading');
    expect(wrapper.find('section .container a').html()).to.contain('is-loading');
  });

  it('not `working` and incomplete tweets remaining', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={batch(false)}
          loading={false}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop}
          userSheet={{
            sheet: {
              tweet: 'hello @handle',
              handles: [ '@one', '@two' ]
            },
            completions: [
              { completed: true, handle: '@one' },
              { completed: false, handle: '@two' }
            ]
          }} />
      </TestProvider>
    );
    expect(wrapper.text()).to.contain('hello @onehello @two');
    expect(wrapper.find('.tweet-completion i').at(0).html())
      .to.contain('fa fa-check-square-o tweet-complete');
    expect(wrapper.find('.tweet-completion i').at(1).html())
      .to.contain('fa fa-square-o tweet-incomplete');
    expect(wrapper.find('.tweet-batch button').exists()).to.be.true;
  });

  it('not `working` and all tweets complete', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={batch(false)}
          loading={false}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop}
          userSheet={{
            sheet: {
              tweet: 'hello @handle',
              handles: [ '@one', '@two' ]
            },
            completions: [
              { completed: true, handle: '@one' },
              { completed: true, handle: '@two' }
            ]
          }} />
      </TestProvider>
    );
    expect(wrapper.text()).to.contain('hello @onehello @two');
    expect(wrapper.find('.tweet-completion i').at(0).html())
      .to.contain('fa fa-check-square-o tweet-complete');
    expect(wrapper.find('.tweet-completion i').at(1).html())
      .to.contain('fa fa-check-square-o tweet-complete');
    expect(wrapper.find('.tweet-batch button').exists()).to.be.false;
  });

  it('batch start', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={batch(false)}
          loading={false}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop}
          userSheet={{
            sheet: {
              tweet: 'hello @handle',
              handles: [ '@one', '@two' ]
            },
            completions: [
              { completed: false, handle: '@one' },
              { completed: false, handle: '@two' }
            ]
          }} />
      </TestProvider>
    );
    wrapper.find('.tweet-batch button').simulate('click');
    expect(onTweet).to.be.calledOnce;
    expect(onBatchStart).to.be.calledOnce;
  });

  it('batch waiting for `nextTweetTime`', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={
            batch(
              true,
              moment().add(1, 'minute')
            )
          }
          batchSize={2}
          loading={false}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop}
          throttle={time => time.add(1, 'minute').add(10, 'seconds')}
          userSheet={{
            sheet: {
              tweet: 'hello @handle',
              handles: [ '@one', '@two' ]
            },
            completions: [
              { completed: false, handle: '@one'   },
              { completed: false, handle: '@two'   },
              { completed: false, handle: '@three' },
              { completed: false, handle: '@four'  }
            ]
          }} />
      </TestProvider>
    );
    expect(wrapper.find('.tweet-sheet-progress').text())
      .to.contain('Complete in about 3 minutes. Next batch of tweets in about 59 seconds.');
    expect(wrapper.find('.tweet-batch button').html()).to.contain('is-loading');
  });

  it('batch to tweet again', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={
            batch(
              true,
              moment().add(-1, 'second')
            )
          }
          batchSize={2}
          loading={false}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop}
          throttle={time => time.add(1, 'minute').add(10, 'seconds')}
          tickRateInMilliseconds={50}
          userSheet={{
            sheet: {
              tweet: 'hello @handle',
              handles: [ '@one', '@two' ]
            },
            completions: [
              { completed: false, handle: '@one'   },
              { completed: false, handle: '@two'   },
              { completed: false, handle: '@three' },
              { completed: false, handle: '@four'  }
            ]
          }} />
      </TestProvider>
    );
    return new Promise(resolve => setTimeout(resolve, 75)).then(() => {
      expect(onTweet).to.be.calledOnce;
      expect(onBatchStart).to.be.calledOnce;
    });
  });

  it('batch waiting for last tweet', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={
            batch(
              true,
              moment().add(1, 'minute')
            )
          }
          batchSize={2}
          loading={false}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop}
          throttle={time => time.add(1, 'minute').add(10, 'seconds')}
          userSheet={{
            sheet: {
              tweet: 'hello @handle',
              handles: [ '@one', '@two' ]
            },
            completions: [
              { completed: true,  handle: '@one'   },
              { completed: true,  handle: '@two'   },
              { completed: false, handle: '@three' },
              { completed: false, handle: '@four'  }
            ]
          }} />
      </TestProvider>
    );
    expect(wrapper.find('.tweet-sheet-progress').text())
      .to.contain('Complete in about 59 seconds.');
    expect(wrapper.find('.tweet-sheet-progress').text())
      .to.not.contain('Next batch of tweets in about');
    expect(wrapper.find('.tweet-batch button').html()).to.contain('is-loading');
  });

  it('stop batch after completed with all tweets', () => {
    const wrapper = mount(
      <TestProvider>
        <SheetsView
          authorized={true}
          batch={
            batch(
              true,
              moment().add(1, 'minute')
            )
          }
          batchSize={2}
          loading={false}
          match={match}
          onTweet={onTweet}
          onBatchStart={onBatchStart}
          onBatchStop={onBatchStop}
          tickRateInMilliseconds={50}
          userSheet={{
            sheet: {
              tweet: 'hello @handle',
              handles: [ '@one', '@two' ]
            },
            completions: [
              { completed: true,  handle: '@one'   },
              { completed: true,  handle: '@two'   },
              { completed: true, handle: '@three' },
              { completed: true, handle: '@four'  }
            ]
          }} />
      </TestProvider>
    );
    return new Promise(resolve => setTimeout(resolve, 75)).then(() => {
      expect(onTweet).to.not.be.called;
      expect(onBatchStart).to.not.be.called;
      expect(onBatchStop).to.be.calledOnce;
    });
  });
});
