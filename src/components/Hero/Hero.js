
import React from 'react';

export default function Hero(props) {
  return (
    <section className='hero is-primary'>
      <div className='hero-body'>
        <div className='container is-fluid'>
          <h1 className='title'>{props.title}</h1>
        </div>
      </div>
    </section>
  );
}

Hero.PropTypes = {
  title: React.PropTypes.string
};

Hero.defaultProps = {
  title: 'tweetsheets'
};
