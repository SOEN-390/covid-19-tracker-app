import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import Overview from '../pages/Overview/Overview.page';
import Appointments from '../pages/Appointments/Appointments';
import SymptomsForm from '../pages/SymptomsForm/SymptomsForm.page';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { PatientPages } from '../providers/pages.enum';

setupIonicReact();

const PatientRouting: React.FC = () => {
    return (
        <IonSplitPane contentId="home">
            <Menu/>
            <IonRouterOutlet id="home">
                <Route path={PatientPages.home} exact={true}>
                    <Redirect to={PatientPages.overview}/>
                </Route>
                <Route path={PatientPages.overview}>
                    <Overview/>
                </Route>
                <Route path={PatientPages.appointments}>
                    <Appointments/>
                </Route>
                <Route path={PatientPages.symptoms}>
                    <SymptomsForm/>
                </Route>
                <Route path={PatientPages.patientProfile}>
                    <PatientProfile/>
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default PatientRouting;
