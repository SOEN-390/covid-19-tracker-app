import {
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
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
import { Gender } from '../../enum/Gender.enum';

setupIonicReact();

const RegisterNext: React.FC = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [medicalNumber, setMedicalNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [testResult, setTestResult] = useState('')
    const [dob, setDOB] = useState('')
    const [gender, setGender] = useState('')

    const history = useHistory();
    const [present] = useIonToast();

    const {logout} = useAuth();

    function registration() {
        const valid = validateInput();
        if (!valid) {
            return;
        }

        const user: IPatient = {
            medicalId: medicalNumber,
            firstName: firstName,
            lastName: lastName,
            // TODO - drop down for test result
            testResult: testResult,
            address: address,
            email: auth.currentUser?.email,
            phoneNumber: phoneNumber,
            dob: dob,
            gender: gender
        }
        saveUser(user).then((success) => {
            if (success) {
                present('Successfully registered.', 1500).then(() => {
                    logout();
                    history.push(Pages.login);
                });
            } else {
                present('Something went wrong.', 1500);
            }
        });
    }

    function validateInput(): boolean {
        if (medicalNumber.trim() === '') {
            present('Please enter your medical card number', 1500);
            return false;
        }
        if (firstName.trim() === '' || lastName.trim() === '') {
            present('Please enter your name', 1500);
            return false;
        }
        if (address.trim() === '') {
            present('Please enter your address', 1500);
            return false;
        }
        if (phoneNumber.trim() === '') {
            present('Please enter your phone number', 1500);
            return false;
        }
        if (gender.trim() === '') {
            present('Please choose one of the options for gender', 1500);
            return false;
        }
        if (dob.trim() === '') {
            present('Please enter your date of birth', 1500);
            return false;
        }
        if (testResult.trim() === '') {
            present('Please choose one of the options for test result', 1500);
            return false;
        }
        return true;
    }

    async function saveUser(user: IPatient): Promise<boolean> {
        try {
            await HttpService.post('patients/create', user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <IonApp>
            <IonHeader>
            </IonHeader>

            <IonContent>
                <IonImg className="register__logo" src={CovidTrackerTransparent}/>
                <h2 className="register__login-text">Sign Up</h2>

                <br/>
                <div className={'ion-text-center'}>
                    <IonLabel text-center className="register__login-text">Protect Yourself</IonLabel>
                </div>

                <div className="ion-align-items-center; register__form">
                    <IonLabel className="register__login-text">First Name </IonLabel>
                    <IonInput className="register__text-field" placeholder="Enter your First Name" type="text"
                              onIonChange={(e: any) => setFirstName(e.target.value)}/>

                    <br/>

                    <IonLabel className="register__login-text">Last Name</IonLabel>
                    <IonInput className="register__text-field" placeholder="Enter your Last Name" type="text"
                              onIonChange={(e: any) => setLastName(e.target.value)}/>
                    <br/>

                    <IonLabel className="register__login-text">Medical Card Number</IonLabel>
                    <IonInput className="register__text-field" placeholder="Enter your medical card number" type="text"
                              onIonChange={(e: any) => setMedicalNumber(e.target.value)}/>
                    <br/>

                    <IonLabel className="register__login-text">Your Date of Birth</IonLabel>
                    <IonInput className="register__text-field" placeholder="MM/DD/YYYY" type="date"
                              onIonChange={(e: any) => setDOB(e.target.value)}/>
                    <br/>

                    <IonLabel className="register__login-text">Your Address</IonLabel>
                    <IonInput className="register__text-field" placeholder="Enter your Address" type="text"
                              onIonChange={(e: any) => setAddress(e.target.value)}/>
                    <br/>

                    <IonLabel className="register__login-text">Phone number</IonLabel>
                    <IonInput className="register__text-field" placeholder="Enter your phone number" type="text"
                              onIonChange={(e: any) => setPhoneNumber(e.target.value)}/>
                    <br/>
                    <IonLabel className="register__login-text"> Gender </IonLabel>
                    <IonSelect interface="popover" placeholder="Select Gender"
                               onIonChange={(e: any) => setGender(e.target.value)}>
                        <IonSelectOption value={Gender.MALE} class="register__status-option"> Male</IonSelectOption>
                        <IonSelectOption value={Gender.FEMALE} class="register__status-option"> Female</IonSelectOption>
                        <IonSelectOption value={Gender.NONE} class="register__status-option"> Prefer not to
                            respond</IonSelectOption>
                    </IonSelect>
                    <br/>
                    <IonLabel className="register__login-text"> Test Result </IonLabel>
                    <IonSelect interface="popover" placeholder="Select Test result"
                               onIonChange={(e: any) => setTestResult(e.target.value)}>
                        <IonSelectOption value={TestResult.POSITIVE}
                                         class="register__status-option"> Positive</IonSelectOption>
                        <IonSelectOption value={TestResult.NEGATIVE}
                                         class="register__status-option"> Negative</IonSelectOption>
                        <IonSelectOption value={TestResult.PENDING} class="register__status-option"> Not
                            tested/Pending</IonSelectOption>
                    </IonSelect>
                    <br/><br/>
                    <IonButton text-align={'center'} className={'register__btn'} expand="block" fill="solid"
                               color={'dark-blue'}
                               onClick={registration}>Register</IonButton>
                </div>
            </IonContent>
        </IonApp>
    );
};

export default RegisterNext;
