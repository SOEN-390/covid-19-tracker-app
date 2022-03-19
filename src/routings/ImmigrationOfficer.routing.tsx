import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { ImmigrationOfficerPages } from '../providers/pages.enum';
import { UserType } from '../enum/UserType.enum';
import React from 'react';

setupIonicReact();

const ImmigrationOfficerRouting: React.FC = () => {
	return (
		<IonReactRouter>
			<IonSplitPane contentId="immigration-officer">
				<Menu ionMenuId={'immigration-officer'} userType={UserType.IMMIGRATION_OFFICER}/>
				<IonRouterOutlet id="immigration-officer">
					<Route path={ImmigrationOfficerPages.home} exact={true}>
						<Redirect to={ImmigrationOfficerPages.flaggedPatients}/>
					</Route>
					<Route path={ImmigrationOfficerPages.flaggedPatients}>
						{/*<PatientProfile/>*/}
					</Route>
					<Route exact={true} path={ImmigrationOfficerPages.patientProfile}>
						<PatientProfile/>
					</Route>
					<Route path={ImmigrationOfficerPages.patientProfile + '/:medicalId'}>
						<PatientProfile/>
					</Route>
				</IonRouterOutlet>
			</IonSplitPane>
		</IonReactRouter>
	);
};

export default ImmigrationOfficerRouting;
