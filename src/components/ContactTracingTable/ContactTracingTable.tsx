import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { IonButton, IonCard } from '@ionic/react';
import { TestResult } from '../../enum/TestResult.enum';
import './ContactTracingTable.scss';
import { IContact } from '../../interfaces/IPatient';

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

const ContactTracingTable: React.FC<{ contacts: IContact[] }> = (props) => {
	const inContact = props.contacts;

	return (
		<IonCard target="_self" className="contact-tracing-table__container-card">
			<Table className={'contact-tracing-table__table'}>
				<Thead>
					<Tr className={'contact-tracing-table__table-head'}>
						{contactTracingColumns.map((column) => (
							<Th key={column.id}  className={'contact-tracing-table__table-column-title'}>
								{column.label}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{inContact.map((row) => {
						return (
							<Tr key={row.medicalId} className="contact-tracing-table__table-entries">
								<Td className="contact-tracing-table__table-entries__name">{row.firstName+ ' ' +row.lastName}</Td>

								<Td>
									<div className={'contact-tracing-table__status ' +
										(row.testResult === TestResult.POSITIVE ? 'contact-tracing-table__status__positive' : '') +
										(row.testResult === TestResult.NEGATIVE ? 'contact-tracing-table__status__negative' : '') +
										(row.testResult === TestResult.PENDING ? 'contact-tracing-table__status__pending' : '')
									}>
										{row.testResult === TestResult.POSITIVE && 'Positive'}
										{row.testResult === TestResult.NEGATIVE && 'Negative'}
										{row.testResult === TestResult.PENDING && 'Pending'}
									</div>
								</Td>

								<Td >
									<IonButton shape="round" >Monitor Symptoms</IonButton>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</IonCard>
	);
};
export default ContactTracingTable;
