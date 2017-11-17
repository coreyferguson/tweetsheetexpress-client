
import React from 'react';
import TweetView from '../../../src/sheets/views/SheetsView/TweetView';
import { shallow } from 'enzyme';
import { expect } from '../../support/TestUtils';

describe('TweetView unit tests', () => {

  describe('unauthorized', () => {

    it('shows index and compiled tweet message', () => {
      const wrapper = shallow(
        <TweetView
          completion={{ completed: false, handle: 'handle value' }}
          tweet='tweet value @handle'
          index={0}
          authorized={false} />
      );
      expect(wrapper.text()).to.contain('1tweet value handle value');
    });

    it('shows second index', () => {
      const wrapper = shallow(
        <TweetView
          completion={{ completed: false, handle: 'handle value' }}
          tweet='tweet value @handle'
          index={1}
          authorized={false} />
      );
      expect(wrapper.text()).to.contain('2tweet value handle value');
    });

  });

  describe('authorized', () => {

    it('shows incomplete', () => {
      const wrapper = shallow(
        <TweetView
          completion={{ completed: false, handle: 'handle value' }}
          tweet='tweet value @handle'
          index={0}
          authorized={true} />
      );
      expect(wrapper.html()).to.contain('fa fa-square-o tweet-incomplete');
      expect(wrapper.text()).to.contain('tweet value handle value');
    });

    it('shows complete', () => {
      const wrapper = shallow(
        <TweetView
          completion={{ completed: true, handle: 'handle value' }}
          tweet='tweet value @handle'
          index={0}
          authorized={true} />
      );
      expect(wrapper.html()).to.contain('fa fa-check-square-o tweet-complete');
      expect(wrapper.text()).to.contain('tweet value handle value');
    });

  });

});
