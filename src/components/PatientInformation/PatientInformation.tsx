import {
	ActionSheetButton,
	IonButton,
	IonCheckbox,
	IonCol,
	IonContent,
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
	IonTitle,
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
import { call, close, flag, mail } from 'ionicons/icons';
import { ISymptom, ISymptomResponse, ISymptomTable } from '../../interfaces/ISymptom';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import ContactTracingTableModal from '../ContactTracingTable/ContactTracingTable.modal';


const PatientInformation: React.FC<{
	patient: IPatient, updateStatus: (status: TestResult) => void, updateFlag: (bool: boolean) => void,
	symptomsList: ISymptom[], symptomsResponse: ISymptomResponse[]
}> = (props) => {

	const {currentProfile} = useAuth();

	const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
	const [showSymptomsModal, setShowSymptomsModal] = useState<boolean>(false);

	const [status, setStatus] = useState<TestResult>(props.patient.testResult);
	const [seeSymptoms, setSeeSymptoms] = useState<boolean>(false);
	const [symptomsTable, setSymptomsTable] = useState<Map<Date, ISymptomTable[]>>(new Map<Date, ISymptomTable[]>());
	const [contacts, setContacts] = useState<IContact[]>([]);

	const [presentActionSheet, dismissActionSheet] = useIonActionSheet();
	const [present] = useIonToast();

	useEffect(() => {
		if (currentProfile.getRole() === UserType.DOCTOR || currentProfile.getRole() === UserType.HEALTH_OFFICIAL) {
			getPatientsContacts();
		}
	}, [props.patient]);

	async function updateStatus(): Promise<void> {
		if (currentProfile.testResult == status) {
			return;
		}
		try {
			await HttpService.patch(`patients/${currentProfile.medicalId}/status`, {status: status});
			props.updateStatus(status);
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
			props.updateFlag(props.patient.flagged);
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

	function generateSymptomsTable() {
		if (!props.symptomsList || !props.symptomsResponse) {
			return;
		}
		const symptomsTableMap = new Map<Date, ISymptomTable[]>();

		for (let i = 0; i < props.symptomsResponse.length; i++) {
			if (i == 0) {
				symptomsTableMap.set(props.symptomsResponse[i].onDate, []);
			}
			if (i > 0 && new Date(props.symptomsResponse[i].onDate).setSeconds(0)
				!= new Date(props.symptomsResponse[i - 1].onDate).setSeconds(0)) {
				symptomsTableMap.set(props.symptomsResponse[i].onDate, []);
			}
		}
		mapResponseToRow(symptomsTableMap);
	}

	function mapResponseToRow(symptomsTableMap: Map<Date, ISymptomTable[]>) {
		for (const [key, value] of symptomsTableMap) {
			for (let i = 0; i < props.symptomsList.length; i++) {
				for (const response of props.symptomsResponse) {
					if (props.symptomsList[i].name == response.name &&
						new Date(response.onDate).setSeconds(0) == new Date(key).setSeconds(0)) {
						value[i] = {
							name: response.name, description: response.description,
							response: response.response
						};
					} else {
						if (!value[i]) {
							value[i] = {
								name: props.symptomsList[i].name, description: props.symptomsList[i].description,
								response: undefined
							};
						}

					}
				}
			}
		}
		setSymptomsTable(symptomsTableMap);
		setSeeSymptoms(true);
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
							currentProfile.getRole() != UserType.PATIENT && props.patient.medicalId != '' &&
							<IonCol>
								<IonIcon icon={flag} color={props.patient.flagged ? 'success' : ''}
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
						props.patient.doctorName == currentProfile.firstName + ' '+ currentProfile.lastName &&
						<IonRow>
							<div className="patient-information__div-button">
								<IonCol>
									<IonButton onClick={() => setShowSymptomsModal(true)}>
										Request symptoms update
									</IonButton>
								</IonCol>
								<IonCol>
									<IonButton>Set an Appointment</IonButton>
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
								{
									props.symptomsResponse && props.symptomsResponse.length > 0 &&
									props.symptomsList && !seeSymptoms &&
									<IonCol>
										<IonButton onClick={() => {
											generateSymptomsTable();
										}}>See Symptoms</IonButton>
									</IonCol>
								}
								{
									seeSymptoms &&
									<IonCol>
										<IonButton onClick={() => {
											setSeeSymptoms(false);
										}}>Hide Symptoms</IonButton>
									</IonCol>
								}
								<IonCol>
									<IonButton id={'patient-information__contact-tracing-trigger'}>
										Contact tracing
									</IonButton>
								</IonCol>
							</div>
						</IonRow>
					}
					<ContactTracingTableModal trigger={'patient-information__contact-tracing-trigger'} contacts={contacts} />
					{
						currentProfile.getRole() == UserType.HEALTH_OFFICIAL &&
						<div className="patient-information__div-button">
							<IonCol>
								<IonButton id={'patient-information__contact-tracing-trigger'}>
									Contact tracing
								</IonButton>
							</IonCol>
						</div>
					}
					{
						currentProfile.getRole() === UserType.DOCTOR && props.patient.doctorName &&
						props.patient.doctorName == currentProfile.firstName + ' '+ currentProfile.lastName &&
						<IonRow>
							{
								props.symptomsResponse.length == 0 && !seeSymptoms &&
								<IonTitle>
									<IonLabel>The patient has not submitted a Symptoms form yet</IonLabel>
								</IonTitle>
							}
							{
								props.symptomsList && props.symptomsResponse && seeSymptoms &&
								<table className="patient-information__medical-table">
									<caption>
										<IonTitle>Patient&rsquo;s Symptom Updates </IonTitle>
										<br/>
									</caption>

									<thead>
										<tr>
											{
												props.symptomsList.map((el, index) => (
													<th key={index}>
														{el.description}
													</th>)
												)
											}
											<th>Updated On</th>
										</tr>
									</thead>
									<tbody>
										{
											Array.from(symptomsTable).map((el, index1) => (
												<tr key={index1}>
													{
														el[1].map((el, index2) => {
															if (el.response == true || el.response == false) {
																return (
																	<td key={index1 + '-' + index2}>{el.response ? 'Yes' : 'No'}</td>);
															} else {
																return (
																	<td key={index1 + '-' + index2}>Not Requested</td>);
															}
														})
													}
													<td key={index1}>
														<Moment date={el[0]}/>
													</td>
												</tr>
											))
										}
									</tbody>
								</table>
							}
						</IonRow>
					}
					{
						currentProfile.getRole() === UserType.DOCTOR && props.patient.doctorName &&
						props.patient.doctorName == currentProfile.firstName + ' '+ currentProfile.lastName &&
						<IonRow>
							<div className={'patient-information__add-symptom'}>
								<IonRow>
									<IonCol size={'3'}>
										<IonLabel>Subject</IonLabel>
									</IonCol>
									<IonCol size={'9'}>
										<IonInput/>
									</IonCol>

								</IonRow>
								<IonRow>
									<IonCol size={'3'}>
										<IonLabel>Description</IonLabel>
									</IonCol>
									<IonCol size={'9'}>
										<IonInput/>
									</IonCol>
									<IonCol>
										<IonButton>Add</IonButton>
									</IonCol>
								</IonRow>

							</div>
						</IonRow>
					}

					<IonModal isOpen={showStatusModal}>
						<IonContent>
							<IonRadioGroup value={status} onIonChange={e => setStatus(e.detail.value)}>
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

							{props.symptomsList && props.symptomsList.map((el, index) => <IonItem
								key={index}>
								<IonCheckbox value={el.name} checked={el.isChecked}
											 onIonChange={e => handleCheck(e.detail.value)}/>&nbsp;
								<IonLabel>{el.description}</IonLabel></IonItem>)}

						</IonContent>
						<IonButton color="success" onClick={() => submitSymptoms()}>Request</IonButton>
						<IonButton color="danger" onClick={() => setShowSymptomsModal(false)}>Cancel</IonButton>
					</IonModal>

				</div>

			}
		</IonContent>

	);
};

export default PatientInformation;
