import React from 'react';
import PropTypes from 'prop-types';

class Tooltip1 extends React.Component {
  constructor(props) {
    super(props);

    this.setEl = (el) => {
      this.el = el;
    };
  }

  handleClick() {
    this.el.focus();
  }
  
  render() {
    return <div ref={this.setEl} />;
  }
}

class Tooltip2 extends React.Component {
  constructor(props) {
    super(props);

    this.setEl = (el) => {
      this.div = el;
    };
  }

  handleClick() {
    this.div.focus();
  }
  
  render() {
    return <div ref={this.setEl} />;
  }
}

