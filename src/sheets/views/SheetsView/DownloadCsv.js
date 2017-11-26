
import React, { Component } from 'react';

export default class DownloadCsv extends Component {
  render() {
    return (
      <div className='download-csv is-hidden-mobile is-clearfix'>
        <a
            className='button is-pulled-right'
            href={`${this.props.url}?id=${this.props.userSheet.sheet.id}`}>
          Download Sheet
        </a>
      </div>
    );
  }
}
