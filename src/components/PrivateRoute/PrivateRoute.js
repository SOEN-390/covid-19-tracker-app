import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAuth} from '../../providers/auth.provider';
import {UserType} from "../../enum/UserType.enum";
import {
    AdminPages,
    DoctorPages,
    HealthOfficialPages,
    ImmigrationOfficerPages,
    Pages,
    PatientPages
} from "../../providers/pages.enum";
import {Admin} from "../../objects/Admin.class";

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser, currentProfile} = useAuth();

    function getRole() {
        if (!currentProfile) {
            return null;
        }
        return currentProfile.getRole();
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser) {
                    switch (getRole()) {
                        case UserType.PATIENT:
                            if (rest.path.split('/')[1] !== PatientPages.home) {
                                return <Redirect to={PatientPages.home} />
                            }
                            break;
                        case UserType.DOCTOR:
                            if (rest.path.split('/')[1] !== DoctorPages.home) {
                                return <Redirect to={DoctorPages.home} />
                            }
                            break;
                        case UserType.IMMIGRATION_OFFICER:
                            if (rest.path.split('/')[1] !== ImmigrationOfficerPages.home) {
                                return <Redirect to={ImmigrationOfficerPages.home} />
                            }
                            break;
                        case UserType.HEALTH_OFFICIAL:
                            if (rest.path.split('/')[1] !== HealthOfficialPages.home) {
                                return <Redirect to={HealthOfficialPages.home} />
                            }
                            break;
                        case UserType.ADMIN:
                            if (rest.path.split('/')[1] !== AdminPages.home) {
                                return <Redirect to={AdminPages.home} />
                            }
                            break;
                        default:
                            return <Redirect to="/login"/>;
                    }
                    return <Component {...props} />;
                }
                return <Redirect to="/login"/>;
            }}
        />
    );
}
