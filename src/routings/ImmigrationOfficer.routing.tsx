import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import ImmigrationDashboard from '../pages/ImmigrationOfficer/immigrationDashboard';

import { ImmigrationOfficerPages } from '../providers/pages.enum';

setupIonicReact();

const ImmigrationOfficerRouting: React.FC = () => {
    return (
        <IonSplitPane contentId="immigration-officer">
            <Menu/>
            <IonRouterOutlet id="immigration-officer">
                <Route path={ImmigrationOfficerPages.home} exact={true}>
                    <Redirect to={ImmigrationOfficerPages.immigrationDashboard}/>
                </Route>

                <Route path={ImmigrationOfficerPages.immigrationDashboard}>
                    <ImmigrationDashboard/>
                </Route>
                <Route path={ImmigrationOfficerPages.patientProfile}>
                    <PatientProfile/>
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default ImmigrationOfficerRouting;
