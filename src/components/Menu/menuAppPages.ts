import {
	AdminPages,
	DoctorPages,
	HealthOfficialPages,
	ImmigrationOfficerPages,
	PatientPages
} from '../../providers/pages.enum';
import {
	calendarOutline, chatbubblesOutline,
	heartOutline,
	homeOutline,
	medkitOutline,
	peopleOutline,
	personOutline,
	settingsOutline,
	warningOutline
} from 'ionicons/icons';

export interface AppPage {
	url: string;
	icon: string;
	title: string;
}

export const patientAppPages: readonly AppPage[] = [
	{
		title: 'Dashboard',
		url: PatientPages.dashboard,
		icon: homeOutline
	},
	{
		title: 'Appointments',
		url: PatientPages.appointments,
		icon: calendarOutline
	},
	{
		title: 'Symptoms form',
		url: PatientPages.symptoms,
		icon: heartOutline
	},
	{
		title: 'My Profile',
		url: PatientPages.patientProfile,
		icon: personOutline
	},
	{
		title: 'Report',
		url: PatientPages.reportInContact,
		icon: warningOutline
	},
	{
		title: 'Doctor Chat',
		url: PatientPages.chat,
		icon: chatbubblesOutline
	},
	{
		title: 'Settings',
		url: PatientPages.settings,
		icon: settingsOutline
	}
];

export const doctorAppPages: readonly AppPage[] = [
	{
		title: 'Dashboard',
		url: DoctorPages.dashboard,
		icon: homeOutline
	},
	{
		title: 'Patients',
		url: DoctorPages.patients,
		icon: peopleOutline
	},
	{
		title: 'Patient Profile',
		url: DoctorPages.patientProfile,
		icon: personOutline
	},
	{
		title: 'Chats',
		url: DoctorPages.chat,
		icon: chatbubblesOutline
	},
	{
		title: 'Settings',
		url: DoctorPages.settings,
		icon: settingsOutline
	}
];

export const healthOfficialAppPages: readonly AppPage[] = [
	{
		title: 'Overview',
		url: '',
		icon: homeOutline
	},
	{
		title: 'Patients',
		url: HealthOfficialPages.patients,
		icon: peopleOutline
	},
	{
		title: 'Patient Profile',
		url: HealthOfficialPages.patientProfile,
		icon: personOutline
	},
	{
		title: 'Settings',
		url: AdminPages.settings,
		icon: settingsOutline
	}
];

export const immigrationOfficerAppPages: readonly AppPage[] = [
	{
		title: 'Flagged Patients',
		url: ImmigrationOfficerPages.flaggedPatients,
		icon: peopleOutline
	},
	{
		title: 'Patient Profile',
		url: ImmigrationOfficerPages.patientProfile,
		icon: personOutline
	},
	{
		title: 'Settings',
		url: ImmigrationOfficerPages.settings,
		icon: settingsOutline
	}
];

export const adminAppPages: readonly AppPage[] = [
	{
		title: 'Overview',
		url: AdminPages.overview,
		icon: homeOutline
	},
	{
		title: 'Doctors',
		url: AdminPages.doctors,
		icon: medkitOutline
	},
	{
		title: 'Patients',
		url: AdminPages.patients,
		icon: peopleOutline
	},
	{
		title: 'Patient Profile',
		url: AdminPages.patientProfile,
		icon: personOutline
	},
	{
		title: 'Settings',
		url: AdminPages.settings,
		icon: settingsOutline
	}
];
