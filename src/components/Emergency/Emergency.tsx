import { IonCol, IonFooter, IonIcon, IonRow, IonText } from '@ionic/react';
import { call } from 'ionicons/icons';
import './Emergency.css';
import React from 'react';

const Emergency: React.FC = () => {

	return (
		<IonFooter>
			<div className="emergencyBox">
				<IonRow>
					<IonCol size="1.5"><IonIcon icon={call}/></IonCol>
					<IonCol>
						<IonText style={{color: 'red'}}>
							Emergency Hotline
						</IonText>
						<br/>
						<p>+232 453 4324</p>
					</IonCol>
				</IonRow>
			</div>
		</IonFooter>
	);
};

export default Emergency;
