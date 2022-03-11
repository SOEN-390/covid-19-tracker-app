import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { AdminPages } from '../providers/pages.enum';
import AdminOverviewPage from '../pages/Admin/AdminOverview.page';
import DoctorsAdminPage from '../pages/AdminDoctors/Doctors.admin.page';
import SettingsPage from '../pages/Settings/Settings.page';
import { UserType } from '../enum/UserType.enum';
import React from 'react';
import PatientsPage from '../pages/Patients/Patients.page';

setupIonicReact();

const AdminRouting: React.FC = () => {
	return (
		<IonSplitPane contentId="admin">
			<Menu ionMenuId={'admin'} userType={UserType.ADMIN}/>
			<IonRouterOutlet id="admin">
				<Route path={AdminPages.home} exact={true}>
					<Redirect to={AdminPages.overview}/>
				</Route>
				<Route path={AdminPages.overview}>
					<AdminOverviewPage/>
				</Route>
				<Route path={AdminPages.patientProfile}>
					<PatientProfile/>
				</Route>
				<Route path={AdminPages.patients}>
					<PatientsPage />
				</Route>
				<Route path={AdminPages.doctors}>
					<DoctorsAdminPage/>
				</Route>
				<Route path={AdminPages.settings}>
					<SettingsPage/>
				</Route>
			</IonRouterOutlet>
		</IonSplitPane>
	);
};

export default AdminRouting;
