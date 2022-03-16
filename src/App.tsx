import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login.page';
import RegisterPage from './pages/Register/Register.page';
import Chatapp from './chat/Chat';
import PatientRouting from './routings/Patient.routing';
import RegisterNextPage from './pages/Register/RegisterNext.page';
import {
	AdminPages,
	DoctorPages,
	HealthOfficialPages,
	ImmigrationOfficerPages,
	Pages,
	PatientPages
} from './providers/pages.enum';
import { AuthProvider } from './providers/auth.provider';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import DoctorRouting from './routings/Doctor.routing';
import ImmigrationOfficerRouting from './routings/ImmigrationOfficer.routing';
import HealthOfficialRouting from './routings/HealthOfficial.routing';
import AdminRouting from './routings/Admin.routing';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

	return (
		<IonApp>
			<AuthProvider>
				<IonReactRouter>
					<IonRouterOutlet id="main">
						<Route path="" exact={true}>
							<Redirect to={Pages.login}/>
						</Route>
						<Route path={Pages.login} exact={true}>
							<LoginPage/>
						</Route>
						<Route path='/chat' exact={true}>
							<Chatapp/>
						</Route>
						<Route path={Pages.register} exact={true}>
							<RegisterPage/>
						</Route>
						<Route path="/register/2" exact={true}>
							<RegisterNextPage/>
						</Route>
						<PrivateRoute path={PatientPages.home} component={PatientRouting}/>
						<PrivateRoute path={DoctorPages.home} component={DoctorRouting}/>
						<PrivateRoute path={ImmigrationOfficerPages.home} component={ImmigrationOfficerRouting}/>
						<PrivateRoute path={HealthOfficialPages.home} component={HealthOfficialRouting}/>
						<PrivateRoute path={AdminPages.home} component={AdminRouting}/>
					</IonRouterOutlet>
				</IonReactRouter>
			</AuthProvider>
		</IonApp>
	);
};

export default App;
