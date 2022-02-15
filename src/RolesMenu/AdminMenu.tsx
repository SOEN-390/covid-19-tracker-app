import {IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, IonTitle, setupIonicReact} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';

import { Pages } from '../providers/pages.enum';
import appLogo from '../assets/images/CovidTrackerTransparent.png'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import Emergency from '../components/Emergency';
import '../components/Menu.css';


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

import { useAuth } from '../providers/auth.provider';
import { UserType } from '../enum/UserType.enum';

setupIonicReact();

interface page {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}
const adminPages: page[] = [
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
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
    },
    {
        title: 'Settings',
        url: Pages.settings,
        iosIcon: appsOutline,
        mdIcon: appsOutline
    },
];

// const accountPages: page[] = [
//     {
//         title: 'Settings',
//         url: Pages.overview,
//         iosIcon: appsOutline,
//         mdIcon: appsOutline
//     },
// ];

const AdminMenu: React.FC = () => {

    const {currentUser, logout} = useAuth();
    const location = useLocation();

    
    return (
        <IonMenu contentId="home" type="push">
            <IonContent>
                <IonList id="inbox-list">
                <IonImg src={appLogo}/>

                    <IonTitle>Welcome {currentUser?.email}</IonTitle>
                    <IonTitle>Admin</IonTitle>
                    <IonItemDivider/>
                    {adminPages.map((adminPage, index) => {
                        return (
                            
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === adminPage.url ? 'selected' : ''}
                                         routerLink={adminPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={adminPage.iosIcon} md={adminPage.mdIcon}/>
                                    <IonLabel>{adminPage.title}</IonLabel>
                                </IonItem>
                                {adminPage.title=="Doctor"? <><IonList id="inbox-list"> </IonList><IonTitle>Account</IonTitle></> : ''}

                            </IonMenuToggle>
                        );
                    })
                    }
                    
                     <IonMenuToggle key={adminPages.length + 1} autoHide={false}>
                        <IonItem routerDirection="none" lines="none" detail={false} onClick={logout}>
                            <IonIcon slot="start" ios={logOutOutline} md={logOutOutline}/>
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
               
            </IonContent>
            <Emergency/>
        </IonMenu>


    );
};

export default AdminMenu;
