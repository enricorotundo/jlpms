import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import BookIcon from '@material-ui/icons/ChromeReaderModeOutlined';
import Markdown from 'markdown-to-jsx';
import { InstantSearch, Hits, SearchBox, Highlight, Configure } from 'react-instantsearch-dom';
import APIGateway from '../APIGateway';
import Moment from 'react-moment';


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
        raw: 'Loading...'
      }
    });
  }

  async componentDidMount() {
    const packageRes = await APIGateway.getPackage({ id: this.state.packageId });
    const readmeRes = await APIGateway.getReadme({ id: this.state.packageId });
    this.setState({
      package: packageRes.data,
      readme: {
        raw: readmeRes.data.raw || 'ERROR: No README.md file found!'
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { name, owner, stargazers_count, updated_at } = this.state.package;
    const { raw } = this.state.readme;
    console.log('raw', raw)

    return <Fragment>
      <Grid container className={classes.root}>
        <Grid container className={classes.top}>
          <Grid item xs={12} className={classes.head}>
            <Typography variant="h4" className={classes.name}>
              <a href={"https://github.com/" + owner.login + "/" + name}>{ name }</a>
            </Typography>
            <div>
              <Typography variant="h4" className={classes.stargazersCount}>
                { stargazers_count }<StarIcon />
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.head}>
            <Typography variant="h5" className={classes.ownerLogin}>
              <a href={"https://github.com/" + owner.login }>{ owner.login }</a>
            </Typography>
            <Typography variant="h5" className={classes.updatedAt}>
              Last update: <Moment fromNow>{ updated_at }</Moment>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="column" className={classes.body}>
          <Grid item xs={12} className={classes.readme}>
            <Typography variant="h6">
              <BookIcon /> README.md
            </Typography>
            <Markdown>{ raw }</Markdown>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>;
  }
}

export default withStyles(styles)(Package);