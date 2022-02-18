import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AppMenu from './AppMenu';
import RegisterNext from './pages/Register/RegisterNext';
import { Pages } from './providers/pages.enum';
import AdminDashboard from './pages/Admin/AdminDashboard'

import { AuthProvider } from './providers/auth.provider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SettingsPage from './pages/Settings/Settings.page';


setupIonicReact();

const App: React.FC = () => {

    return (
        <IonApp>
            <AuthProvider>
                <IonReactRouter>
                    <IonRouterOutlet id="main">
                        <Route path="" exact={true}>
                            <Redirect to={Pages.login}/>
                        </Route>
                        <Route path={Pages.login} exact={true}>
                            <Login/>
                        </Route>
                        <Route path={Pages.register} exact={true}>
                            <Register/>
                        </Route>
                        <Route path="/register/2" exact={true}>
                            <RegisterNext/>
                        </Route>
                        <PrivateRoute path={Pages.home} component={AppMenu}/>
                        <PrivateRoute path={Pages.admin} component={AdminDashboard}/>
                        <PrivateRoute path={Pages.settings} component={SettingsPage}/>

                    </IonRouterOutlet>
                </IonReactRouter>
            </AuthProvider>
        </IonApp>
    );
};

export default App;
