import {
    IonApp,
    IonButton,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonRouterLink,
    setupIonicReact
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';

import {useState} from "react";

import './Login.css';
setupIonicReact();

const Login: React.FC = () => {
    const [checked] = useState(false);
    return (
        <IonApp>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <IonImg className="login-logo" src={CovidTrackerTransparent}/>
                <div className="sign-in-center">
                    <h2 className="login-text">Sign In</h2>
                </div>
                <div className="ion-align-items-center; login-form-center">
                    <IonLabel className="login-text">Username</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your username" type="text"/>
                    <br/><br/>
                    <IonLabel className="login-text">Password</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your password" type="password"/>

                    <IonItem className='ion-item' lines='none'>
                        <div slot="start">
                            <IonCheckbox slot='end' className={"custom-checkbox"} checked={checked} />
                        </div>
                        <IonLabel>Remember me</IonLabel>
                        <IonRouterLink href="#" color="#4D4D4D" className="underline">Forgot Password?</IonRouterLink>
                    </IonItem>
                    <IonButton size="large" expand="block" fill="solid" color={"dark-blue"}>LOGIN</IonButton>
                    <br/>
                    <p className={"register-text"}> Do not have an account ? <a href={"/register"} className={"register-text-color"}> Register</a> </p>
                </div>

            </IonContent>

        </IonApp>
    );
};

export default Login;
