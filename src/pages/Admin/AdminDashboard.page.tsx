import {IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {Redirect, Route} from 'react-router-dom';

import { Pages } from '../../providers/pages.enum';
import AssignedConfirmedPage from './AssignedConfirmed.page'
import DoctorsPage from './Doctors.page';
import UnAssignedConfirmedPage from './UnAssignedConfirmed.page';
import SettingsPage from '../Settings/Settings.page';
import AdminOverviewPage from './AdminOverview.page';
import Menu from '../../components/Menu/Menu';

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
import '../../theme/variables.css';

const AdminDashboardPage: React.FC = () => {

    return (
        <IonSplitPane contentId="admin">
            <Menu/>
            <IonRouterOutlet id="admin">
                <Route path={Pages.admin} exact={true} >
                    <Redirect to={Pages.adminOverview}/>
                </Route>
                <Route path={Pages.adminOverview} >
                     <AdminOverviewPage/>
                </Route>
                <Route path={Pages.assignedConfirmed} >
                     <AssignedConfirmedPage/>
                </Route>
                <Route path={Pages.unAssignedConfirmed} >
                     <UnAssignedConfirmedPage/>
                </Route>
                <Route path={Pages.doctors} >
                    <DoctorsPage/>
                </Route>
                <Route path={'/admin'+Pages.settings} >
                    <SettingsPage/>
                </Route>
            </IonRouterOutlet>
        </IonSplitPane>
    );
};

export default AdminDashboardPage;
