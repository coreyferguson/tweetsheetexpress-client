
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TweetItemUnauthenticated extends Component {
  render() {
    const { template, handle, index } = this.props;
    const plainTextHandle = handle.replace('@', '');
    const message = template.replace(new RegExp('@handle', 'g'), handle);
    const messageEncoded = encodeURIComponent(message);
    const messageHref = `https://twitter.com/intent/tweet?text=${messageEncoded}`;
    return (
      <tr>
        <td className='tweet-index subtitle'>{this.props.index+1}</td>
        <td>
          <a
              title='Tweet this'
              target='_blank'
              href={messageHref}
              className='button tweet-link has-text-right'>
            <span className="icon" style={{ color: '#888' }}>
              <i className="fa fa-lg fa-twitter"></i>
            </span>
          </a>
        </td>
        <td className='tweet-message subtitle'>{message}</td>

      </tr>
    );
  }
}

TweetItemUnauthenticated.propTypes = {
  handle: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  template: PropTypes.string.isRequired
};
