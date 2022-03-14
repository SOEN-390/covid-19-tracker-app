import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { DoctorPages } from '../providers/pages.enum';
import DashboardDoctorPage from '../pages/DoctorDashboard/Dashboard.doctor.page';
import { UserType } from '../enum/UserType.enum';
import React from 'react';
import PatientsPage from '../pages/Patients/Patients.page';

setupIonicReact();

const DoctorRouting: React.FC = () => {
	return (
		<IonReactRouter>
			<IonSplitPane contentId="doctor">
				<Menu ionMenuId={'doctor'} userType={UserType.DOCTOR}/>
				<IonRouterOutlet id="doctor">
					<Route path={DoctorPages.home} exact={true}>
						<Redirect to={DoctorPages.dashboard}/>
					</Route>
					<Route path={DoctorPages.dashboard}>
						<DashboardDoctorPage/>
					</Route>
					<Route path={DoctorPages.patientProfile}>
						<PatientProfile/>
					</Route>
					<Route path={DoctorPages.patients}>
						<PatientsPage/>
					</Route>
				</IonRouterOutlet>
			</IonSplitPane>
		</IonReactRouter>
	);
};

export default DoctorRouting;
