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
import ForgetPasswordPage from './admin/config/forget-password-page';
import HomeAdminPage from './admin/HomePage/home';
import MapAdminPage from './admin/MapPage/map';
import StadisticsPage from './admin/StadisticPage/stadistic';
import UsersAdminPage from './admin/UserPage/UsersPage';
import UserAdminPage from './admin/UserPage/UserPage';
import BarPage from './admin/StadisticPage/layers/barPage';
import LinePage from './admin/StadisticPage/layers/linePage';
import PiePage from './admin/StadisticPage/layers/PiePage';
import PolarPage from './admin/StadisticPage/layers/PolarPage';
import ConfigAdminPage from './admin/config/ConfigPage';
import ConfigStadisticPage from './admin/StadisticPage/layers/ConfigStadisticPage';
import EditProfileAdmin from './admin/config/EditProfile';
import Translate from '../assets/traslate';

const App = () => {
    const [admin_state, admin_dispatch] = useReducer(AdminReducer, InitAdminState),
    TRANSLATE = Translate["ES"]

    return <Router>
        <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/crime-form" exact={true} component={CrimeFormPage} />
            <Route path="/review-past" exact={true} component={LoginPage} />
            <Route path="/crime-map" exact={true} component={CrimeMapPage} />
            <Route path="/contact" exact={true} component={ContactPage} />
            <AdminContext.Provider value={{ admin_state, admin_dispatch }}>
                <Route path={TRANSLATE.ROUTES.ADMIN.LOGIN} exact={true} component={LoginPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.FORGET_PASSWORD} exact={true} component={ForgetPasswordPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.HOME} exact={true} component={HomeAdminPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.USERS} exact={true} component={UsersAdminPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.USERS + "/:id"} exact={true} component={UserAdminPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.MAP} exact={true} component={MapAdminPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.CONFIG.HOME} exact={true} component={ConfigAdminPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.CONFIG.EDIT_PROFILE} exact={true} component={EditProfileAdmin} />
                <Route path={TRANSLATE.ROUTES.ADMIN.CONFIG.EDIT_PASSWORD} exact={true} component={EditProfileAdmin} />
                <Route path={TRANSLATE.ROUTES.ADMIN.STADISTICS.HOME} exact={true} component={StadisticsPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.STADISTICS.BAR}  exact={true} component={BarPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.STADISTICS.LINE}  exact={true} component={LinePage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.STADISTICS.PIE} exact={true} component={PiePage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.STADISTICS.POLAR} exact={true} component={PolarPage} />
                <Route path={TRANSLATE.ROUTES.ADMIN.STADISTICS.CONFIG} exact={true} component={ConfigStadisticPage} />
            </AdminContext.Provider>
        </Switch>
    </Router>
}

export default App;
