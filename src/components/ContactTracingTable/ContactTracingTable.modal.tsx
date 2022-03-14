import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { IonButton, IonModal } from '@ionic/react';
import { IContact } from '../../interfaces/IPatient';
import { TestResult } from '../../enum/TestResult.enum';
import './ContactTracingTable.modal.scss';
import { useState } from 'react';

const contactTracingColumns = [
	{
		id: 'patients',
		label: 'Patient',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'status',
		label: 'Status',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'monitorSymptoms',
		label: 'Monitor',
		minWidth: 170,
		align: 'center'
	}
];

const ContactTracingTableModal: React.FC<{ contacts: IContact[], trigger: string }> = (props) => {

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<IonModal trigger={props.trigger} isOpen={modalOpen} className="contact-tracing-table__container-card"
				  onIonModalDidPresent={() => setModalOpen(true)}>
			<Table className={'contact-tracing-table__table'}>
				<Thead>
					<Tr className={'contact-tracing-table__table-head'}>
						{
							contactTracingColumns.map((column) => (
								<Th key={column.id} className={'contact-tracing-table__table-column-title'}>
									{column.label}
								</Th>
							))
						}
					</Tr>
				</Thead>
				<Tbody>
					{
						props.contacts &&
						props.contacts.map((row) => {
							return (
								<Tr key={row.medicalId} className="contact-tracing-table__table-entries">
									<Td className={'contact-tracing-table__table-entries__name'}>{row.firstName + ' ' + row.lastName}</Td>

									<Td>
										<div className={'contact-tracing-table__status ' +
											(row.testResult === TestResult.POSITIVE ? 'contact-tracing-table__status__positive' : '') +
											(row.testResult === TestResult.NEGATIVE ? 'contact-tracing-table__status__negative' : '') +
											(row.testResult === TestResult.PENDING ? 'contact-tracing-table__status__pending' : '')
										}>
											{row.testResult === TestResult.POSITIVE && 'POSITIVE'}
											{row.testResult === TestResult.NEGATIVE && 'NEGATIVE'}
											{row.testResult === TestResult.PENDING && 'PENDING'}
										</div>
									</Td>

									<Td>
										<IonButton shape="round">Monitor Symptoms</IonButton>
									</Td>
								</Tr>
							);
						})
					}
				</Tbody>
			</Table>
			<IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
		</IonModal>
	);
};
export default ContactTracingTableModal;
