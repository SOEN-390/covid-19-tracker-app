import {
    IonButton,
    IonContent,
    IonImg,
    IonInput,
    IonLabel,
    IonPage,
    setupIonicReact
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';
import React,{Component} from 'react';
import { registerUser } from '../../../src/firebaseconfig';


import './Register.css';
import { Redirect } from 'react-router';
setupIonicReact();





 export class Register extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values, inputChange } = this.props;
        const {
            values: { email, password, fName, lName, testResult, address, medicalCard }
        } = this.props
        
        async function register(){
            const rest = await registerUser(email , password)
            
            alert(rest)
            if(rest){
              return <Redirect to = '/overview/'/>
            }
          }

        return (
            <IonPage>
                

                <IonContent>
                    <IonImg className="login-logo" src={CovidTrackerTransparent} />
                    <div className="sign-in-center">
                        <h2 className="login-text">Sign Up</h2>
                    </div>
                    <div className="ion-align-items-center; login-form-center">
                        <IonLabel className="login-text">Protect Yourself</IonLabel>

                        <br /><br />

                        <IonLabel className="login-text">Email</IonLabel>
                        <IonInput className="login-text-field" placeholder="Enter your email" type="text" onIonChange={inputChange('email')} value={values.email} />

                        <br /><br />

                    

                        <IonLabel className="login-text">New Password</IonLabel>
                        <IonInput className="login-text-field" placeholder="Enter a password" type="password" onIonChange={inputChange('password')} value={values.password} />

                        <br /><br />
                        

                        <IonButton size="large" expand="block" fill="solid" color={"dark-blue"} onClick={register}>Next</IonButton>
                    </div>
                </IonContent>

            </IonPage>
        )
    }
 }
export default Register;
