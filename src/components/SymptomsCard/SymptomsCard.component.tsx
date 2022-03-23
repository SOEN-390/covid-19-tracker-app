import React, { useEffect, useState } from 'react';
import { Patient } from '../../objects/Patient.class';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle, IonItem, IonList,
	IonModal, useIonToast
} from '@ionic/react';
import { ISymptomResponse } from '../../interfaces/ISymptom';
import './SymptomsCard.component.scss';
import Moment from 'react-moment';

const SymptomsCardComponent: React.FC<{ patient: Patient, trigger: string, symptoms: ISymptomResponse[]}> = (props) => {

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [present] = useIonToast();

	useEffect(() => {
		if (modalOpen && (!props.symptoms || props.symptoms.length === 0)) {
			setModalOpen(false);
			present('The patient does not have any symptoms', 1500);
		}
	}, [modalOpen]);

	return (
		<IonModal className={'symptoms-card__modal'}
				  isOpen={modalOpen} trigger={props.trigger}
				  onIonModalDidPresent={() => {
					 setModalOpen(true);
			}}
				  hidden={!props.symptoms || props.symptoms.length === 0}>
			<IonCard>
				<IonCardHeader className={'symptoms-card__header'} color={'secondary'}>
					Symptoms of {props.patient.firstName} {props.patient.lastName}</IonCardHeader>
				<IonCardContent>
					{
						props.symptoms && props.symptoms.length > 0 &&
						<IonCardHeader>Submitted on
							<IonCardSubtitle><Moment format={'LLL'}>{props.symptoms[0].onDate}</Moment></IonCardSubtitle>
						</IonCardHeader>
					}
					{ props.symptoms && props.symptoms.length > 0 &&
						props.symptoms.map((data, index) => {
							return (
								<IonList key={index}>
									<IonItem>{data.description}</IonItem>
								</IonList>
							);
						})
					}
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close Symptoms Form</IonButton>
		</IonModal>
	);
};

export default SymptomsCardComponent;
