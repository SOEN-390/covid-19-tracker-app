import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonAvatar,
    IonImg
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
    },
    {
        title: 'Logout',
        url: Pages.logout,
        iosIcon: logOutOutline,
        mdIcon: logOutOutline
    }
];


const Menu: React.FC = () => {
    const location = useLocation();

    // const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    return (
        <IonMenu contentId="home" type="push">
            <IonContent>
                <IonList id="inbox-list">
                    <IonAvatar>
                        <IonImg src={logo}/>
                    </IonAvatar>

                    <h5>Beshoy Soliman</h5>
                    <p>Doctor</p>

                    <IonList id="inbox-list">
                    </IonList>
                    {appPages.map((appPage, index) => {
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
