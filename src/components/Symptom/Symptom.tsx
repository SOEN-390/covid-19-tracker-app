import {
	IonButton,
	IonCardHeader,
	IonCheckbox,
	IonCol,
	IonContent,
	IonGrid,
	IonLabel,
	IonRow,
	useIonToast
} from '@ionic/react';
import './Symptom.scss';
import React from 'react';
import { ISymptom } from '../../interfaces/ISymptom';
import HttpService from '../../providers/http.service';
import useAuth from '../../providers/auth.provider';

const Symptom: React.FC<{symptomsList: ISymptom[], handleSubmit: () => void}> = (props) => {

	const {currentProfile} = useAuth();
	const [present] = useIonToast();

	function handleCheck(e: string): void {
		if (!props.symptomsList) {
			return;
		}
		for (const symp of props.symptomsList) {
			if (symp.name === e) {
				symp.isChecked = true;
				break;
			}
		}
	}

	async function submitSymptoms(): Promise<void> {
		try {
			await HttpService.post(`patients/${currentProfile.id}/symptoms/response`, {
				responseList: props.symptomsList
			});
			present('Successfully submitted response', 1500);
			props.handleSubmit();
		} catch (e) {
			present('Failed to submit Symptoms', 1500);
		}
	}

	return (
		<IonContent className={'symptom__content'}>
			<IonGrid>
				<IonCardHeader>List of Symptoms requested by your Doctor</IonCardHeader>
				<form className={'symptom__form'}>
					{props.symptomsList.map((el, index) => <IonRow
						key={index}>
						<IonCheckbox value={el.name} checked={el.isChecked} onIonChange={e => handleCheck(e.detail.value)} />
						<IonCol><IonLabel>{el.description}</IonLabel></IonCol></IonRow>)}
				</form>
			</IonGrid>
			<IonButton onClick={() => submitSymptoms()}>Submit</IonButton>
		</IonContent>

	);
};

export default Symptom;

