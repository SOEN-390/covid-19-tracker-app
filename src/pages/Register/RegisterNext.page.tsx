import {
	InputChangeEventDetail,
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
import './Register.page.css';
import { Pages } from '../../providers/pages.enum';
import React, { useState } from 'react';
import HttpService from '../../providers/http.service';
import { TestResult } from '../../enum/TestResult.enum';
import { IPatient } from '../../interfaces/IPatient';
import { auth } from '../../config/firebase';
import { useAuth } from '../../providers/auth.provider';
import { Gender } from '../../enum/Gender.enum';

setupIonicReact();

const RegisterNextPage: React.FC = () => {

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

	const { logout } = useAuth();

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
			gender: gender
		};

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
			if (dob.trim() === '') {
				present('Please enter your date of birth', 1500);
				return false;
			}
			return true;
		}

		saveUser(user).then(async (success) => {
			if (success) {
				logout();
				present('Successfully registered.', 0);
				history.push(Pages.login);
			} else {
				present('Something went wrong.', 1500);
			}
		});
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
				<IonImg className="register__logo" src={CovidTrackerTransparent} />
				<h2 className="register__login-text">Sign Up</h2>

				<br />
				<div className={'ion-text-center'}>
					<IonLabel text-center className="register__login-text">Protect Yourself</IonLabel>
				</div>

				<div className="ion-align-items-center; register__form">
					<IonLabel className="register__login-text">First Name</IonLabel>
					<IonInput className="register__text-field" placeholder="Enter your First Name" type="text" required={true}
						value={firstName} data-testid={'register__first_name-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setFirstName(e.detail.value || '')} />

					<br />

					<IonLabel className="register__login-text">Last Name</IonLabel>
					<IonInput className="register__text-field" placeholder="Enter your Last Name" type="text" required={true}
						value={lastName} data-testid={'register__last_name-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setLastName(e.detail.value || '')} />
					<br />

					<IonLabel className="register__login-text">Medical Card Number</IonLabel>
					<IonInput className="register__text-field" placeholder="Enter your medical card number" type="text" required={true}
						value={medicalNumber} data-testid={'register__medicalCard-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setMedicalNumber(e.detail.value || '')} />
					<br />

					<IonLabel className="register__login-text">Your Date of Birth</IonLabel>
					<IonInput className="register__text-field" placeholder="MM/DD/YYYY" type="date" required={true}
						value={dob} data-testid={'register__dob-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setDOB(e.detail.value || '')} />
					<br />

					<IonLabel className="register__login-text">Your Address</IonLabel>
					<IonInput className="register__text-field" placeholder="Enter your Address" type="text" required={true}
						value={address} data-testid={'register__address-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setAddress(e.detail.value || '')} />
					<br />

					<IonLabel className="register__login-text">Phone number</IonLabel>
					<IonInput className="register__text-field" placeholder="Enter your phone number" type={'tel'} required={true}
						value={phoneNumber} data-testid={'register__phone-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setPhoneNumber(e.detail.value || '')} />
					<br />
					<IonLabel className="register__login-text"> Gender </IonLabel>
					<IonSelect interface="popover" placeholder="Select"
						value={gender} data-testid={'register__gender-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setGender(e.detail.value as Gender || Gender.NONE)}>
						<IonSelectOption value={Gender.MALE}>Male</IonSelectOption>
						<IonSelectOption value={Gender.FEMALE}>Female</IonSelectOption>
						<IonSelectOption value={Gender.NONE}>Prefer not to respond</IonSelectOption>
					</IonSelect>
					<br />
					<IonLabel className="register__login-text"> Test Results </IonLabel>
					<IonSelect interface="popover" placeholder="Select"
						value={testResult} data-testid={'register__result-field'}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
							setTestResult(e.detail.value as TestResult || TestResult.PENDING)}>
						<IonSelectOption value={TestResult.POSITIVE}>Positive</IonSelectOption>
						<IonSelectOption value={TestResult.NEGATIVE}>Negative</IonSelectOption>
						<IonSelectOption value={TestResult.PENDING}>Not tested/Pending</IonSelectOption>
					</IonSelect>
					<br /><br />
					<IonButton className={'register__btn'} size="large" expand="block" fill="solid" color={'dark-blue'}
						data-testid={'register__button'} onClick={registration}
					>
						Register
					</IonButton>
				</div>
			</IonContent>

		</IonApp>
	);

};

export default RegisterNextPage;
