import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Redirect, Route} from 'react-router-dom';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

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
import AppMenu from "./AppMenu";
import RegisterNext from "./pages/Register/RegisterNext";
import { useEffect } from 'react';
import {getCurrentUser} from '../src/firebaseconfig';

setupIonicReact();

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main">
                    <Route path="" exact={true}>
                        <Redirect to="/login"/>
                    </Route>
                    <Route path="/login" exact={true}>
                        <Login/>
                    </Route>
                    <Route path="/register" exact={true}>
                        <Register/>
                    </Route>
                    <Route path="/RegisterNext" exact={true}>
                        <RegisterNext/>
                    </Route>
                    <Route path="/home">
                        <AppMenu/>
                    </Route>
                    
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;