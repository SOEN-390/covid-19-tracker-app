import {
    IonApp, IonButton,
    IonContent, IonImg, IonInput, IonLabel,
    setupIonicReact
} from '@ionic/react';


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


/* Theme variables */
import '../theme/variables.css';


setupIonicReact();

const App: React.FC = () => {

    return (
        <IonApp>
                <IonImg className="login-logo" src={CovidTrackerTransparent}></IonImg>



                <IonContent className="login-form-center sign-in-center">
                    <h2 className="login-text">Sign Up</h2>
                    <br/>
                    <div className="login-text">Protect Yourself</div>
                    <br /><br />
                    <div><IonLabel className="login-text">Email</IonLabel></div>
                    <IonInput className={"login-text-field"} placeholder="Enter your email" type="text"></IonInput>
                    <br /><br />
                    <IonLabel className="login-text">Username</IonLabel>
                    <IonInput className={"login-text-field"} placeholder="Enter a username" type="text"></IonInput>
                    <br /><br />
                    <IonLabel className="login-text">New Password</IonLabel>
                    <IonInput className={"login-text-field"}  placeholder="Enter a password" type="password"></IonInput>
                    <br /><br />

                    <IonButton size="large" expand="block" fill="solid" color={"dark-blue"}>Next</IonButton>


                </IonContent>


        </IonApp>
    );
};

export default App;
