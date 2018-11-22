import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import APIGateway from '../APIGateway';
import { List, ListItem, ListItemText } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class MostRecentPackages extends Component {
  constructor() {
    super();

    this.state = {
      repos: []
    }
  }

  async componentDidMount() {
    let repos = await APIGateway.getRepos({ sortBy: 'updated_at', sort: -1, limit: 10 });
    repos = repos.data;
    this.setState({ repos });
  }

  render() {
    const { repos } = this.state;

    return <Fragment>
      <List subheader="Recently updated repositories">
        {repos.map((repo, i) => {
          return (
            <ListItem key={i}>
              <ListItemText primary={repo.full_name} />
            </ListItem>
          )
        })}
      </List>
    </Fragment>;
  }
}

export default withStyles(styles)(MostRecentPackages);