import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { IonButton, IonContent, IonModal, useIonToast } from '@ionic/react';
import './PatientSymptomsTable.modal.scss';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { ISymptom, ISymptomResponse, ISymptomTable } from '../../interfaces/ISymptom';

const PatientSymptomsTableModal: React.FC<{
	symptomsList: ISymptom[], symptomsResponse: ISymptomResponse[], trigger: string
}> = (props) => {

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [present] = useIonToast();

	const [symptomsTable, setSymptomsTable] = useState<Map<Date, ISymptomTable[]>>(new Map<Date, ISymptomTable[]>());

	useEffect(() => {
		if (modalOpen && (!props.symptomsResponse || props.symptomsResponse.length === 0)) {
			setModalOpen(false);
			present('The patient has not submitted a Symptoms form yet', 1500);
		}
	}, [modalOpen]);

	useEffect(() => {
		setSymptomsTable(new Map<Date, ISymptomTable[]>());
		generateSymptomsTable();
	}, [props.symptomsResponse]);

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
	}

	return (
		<IonModal trigger={props.trigger} isOpen={modalOpen}
				  onWillPresent={() => {
					  setModalOpen(true);
				  }}
				  hidden={!props.symptomsResponse || props.symptomsResponse.length === 0}
		>
			<IonContent scrollX={true} className={'patient-symptoms-table'}>
				<Table className={'patient-symptoms-table__table'}>
					<Thead>
						<Tr className={'patient-symptoms-table__table-head'}>
							<Th>
								{/*Updated On*/}
							</Th>
							{
								Array.from(symptomsTable).map((el, index1) =>
									<Td className={'patient-symptoms-table__table-head__date'} key={index1}>
										<Moment date={el[0]}/>
									</Td>
								)
							}
						</Tr>
					</Thead>
					<Tbody>
						{
							props.symptomsList.map((el, index1) =>
								<Tr key={index1}>
									<Th>
										{el.description}
									</Th>
									{
										Array.from(symptomsTable).map((el, index2) => (
											<Td key={index1 + '-' + index2} className="contact-tracing-table__table-entries">
												{
													el[1][index1] === undefined ? 'Error' :
														((el[1][index1].response === undefined) ? '---' :
															(el[1][index1].response ? 'Yes' : 'No'))
												}
											</Td>
										))
									}
								</Tr>
							)
						}
					</Tbody>
				</Table>
			</IonContent>
			<IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
		</IonModal>
	);
};
export default PatientSymptomsTableModal;
