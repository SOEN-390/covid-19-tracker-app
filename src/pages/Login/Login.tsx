import {
    IonApp,
    IonButton, IonCard,
    IonCheckbox, IonCol,
    IonContent, IonGrid,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonRouterLink, IonRow,
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
            <IonContent>
                <IonImg className="login__logo" src={CovidTrackerTransparent}/>
                <h2 className="login__text">Sign In</h2>
                <div className="ion-align-items-center; login__form">
                    <IonLabel className="login__text">Email</IonLabel>
                    <IonInput className="login__text-field" placeholder="Enter your Email" type="text"
                              onIonChange={(e: any) => setEmail(e.target.value)}/>

                    <br/><br/>
                    <IonLabel className="login__text">Password</IonLabel>
                    <IonInput className="login__text-field" placeholder="Enter your password" type="password"
                              onIonChange={(e: any) => setPassword(e.target.value)}/>

                    <IonItem className="login__ion-item" lines="none">
                        <div slot="start">
                            <IonCheckbox slot="end" className={'custom-checkbox'} checked={checked}/>
                        </div>
                        <IonLabel>Remember me</IonLabel>
                        <IonRouterLink href="#" color="#4D4D4D" className="underline">Forgot Password?</IonRouterLink>
                    </IonItem>
                    <br/>
                    <IonButton onClick={loginUser} className={'login__btn'} size="large" expand="block" fill="solid"
                               color={'dark-blue'}>LOGIN</IonButton>
                    <br/>
                    <p className={'login__register-text'}> Do not have an account? <br/>
                        <a href={Pages.register} className={'.login__register-btn'}>Register</a>
                    </p>
                </div>
            </IonContent>
        </IonApp>
    );
};

export default Login;
