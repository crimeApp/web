import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/App.css';
import reportWebVitals from './reportWebVitals';

import HomePage from './views/home/HomePage';
import PastCrimePage from './views/past-crime/PastCrimePage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/past-crime-form" exact={true} component={PastCrimePage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
