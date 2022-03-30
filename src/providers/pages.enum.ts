export enum Pages {
	login = '/login',
	register = '/register'
}

export enum PatientPages {
	home = '/home',
	dashboard ='/home/dashboard',
	appointments = '/home/appointments',
	symptoms = '/home/symptoms',
	patientProfile = '/home/patient-profile',
	settings = '/home/settings',
	reportInContact = '/home/report',
	chat = '/home/chat'
}

export enum DoctorPages {
	home = '/doctor',
	dashboard = '/doctor/dashboard',
	patientProfile = '/doctor/patient-profile',
	patients = '/doctor/patients',
	settings = '/doctor/settings',
	chat = '/doctor/chat'
}

export enum HealthOfficialPages {
	home = '/health-official',
	patients = '/health-official/patients',
	patientProfile = '/health-official/patient-profile',
	settings = '/health-official/settings'
}

export enum ImmigrationOfficerPages {
	home = '/immigration-officer',
	flaggedPatients = '/immigration-officer/flagged-patients',
	patientProfile = '/immigration-officer/patient-profile',
	settings = '/immigration-officer/settings'
}

export enum AdminPages {
	home = '/admin',
	overview = '/admin/admin-overview',
	patientProfile = '/admin/patient-profile',
	patients = '/admin/patients',
	doctors = '/admin/doctors',
	addSymptoms = '/admin/add-symptoms',
	settings = '/admin/settings',

}
