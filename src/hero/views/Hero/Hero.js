
import PropTypes from 'prop-types';
import React from 'react';

export default function Hero(props) {
  const title = (props.title === '') ? 'tweetsheets' : props.title;
  return (
    <section className={`hero ${props.bulmaModifier}`}>
      <div className='hero-body'>
        <div className='container is-fluid'>
          <h1 className='title'>{title}</h1>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  bulmaModifier: PropTypes.string,
  title: PropTypes.string
};

Hero.defaultProps = {
  bulmaModifier: 'is-primary',
  title: 'tweetsheets'
};
