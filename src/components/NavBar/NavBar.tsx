import { IonAvatar, IonButton, IonCol, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonToolbar } from '@ionic/react';
import './NavBar.css';
import logo from '../../resources/icon.png';
import React, { useState } from 'react';
import HttpService from '../../providers/http.service';
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
			<IonGrid>
				<IonRow className="ion-align-items-end">
					<IonCol size="9" size-sd>

						{
							currentProfile ? (currentProfile.getRole() === UserType.PATIENT ? null :
								<div>
									<IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}
												  showCancelButton="never"/>
									<IonButton onClick={search}> Search </IonButton>
								</div>) : null
						}

					</IonCol>

					<IonCol size="1">
						<IonAvatar className="avatar">
							<img src={logo} alt=""/>
						</IonAvatar>
					</IonCol>
					{/*<IonCol size="2">*/}

					{/*    <h5>Beshoy Soliman</h5>*/}
					{/*    <p>PatientProfilePage</p>*/}

					{/*</IonCol>*/}

				</IonRow>
			</IonGrid>
		</IonToolbar>

	);
};

export default NavBar;