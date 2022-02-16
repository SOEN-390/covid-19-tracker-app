import {
    IonApp,
    IonButton,
    IonContent, IonHeader,
    IonImg,
    IonInput,
    IonLabel,
    setupIonicReact
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';
import { useState } from 'react';
import { useAuth } from '../../providers/auth.provider';
import './Register.css';
import { useHistory } from 'react-router-dom';

setupIonicReact();

const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const {signup} = useAuth();
    let history = useHistory();

    async function register() {
        //validation
        if (password !== cpassword) {
            console.log('password don\'t match')
        }
        if (email.trim() === '' || password.trim() === '') {
            console.log('username and password are required')
        }

        const rest = await signup(email, password)

        if (rest) {
            //redirect to next page
            history.push('/register/2')
        }
    }

    return (
        <IonApp>
            <IonHeader>
            </IonHeader>

            <IonContent>
                <IonImg className="login-logo" src={CovidTrackerTransparent}/>
                <div className="sign-in-center">
                    <IonLabel className="login-text">Protect Yourself</IonLabel>
                    <h2 className="login-text">Sign Up</h2>
                </div>
                <div className="ion-align-items-center; login-form-center">

                    <br/><br/>

                    <IonLabel className="login-text">Email</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your email" type="text"
                              onIonChange={(e: any) => setEmail(e.target.value)}/>

                    <br/><br/>
                    <IonLabel className="login-text">New Password</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter a password" type="password"
                              onIonChange={(e: any) => setPassword(e.target.value)}/>

                    <br/><br/>

                    <IonLabel className="login-text">Confirm your password</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter a password" type="password"
                              onIonChange={(e: any) => setCPassword(e.target.value)}/>

                    <br/><br/>

                    <IonButton onClick={register} size="large" expand="block" fill="solid"
                               color={'dark-blue'}>Next</IonButton>
                </div>
            </IonContent>

        </IonApp>
    );
};

export default Register;
