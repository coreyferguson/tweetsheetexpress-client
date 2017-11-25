
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TweetBatchButton extends Component {

  render() {
    return (
      <div className='tweet-batch'>
        <button
            className={
              'button is-primary is-pulled-left ' +
              (this.props.batch.working ? 'is-loading' : '')
            }
            onClick={this.props.onClick}>
          Tweet Everything
        </button>
      </div>
    );
  }

}

TweetBatchButton.propTypes = {
  batch: PropTypes.shape({
    working: PropTypes.bool.isRequired
  }).isRequired,
  nextBatchMessage: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
