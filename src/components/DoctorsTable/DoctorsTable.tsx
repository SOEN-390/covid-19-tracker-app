import './DoctorTable.scss';
import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import { IonIcon } from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';

import DoctorUnassignedModal from '../AssignedModal/Doctor.unassigned.modal';

interface Column {
	id:
		| 'name'
		| 'licenseId'
		| 'phoneNumber'
		| 'address'
		| 'email'
		| 'emergencyLeave'
		| 'numberOfPatients';
	label: string;
	minWidth?: number;
	align?: 'center';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{
		id: 'name',
		label: 'Name',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'licenseId',
		label: 'LicenseId',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'phoneNumber',
		label: 'Phone Number',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'address',
		label: 'Address',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'email',
		label: 'Email',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'emergencyLeave',
		label: 'Emergency Leave',
		minWidth: 170,
		align: 'center',
	},
	{
		id: 'numberOfPatients',
		label: 'Number of Patients',
		minWidth: 170,
		align: 'center',
	},
];

const DoctorsTable: React.FC<{
	doctorTableRows: IDoctorTableRow[];
	setDoctorsArray: (doctors: IDoctorTableRow[]) => void;
}> = (props) => {
	return (
		<Table className={'doctor-table__table'}>
			<Thead>
				<Tr className={'doctor-table__table-head'}>
					{columns.map((column, index) => (
						<Th key={index}>{column.label}</Th>
					))}
				</Tr>
			</Thead>
			<Tbody>
				{props.doctorTableRows.map((row, index) => {
					return (
						<Tr key={index} className={'doctor-table__table-row'}>
							<Td className={'doctor-table__doctor-name'}>
								{row.firstName + ' ' + row.lastName}
							</Td>
							<Td>{row.licenseId}</Td>
							<Td>{row.phoneNumber}</Td>
							<Td>{row.address}</Td>
							<Td>{row.email}</Td>
							<Td>
								{row.emergencyLeave ? (
									<IonIcon
										icon={alertCircleOutline}
										size={'large'}
										color={'danger'}
									/>
								) : (
									<></>
								)}
							</Td>
							<Td id={`doctors-table__assigned-${row.licenseId}`}>
								{row.assignedPatientsCount}
							</Td>
							<DoctorUnassignedModal
								trigger={
									row.assignedPatientsCount > 0
										? `doctors-table__assigned-${row.licenseId}`
										: undefined
								}
								doctor={row}
								setDoctorsArray={props.setDoctorsArray}
							/>
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

export default DoctorsTable;
