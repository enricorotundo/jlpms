import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import { InstantSearch, Hits, SearchBox, Highlight, Configure } from 'react-instantsearch-dom';
import MostRecentPackages from '../components/MostRecentPackages';
// import MadeWithLove from 'react-made-with-love';

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
    <div>
      <a href={ `/package/${hit.id}` }>
        <div style={{ marginTop: '10px' }}>
          <p className="hit-name">
            <Highlight attribute="full_name" hit={hit} />
          </p>
          <p className="hit-descr">
            <Highlight attribute="description" hit={hit} />
          </p>
        </div>
      </a>
      <Highlight attribute="stargazers_count" hit={hit} /> <StarIcon />
    </div>
  );
}

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;

    return <Fragment>
      <Grid container className={classes.instantSearchContainer} >
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
      {/* <Grid container justify="center" direction="row" className={classes.footer}>
        <Grid item className={classes.love}>
          <MadeWithLove
            by="gfornari & enricorotundo"
            emoji
          />
        </Grid>
      </Grid> */}
    </Fragment>;
  }
}

export default withStyles(styles)(Home);