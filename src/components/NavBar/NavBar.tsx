import {
	IonAvatar,
	IonButton,
	IonCol,
	IonGrid,
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

const NavBar: React.FC<{ callback?: any }> = (props) => {
	const [searchText, setSearchText] = useState('');
	const {currentProfile} = useAuth();

	async function search() {
		if (searchText.trim() === '') {
			return;
		}
		props.callback(searchText);
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
