import './DoctorTable.scss';
import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';

interface Column {
	id: 'name' | 'licenseId' | 'phoneNumber' | 'address' | 'email';
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
		align: 'center'
	},
	{
		id: 'licenseId',
		label: 'LicenseId',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'phoneNumber',
		label: 'Phone Number',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'address',
		label: 'Address',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'email',
		label: 'Email',
		minWidth: 170,
		align: 'center'
	}
];


const DoctorsTable: React.FC<{ doctorTableRows: IDoctorTableRow[] }> = (props) => {

	return (
		<Table className={'doctor-table__table'}>
			<Thead>
				<Tr className={'doctor-table__table-head'}>
					{
						columns.map((column, index) => (
							<Th key={index}>{column.label}</Th>
						))
					}
				</Tr>
			</Thead>
			<Tbody>
				{
					props.doctorTableRows.map((row, index) => {
						return (
							<Tr key={index} className={'doctor-table__table-row'}>
								<Td className={'doctor-table__doctor-name'}>{row.firstName + ' ' + row.lastName}</Td>
								<Td>{row.licenseId}</Td>
								<Td>{row.phoneNumber}</Td>
								<Td>{row.address}</Td>
								<Td>{row.email}</Td>
							</Tr>
						);
					})
				}
			</Tbody>
		</Table>
	);
};

export default DoctorsTable;
