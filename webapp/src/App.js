import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CookiesProvider } from 'react-cookie';
import Home from './routes/Home';
import Package from './routes/Package';
import NotFound from './routes/NotFound';
import MainBar from './components/MainBar';
import themeFactory from './themeFactory';

const theme = themeFactory();

const App = () => (
  <CookiesProvider>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <MainBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/package/:id" component={Package} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </MuiThemeProvider>
  </CookiesProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);