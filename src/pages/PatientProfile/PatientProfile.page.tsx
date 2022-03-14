import { IonLabel, IonPage, IonTitle } from '@ionic/react';
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

const PatientProfilePage: React.FC = () => {

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
		if (medicalNumber === '') {
			return;
		}
		getPatientWithId().then(() => {
			if (currentProfile.getRole() === UserType.DOCTOR) {
				getSymptoms();
				getPatientSymptomHistory();
			}
		}).catch((error) => {
			console.log(error);
			setPatientProfile(
				new Patient('', '', '', '', '', '', '', TestResult.PENDING, '', Gender.NONE)
			);
		});
	}, [medicalNumber]);

	// Throwable function. Always try-catch
	async function getPatientWithId() {
		let path: string;
		if (currentProfile.getRole() === UserType.DOCTOR) {
			path = `doctors/patient/${medicalNumber}`;
		} else if (currentProfile.getRole() !== UserType.PATIENT) {
			path = `patients/${medicalNumber}`;
		} else {
			return;
		}
		const data = await HttpService.get(path) as Patient;
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
				await HttpService.get(`doctors/${currentProfile.id}/patient/${medicalNumber}/symptoms/history`);
			setSymptomsResponse(data);
		} catch (e) {
			setSymptomsResponse([]);
		}
	}

	const handleCallBack = (medicalId: string) => {
		setMedicalNumber(medicalId);
	};

	const handleStatus = (testResult: TestResult) => {
		patientProfile.testResult = testResult;
		setPatientProfile(patientProfile);
	};

	const handleFlag = (flagged: boolean) => {
		patientProfile.flagged = flagged;
		setPatientProfile(patientProfile);
	};

	return (
		<IonPage>
			<NavBar callback={handleCallBack}/>
			{
				patientProfile.medicalId !== '' ?
					<PatientInformation patient={patientProfile} updateStatus={handleStatus}
						updateFlag={handleFlag} symptomsList={symptomsList}
						symptomsResponse={symptomsResponse}
					/> :
					<>
						<br />
						<IonTitle className={'patient-profile'}>
							<IonLabel>Enter the Medical ID of a patient above then press Search</IonLabel>
						</IonTitle>
					</>
			}
		</IonPage>
	);
};

export default PatientProfilePage;
