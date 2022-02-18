import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import HealthOfficialPatientsPage from '../pages/Patients/Patients.page';
import { HealthOfficialPages } from '../providers/pages.enum';

setupIonicReact();

const HealthOfficialRouting: React.FC = () => {
    return (
        <IonSplitPane contentId="health-official">
            <Menu/>
            <IonRouterOutlet id="health-official">
                <Route path={HealthOfficialPages.home} exact={true}>
                    <Redirect to={HealthOfficialPages.patientsPage}/>
                </Route>

                <Route path={HealthOfficialPages.patientsPage}>
                    <HealthOfficialPatientsPage />
                </Route>
                <Route path={HealthOfficialPages.patientProfile}>
                    <PatientProfile/>
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default HealthOfficialRouting;
