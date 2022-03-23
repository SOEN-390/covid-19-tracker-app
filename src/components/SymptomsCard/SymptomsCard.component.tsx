import React, { useState } from 'react';
import { Patient } from '../../objects/Patient.class';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonModal, useIonToast
} from '@ionic/react';
import { ISymptomResponse } from '../../interfaces/ISymptom';
import HttpService from '../../providers/http.service';

const SymptomsCardComponent: React.FC<{ patient: Patient, trigger: string}> = (props) => {

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [symptoms, setSymptoms] = useState<ISymptomResponse[]>([]);
	const [present] = useIonToast();

	async function getLatestSymptoms(): Promise<void> {
		try {
			const data = await HttpService.get(`patients/${props.patient.medicalId}/latest-symptoms`);
			setSymptoms(data);
		}
		catch (e) {
			present('Patient has not submitted any symptoms', 1500);
		}
	}


	return (
		<IonModal className={'symptoms.card__modal'}
				  isOpen={modalOpen} trigger={props.trigger}
				  onWillPresent = {async () => {
					  getLatestSymptoms();
					  setModalOpen(true);
				  }}>
			<IonCard>
				<IonCardContent>
					{ symptoms && symptoms.length > 0 &&
						symptoms.map((data, index) => {
							return (
								<IonCardHeader key={index}>{data.description}
								</IonCardHeader>
							);
						})
					}
					{
						symptoms && symptoms.length > 0 &&
						<IonCardHeader>Submitted on
							<IonCardSubtitle>{symptoms[0].onDate}</IonCardSubtitle>
						</IonCardHeader>
					}
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close Symptoms Form</IonButton>
		</IonModal>
	);
};

export default SymptomsCardComponent;
