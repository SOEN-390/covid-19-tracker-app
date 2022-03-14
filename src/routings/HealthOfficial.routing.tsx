import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { HealthOfficialPages } from '../providers/pages.enum';
import { UserType } from '../enum/UserType.enum';
import React from 'react';
import PatientsPage from '../pages/Patients/Patients.page';

setupIonicReact();

const HealthOfficialRouting: React.FC = () => {
	return (
		<IonReactRouter>
			<IonSplitPane contentId="health-official">
				<Menu ionMenuId={'health-official'} userType={UserType.HEALTH_OFFICIAL}/>
				<IonRouterOutlet id="health-official">
					<Route path={HealthOfficialPages.home} exact={true}>
						<Redirect to={HealthOfficialPages.patients}/>
					</Route>
					<Route path={HealthOfficialPages.patients}>
						<PatientsPage/>
					</Route>
					<Route path={HealthOfficialPages.patientProfile}>
						<PatientProfile/>
					</Route>
				</IonRouterOutlet>
			</IonSplitPane>
		</IonReactRouter>
	);
};

export default HealthOfficialRouting;
