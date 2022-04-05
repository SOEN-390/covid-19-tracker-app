import { Table, Tbody, Td, Thead, Tr } from 'react-super-responsive-table';
import React from 'react';
import { IAppointmentTableData } from '../../interfaces/IAppointment';
import './AppointmentsTable.scss';
import Moment from 'react-moment';

const AppointmentsTable: React.FC<{appointments: IAppointmentTableData[]}> = (props) => {



	return (

		<Table className={'appointments-table__table'}>
			<Thead>
				<Tr className={'appointments-table__table-head'}>
					<Td>Patient Name</Td>
					<Td>Appointment Subject</Td>
					<Td>Appointment Date</Td>
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
