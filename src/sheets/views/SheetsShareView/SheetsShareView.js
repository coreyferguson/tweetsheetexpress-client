
import config from 'config';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class SheetsShareView extends React.Component {

  render() {
      const url = this.props.baseUrl + this.props.match.params.id;
      return (
        <section className="section">
          <div className="container is-fluid">
            <h1 className="title is-spaced">Success!</h1>
            <h2 className="subtitle">
              Share your tweetsheet with others: &nbsp;
              <Link to={`/sheets/${this.props.match.params.id}`}>{url}</Link>
            </h2>
          </div>
        </section>
      );
  }

}

SheetsShareView.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

SheetsShareView.defaultProps = {
  baseUrl: `${config.client}/#/sheets/`
};
