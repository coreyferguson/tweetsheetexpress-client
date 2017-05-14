
import React from 'react';
import Hero from './Hero';

export default function HeroWrapper(props) {
  return (
    <div>
      <Hero title={props.title} />
      <section className='section'>
        <div className='container is-fluid'>
          {props.children}
        </div>
      </section>
    </div>
  );
}

HeroWrapper.PropTypes = {
  title: React.PropTypes.string
};
