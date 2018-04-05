import React from 'react';
import PropTypes from 'prop-types';

class Tooltip1 extends React.Component {
  constructor(props) {
    super(props);

    this.elRef = React.createRef();
  }

  handleClick() {
    this.elRef.current.focus();
  }
  
  render() {
    return <div ref={this.elRef} />;
  }
}

class Tooltip2 extends React.Component {
  constructor(props) {
    super(props);

    this.divRef = React.createRef();
  }

  handleClick() {
    this.divRef.current.focus();
  }
  
  render() {
    return <div ref={this.divRef} />;
  }
}
