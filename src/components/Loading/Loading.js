import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

class Loading extends Component {
  render() {
    return (
      <div>
        <Spinner type="grow" color="dark" />
        <Spinner type="grow" color="dark" />
        <Spinner type="grow" color="dark" />
      </div>
    );
  }
}

export default Loading;