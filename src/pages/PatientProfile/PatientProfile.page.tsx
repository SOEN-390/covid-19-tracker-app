import { IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PatientInformation from '../../components/PatientInformation/PatientInformation';
import NavBar from '../../components/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import { TestResult } from '../../enum/TestResult.enum';
import { Gender } from '../../enum/Gender.enum';
import { ISymptom, ISymptomResponse } from '../../interfaces/ISymptom';
import { Patient } from '../../objects/Patient.class';
import './PatientProfile.page.scss';
import { IPatient } from '../../interfaces/IPatient';
import { useParams } from 'react-router';

const PatientProfilePage: React.FC = () => {

	const params = useParams<{medicalId: string | undefined}>();

	const {currentProfile} = useAuth();

	const [medicalNumber, setMedicalNumber] = useState<string>('');
	const [patientProfile, setPatientProfile] = useState<IPatient>(
		new Patient('', '', '', '', '', '', '', TestResult.PENDING, '', Gender.NONE)
	);
	const [symptomsList, setSymptomsList] = useState<ISymptom[]>([]);
	const [symptomsResponse, setSymptomsResponse] = useState<ISymptomResponse[]>([]);

	useEffect(() => {
		if (currentProfile.getRole() === UserType.PATIENT) {
			setMedicalNumber(currentProfile.medicalId);
			setPatientProfile(currentProfile);
		}
	}, []);

	useEffect(() => {
		if (!params.medicalId) {
			return;
		}
		setMedicalNumber(params.medicalId);
	}, [params.medicalId]);

	useEffect(() => {
		if (medicalNumber === '' || currentProfile.getRole() === UserType.PATIENT) {
			return;
		}
		reset();
		getPatientInfo();
	}, [medicalNumber]);

	function reset() {
		setPatientProfile(
			new Patient('', '', '', '', '', '', '', TestResult.PENDING, '', Gender.NONE)
		);
		setSymptomsList([]);
		setSymptomsResponse([]);
	}

	async function getPatientInfo() {
		try {
			await getPatientWithId();
			if (currentProfile.getRole() === UserType.DOCTOR) {
				getSymptoms();
				getPatientSymptomHistory();
			}
		} catch(error)  {
			console.log(error);
			reset();
		}
	}

	// Throwable function. Always try-catch
	async function getPatientWithId() {
		let path = '';
		if (currentProfile.getRole() === UserType.DOCTOR) {
			path = `doctors/patient/${medicalNumber}`;
		} else if (currentProfile.getRole() !== UserType.PATIENT) {
			path = `patients/${medicalNumber}`;
		}
		const data = await HttpService.get(path) as IPatient;
		if (!data.medicalId) {
			return;
		}
		setPatientProfile(data);
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

	async function getPatientSymptomHistory() {
		try {
			const data: ISymptomResponse[] =
				await HttpService.get(`doctors/${currentProfile.licenseId}/patient/${medicalNumber}/symptoms/history`);
			setSymptomsResponse(data);
		} catch (e) {
			setSymptomsResponse([]);
		}
	}

	function handleChange(patient: IPatient) {
		if (currentProfile.getRole() === UserType.PATIENT) {
			setPatientProfile(patient);
			return;
		}
		setPatientProfile({...patient} as IPatient);
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			{
				patientProfile.medicalId !== '' ?
					<PatientInformation patient={patientProfile} onChange={handleChange}
						symptomsList={symptomsList} symptomsResponse={symptomsResponse}
					/> :
					<IonTitle className={'patient-profile'}>
						<IonLabel>Enter the Medical ID of a patient above then press Search</IonLabel>
					</IonTitle>
			}
		</IonPage>
	);
};

export default PatientProfilePage;
