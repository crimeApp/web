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
import HomeAdminPage from './admin/home';
import MapAdminPage from './admin/MapPage/map';
import StadisticsPage from './admin/StadisticPage/stadistic';
import UsersAdminPage from './admin/users';
import BarPage from './admin/StadisticPage/layers/barPage';
import LinePage from './admin/StadisticPage/layers/linePage';
import PiePage from './admin/StadisticPage/layers/PiePage';
import PolarPage from './admin/StadisticPage/layers/PolarPage';

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
                <Route path="/admin/login" exact={true} component={LoginPage} />
                <Route path="/admin/forget-password" exact={true} component={ForgetPasswordPage} />
                <Route path="/admin/home" exact={true} component={HomeAdminPage} />
                <Route path="/admin/users" exact={true} component={UsersAdminPage} />
                <Route path="/admin/map" exact={true} component={MapAdminPage} />
                <Route path="/admin/statistics" exact={true} component={StadisticsPage} />
                <Route path="/admin/statistics/bar" exact={true} component={BarPage} />
                <Route path="/admin/statistics/line" exact={true} component={LinePage} />
                <Route path="/admin/statistics/pie" exact={true} component={PiePage} />
                <Route path="/admin/statistics/polar" exact={true} component={PolarPage} />
            </AdminContext.Provider>
        </Switch>
    </Router>
}

export default App;
