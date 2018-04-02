import React from 'react';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.el = React.createRef();
  }
  
  render() {
    return <div ref={this.setEl} />
  }
}
