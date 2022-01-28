import {
    IonApp, IonButton, IonCheckbox, IonCol,
    IonContent, IonGrid,
    IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonRouterLink,
    IonRouterOutlet, IonRow,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import CovidTrackerTransparent from '../assets/images/CovidTrackerTransparent.png'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '../components/Accounts.css'
import '../components/common.css'
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
import {useState} from "react";

/* Theme variables */
import '../theme/variables.css';
// import {text} from "ionicons/icons";

setupIonicReact();

const App: React.FC = () => {
    const [checked] = useState(false);
    return (
        <IonApp>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <IonImg className="login-logo" src={CovidTrackerTransparent}></IonImg>
                <IonContent className="sign-in-center">
                    <h2 className="login-text">Sign In</h2>
                </IonContent>
                <IonContent className="login-form-center">
                    <IonLabel className="login-text">Username</IonLabel>
                    <IonInput className={"login-text-field"} placeholder="Enter your username" type="text"></IonInput>
                    <br /><br />
                    <IonLabel className="login-text">Password</IonLabel>
                    <IonInput className={"login-text-field"}  placeholder="Enter your password" type="password"></IonInput>

                        <IonItem lines = 'none'>
                            <IonCheckbox className={"custom-checkbox"} checked={checked}/>
                            <IonLabel>&nbsp;Remember me</IonLabel>
                            <IonRouterLink href="#" color="#4D4D4D" className="underline">Forgot Password?</IonRouterLink>
                        </IonItem>
                        <IonButton size="large" expand="block" fill="solid" color={"dark-blue"}>LOGIN</IonButton>


                </IonContent>



            </IonContent>

        </IonApp>
    );
};

export default App;
