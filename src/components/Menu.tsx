import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonAvatar,
    IonImg, IonButton
} from '@ionic/react';
import logo from '../resources/icon.png'
import Emergency from './Emergency';
import { useLocation } from 'react-router-dom';
import {
    archiveOutline,
    archiveSharp,
    heartOutline,
    heartSharp,
    trashOutline,
    trashSharp,
    warningOutline,
    warningSharp,
    appsOutline,
    calendarOutline,
    logOutOutline
} from 'ionicons/icons';
import './Menu.css';
import { Pages } from '../providers/pages.enum';
import { useAuth } from '../providers/auth.provider';
import { UserType } from '../enum/UserType.enum';

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
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


const Menu: React.FC = () => {
    const {currentUser, currentProfile, logout} = useAuth();
    const location = useLocation();
    // const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    function getRole(): string {
        if (!currentProfile) {
            return '';
        }
        switch (currentProfile.getRole()) {
            case UserType.PATIENT:
                return 'Patient';
            case UserType.DOCTOR:
                return 'Doctor';
            case UserType.IMMIGRATION_OFFICER:
                return 'Immigration Officer'
            case UserType.ADMIN:
                return 'Admin'
            default:
                return '';
        }
    }

    return (
        <IonMenu contentId="home" type="push">
            <IonContent>
                <IonList id="inbox-list">
                    <IonAvatar>
                        <IonImg src={logo}/>
                    </IonAvatar>
                    <h5>Welcome {currentUser?.email}</h5>
                    <p>{getRole()}</p>
                    <IonList id="inbox-list">
                    </IonList>
                    {
                        appPages.map((appPage, index) => {
                            return (
                                <IonMenuToggle key={index} autoHide={false}>
                                    <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                                             routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                        <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                                        <IonLabel>{appPage.title}</IonLabel>
                                    </IonItem>
                                </IonMenuToggle>

                            );
                        })
                    }
                    <IonMenuToggle key={appPages.length+1} autoHide={false}>
                        <IonItem routerDirection="none" lines="none" detail={false} onClick={logout}>
                            <IonIcon slot="start" ios={logOutOutline} md={logOutOutline}/>
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
                {/*  <IonList id="labels-list">*/}
                {/*      <IonListHeader>Labels</IonListHeader>*/}
                {/*      {labels.map((label, index) => (*/}
                {/*          <IonItem lines="none" key={index}>*/}
                {/*              <IonIcon slot="start" icon={bookmarkOutline} />*/}
                {/*              <IonLabel>{label}</IonLabel>*/}
                {/*          </IonItem>*/}
                {/*      ))}*/}
                {/*  </IonList>*/}

            </IonContent>
            <Emergency/>
        </IonMenu>
    );
};

export default Menu;
