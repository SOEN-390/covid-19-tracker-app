import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAuth} from '../../providers/auth.provider';
import {UserType} from "../../enum/UserType.enum";

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
                        case UserType.DOCTOR:
                        case UserType.IMMIGRATION_OFFICER:
                            if (rest.path.substring(0, 5) !== '/home') {
                                return <Redirect to={'/home'} />
                            }
                            break;
                        case UserType.ADMIN:
                            if (rest.path.substring(0, 6) !== '/admin') {
                                return <Redirect to={'/admin'} />
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
