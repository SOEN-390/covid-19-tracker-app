import React, { useEffect, useState } from 'react';
import { IonCard, IonCol, IonContent, IonPage, IonRow, IonToolbar } from '@ionic/react';
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

	useEffect(() => {
		getAssignedPatients();
	}, []);

	function getAssignedPatients() {
		HttpService.get(`doctors/${currentProfile.licenseId}/patients/assigned`).then((patients: Patient[]) => {
			generateDiagnosticGraph(patients);
			generateGenderGraph(patients);
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	}

	function generateDiagnosticGraph(patients: Patient[]) {
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

	function generateGenderGraph(patients: Patient[]) {
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

	function customizeTooltip(arg: any) {
		return {
			text: `${arg.argumentText} - ${(arg.percent * 100).toFixed(2)}%`,
		};
	}

	return (
		<IonPage className={'dashboard-doctor__page'}>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent>
				<IonCol>
					<IonRow>
						<IonCard>
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

						<IonCard>
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
					</IonRow>
				</IonCol>

			</IonContent>
		</IonPage>
	);
};

export default DashboardDoctorPage;
