import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonImg,
    IonTitle,
    IonItemDivider
} from '@ionic/react';
import appLogo from '../../assets/images/CovidTrackerTransparent.png'
import Emergency from '../Emergency/Emergency';
import { useLocation } from 'react-router-dom';
import { logOutOutline } from 'ionicons/icons';
import './Menu.css';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import { adminAppPages, AppPage, doctorAppPages, immigrationOfficerAppPages, patientAppPages } from './menuAppPages';

const Menu: React.FC<{ionMenuId: string, userType: UserType}> = (props) => {
    const {currentUser, currentProfile, logout} = useAuth();
    const location = useLocation();

    const sideMenuPages: AppPage[] = getMenuAppPagesByRole();

    // const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    function getMenuAppPagesByRole(): AppPage[] {
        switch (props.userType) {
            case UserType.PATIENT:
                return patientAppPages;
            case UserType.DOCTOR:
                return doctorAppPages;
            case UserType.IMMIGRATION_OFFICER:
                return immigrationOfficerAppPages;
            case UserType.ADMIN:
                return adminAppPages;
            default:
                return patientAppPages;
        }
    }

    function getName(): string {
        if (!currentProfile) {
            return '';
        }
        return `${currentProfile.firstName} ${currentProfile.lastName}`;
    }

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
                return 'Admin';
            default:
                return '';
        }
    }

    return (
        <IonMenu contentId={props.ionMenuId} type="push">

            <IonContent>
                <IonImg src={appLogo}/>
                <IonList id="inbox-list">
                    {/*<IonAvatar>*/}
                    {/*    <IonImg src={logo}/>*/}
                    {/*</IonAvatar>*/}

                    <IonTitle>Welcome {getName()}</IonTitle>
                    <br/>
                    <IonTitle>{currentUser?.email}</IonTitle>
                    <IonTitle>{getRole()}</IonTitle>
                    <IonItemDivider/>
                    {/*<IonList id="inbox-list">*/}
                    {/*</IonList>*/}


                    {
                        sideMenuPages.map((appPage, index) => {
                            return (
                                <IonMenuToggle key={index} autoHide={false}>
                                    <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                                             routerLink={appPage.url} routerDirection="none" lines="none"
                                             detail={false}>
                                        <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                                        <IonLabel>{appPage.title}</IonLabel>
                                    </IonItem>
                                    {
                                        appPage.title === 'Doctor' && getRole() === 'Admin' ?
                                            <><IonList id="inbox-list"> </IonList><IonTitle>Account</IonTitle></> :
                                            ''
                                    }

                                </IonMenuToggle>

                            );
                        })
                    }
                    <IonMenuToggle key={sideMenuPages.length + 1} autoHide={false}>
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
