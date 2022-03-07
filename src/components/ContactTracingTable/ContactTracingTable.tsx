import * as React from 'react';
import PropTypes from 'prop-types';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { IonButton, IonCard, IonContent } from '@ionic/react';
import './ContactTracingTable.css';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { IContact } from '../../interfaces/IPatient';


const ContactTracingTable: React.FC<{ contacts: IContact[] }> = (props) => {


	function createData(medicalId: any, fname: string, lname: string, status: any, monitorSymptoms: any, date: any, temperature: string, symptoms: string) {
		return {
			medicalId,
			fname,
			lname,
			status,
			history: [
				{
					date: date,
					temperature: temperature,
					symptoms: symptoms,
				},
			],

		};
	}

	function Row(props: any) {
		const { row } = props;
		const [open, setOpen] = React.useState(false);

		return (
			<React.Fragment>
				<Tr >
					<Td id="colName"> {row.fname} </Td>
					<Td id="colName"> {row.lname}</Td>

					<Td ><div className={'patients-table__status '}>{row.status}</div></Td>
					<Td>
						<IonButton color="favorite" shape="round" size="large"
							onClick={() => setOpen(!open)}>
							Monitor symptoms
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IonButton>
					</Td>
				</Tr>
				<Tr>
					<Td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant="h6" gutterBottom component="div">
									History
								</Typography>
								<Table size="small" aria-label="purchases">
									<Thead>
										<Tr>
											<Th>Date</Th>
											<Th>Temperature</Th>
											<Th >Symptoms</Th>
										</Tr>
									</Thead>
									<Tbody>
										{row.history.map((historyRow: any) => (
											<Tr key={historyRow.date}>
												<Td>{historyRow.date}</Td>
												<Td>{historyRow.temperature}</Td>
												<Td>{historyRow.symptoms}</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</Box>
						</Collapse>
					</Td>
				</Tr>
			</React.Fragment>
		);
	}

	Row.propTypes = {
		row: PropTypes.shape({
			medicalId: PropTypes.any,
			fname: PropTypes.string.isRequired,
			lname: PropTypes.string.isRequired,
			status: PropTypes.any.isRequired,
			monitorSymptoms: PropTypes.any,
			history: PropTypes.arrayOf(
				PropTypes.shape({
					date: PropTypes.string.isRequired,
					temperature: PropTypes.string.isRequired,
					symptoms: PropTypes.string.isRequired,
				}),
			).isRequired,
		}).isRequired,
	};

	const rows = [];

	for (const row of props.contacts) {
		rows.push(createData(row.medicalId, row.firstName, row.lastName, row.testResult,
			'Monitor Symptoms', '20-02-2022', '37.5', 'breathing'));
	}



	return (
		<IonCard target="_self">
			<Table aria-label="collapsible table" align='center'>
				<Thead>
					<Tr id="tableHead">
						<Th id="headCol">First Name</Th>
						<Th id="headCol">Last Name</Th>

						<Th id="headCol">Status</Th>
						<Th />

					</Tr>
				</Thead>
				<Tbody>
					{rows.map((row) => (
						<Row key={row.medicalId} row={row} />
					))}
				</Tbody>
			</Table>
		</IonCard>
	);

};
export default ContactTracingTable;
