export interface IAppointment {
    date : Date,
    subject: string;
}

export interface IAppointmentTableData {
	patientName: string;
	appointmentSubject: string;
	appointmentDate : Date;
}
