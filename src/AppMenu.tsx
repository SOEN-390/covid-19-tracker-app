import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import OverviewPage from './pages/Overview/Overview.page';
import Appointments from './pages/Appointments/Appointments';
import SymptomsFormPage from './pages/SymptomsForm/SymptomsForm.page';
import PatientProfilePage from './pages/PatientProfile/PatientProfile.page';
import ImmigrationDashboard from './pages/ImmigrationOfficer/immigrationDashboard';
import PatientsPage from './pages/Patients/Patients.page';

import { Pages } from './providers/pages.enum';

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

const AppMenu: React.FC = () => {
    return (
        <IonSplitPane contentId="home">
            <Menu/>
            <IonRouterOutlet id="home">
                <Route path={Pages.home} exact={true}>
                    <Redirect to={Pages.overview}/>
                </Route>

                <Route path={Pages.overview}>
                    <OverviewPage/>
                </Route>
                <Route path={Pages.appointments}>
                    <Appointments/>
                </Route>
                <Route path={Pages.symptoms}>
                    <SymptomsFormPage/>
                </Route>
                <Route path={Pages.patientProfile}>
                    <PatientProfilePage/>
                </Route>
                <Route path={Pages.healthOfficialPage}>
                    <PatientsPage/>
                </Route>
                <Route path={Pages.immigrationDashboard}>
                    <ImmigrationDashboard/>
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default AppMenu;
