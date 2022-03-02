import { IonPage } from '@ionic/react';
import PatientInformation from '../../components/PatientInformation/PatientInformation';
import NavBar from '../../components/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import { TestResult } from '../../enum/TestResult.enum';
import { Gender } from '../../enum/Gender.enum';
import { ISymptom } from '../../interfaces/ISymptom';

const PatientProfilePage: React.FC = () => {

	const {currentProfile} = useAuth();

	const [medicalNumber, setMedicalNumber] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [testResult, setTestResult] = useState<TestResult>(currentProfile.testResult);
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [dob, setDOB] = useState<string>('');
	const [gender, setGender] = useState<Gender>(Gender.NONE);
	const [flagged, setFlagged] = useState<boolean>(false);
	const [symptomsList, setSymptomsList] = useState<ISymptom[]>([]);

	useEffect(() => {
		if (currentProfile.getRole() === UserType.PATIENT) {
			setMedicalNumber(currentProfile.id);
		}
	}, []);

	useEffect(() => {
		if (currentProfile.getRole() == UserType.DOCTOR) {
			getPatientWithIdAsDoctor();
			getSymptoms();
		} else {
			getPatientWithId();
		}

	}, [medicalNumber]);

	async function getPatientWithId() {
		try {
			const data = await HttpService.get(`patients/${medicalNumber}`);
			setData(data);
		} catch (e) {
			console.log(e);
		}
	}

	async function getSymptoms() {
		try {
			const symptoms: ISymptom[] = [];
			const data: ISymptom[] = await HttpService.get('doctors/symptoms');
			for (const symp of data) {
				symptoms.push({name: symp.name, description: symp.description, isChecked: false});
			}
			setSymptomsList(symptoms);
		} catch (e) {
			console.log(e);
		}
	}

	async function getPatientWithIdAsDoctor() {
		try {
			const data = await HttpService.get(`doctors/patient/${medicalNumber}`);
			setData(data);
		} catch (e) {
			console.log(e);
		}
	}

	function setData(data: any) {
		setFirstName(data.firstName);
		setLastName(data.lastName);
		switch (data.testResult) {
			case 'positive':
				setTestResult(TestResult.POSITIVE);
				break;
			case 'negative':
				setTestResult(TestResult.NEGATIVE);
				break;
			default:
				setTestResult(TestResult.PENDING);
		}
		setPhoneNumber(data.phoneNumber);
		setAddress(data.address);
		setEmail(data.email);
		setDOB(data.dob);
		setGender(data.gender);
		setFlagged(data.flagged);
	}

	const handleCallBack = (medicalId: string) => {
		setMedicalNumber(medicalId);
	};

	const handleStatus = (testResult: TestResult) => {
		setTestResult(testResult);
	};

	const handleFlag = (flagged: boolean) => {
		setFlagged(flagged);
	};

	return (
		<IonPage>
			<NavBar callback={handleCallBack}/>
			<PatientInformation patient={{
				medicalId: medicalNumber,
				firstName: firstName,
				lastName: lastName,
				testResult: testResult,
				address: address,
				email: email,
				phoneNumber: phoneNumber,
				dob: dob,
				gender: gender,
				flagged: flagged
			}} updateStatus={handleStatus} updateFlag={handleFlag} symptomsList ={symptomsList} />
		</IonPage>
	);
};

export default PatientProfilePage;
