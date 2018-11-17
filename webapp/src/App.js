import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import NotFound from './routes/NotFound';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/otherpath" component={OtherComponent} /> */}
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);