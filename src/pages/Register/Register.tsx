import {
    IonApp,
    IonButton, IonCheckbox,
    IonContent, IonHeader,
    IonImg,
    IonInput, IonItem,
    IonLabel, IonRouterLink,
    setupIonicReact
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';

import './Register.css';
setupIonicReact();

const Register: React.FC = () => {

    return (
        <IonApp>
            <IonHeader>
            </IonHeader>

            <IonContent>
                <IonImg className="login-logo" src={CovidTrackerTransparent}/>
                <div className="sign-in-center">
                    <h2 className="login-text">Sign Up</h2>
                </div>
                <div className="ion-align-items-center; login-form-center">
                    <IonLabel className="login-text">Protect Yourself</IonLabel>

                    <br /><br />

                    <IonLabel className="login-text">Email</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your email" type="text"/>

                    <br /><br />

                    <IonLabel className="login-text">Username</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter a username" type="text"/>

                    <br /><br />

                    <IonLabel className="login-text">New Password</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter a password" type="password"/>

                    <br /><br />

                    <IonButton size="large" expand="block" fill="solid" color={"dark-blue"}>Next</IonButton>
                </div>
            </IonContent>

        </IonApp>
    );
};

export default Register;
