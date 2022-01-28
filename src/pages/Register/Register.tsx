import {
    IonApp,
    IonButton,
    IonContent,
    IonImg,
    IonInput,
    IonLabel,
    setupIonicReact
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';

import './Register.css';
setupIonicReact();

const Register: React.FC = () => {

    return (
        <IonApp>
                <IonImg className="login-logo" src={CovidTrackerTransparent}/>

                <IonContent className="login-form-center sign-in-center">
                    <h2 className="login-text">Sign Up</h2>
                    <br/>
                    <div className="login-text">Protect Yourself</div>
                    <br /><br />
                    <div><IonLabel className="login-text">Email</IonLabel></div>
                    <IonInput className="login-text-field" placeholder="Enter your email" type="text"/>
                    <br /><br />
                    <IonLabel className="login-text">Username</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter a username" type="text"/>
                    <br /><br />
                    <IonLabel className="login-text">New Password</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter a password" type="password"/>
                    <br /><br />

                    <IonButton size="large" expand="block" fill="solid" color={"dark-blue"}>Next</IonButton>


                </IonContent>


        </IonApp>
    );
};

export default Register;
