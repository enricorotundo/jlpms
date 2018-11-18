import React, { Component, Fragment } from 'react';

class MyComponent extends Component {
  constructor() {
    super();

    this.state = {
      title: 'My old title'
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        title: 'My new title'
      })
    }, 3000);
  }

  render() {
    const { title } = this.state;

    return <Fragment>
      <h2>{ title }</h2>
      <p>MyComponent paragraph</p>
    </Fragment>;
  }
}

export default MyComponent;