import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/App.css';
import reportWebVitals from './reportWebVitals';

import HomePage from './views/home/HomePage';
import PastCrimePage from './views/past-crime/PastCrimePage';
import CurrentCrimePage from './views/current-crime/CurrentCrimePage';
import LoginPage from './views/login/LoginPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/past-crime-form" exact={true} component={PastCrimePage} />
        <Route path="/current-crime-form" exact={true} component={CurrentCrimePage} />
        <Route path="/login" exact={true} component={LoginPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
