import {
	ActionSheetButton, InputChangeEventDetail,
	IonButton,
	IonCheckbox,
	IonCol,
	IonContent,
	IonDatetime,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonListHeader,
	IonModal,
	IonRadio,
	IonRadioGroup,
	IonRow,
	IonText,
	useIonActionSheet,
	useIonToast
} from '@ionic/react';
import './PatientInformation.scss';
import { IContact, IPatient } from '../../interfaces/IPatient';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import React, { useEffect, useState } from 'react';
import { TestResult } from '../../enum/TestResult.enum';
import HttpService from '../../providers/http.service';
import { call, close, flag, mail, text } from 'ionicons/icons';
import { ISymptom, ISymptomResponse } from '../../interfaces/ISymptom';
import ContactTracingTableModal from '../ContactTracingTable/ContactTracingTable.modal';
import PatientSymptomsTableModal from '../PatientSymptomsTable/PatientSymptomsTable.modal';
import Moment from 'react-moment';
import moment from 'moment-timezone';

const PatientInformation: React.FC<{
	patient: IPatient, onChange: (patient: IPatient) => void,
	symptomsList: ISymptom[], symptomsResponse: ISymptomResponse[]
}> = (props) => {

	const {currentProfile} = useAuth();

	const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
	const [showSymptomsModal, setShowSymptomsModal] = useState<boolean>(false);
	const [showAppointmentModal, setShowAppointmentModal ] = useState<boolean>(false);
	const [appointmentSubject, setAppointmentSubject ] =useState<string>('');
	const [appointmentDate, setAppointmentDate ] =useState<string>();
	const [contacts, setContacts] = useState<IContact[]>([]);
	const [presentActionSheet, dismissActionSheet] = useIonActionSheet();
	const [present] = useIonToast();

	useEffect(() => {
		if (currentProfile.getRole() === UserType.DOCTOR || currentProfile.getRole() === UserType.HEALTH_OFFICIAL) {
			getPatientsContacts();
		}
	}, [props.patient]);

	async function updateStatus(): Promise<void> {
		try {
			await HttpService.patch(`patients/${currentProfile.medicalId}/status`, {status: props.patient.testResult});
			props.onChange(props.patient);
			currentProfile.testResult = props.patient.testResult;
			currentProfile.lastUpdated = new Date();
			setShowStatusModal(false);
			present('Successfully updated status', 1500);
		} catch (e) {
			present('Failed to update status', 1500);
		}
	}

	async function flagPatient(): Promise<void> {
		try {
			await HttpService.post(`patients/${props.patient.medicalId}/${props.patient.flagged ? 'unflag' : 'flag'}`,
				{role: currentProfile.getRole()});
			props.patient.flagged = !props.patient.flagged;
			props.onChange(props.patient);
			present(`Successfully ${props.patient.flagged ? 'flagged' : 'unflagged'} patient`, 1500);
		} catch (e) {
			present(`Failed to ${props.patient.flagged ? 'unflag' : 'flag'} patient`, 1500);
		}
	}

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
		if (!props.symptomsList) {
			return;
		}
		const symptomsToRequest: string[] = [];
		for (const symp of props.symptomsList) {
			if (symp.isChecked) {
				symptomsToRequest.push(symp.name);
			}
		}
		if (symptomsToRequest.length == 0) {
			present('Please select symptoms to request', 1500);
			return;
		}
		try {
			await HttpService.post(`doctors/${currentProfile.licenseId}/patient/${props.patient.medicalId}/symptoms`, {
				checklist: symptomsToRequest
			});
			setShowSymptomsModal(false);
			present('Successfully requested symptoms', 1500);
		} catch (e) {
			present('You already have a pending request', 1500);
		}
	}

	async function getPatientsContacts() {
		setContacts([]);
		try {
			const data = await HttpService.get(`doctors/patient/${props.patient.medicalId}/contacts`);
			setContacts(data);
		} catch (e) {
			console.log(e);
		}
	}

	function generateContactList(patient: IPatient): ActionSheetButton[] {
		const contactOption: ActionSheetButton[] = [];
		if (patient.email) {
			contactOption.push({
				text: 'Email',
				icon: mail,
				handler: () => {
					window.location.href = `mailto:${patient.email}+?subject=COVID-Tracker&body=`;
				}
			});
		}
		if (patient.email) {
			contactOption.push({
				text: 'Phone',
				icon: call,
				handler: () => {
					window.location.href = `tel:${patient.phoneNumber}`;
				}
			});
		}
		contactOption.push({
			text: 'Cancel',
			icon: close,
			role: 'cancel'
		});
		return contactOption;
	}
	async function setAppointment() {
		const pickedDate = moment(appointmentDate).toDate();
		if (moment().toDate() > pickedDate) {
			present('Please select a valid date', 1500);
			return;
		}
		if (appointmentSubject.trim() === '') {
			present('Please enter a subject', 1500);
			return;
		}
		try {
			await HttpService.post(`doctors/${currentProfile.licenseId}/patients/${props.patient.medicalId}/appointment`, {
				appointment: {
					date: appointmentDate,
					subject: appointmentSubject
				}
			});
			present('Successfully booked appointment', 1500);
			setShowAppointmentModal(false);
		} catch (e) {
			present('You already have a booked appointment with the patient', 1500);
			setShowAppointmentModal(false);
		}
	}


	function setupModals() {
		return (
			<>
				<IonModal isOpen={showStatusModal}>
					<IonContent>
						<IonRadioGroup value={props.patient.testResult}
									   onIonChange={(e: CustomEvent<InputChangeEventDetail>) => {
										   if (e.detail.value) {
											   props.patient.testResult = e.detail.value as TestResult;
										   }
									   }}
						>
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

					</IonContent>
					<IonButton color="success" onClick={() => updateStatus()}>Save</IonButton>
					<IonButton color="danger" onClick={() => setShowStatusModal(false)}>Cancel</IonButton>
				</IonModal>

				<IonModal isOpen={showSymptomsModal}>
					<IonContent>
						{
							props.symptomsList &&
							props.symptomsList.map((el, index) =>
								<IonItem key={index}>
									<IonCheckbox value={el.name} checked={el.isChecked}
												 onIonChange={e => handleCheck(e.detail.value)}/>
									&nbsp;
									<IonLabel>{el.description}</IonLabel>
								</IonItem>
							)
						}
					</IonContent>
					<IonButton color="success" onClick={() => submitSymptoms()}>Request</IonButton>
					<IonButton color="danger" onClick={() => setShowSymptomsModal(false)}>Cancel</IonButton>
				</IonModal>

				<IonModal isOpen={showAppointmentModal}>
					<IonContent>
						<IonDatetime onIonChange={e => setAppointmentDate(e.detail.value!)}/>
						<br/>
						<br/>
						<IonLabel>Subject</IonLabel>
						<IonInput type='text' onIonChange={e => setAppointmentSubject(e.detail.value!)}  placeholder="Enter the subject"/>
					</IonContent>
					<IonButton color="success" onClick={() => (setAppointment())}>Set appointment</IonButton>
					<IonButton color="danger" onClick={() => setShowAppointmentModal(false)}>Cancel</IonButton>
				</IonModal>


				<ContactTracingTableModal trigger={'patient-information__contact-tracing-trigger'}
										  contacts={contacts}/>

				<PatientSymptomsTableModal symptomsList={props.symptomsList} symptomsResponse={props.symptomsResponse}
										   trigger={'patient-information__patient-symptoms-trigger'} />
			</>
		);
	}

	return (
		<IonContent>
			{
				props.patient.medicalId !== '' &&

				<div className="patient-information__container">
					<IonRow>
						<IonCol>
							<IonRow>
								<div>
									<IonText><strong>First Name</strong></IonText>
									<p className="patient-information__detail"> {props.patient.firstName}  </p>
								</div>
							</IonRow>
							<IonRow>
								<div>
									<IonText><strong>Medicare Number</strong></IonText>
									<p className="patient-information__detail">{props.patient.medicalId}</p>
								</div>
							</IonRow>
							<IonRow>
								<div>
									<IonText> <strong>Email</strong></IonText>
									<p className="patient-information__detail">{props.patient.email}</p>
								</div>
							</IonRow>
							<IonRow>
								<div>
									<IonText> <strong>Last Status Update</strong></IonText>
									<p className="patient-information__detail"><Moment format={'LLL'} date={props.patient.lastUpdated}/></p>
								</div>
							</IonRow>
						</IonCol>
						<IonCol>
							<IonRow>
								<div>
									<IonText><strong>Last Name</strong></IonText>
									<p className="patient-information__detail">{props.patient.lastName}</p>
								</div>
							</IonRow>
							<IonRow>
								<div>
									<IonText><strong>Phone Number</strong></IonText>
									<p className="patient-information__detail">{props.patient.phoneNumber}</p>
								</div>
							</IonRow>
							<IonRow>
								<div>
									<IonText><strong>Date of birth</strong></IonText>
									<p className="patient-information__detail">{props.patient.dob}</p>
								</div>
							</IonRow>
						</IonCol>
						<IonCol>
							<IonRow>
								<div>
									<IonText><strong>Address</strong></IonText>
									<p className="patient-information__detail">{props.patient.address}</p>
								</div>
							</IonRow>
							<IonRow>
								<div>
									<IonText><strong>Test Result</strong></IonText>
									<p className="patient-information__detail">{props.patient.testResult}</p>
								</div>
							</IonRow>
							<IonRow>
								<div>
									<IonText><strong>Gender</strong></IonText>
									<p className="patient-information__detail">{props.patient.gender}</p>
								</div>
							</IonRow>

						</IonCol>
						{
							currentProfile.getRole() !== UserType.PATIENT && props.patient.medicalId !== '' &&
							(currentProfile.getRole() !== UserType.DOCTOR || props.patient.doctorName &&
								props.patient.doctorName === (currentProfile.firstName + ' ' + currentProfile.lastName)) &&
							<IonCol>
								<IonIcon icon={flag}
										 className={props.patient.flagged ?
											 'patient-information__flag__high-priority' : 'patient-information__flag__no-priority'}
										 onClick={() => {
											 flagPatient();
										 }}
										 size={'large'}
								/>
							</IonCol>
						}

						{
							currentProfile.getRole() === UserType.PATIENT &&
							<IonRow>
								<div className="patient-information__div-button">
									<IonCol>
										<IonButton onClick={() => {
											setShowStatusModal(true);
										}}>
											Edit Status
										</IonButton>
									</IonCol>
								</div>
							</IonRow>
						}

					</IonRow>
					{
						currentProfile.getRole() === UserType.DOCTOR && props.patient.doctorName &&
						props.patient.doctorName === (currentProfile.firstName + ' ' + currentProfile.lastName) &&
						<>
							<IonRow>
								<div className="patient-information__div-button">
									<IonCol>
										<IonButton onClick={() => setShowSymptomsModal(true)}>
											Request symptoms update
										</IonButton>
									</IonCol>
									<IonCol>
										<IonButton onClick={() => setShowAppointmentModal(true) }>Set an Appointment</IonButton>
									</IonCol>
									<IonCol>
										<IonButton onClick={() => {
											presentActionSheet(
												generateContactList(props.patient),
												'Contact by');
											setTimeout(dismissActionSheet, 10000);
										}}
										>
											Contact
										</IonButton>
									</IonCol>
									<IonCol>
										<IonButton id={'patient-information__patient-symptoms-trigger'}>
											See Symptoms
										</IonButton>
									</IonCol>
									<IonCol>
										<IonButton id={'patient-information__contact-tracing-trigger'}>
											Contact tracing
										</IonButton>
									</IonCol>
								</div>
							</IonRow>
							{/*Not sure what this is. Should be deleted later.*/}
							{/*<IonRow>*/}
							{/*	<div className={'patient-information__add-symptom'}>*/}
							{/*		<IonRow>*/}
							{/*			<IonCol size={'3'}>*/}
							{/*				<IonLabel>Subject</IonLabel>*/}
							{/*			</IonCol>*/}
							{/*			<IonCol size={'9'}>*/}
							{/*				<IonInput/>*/}
							{/*			</IonCol>*/}

							{/*		</IonRow>*/}
							{/*		<IonRow>*/}
							{/*			<IonCol size={'3'}>*/}
							{/*				<IonLabel>Description</IonLabel>*/}
							{/*			</IonCol>*/}
							{/*			<IonCol size={'9'}>*/}
							{/*				<IonInput/>*/}
							{/*			</IonCol>*/}
							{/*			<IonCol>*/}
							{/*				<IonButton>Add</IonButton>*/}
							{/*			</IonCol>*/}
							{/*		</IonRow>*/}

							{/*	</div>*/}
							{/*</IonRow>*/}
						</>
					}

					{
						currentProfile.getRole() == UserType.HEALTH_OFFICIAL &&
						<div className="patient-information__div-button">
							<IonCol>
								<IonButton id={'patient-information__contact-tracing-trigger'}>
									Contact tracing
								</IonButton>
							</IonCol>
							<IonCol>
								<IonButton onClick={() => {
									presentActionSheet(
										generateContactList(props.patient),
										'Contact by');
									setTimeout(dismissActionSheet, 10000);
								}}
								>
									Contact
								</IonButton>
							</IonCol>
						</div>
					}

					{
						setupModals()
					}

				</div>
			}
		</IonContent>

	);
};

export default PatientInformation;
