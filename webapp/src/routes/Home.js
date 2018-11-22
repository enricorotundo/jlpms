import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MostRecentPackages from '../components/MostRecentPackages';

const styles = theme => ({

});

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return <Fragment>
      <Grid container className={classes.tableContainer}>
        <Grid item>
          <MostRecentPackages />
        </Grid>
      </Grid>
    </Fragment>;
  }
}

export default withStyles(styles)(Home);