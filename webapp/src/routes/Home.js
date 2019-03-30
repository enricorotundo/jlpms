import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { InstantSearch, Hits, SearchBox, Highlight, Configure } from 'react-instantsearch-dom';
import MostRecentPackages from '../components/MostRecentPackages';

const styles = theme => ({
  instantSearchContainer: {
    padding: theme.spacing.unit
  },
  searchContainer: {
    padding: theme.spacing.unit
  }
});

function Hit({ hit }) {
  return (
    <a href={ `/package/${hit.id}` }>
      <div style={{ marginTop: '10px' }}>
        <span className="hit-name">
          <Highlight attribute="full_name" hit={hit} />
        </span>
        <Highlight attribute="description" hit={hit} />
      </div>
    </a>
  );
}

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return <Fragment>
      <Grid container className={classes.instantSearchContainer}>
        <InstantSearch
          appId="7TYWZIEJIK"
          apiKey="cc8135b4e1abb63101b50c0b5d606676"
          indexName="dev_jlpms"
        >
        <Configure hitsPerPage={12} />
          <Grid item className={classes.searchContainer}>
            <SearchBox />
          </Grid>
          <Grid item className={classes.searchContainer}>
            <Hits hitComponent={Hit} />
          </Grid>
        </InstantSearch>
      </Grid>
    </Fragment>;
  }
}

export default withStyles(styles)(Home);