import {
	AdminPages,
	DoctorPages,
	HealthOfficialPages,
	ImmigrationOfficerPages,
	PatientPages
} from '../../providers/pages.enum';
import {
	appsOutline,
	archiveOutline,
	archiveSharp,
	calendarOutline,
	heartHalfOutline,
	heartHalfSharp,
	heartOutline,
	heartSharp,
	settingsOutline,
	settingsSharp,
	warningOutline,
	warningSharp
} from 'ionicons/icons';

export interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
}

export const patientAppPages: readonly AppPage[] = [
	{
		title: 'Overview',
		url: PatientPages.overview,
		iosIcon: appsOutline,
		mdIcon: appsOutline
	},
	{
		title: 'Appointments',
		url: PatientPages.appointments,
		iosIcon: calendarOutline,
		mdIcon: calendarOutline
	},
	{
		title: 'Symptoms form',
		url: PatientPages.symptoms,
		iosIcon: heartOutline,
		mdIcon: heartSharp
	},
	{
		title: 'My Profile',
		url: PatientPages.patientProfile,
		iosIcon: archiveOutline,
		mdIcon: archiveSharp
	},
	{
		title: 'Settings',
		url: PatientPages.settings,
		iosIcon: settingsOutline,
		mdIcon: settingsSharp
	},
	{
		title: 'Report',
		url: '/home/alert',
		iosIcon: warningOutline,
		mdIcon: warningSharp
	}
];

export const doctorAppPages: readonly AppPage[] = [
	{
		title: 'Dashboard',
		url: DoctorPages.dashboard,
		iosIcon: appsOutline,
		mdIcon: appsOutline
	},
	{
		title: 'Patient Profile',
		url: DoctorPages.patientProfile,
		iosIcon: calendarOutline,
		mdIcon: calendarOutline
	},
	{
		title: 'Patients',
		url: DoctorPages.patients,
		iosIcon: calendarOutline,
		mdIcon: calendarOutline
	},
	{
		title: 'Settings',
		url: DoctorPages.settings,
		iosIcon: settingsOutline,
		mdIcon: settingsSharp
	},
];

export const healthOfficialAppPages: readonly AppPage[] = [
	{
		title: 'Overview',
		url: '',
		iosIcon: appsOutline,
		mdIcon: appsOutline
	},
	{
		title: 'Patients',
		url: HealthOfficialPages.patientsPage,
		iosIcon: calendarOutline,
		mdIcon: calendarOutline
	},
	{
		title: 'Patient Profile',
		url: HealthOfficialPages.patientProfile,
		iosIcon: heartOutline,
		mdIcon: heartSharp
	},
	{
		title: 'Settings',
		url: AdminPages.settings,
		iosIcon: settingsOutline,
		mdIcon: settingsSharp
	}
];

export const immigrationOfficerAppPages: readonly AppPage[] = [
	{
		title: 'Overview',
		url: ImmigrationOfficerPages.dashboard,
		iosIcon: appsOutline,
		mdIcon: appsOutline
	},
	{
		title: 'Patient Profile',
		url: ImmigrationOfficerPages.patientProfile,
		iosIcon: calendarOutline,
		mdIcon: calendarOutline
	},
	{
		title: 'Settings',
		url: ImmigrationOfficerPages.settings,
		iosIcon: settingsOutline,
		mdIcon: settingsSharp
	}
];

export const adminAppPages: readonly AppPage[] = [
	{
		title: 'Overview',
		url: AdminPages.overview,
		iosIcon: appsOutline,
		mdIcon: appsOutline
	},
	{
		title: 'Confirmed Patients',
		url: AdminPages.assignedConfirmed,
		iosIcon: calendarOutline,
		mdIcon: calendarOutline
	},
	{
		title: 'Doctor',
		url: AdminPages.doctors,
		iosIcon: heartHalfOutline,
		mdIcon: heartHalfSharp
	},
	{
		title: 'Settings',
		url: AdminPages.settings,
		iosIcon: settingsOutline,
		mdIcon: settingsSharp
	}
];
