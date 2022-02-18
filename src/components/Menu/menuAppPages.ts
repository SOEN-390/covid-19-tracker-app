import { Pages } from '../../providers/pages.enum';
import {
    appsOutline,
    archiveOutline,
    archiveSharp,
    calendarOutline, heartHalfOutline, heartHalfSharp,
    heartOutline,
    heartSharp, settingsOutline, settingsSharp,
    trashOutline, trashSharp, warningOutline, warningSharp
} from 'ionicons/icons';

export interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

export const patientAppPages: AppPage[] = [
    {
        title: 'Overview',
        url: Pages.overview,
        iosIcon: appsOutline,
        mdIcon: appsOutline
    },
    {
        title: 'Appointments',
        url: Pages.appointments,
        iosIcon: calendarOutline,
        mdIcon: calendarOutline
    },
    {
        title: 'Symptoms form',
        url: Pages.symptoms,
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'option 2',
        url: '/home/option2',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
    },
    {
        title: 'option 3',
        url: '/home/option3',
        iosIcon: trashOutline,
        mdIcon: trashSharp
    },
    {
        title: 'Alert',
        url: '/home/alert',
        iosIcon: warningOutline,
        mdIcon: warningSharp
    }
];


export const adminAppPages: AppPage[] = [
    {
        title: 'Overview',
        url: Pages.admin,
        iosIcon: appsOutline,
        mdIcon: appsOutline
    },
    {
        title: 'Confirmed Patients',
        url: Pages.assignedConfirmed,
        iosIcon: calendarOutline,
        mdIcon: calendarOutline
    },
    {
        title: 'Doctor',
        url: Pages.doctors,
        iosIcon: heartHalfOutline,
        mdIcon: heartHalfSharp
    },
    {
        title: 'Settings',
        url: '/admin'+Pages.settings,
        iosIcon: settingsOutline,
        mdIcon: settingsSharp
    },
];
