
import PropTypes from 'prop-types';
import React from 'react';
import Hero from './Hero';
import Nav from '../Nav';

console.log('HeroWrapper.js initialized');

export default function HeroWrapper(props) {
  console.log('props:', props);
  return (
    <div>
      <Nav />
      <Hero title={props.title} />
      <section className='section'>
        <div className='container is-fluid'>
          {props.children}
        </div>
      </section>
    </div>
  );
}

HeroWrapper.propTypes = {
  title: PropTypes.string
};
