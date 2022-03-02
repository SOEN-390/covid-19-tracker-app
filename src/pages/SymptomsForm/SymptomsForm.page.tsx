import { IonHeader, IonLabel, IonPage, IonTitle } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import Symptom from '../../components/Symptom/Symptom';
import React, { useEffect, useState } from 'react';
import { ISymptom } from '../../interfaces/ISymptom';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';

const SymptomsFormPage: React.FC = () => {

	const {currentProfile} = useAuth();
	const [symptomsList, setSymptomsList] = useState<ISymptom[]>([]);
	const [requestExist, setRequestExist] = useState<boolean>(false);

	useEffect(() => {
		getMyRequestedSymptoms();
	}, []);

	async function getMyRequestedSymptoms() {
		try {
			const symptoms: ISymptom[] = [];
			const data: ISymptom[] = await HttpService.get(`patients/${currentProfile.id}/symptoms`);
			for (const symp of data) {
				symptoms.push({name: symp.name, description: symp.description, isChecked: false});
			}
			setSymptomsList(symptoms);
			setRequestExist(true);
		}
		catch (e) {
			setRequestExist(false);
		}
	}

	function handleSubmit() {
		setRequestExist(false);
	}

	return (
		<IonPage>

			{!requestExist && <IonTitle>
				<IonLabel>You do not have any pending symptoms form requested by your Doctor</IonLabel>
			</IonTitle> }
			{
				requestExist && <Symptom symptomsList = {symptomsList} handleSubmit = {handleSubmit}/>
			}


		</IonPage>
	);
};

export default SymptomsFormPage;
