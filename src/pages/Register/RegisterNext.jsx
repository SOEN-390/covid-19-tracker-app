import React, { Component } from 'react'
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

import './Register.css';
setupIonicReact();



export class RegisterNext extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    render() {
        const { values, inputChange } = this.props;
        const {
            values: { email, username, fName, lName, testResult, address, medicalCard }
        } = this.props


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

                    <IonLabel className="login-text">First Name </IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your First Name" type="text" onChange={inputChange('fName')} value={values.fName} />

                    <br /><br />

                    <IonLabel className="login-text">Last Name</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Last Name" type="text" onChange={inputChange('lName')} value={values.lName} />

                    <br /><br />

                    <IonLabel className="login-text">Test Results</IonLabel>
                    <IonInput className="login-text-field" placeholder="positive or negative" type="text" onChange={inputChange('testResult')} value={values.testResult} />

                    <br /><br />

                    <IonLabel className="login-text">Your Address</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Address" type="text" onChange={inputChange('address')} value={values.address} />

                    <br /><br />

                    <IonLabel className="login-text">Medical card number</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your medical card number" type="text" onChange={inputChange('medicalCard')} value={values.medicalCard} />
                    <br /><br />
                    <h1>hiiiii {email}</h1>

                    <IonButton size="large" expand="block" fill="solid" color={"dark-blue"} onClick={this.back} >Back</IonButton>
                    <IonButton size="large" expand="block" fill="solid" color={"dark-blue"} >Register</IonButton>
                </div>
            </IonContent>

        </IonPage>
    )
}
}
export default RegisterNext;