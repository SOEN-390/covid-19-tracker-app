import {
	IonButton,
	IonContent,
	IonIcon,
	IonImg,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonMenu,
	IonMenuToggle,
	IonTitle
} from '@ionic/react';
import appLogo from '../../assets/images/CovidTrackerTransparent.png';
import Emergency from '../Emergency/Emergency';
import { useLocation } from 'react-router-dom';
import { logOutOutline } from 'ionicons/icons';
import './Menu.scss';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import {
	adminAppPages,
	AppPage,
	doctorAppPages,
	healthOfficialAppPages,
	immigrationOfficerAppPages,
	patientAppPages
} from './menuAppPages';
import React from 'react';

const Menu: React.FC<{ ionMenuId: string, userType: UserType }> = (props) => {
	const { currentUser, currentProfile, logout } = useAuth();
	const location = useLocation();

	const sideMenuPages: readonly AppPage[] = getMenuAppPagesByRole();

	// const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

	function getMenuAppPagesByRole(): readonly AppPage[] {
		switch (props.userType) {
			case UserType.PATIENT:
				return patientAppPages;
			case UserType.DOCTOR:
				return doctorAppPages;
			case UserType.IMMIGRATION_OFFICER:
				return immigrationOfficerAppPages;
			case UserType.HEALTH_OFFICIAL:
				return healthOfficialAppPages;
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
				return 'Immigration Officer';
			case UserType.ADMIN:
				return 'Admin';
			default:
				return '';
		}
	}

	return (
		<IonMenu contentId={props.ionMenuId} type="push">

			<IonContent>
				<IonImg src={appLogo} />
				<IonList className={'menu__inbox-list'}>

					<IonTitle>Welcome {getName()}</IonTitle>
					<br />
					<IonTitle>{currentUser?.email}</IonTitle>
					<IonTitle>{getRole()}</IonTitle>
					<IonItemDivider />

					{
						sideMenuPages.map((appPage, index) => {
							return (
								<IonMenuToggle key={index} autoHide={false}>
									<IonItem className={location.pathname === appPage.url ? 'selected' : ''}
										routerLink={appPage.url} routerDirection="none" lines="none"
										detail={false}>
										<IonIcon slot="start" icon={appPage.iosIcon} />
										<IonLabel>{appPage.title}</IonLabel>
									</IonItem>
									<br />
									{
										appPage.title === 'Doctors' && getRole() === 'Admin' &&
										<><IonTitle>Account</IonTitle><br /></>
									}

								</IonMenuToggle>

							);
						})
					}

					<IonMenuToggle autoHide={false}>
						<IonItem routerDirection="none" lines="none" routerLink={'/'} onClick={logout}>
							<IonIcon slot="start" icon={logOutOutline} />
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
			<Emergency />
		</IonMenu>
	);
};

export default Menu;
