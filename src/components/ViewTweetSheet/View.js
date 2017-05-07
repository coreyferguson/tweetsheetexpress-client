
// 05459e24-b4f9-491e-b5cd-d31b92407c8b

import React from 'react';

export default class ViewTweetSheet extends React.Component {

  constructor(props) {
    super(props);
    console.log('props:', props);
  }

  render() {
    const tweets = this.props.handles.map(handle => {
      const plainTextHandle = handle.replace('@', '');
      const tweet = this.props.tweet
        .replace(new RegExp('@handle', 'g'), handle);
      return (
        <div className='box'>
          <div className='content'>

            {/* Tweet message */}
            <p className='subtitle'>{tweet}</p>

            {/* Tweet button */}
            <a
                title='Tweet this'
                target='_blank'
                href={`https://twitter.com/intent/tweet?text=${tweet}`}
                className='button is-primary has-text-right'>
              Tweet
            </a>

            {/* Twitter handle owner */}
            <a
                title='Twitter handle owner'
                className="button is-link"
                target='_blank'
                href={`https://twitter.com/${plainTextHandle}`}>
              Who is this?
            </a>

          </div>
        </div>
      );
    });
    return (
      <div>
        {tweets}
      </div>
    );
  }

}

ViewTweetSheet.propTypes = {
  tweet: React.PropTypes.string.isRequired,
  handles: React.PropTypes.array.isRequired
}
