import {
    IonApp,
    IonContent,
    IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonLabel,
    IonRouterOutlet,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import CovidTracker from './assets/images/CovidTracker.png'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './components/accounts.css'
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
import {text} from "ionicons/icons";

setupIonicReact();

const App: React.FC = () => {
    return (
        <IonApp>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <IonImg className="login-logo" src={CovidTracker}></IonImg>
                <IonContent className="sign-in-center">
                    <h2 className="text-colour">Sign In</h2>
                </IonContent>
                <IonContent className="login-form-center">
                    <IonLabel className="text-colour">Username</IonLabel>
                    <IonInput className={"login-text-field"} placeholder="Enter your username" type="text"></IonInput>
                    <br /><br />
                    <IonLabel className="text-colour">Password</IonLabel>
                    <IonInput className={"login-text-field"}  placeholder="Enter your password" type="password"></IonInput>
                </IonContent>



            </IonContent>

        </IonApp>
    );
};

export default App;
