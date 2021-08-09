import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/App.css';
import reportWebVitals from './reportWebVitals';

import HomePage from './views/home/HomePage';
import PastCrimePage from './views/past-crime/PastCrimePage';
import CurrentCrimePage from './views/current-crime/CurrentCrimePage';
import LoginPage from './views/login/LoginPage';
import CrimeMapPage from './views/crime-map/CrimeMapPage';

ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/past-crime-form" exact={true} component={PastCrimePage} />
        <Route path="/current-crime-form" exact={true} component={CurrentCrimePage} />
        <Route path="/login" exact={true} component={LoginPage} />
        <Route path="/review-past" exact={true} component={LoginPage} />
        <Route path="/crime-map" exact={true} component={CrimeMapPage} />
      </Switch>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
