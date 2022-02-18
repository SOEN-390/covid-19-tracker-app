import { IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import PatientProfile from '../pages/PatientProfile/PatientProfile.page';
import { DoctorPages } from '../providers/pages.enum';
import { UserType } from '../enum/UserType.enum';
import ConfirmedPatientsTable from '../pages/Doctor/ConfirmedPatientsTable';
import UnconfirmedPatientsTable from '../pages/Doctor/UnconfirmedPatientsTable';

setupIonicReact();

const DoctorRouting: React.FC = () => {
    return (
        <IonSplitPane contentId="doctor">
            <Menu ionMenuId={'doctor'} userType={UserType.DOCTOR} />
            <IonRouterOutlet id="doctor">
                <Route path={DoctorPages.home} exact={true}>
                    <Redirect to={DoctorPages.patientProfile} />
                </Route>

                <Route path={DoctorPages.patientProfile}>
                    <PatientProfile />
                </Route>
                <Route path={DoctorPages.assignedConfirmed}>
                    <ConfirmedPatientsTable />
                </Route>
                <Route path={DoctorPages.unAssignedConfirmed}>
                    <UnconfirmedPatientsTable />
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default DoctorRouting;
