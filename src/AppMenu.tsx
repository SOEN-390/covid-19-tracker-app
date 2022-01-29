import {IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Redirect, Route} from 'react-router-dom';
import Menu from './components/Menu';
import Overview from './pages/Overview/Overview';
import Appointments from './pages/Appointments/Appointments';
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
import SymptomsForm from './pages/SymptomsForm/SymptomsForm';

setupIonicReact();

const AppMenu: React.FC = () => {
    return (
                <IonSplitPane contentId="home">
                    <Menu/>
                    <IonRouterOutlet id="home">
                        <Route path="/home" exact={true}>
                            <Redirect to="/home/symptoms"/>
                        </Route>

                        <Route path="/home/overview">
                            <Overview/>
                        </Route>
                        <Route path="/home/appointments">
                            <Appointments/>
                        </Route>
                        <Route path="/home/symptoms">
                            <SymptomsForm/>
                        </Route>

                    </IonRouterOutlet>
                </IonSplitPane>
    );
};

export default AppMenu;