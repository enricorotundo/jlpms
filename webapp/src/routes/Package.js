import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import { InstantSearch, Hits, SearchBox, Highlight, Configure } from 'react-instantsearch-dom';
import APIGateway from '../APIGateway';


const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  head: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.unit
  },
  readme: {
    padding: theme.spacing.unit
  }
});


class Package extends Component {
  componentWillMount() {
    this.setState({
      packageId: this.props.match.params.id,
      package: {
        name: '',
        owner: { login: '' },
        stargazers_count: '',
        updated_at: ''
      },
      readme: {
        raw: ''
      }
    });
  }

  async componentDidMount() {
    const packageRes = await APIGateway.getPackage({ id: this.state.packageId });
    const readmeRes = await APIGateway.getReadme({ id: this.state.packageId });
    this.setState({
      package: packageRes.data,
      readme: readmeRes.data
    });
  }

  render() {
    const { classes } = this.props;
    const { name, owner, stargazers_count, updated_at } = this.state.package;
    const { raw } = this.state.readme;

    return <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.head}>
          <Typography variant="h4" className={classes.name}>
            { name }
          </Typography>
          <div>
            <Typography variant="h4" className={classes.stargazersCount}>
              { stargazers_count }<StarIcon />
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.head}>
          <Typography variant="h5" className={classes.ownerLogin}>
            { owner.login }
          </Typography>
          <Typography variant="h5" className={classes.updatedAt}>
            { updated_at }
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.readme}>
          { raw }
        </Grid>
      </Grid>
    </Fragment>;
  }
}

export default withStyles(styles)(Package);