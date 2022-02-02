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
import {loginUser} from '../../../src/firebaseconfig';
import {useState} from "react";
import {getCurrentUser} from '../../../src/firebaseconfig';
import {useEffect} from 'react';
import './Login.css';
import {Redirect, Route} from "react-router";
import {useHistory} from "react-router-dom";

setupIonicReact();

const Login: React.FC = () => {
    const [checked] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory();


    async function login() {
        const rest = await loginUser(email, password)
        alert(rest)
        if (rest) {
            history.push('/home')

        }
    }

    useEffect(() => {
        getCurrentUser().then(user => {
            if (user) {
                console.log("logged in")
                // i'm logged in
                // history.push('/home')
            } else {
                console.log("not logged in")
            }
        });
    });

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
                    <IonLabel className="login-text">Email</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Email" type="text"
                              onIonChange={(e: any) => setEmail(e.target.value)}/>

                    <br/><br/>
                    <IonLabel className="login-text">Password</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your password" type="password"
                              onIonChange={(e: any) => setPassword(e.target.value)}/>

                    <IonItem className='ion-item' lines='none'>
                        <div slot="start">
                            <IonCheckbox slot='end' className={"custom-checkbox"} checked={checked}/>
                        </div>
                        <IonLabel>Remember me</IonLabel>
                        <IonRouterLink href="#" color="#4D4D4D" className="underline">Forgot Password?</IonRouterLink>
                    </IonItem>
                    <IonButton onClick={login} size="large" expand="block" fill="solid"
                               color={"dark-blue"}>LOGIN</IonButton>
                    <br/>
                    <p className={"register-text"}> Do not have an account ? <a href={"/register"}
                                                                                className={"register-text-color"}> Register</a>
                    </p>
                </div>

            </IonContent>

        </IonApp>
    );
};

export default Login;
