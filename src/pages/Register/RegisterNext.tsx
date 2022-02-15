import {
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonLabel,
    setupIonicReact,
    useIonToast
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';
import { useHistory } from 'react-router-dom';
import './Register.css';
import { Pages } from '../../providers/pages.enum';
import { useState } from 'react';
import HttpService from '../../providers/http.service'
import { TestResult } from '../../enum/TestResult.enum';
import { IPatient } from '../../interfaces/IPatient';
import { auth } from '../../config/firebase';
import { useAuth } from '../../providers/auth.provider';

setupIonicReact();

const RegisterNext: React.FC = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [medicalNumber, setMedicalNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const history = useHistory();
    const [present] = useIonToast();

    const {logout} = useAuth();

    function registration() {
        const valid = validateInput();
        if (!valid) {
            present('Please fill out all the required fields', 1500);
        }

        const user: IPatient = {
            medicalId: medicalNumber,
            firstName: firstName,
            lastName: lastName,
            // TODO - drop down for test result
            testResult: TestResult.POSITIVE,
            address: address,
            email: auth.currentUser?.email,
            phoneNumber: phoneNumber
        }
        saveUser(user).then((success) => {
            if (success) {
                present('Successfully registered.', 1500).then(() => {
                    logout();
                    history.push(Pages.login);
                });
            }
            else {
                present('Something went wrong.', 1500);
            }
        });
    }

    function validateInput(): boolean {
        if (medicalNumber.trim() === '') {
            return false;
        }
        if (firstName.trim() === '') {
            return false;
        }
        if (lastName.trim() === '') {
            return false;
        }
        if (address.trim() === '') {
            return false;
        }
        if (phoneNumber.trim() === '') {
            return false;
        }
        return true;

    }

    async function saveUser(user: IPatient): Promise<boolean> {
        const response = await HttpService.post('patients/create', user);
        return response.ok;
    }

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

                    <br/><br/>

                    <IonLabel className="login-text">First Name </IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your First Name" type="text"
                              onIonChange={(e: any) => setFirstName(e.target.value)}/>

                    <br/><br/>

                    <IonLabel className="login-text">Last Name</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Last Name" type="text"
                              onIonChange={(e: any) => setLastName(e.target.value)}/>

                    <br/><br/>

                    <IonLabel className="login-text">Test Results</IonLabel>
                    <IonInput className="login-text-field" placeholder="positive or negative" type="text"/>

                    <br/><br/>

                    <IonLabel className="login-text">Your Address</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Address" type="text"
                              onIonChange={(e: any) => setAddress(e.target.value)}/>

                    <br/><br/>

                    <IonLabel className="login-text">Medical card number</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your medical card number" type="text"
                              onIonChange={(e: any) => setMedicalNumber(e.target.value)}/>
                    <br/><br/>

                    <IonLabel className="login-text">Phone number</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your phone number" type="text"
                              onIonChange={(e: any) => setPhoneNumber(e.target.value)}/>
                    <br/><br/>


                    <IonButton size="large" expand="block" fill="solid" color={'dark-blue'}
                               onClick={registration}>Register</IonButton>
                </div>
            </IonContent>

        </IonApp>
    );
};

export default RegisterNext;
