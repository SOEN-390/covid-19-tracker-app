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
    setupIonicReact,
    useIonToast
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';
import { useState } from 'react';
import './Login.css';
import { Pages } from '../../providers/pages.enum';
import { useAuth } from '../../providers/auth.provider';

setupIonicReact();

const Login: React.FC = () => {
    const {login} = useAuth();
    const [checked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [present] = useIonToast();

    async function loginUser() {
        login(email, password).then(() => {
            present('Successfully logged in.', 1500);
        }).catch((error: any) => {
            present('Something went wrong. Please try again.', 1500);
        });
    }

    return (
        <IonApp>
            <IonHeader>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </IonHeader>
            <IonContent>
                <IonImg className="login-logo" src={CovidTrackerTransparent}/>
                <div className="sign-in-center">
                    <h2 className="login-text">Sign In</h2>
                </div>
                <div className="ion-align-items-center; login-form-center">
                    <IonLabel className="login-text">Email</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Email" type="text"
                              onIonChange={(e: any) => setEmail(e.target.value)}/>

                    <br/><br/>
                    <IonLabel className="login-text">Password</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your password" type="password"
                              onIonChange={(e: any) => setPassword(e.target.value)}/>

                    <IonItem className="ion-item" lines="none">
                        <div slot="start">
                            <IonCheckbox slot="end" className={'custom-checkbox'} checked={checked}/>
                        </div>
                        <IonLabel>Remember me</IonLabel>
                    </IonItem>
                    <IonItem className="ion-item" lines="none">
                        <IonRouterLink href="#" color="#4D4D4D" className="underline">Forgot Password?</IonRouterLink>
                    </IonItem>
                    <IonButton onClick={loginUser} size="large" expand="block" fill="solid"
                               color={'dark-blue'}>LOGIN</IonButton>
                    <br/>
                    <p className={'register-text'}> Do not have an account? <br/>
                        <a href={Pages.register} className={'register-text-color'}>Register</a>
                    </p>
                </div>

            </IonContent>

        </IonApp>
    );
};

export default Login;
