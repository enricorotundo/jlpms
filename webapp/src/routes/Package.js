import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { InstantSearch, Hits, SearchBox, Highlight, Configure } from 'react-instantsearch-dom';

const styles = theme => ({
});


class Package extends Component {
  constructor() {
    super();

    console.log(this)

    this.packageId = this.props.match.params.id;
  }

  render() {
    const { classes } = this.props;

    return <Fragment>
      <div>{this.packageId}</div>
    </Fragment>;
  }
}

export default withStyles(styles)(Package);