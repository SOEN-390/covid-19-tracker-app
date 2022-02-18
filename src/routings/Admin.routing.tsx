import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import PatientProfile from '../pages/Doctor/PatientProfile';
import { AdminPages } from '../providers/pages.enum';

setupIonicReact();

const DoctorRouting: React.FC = () => {
    return (
        <IonSplitPane contentId="admin">
            <Menu/>
            <IonRouterOutlet id="admin">
                <Route path={AdminPages.home} exact={true}>
                    <Redirect to={AdminPages.patientProfile}/>
                </Route>

                <Route path={AdminPages.patientProfile}>
                    <PatientProfile />
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default DoctorRouting;
