import * as React from 'react';
import PropTypes from 'prop-types';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { IonButton, IonCard, IonContent } from '@ionic/react';
import './ContactTracingTable.css';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';
import { useState } from 'react';
import { TestResult } from '../../enum/TestResult.enum';
import { ISymptom } from '../../interfaces/ISymptom';


const ContactTracingTable: React.FC = () => {


	const { currentProfile } = useAuth();
	const [medicalNumber, setMedicalNumber] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [testResult, setTestResult] = useState<TestResult>(currentProfile.testResult);
	const [email, setEmail] = useState<string>('');
	const [dob, setDOB] = useState<string>('');
	const [symptomsList, setSymptomsList] = useState<ISymptom[]>([]);
	async function getPatientWithEmail() {
		try {
			const data = await HttpService.get(`doctors/patient/${email}`);
			setData(data);
		} catch (e) {
			console.log(e);
		}
	}

	function setData(data: any) {
		setFirstName(data.firstName);
		setLastName(data.lastName);
		switch (data.testResult) {
			case 'positive':
				setTestResult(TestResult.POSITIVE);
				break;
			case 'negative':
				setTestResult(TestResult.NEGATIVE);
				break;
			default:
				setTestResult(TestResult.PENDING);
		}
	}

	function createData(fname: string, lname: string, status: any, monitorSymptoms: any, date: any, temperature: string, symptoms: string) {
		return {
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
					<Td id="colName"> {row.fname} {row.lname} </Td>
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
			fname: PropTypes.string.isRequired,
			lname: PropTypes.string.isRequired,
			status: PropTypes.any.isRequired,
			monitorSymptoms: PropTypes.any.isRequired,
			history: PropTypes.arrayOf(
				PropTypes.shape({
					date: PropTypes.string.isRequired,
					temperature: PropTypes.string.isRequired,
					symptoms: PropTypes.string.isRequired,
				}),
			).isRequired,
		}).isRequired,
	};

	const rows = [
		createData(firstName, lastName, testResult, 'Monitor Symptoms', '20-02-2022', '37.5', 'breathing'),
		createData('Kero', 'Wahbe', 'Positive', 'Monitor Symptoms', '20-02-2022', '37.5', 'breathing'),
		createData('Beshoy', 'Soliman', 'Positive', 'Monitor Symptoms', '20-02-2022', '37.5', 'breathing'),

	];


	return (
		<IonCard target="_self">
			<Table aria-label="collapsible table" align='center'>
				<Thead>
					<Tr id="tableHead">
						<Th id="headCol">Name</Th>
						<Th id="headCol">Status</Th>
						<Th />

					</Tr>
				</Thead>
				<Tbody>
					{rows.map((row) => (
						<Row key={row.fname} row={row} />
					))}
				</Tbody>
			</Table>
		</IonCard>
	);

};
export default ContactTracingTable;