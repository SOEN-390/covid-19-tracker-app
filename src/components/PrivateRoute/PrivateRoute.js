import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAuth} from '../../providers/auth.provider';
import {UserType} from "../../enum/UserType.enum";
import {
    AdminPages,
    DoctorPages,
    HealthOfficialPages,
    ImmigrationOfficerPages,
    PatientPages
} from "../../providers/pages.enum";

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
                    const rootPath = '/' + rest.path.split('/')[1];
                    console.log(rootPath);
                    switch (getRole()) {
                        case UserType.PATIENT:
                            if (rootPath !== PatientPages.home) {
                                return <Redirect to={PatientPages.home} />
                            }
                            break;
                        case UserType.DOCTOR:
                            if (rootPath !== DoctorPages.home) {
                                return <Redirect to={DoctorPages.home} />
                            }
                            break;
                        case UserType.IMMIGRATION_OFFICER:
                            if (rootPath !== ImmigrationOfficerPages.home) {
                                return <Redirect to={ImmigrationOfficerPages.home} />
                            }
                            break;
                        case UserType.HEALTH_OFFICIAL:
                            if (rootPath !== HealthOfficialPages.home) {
                                return <Redirect to={HealthOfficialPages.home} />
                            }
                            break;
                        case UserType.ADMIN:
                            if (rootPath !== AdminPages.home) {
                                return <Redirect to={AdminPages.home} />
                            }
                            break;
                    }
                    return <Component {...props} />;
                }
                return <Redirect to="/login"/>;
            }}
        />
    );
}
