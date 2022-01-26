import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonAvatar,
  IonMenuButton,
} from '@ionic/react';

import logo from '../resources/icon.png'
import Emergency from './Emergency';



import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, trashOutline, trashSharp, warningOutline, warningSharp, appsOutline, calendarOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Overview',
    url: '/Overview',
    iosIcon: appsOutline,
    mdIcon: appsOutline
  },
  {
    title: 'Appointments',
    url: '/Appointments',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'option 1',
    url: '/option1',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'option 2',
    url: '/option2',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'option 3',
    url: '/option3',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Alert',
    url: '/Alert',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];


const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="push">
      <IonContent>
        <IonList id="inbox-list">
          <IonAvatar>
            <img src={logo} />
          </IonAvatar>


          <IonList id="inbox-list">
          </IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>

            );
          })
          }
        </IonList>


      </IonContent>
      <Emergency />
    </IonMenu>
  );
};

export default Menu;
