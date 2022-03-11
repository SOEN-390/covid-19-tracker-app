import * as React from 'react';
import PropTypes from 'prop-types';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { IonButton, IonCard, IonContent } from '@ionic/react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { IContact } from '../../interfaces/IPatient';
import { TestResult } from '../../enum/TestResult.enum';
import './ContactTracingTable.scss';
import { PatientsTableColumn } from '../PatientsTable/patientsTableColumn';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Patient } from '../../objects/Patient.class';

//
// const ContactTracingTable: React.FC<{ contacts: IContact[] }> = (props) => {
//
//
// 	function createData(medicalId: any, fname: string, lname: string, status: any, monitorSymptoms: any, date: any, temperature: string, symptoms: string) {
// 		return {
// 			medicalId,
// 			fname,
// 			lname,
// 			status,
// 			history: [
// 				{
// 					date: date,
// 					temperature: temperature,
// 					symptoms: symptoms,
// 				},
// 			],
//
// 		};
// 	}
//
// 	function Row(props: any) {
// 		const { row } = props;
// 		const [open, setOpen] = React.useState(false);
//
// 		return (
// 			<React.Fragment>
// 				<Tr >
// 					<Td > {row.fname} </Td>
// 					<Td > {row.lname}</Td>
// 					<Td ><div>{row.status}</div></Td>
// 					<Td>
// 						<IonButton color="favorite" shape="round" size="large"
// 								   onClick={() => setOpen(!open)}>
// 							Monitor symptoms
// 							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
// 						</IonButton>
// 					</Td>
// 				</Tr>
// 				<Tr>
// 					<Td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
// 						<Collapse in={open} timeout="auto" unmountOnExit>
// 							<Box sx={{ margin: 1 }}>
// 								<Typography variant="h6" gutterBottom component="div">
// 									History
// 								</Typography>
// 								<Table size="small" aria-label="purchases">
// 									<Thead>
// 										<Tr>
// 											<Th>Date</Th>
// 											<Th>Temperature</Th>
// 											<Th >Symptoms</Th>
// 										</Tr>
// 									</Thead>
// 									<Tbody>
// 										{row.history.map((historyRow: any) => (
// 											<Tr key={historyRow.date}>
// 												<Td>{historyRow.date}</Td>
// 												<Td>{historyRow.temperature}</Td>
// 												<Td>{historyRow.symptoms}</Td>
// 											</Tr>
// 										))}
// 									</Tbody>
// 								</Table>
// 							</Box>
// 						</Collapse>
// 					</Td>
// 				</Tr>
// 			</React.Fragment>
// 		);
// 	}
//
// 	Row.propTypes = {
// 		row: PropTypes.shape({
// 			medicalId: PropTypes.any,
// 			fname: PropTypes.string.isRequired,
// 			lname: PropTypes.string.isRequired,
// 			status: PropTypes.any.isRequired,
// 			monitorSymptoms: PropTypes.any,
// 			history: PropTypes.arrayOf(
// 				PropTypes.shape({
// 					date: PropTypes.string.isRequired,
// 					temperature: PropTypes.string.isRequired,
// 					symptoms: PropTypes.string.isRequired,
// 				}),
// 			).isRequired,
// 		}).isRequired,
// 	};
//
// 	const rows = [];
//
// 	for (const row of props.contacts) {
// 		rows.push(createData(row.medicalId, row.firstName, row.lastName, row.testResult,
// 			'Monitor Symptoms', '20-02-2022', '37.5', 'breathing'));
// 	}
//
//
//
// 	return (
// 		<IonCard target="_self" className="TracingCard">
// 			<Table aria-label="collapsible table" align='center' className={'contact-tracing-table__table'}>
// 				<Thead className={'contact-tracing-table__table-head'}>
// 					<Tr className="patients-table__table-entries">
// 						<Th className={'contact-tracing-table__table-column-title'}>First Name</Th>
// 						<Th id="headCol">Last Name</Th>
// 						<Th id="headCol">Status</Th>
// 						<Th />
// 					</Tr>
// 				</Thead>
// 				<Tbody>
// 					{rows.map((row) => (
// 						<Row key={row.medicalId} row={row} />
// 					))}
// 				</Tbody>
// 			</Table>
// 		</IonCard>
// 	);
//
// };
// export default ContactTracingTable;
const contactTracingColumns= [
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
