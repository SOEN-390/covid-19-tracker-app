import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { AdminPages } from '../providers/pages.enum';
import AdminOverviewPage from '../pages/Admin/AdminOverview.page';
import AssignedConfirmedPage from '../pages/Admin/AssignedConfirmed.page';
import UnAssignedConfirmedPage from '../pages/Admin/UnAssignedConfirmed.page';
import DoctorsPage from '../pages/Admin/Doctors.page';
import SettingsPage from '../pages/Settings/Settings.page';
import { UserType } from '../enum/UserType.enum';
import React from 'react';

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
				<Route path={AdminPages.assignedConfirmed}>
					<AssignedConfirmedPage/>
				</Route>
				<Route path={AdminPages.unAssignedConfirmed}>
					<UnAssignedConfirmedPage/>
				</Route>
				<Route path={AdminPages.doctors}>
					<DoctorsPage/>
				</Route>
				<Route path={AdminPages.settings}>
					<SettingsPage/>
				</Route>
			</IonRouterOutlet>
		</IonSplitPane>
	);
};

export default AdminRouting;
