import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Menu from '../components/Menu/Menu';
import Overview from '../pages/Overview/Overview.page';
import AppointmentsPage from '../pages/Appointments/Appointments.page';
import SymptomsForm from '../pages/SymptomsForm/SymptomsForm.page';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { PatientPages } from '../providers/pages.enum';
import { UserType } from '../enum/UserType.enum';
import React from 'react';
import ReportInContactPage from '../pages/ReportInContact/ReportInContact.page';
import ChatPage from '../pages/Chat/Chat.page';

setupIonicReact();

const PatientRouting: React.FC = () => {
	return (
		<IonReactRouter>
			<IonSplitPane contentId="home">
				<Menu ionMenuId={'home'} userType={UserType.PATIENT}/>
				<IonRouterOutlet id="home">
					<Route path={PatientPages.home} exact={true}>
						<Redirect to={PatientPages.overview}/>
					</Route>
					<Route path={PatientPages.overview}>
						<Overview/>
					</Route>
					<Route path={PatientPages.appointments}>
						<AppointmentsPage/>
					</Route>
					<Route path={PatientPages.symptoms}>
						<SymptomsForm/>
					</Route>
					<Route path={PatientPages.patientProfile}>
						<PatientProfile/>
					</Route>
					<Route path={PatientPages.reportInContact}>
						<ReportInContactPage/>
					</Route>
					<Route path={PatientPages.chat}>
						<ChatPage/>
					</Route>
				</IonRouterOutlet>
			</IonSplitPane>
		</IonReactRouter>
	);
};

export default PatientRouting;
