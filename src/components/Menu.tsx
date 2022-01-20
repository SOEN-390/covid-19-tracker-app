import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAvatar,
  IonMenuButton,
} from '@ionic/react';

import logo from '../resources/icon.png'




import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, appsOutline, calendarOutline } from 'ionicons/icons';
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
    url: '/page/Overview',
    iosIcon: appsOutline,
    mdIcon: appsOutline
  },
  {
    title: 'Appointments',
    url: '/page/Appointments',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'option 1',
    url: '/page/option1',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'option 2',
    url: '/page/option2',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'option 3',
    url: '/page/option3',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Alert',
    url: '/page/Alert',
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
          })}
        </IonList>



      </IonContent>
    </IonMenu>
  );
};

export default Menu;
