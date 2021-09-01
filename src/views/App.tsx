import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../style/App.css';

import HomePage from './home/HomePage';
import CrimeFormPage from './crime-form/CrimeFormPage';
import LoginPage from './login/LoginPage';
import CrimeMapPage from './crime-map/CrimeMapPage';
import ContactPage from './contact/ContactPage';
import { useReducer } from 'react';
import { AdminContext, AdminReducer, InitAdminState } from '../context/admin-context';
import ForgetPasswordPage from './admin/forget-password-page';

const App = () => {
    const [admin_state, admin_dispatch] = useReducer(AdminReducer, InitAdminState)

    return <Router>
        <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/crime-form" exact={true} component={CrimeFormPage} />
            <Route path="/review-past" exact={true} component={LoginPage} />
            <Route path="/crime-map" exact={true} component={CrimeMapPage} />
            <Route path="/contact" exact={true} component={ContactPage} />
            <AdminContext.Provider value={{ admin_state, admin_dispatch }}>
                <Route path="/login" exact={true} component={LoginPage} />
                <Route path="/admin/forget-password" exact={true} component={ForgetPasswordPage} />
            </AdminContext.Provider>
        </Switch>
    </Router>
}

export default App;
