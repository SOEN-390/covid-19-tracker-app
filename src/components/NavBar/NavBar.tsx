import {
	IonAvatar,
	IonButton,
	IonItem,
	IonMenuButton,
	IonRow,
	IonSearchbar,
	IonToolbar
} from '@ionic/react';
import './NavBar.scss';
import userIcon from '../../assets/images/UserIcon.png';
import React, { useState } from 'react';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import { AdminPages, DoctorPages, HealthOfficialPages } from '../../providers/pages.enum';
import { useHistory } from 'react-router-dom';

const NavBar: React.FC = () => {
	const [searchText, setSearchText] = useState('');
	const {currentProfile} = useAuth();
	const history = useHistory();

	async function search() {
		if (searchText.trim() === '') {
			return;
		}
		if (currentProfile.getRole() === UserType.ADMIN) {
			history.push({
				pathname: AdminPages.patientProfile + '/' + searchText
			});
		} else if (currentProfile.getRole() === UserType.HEALTH_OFFICIAL) {
			history.push({
				pathname: HealthOfficialPages.patientProfile + '/' + searchText
			});
		} else if (currentProfile.getRole() === UserType.DOCTOR) {
			history.push({
				pathname: DoctorPages.patientProfile + '/' + searchText
			});
		}
	}

	return (
		<IonToolbar>
			<IonMenuButton slot="start"/>
			<IonRow className={'ion-align-items-end navbar__row'}>

				{
					currentProfile ? (currentProfile.getRole() === UserType.PATIENT ? null :
						<div className={'search-bar'}>
							<IonItem lines={'none'}>

								<IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value || '')}
											  showCancelButton="never"
								/>
								<IonButton onClick={search}> Search </IonButton>
							</IonItem>
						</div>) : null
				}

				<IonAvatar>
					<img src={userIcon} alt=""/>
				</IonAvatar>
				{/*<IonCol size="2">*/}

				{/*    <h5>Beshoy Soliman</h5>*/}
				{/*    <p>PatientProfilePage</p>*/}

				{/*</IonCol>*/}

			</IonRow>
		</IonToolbar>

	);
};

export default NavBar;
