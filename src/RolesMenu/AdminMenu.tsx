import {IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';

import { Pages } from '../providers/pages.enum';
import adminLogo from '../resources/system-admin.png'

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
import '../components/Menu.css';


import {GetCurrentUserObject} from '../providers/firebase.service'

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
];

const accountPages: page[] = [
    {
        title: 'Settings',
        url: Pages.overview,
        iosIcon: appsOutline,
        mdIcon: appsOutline
    },
    {
        title: 'Logout',
        url: Pages.logout,
        iosIcon: logOutOutline,
        mdIcon: logOutOutline
    }
];

const AdminMenu: React.FC = () => {
    const currentUser=GetCurrentUserObject();
    const location = useLocation();

    return (
        <IonMenu contentId="home" type="push">
            <IonContent>
                <IonList id="inbox-list">
                    <IonAvatar>
                        <IonImg  src={adminLogo}/>
                    </IonAvatar>
                    <h5>Welcome {currentUser?.email}</h5>
                    <p>Admin</p>
                    <IonList id="inbox-list"> </IonList>
                    {adminPages.map((adminPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === adminPage.url ? 'selected' : ''}
                                         routerLink={adminPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={adminPage.iosIcon} md={adminPage.mdIcon}/>
                                    <IonLabel>{adminPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })
                    }
                    <IonList id="inbox-list"> </IonList>
                    <b>Account</b>
                    {accountPages.map((adminPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === adminPage.url ? 'selected' : ''}
                                         routerLink={adminPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={adminPage.iosIcon} md={adminPage.mdIcon}/>
                                    <IonLabel>{adminPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })
                    }
                </IonList>
               
            </IonContent>
            <Emergency/>
        </IonMenu>


    );
};

export default AdminMenu;
