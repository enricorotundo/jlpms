import React, { Component, Fragment } from 'react';
import MyComponent from '../components/MyComponent';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return <Fragment>
      <h1>home</h1>
      <MyComponent />
    </Fragment>;
  }
}

export default Home;