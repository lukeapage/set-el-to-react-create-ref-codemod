import React from 'react';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {
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
