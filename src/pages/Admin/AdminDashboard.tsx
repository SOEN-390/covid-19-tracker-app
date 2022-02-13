import {IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, setupIonicReact} from '@ionic/react';
import {Redirect, Route, useLocation} from 'react-router-dom';

import Logout from '../../pages/Logout/Logout';
import { Pages } from '../../providers/pages.enum';
import AssignedConfirmed from '../../pages/Admin/AssignedConfirmed'
import AdminMenu from '../../RolesMenu/AdminMenu';
import NavBar from '../../components/NavBar';

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


const AdminDashboard: React.FC = () => {

    return (
        <IonSplitPane contentId="admin">
            <AdminMenu/>
            <IonRouterOutlet id="admin">
                <Route path={Pages.admin} exact={true} >
                    <h1>Welcome to Admin Dashboard</h1>
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

                <Route path={Pages.logout}>
                    <Logout />
                </Route>
                
            </IonRouterOutlet>
            
        </IonSplitPane>
    );
};

export default AdminDashboard;
