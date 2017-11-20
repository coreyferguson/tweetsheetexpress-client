
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class SheetProgress extends Component {

  render() {
    const percent = Math.floor(this.props.numerator / this.props.denominator * 100);
    return (
      <div className='subtitle tweet-sheet-progress'>
        <div className='tweet-sheet-progress-denominator'>
          <div className='tweet-sheet-progress-numerator' style={{ width: `${percent}%` }}>
            &nbsp;
          </div>
          <div className='tweet-sheet-progress-text'>Progress: {percent}%</div>
        </div>
      </div>
    );
  }

}

SheetProgress.propTypes = {
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired
};
