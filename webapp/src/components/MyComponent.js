import React, { Component, Fragment } from 'react';

class MyComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return <Fragment>
      <h2>MyComponent title</h2>
      <p>MyComponent paragraph</p>
    </Fragment>;
  }
}

export default MyComponent;