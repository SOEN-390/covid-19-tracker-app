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
import React, { useState } from 'react';
import HttpService from '../../providers/http.service';
import { TestResult } from '../../enum/TestResult.enum';
import { IPatient } from '../../interfaces/IPatient';
import { auth } from '../../config/firebase';
import { useAuth } from '../../providers/auth.provider';
import { Gender } from '../../enum/Gender.enum';
import { Patient } from '../../objects/Patient.class';

setupIonicReact();

const RegisterNext: React.FC = () => {

	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [medicalNumber, setMedicalNumber] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [testResult, setTestResult] = useState<TestResult>(TestResult.PENDING);
	const [dob, setDOB] = useState<string>('');
	const [gender, setGender] = useState<Gender>(Gender.NONE);

	const history = useHistory();
	const [present] = useIonToast();

	const {logout} = useAuth();

	function registration() {
		const valid = validateInput();
		if (!valid || !auth.currentUser?.email) {
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
			gender: gender,
			flagged: false
		};

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
					<IonLabel className="register__login-text"> Your Gender </IonLabel>
					<IonSelect placeholder="your Gender" onIonChange={(e: any) => setGender(e.target.value)}>
						<IonSelectOption value={Gender.MALE}> Male</IonSelectOption>
						<IonSelectOption value={Gender.FEMALE}> Female</IonSelectOption>
						<IonSelectOption value={Gender.NONE}> Prefer not to respond</IonSelectOption>
					</IonSelect>
					<br/>
					<IonLabel className="register__login-text"> Your test results </IonLabel>
					<IonSelect placeholder="Test result" onIonChange={(e: any) => setTestResult(e.target.value)}>
						<IonSelectOption value={TestResult.POSITIVE}> Positive</IonSelectOption>
						<IonSelectOption value={TestResult.NEGATIVE}> Negative</IonSelectOption>
						<IonSelectOption value={TestResult.PENDING}> Not tested/Pending</IonSelectOption>
					</IonSelect>
					<br/><br/>
					<IonButton className={'register__btn'} size="large" expand="block" fill="solid" color={'dark-blue'}
							   onClick={registration}>Register</IonButton>
				</div>
			</IonContent>

		</IonApp>
	);
};

export default RegisterNext;
