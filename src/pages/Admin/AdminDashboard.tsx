import {IonRouterOutlet, IonSplitPane} from '@ionic/react';
import {Redirect, Route} from 'react-router-dom';

import { Pages } from '../../providers/pages.enum';
import AssignedConfirmed from '../../pages/Admin/AssignedConfirmed'

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
import Doctors from './Doctors';
import UnAssignedConfirmed from './UnAssignedConfirmed';
import Settings from '../Settings/Settings';
import AdminOverview from './AdminOverview';
import Menu from '../../components/Menu';


const AdminDashboard: React.FC = () => {

    return (
        <IonSplitPane contentId="admin">
            <Menu/>
            <IonRouterOutlet id="admin">
                <Route path={Pages.admin} exact={true} >
                    <Redirect to={Pages.adminOverview}/>
                </Route>
                <Route path={Pages.adminOverview} >
                     <AdminOverview/>
                </Route>

                <Route path={Pages.assignedConfirmed} >
                     <AssignedConfirmed/>
                </Route>
                <Route path={Pages.unAssignedConfirmed} >
                     <UnAssignedConfirmed/>
                </Route>
                <Route path={Pages.doctors} >
                    <Doctors/>
                </Route>
                <Route path={'/admin'+Pages.settings} >
                    <Settings/>
                </Route>

            </IonRouterOutlet>
            
        </IonSplitPane>
    );
};

export default AdminDashboard;
