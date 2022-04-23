import { IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import Symptom from '../../components/Symptom/Symptom';
import React, { useEffect, useState } from 'react';
import { ISymptom } from '../../interfaces/ISymptom';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';
import { useStateIfMounted } from 'use-state-if-mounted';

const SymptomsFormPage: React.FC = () => {

	const {currentProfile} = useAuth();
	const [symptomsList, setSymptomsList] = useStateIfMounted<ISymptom[]>([]);
	const [requestExist, setRequestExist] = useStateIfMounted<boolean>(false);

	useEffect(() => {
		getMyRequestedSymptoms();
	}, []);

	async function getMyRequestedSymptoms(): Promise<void> {
		try {
			const symptoms: ISymptom[] = [];
			const data: ISymptom[] = await HttpService.get(`patients/${currentProfile.medicalId}/symptoms`);
			for (const symptom of data) {
				symptoms.push({name: symptom.name, description: symptom.description, isChecked: false});
			}
			setSymptomsList(symptoms);
			setRequestExist(true);
		} catch (e) {
			setRequestExist(false);
		}
	}

	function handleSubmit(): void {
		setRequestExist(false);
	}

	return (
		<IonPage>

			<IonToolbar>
				<NavBar/>
			</IonToolbar>

			{
				requestExist ?
					<Symptom symptomsList={symptomsList} handleSubmit={handleSubmit}
							 data-testid={'symptoms-form__symptoms'}
					/> :
					<IonTitle>
						<IonLabel>You do not have any pending symptoms form requested by your Doctor</IonLabel>
					</IonTitle>
			}

		</IonPage>
	);
};

export default SymptomsFormPage;
