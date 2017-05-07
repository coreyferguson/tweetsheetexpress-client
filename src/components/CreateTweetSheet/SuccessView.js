
import React from 'react';

export default class SuccessView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const url = this.props.baseUrl + this.props.tweetSheetId;
    return (
      <section className="section">
        <div className="container is-fluid">
          <h1 className="title is-spaced">Success!</h1>
          <h2 className="subtitle">
            Share your tweetsheet with others: &nbsp;
            <a href={url}>{url}</a>
          </h2>
        </div>
      </section>
    );
  }

}

SuccessView.propTypes = {
  tweetSheetId: React.PropTypes.number.isRequired
};

SuccessView.defaultProps = {
  baseUrl: 'http://tweetsheets.overattribution.com/#/sheets/'
};
