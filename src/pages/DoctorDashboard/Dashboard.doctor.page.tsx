import React, { useEffect, useState } from 'react';
import {
	IonButton,
	IonCard,
	IonCardContent, IonCardHeader,
	IonCardTitle,
	IonCol,
	IonContent,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar, useIonToast
} from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import './Dashboard.doctor.page.scss';
import PieChart, { Connector, Export, Label, Legend, Series, Tooltip, } from 'devextreme-react/pie-chart';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';
import { Patient } from '../../objects/Patient.class';
import { TestResult } from '../../enum/TestResult.enum';
import { Gender } from '../../enum/Gender.enum';

const DashboardDoctorPage: React.FC = () => {

	const {currentProfile} = useAuth();
	const [diagnosticData, setDiagnosticData] = useState<{ testResult: string, val: number }[]>([]);
	const [genderData, setGenderData] = useState<{ gender: string, val: number }[]>([]);

	const [presentToast] = useIonToast();

	useEffect(() => {
		getAssignedPatients();
	}, []);

	function getAssignedPatients(): void {
		HttpService.get(`doctors/${currentProfile.licenseId}/patients/assigned`).then((patients: Patient[]) => {
			generateDiagnosticGraph(patients);
			generateGenderGraph(patients);
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	}

	function generateDiagnosticGraph(patients: Patient[]): void {
		let negativeCount = 0;
		let positiveCount = 0;
		let pendingCount = 0;
		for (const patient of patients) {
			switch (patient.testResult) {
				case TestResult.NEGATIVE:
					negativeCount++;
					break;
				case TestResult.POSITIVE:
					positiveCount++;
					break;
				case TestResult.PENDING:
					pendingCount++;
					break;
			}
		}
		setDiagnosticData([{
			testResult: 'Negative',
			val: negativeCount
		}, {
			testResult: 'Positive',
			val: positiveCount
		}, {
			testResult: 'Non-Confirmed',
			val: pendingCount
		}]);
	}

	function generateGenderGraph(patients: Patient[]): void {
		let maleCount = 0;
		let femaleCount = 0;
		let otherCount = 0;
		for (const patient of patients) {
			switch (patient.gender) {
				case Gender.MALE:
					maleCount++;
					break;
				case Gender.FEMALE:
					femaleCount++;
					break;
				case Gender.NONE:
					otherCount++;
					break;
			}
		}
		setGenderData([{
			gender: 'Male',
			val: maleCount
		}, {
			gender: 'Female',
			val: femaleCount
		}, {
			gender: 'Other',
			val: otherCount
		}]);
	}

	function customizeTooltip(arg: any): { text: string } {
		return {
			text: `${arg.argumentText} - ${(arg.percent * 100).toFixed(2)}%`
		};
	}

	function declareEmergency(): void {
		if (currentProfile.emergencyLeave) {
			presentToast('Emergency leave already declared.', 1500);
			return;
		}
		HttpService.patch(`doctors/${currentProfile.licenseId}/emergency-leave`).then(() => {
			currentProfile.emergencyLeave = !currentProfile.emergencyLeave;
			presentToast('Successfully declared an emergency leave.', 1500);
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent className={'dashboard-doctor__page'}>
				<IonCol>
					<IonRow>
						<IonCard className={'dashboard-doctor__pie-card'}>
							<PieChart
								id="pie"
								type="doughnut"
								title="Diagnostics"
								palette="Soft Pastel"
								dataSource={diagnosticData}
							>
								<Series argumentField="testResult">
									<Label visible={true}>
										<Connector visible={true}/>
									</Label>
								</Series>
								<Export enabled={true}/>
								<Legend
									margin={20}
									horizontalAlignment="center"
									verticalAlignment="bottom"
								/>
								<Tooltip enabled={true} customizeTooltip={customizeTooltip}>
									{/*<Format type="percentage" />*/}
								</Tooltip>
							</PieChart>
						</IonCard>

						<IonCard className={'dashboard-doctor__pie-card'}>
							<PieChart
								id="pie"
								type="doughnut"
								title="Patients"
								palette="Soft Pastel"
								dataSource={genderData}
							>
								<Series argumentField="gender">
									<Label visible={true}>
										<Connector visible={true}/>
									</Label>
								</Series>
								<Export enabled={true}/>
								<Legend
									margin={20}
									horizontalAlignment="center"
									verticalAlignment="bottom"
								/>
								<Tooltip enabled={true} customizeTooltip={customizeTooltip}>
									{/*<Format type="percentage" />*/}
								</Tooltip>
							</PieChart>
						</IonCard>
						<IonCard className={'dashboard-doctor__emergency-card'}>
							<IonCardHeader>
								<IonCardTitle>Declare an Emergency Leave</IonCardTitle>
							</IonCardHeader>
							<IonCardContent>
								As a doctor, you can declare an emergency leave to the admin.
								The admin will re-assign your patients!
							</IonCardContent>
							<IonCardContent>
								<IonButton color={'danger'} onClick={() => {
									declareEmergency();
								}}>
									Declare
								</IonButton>
							</IonCardContent>
						</IonCard>
					</IonRow>
				</IonCol>

			</IonContent>
		</IonPage>
	);
};

export default DashboardDoctorPage;
