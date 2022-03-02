import {
	IonButton,
	IonContent,
	IonItem,
	IonLabel,
	IonListHeader,
	IonModal,
	IonRadio,
	IonRadioGroup
} from '@ionic/react';
import { TestResult } from '../../enum/TestResult.enum';
import React from 'react';
import { ModalEnum } from '../../enum/Modal.enum';


// TODO - Centralize all modals here if we have time.

const Modal: React.FC<{ modalEnum: ModalEnum }> = (props) => {


	return (
		<IonContent>
			{
				props.modalEnum == ModalEnum.EDIT_STATUS && <IonModal>
					<IonRadioGroup value={status} onIonChange={e => e}>
						<IonListHeader>
							<IonLabel>Edit your Status</IonLabel>
						</IonListHeader>
						<IonItem>
							<IonLabel>Positive</IonLabel>
							<IonRadio slot="start" value={TestResult.POSITIVE}/>
						</IonItem>

						<IonItem>
							<IonLabel>Negative</IonLabel>
							<IonRadio slot="start" value={TestResult.NEGATIVE}/>
						</IonItem>

						<IonItem>
							<IonLabel>Not tested/Pending</IonLabel>
							<IonRadio slot="start" value={TestResult.PENDING}/>
						</IonItem>

					</IonRadioGroup>

					<IonButton color="success" onClick={e => e}>Save</IonButton>
					<IonButton color="danger" onClick={e => e}>Cancel</IonButton>
				</IonModal>
			}
		</IonContent>
	);
};
export default Modal;
