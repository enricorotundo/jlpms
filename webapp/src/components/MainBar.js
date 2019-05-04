import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: theme.mixins.gutters({
    display: 'flex',
    justifyContent: 'space-between'
  }),
  homeContainer: {
    marginRight: '16px'
  },
  homeLink: {
    textDecoration: 'none',
    '&:link': { color: 'inherit' },
    '&:visited': { color: 'inherit' },
    '&:hover': { color: 'inherit' },
    '&:active': { color: 'inherit' }
  }
});

class MainBar extends Component {
  constructor() {
    super()
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.homeContainer} variant="h4" color="inherit">
              <a className={classes.homeLink} href="/">Jlpms</a>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MainBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainBar);