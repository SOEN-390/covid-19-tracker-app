import { Table, Tbody, Td, Thead, Tr, Th } from 'react-super-responsive-table';
import React from 'react';
import { IAppointmentTableData } from '../../interfaces/IAppointment';
import './AppointmentsTable.scss';
import Moment from 'react-moment';

const AppointmentsTable: React.FC<{appointments: IAppointmentTableData[]}> = (props) => {



	return (

		<Table className={'appointments-table__table'}>
			<Thead>
				<Tr className={'appointments-table__table-head'}>
					<Th>Patient Name</Th>
					<Th>Appointment Subject</Th>
					<Th>Appointment Date</Th>
				</Tr>
			</Thead>
			<Tbody>
				{
					props.appointments.map((value, key) => {
						return (
							<Tr key={key} className={'appointments-table__table-row'}>
								<Td>{value.patientName}</Td>
								<Td>{value.appointmentSubject}</Td>
								<Td><Moment format={'LLL'} date={value.appointmentDate}/></Td>
							</Tr>
						);
					})
				}
			</Tbody>
		</Table>



	);

};
export default AppointmentsTable;
