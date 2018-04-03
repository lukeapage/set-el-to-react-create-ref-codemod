import React from 'react';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {
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
