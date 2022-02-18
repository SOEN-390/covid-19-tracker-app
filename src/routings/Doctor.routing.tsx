import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { DoctorPages } from '../providers/pages.enum';

setupIonicReact();

const DoctorRouting: React.FC = () => {
    return (
        <IonSplitPane contentId="doctor">
            <Menu/>
            <IonRouterOutlet id="doctor">
                <Route path={DoctorPages.home} exact={true}>
                    <Redirect to={DoctorPages.patientProfile}/>
                </Route>

                <Route path={DoctorPages.patientProfile}>
                    <PatientProfile />
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default DoctorRouting;
