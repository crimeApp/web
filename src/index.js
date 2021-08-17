import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/App.css';
import reportWebVitals from './reportWebVitals';

import HomePage from './views/home/HomePage';
import CrimeFormPage from './views/crime-form/CrimeFormPage';
import LoginPage from './views/login/LoginPage';
import CrimeMapPage from './views/crime-map/CrimeMapPage';
import ContactPage from './views/contact/ContactPage';

ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/crime-form" exact={true} component={CrimeFormPage} />
        <Route path="/login" exact={true} component={LoginPage} />
        <Route path="/review-past" exact={true} component={LoginPage} />
        <Route path="/crime-map" exact={true} component={CrimeMapPage} />
        <Route path="/contact" exact={true} component={ContactPage} />
      </Switch>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
