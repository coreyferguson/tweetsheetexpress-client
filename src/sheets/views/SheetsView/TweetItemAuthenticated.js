
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TweetItemAuthenticated extends Component {
  render() {
    const { template, completion } = this.props;
    const plainTextHandle = completion.handle.replace('@', '');
    const message = template.replace(new RegExp('@handle', 'g'), completion.handle);
    const messageEncoded = encodeURIComponent(message);
    const messageHref = `https://twitter.com/intent/tweet?text=${messageEncoded}`;
    return (
      <tr>
        <td className='tweet-completion'>
          <i
            className={'fa ' + (
              !completion.completed
              ? 'fa-square-o tweet-incomplete'
              : 'fa-check-square-o tweet-complete'
            )}
            aria-hidden='true'></i>
        </td>
        <td>
          {message}
        </td>
        <td className='is-hidden-mobile'>
          {/* Tweet button */}
          <a
              title='Tweet this'
              target='_blank'
              href={messageHref}
              className='button has-text-right'>
            <span className="icon" style={{ color: '#888' }}>
              <i className="fa fa-lg fa-twitter"></i>
            </span>
          </a>
        </td>
      </tr>
    );
  }
}

TweetItemAuthenticated.propTypes = {
  completion: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    handle: PropTypes.string.isRequired
  }).isRequired,
  template: PropTypes.string.isRequired
};
