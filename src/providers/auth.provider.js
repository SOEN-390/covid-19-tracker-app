import React, {useContext, useEffect, useState} from "react";
import {auth} from '../config/firebase';
import firebase from 'firebase/compat/app';
import {Pages, PatientPages} from "./pages.enum";
import {User} from "../objects/User.class";
import HttpService from "./http.service";
import {UserType} from "../enum/UserType.enum";
import {Patient} from "../objects/Patient.class";
import {Doctor} from "../objects/Doctor.class";
import {ImmigrationOfficer} from "../objects/ImmigrationOfficer.class";
import {Admin} from "../objects/Admin.class";
import {useIonToast} from "@ionic/react";
import {HealthOfficial} from "../objects/HealthOfficial.class";

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export let idToken = '';

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(firebase.User | undefined); // The user from firebase
    const [currentProfile, setCurrentProfile] = useState(User | undefined); // The user from our database
    const [loading, setLoading] = useState(true);
    const [present] = useIonToast();

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.firebaseUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.firebaseUser.updatePassword(password);
    }

    async function isEmailUsed(email){
        try {
            const signInMethods = await auth.fetchSignInMethodsForEmail(email);
            // Already signed up with this email if there is a length
            return !signInMethods.length;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function getCurrentUserProfile(user) {
        if (!user) {
            return undefined;
        }
        try {
            const userData = await HttpService.get('users');
            return createUserProfileObject(userData);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    function createUserProfileObject(userData) {
        if (!userData) {
            return undefined;
        }
        switch (userData.role) {
            case UserType.PATIENT:
                return new Patient(userData.id, userData.firstName, userData.lastName, userData.phoneNumber,
                    userData.address, userData.medicalId, userData.testResult, userData.dob, userData.gender);
            case UserType.DOCTOR:
                return new Doctor(userData.id, userData.firstName, userData.lastName, userData.phoneNumber, userData.address);
            case UserType.IMMIGRATION_OFFICER:
                return new ImmigrationOfficer(userData.id, userData.firstName, userData.lastName, userData.phoneNumber, userData.address);
            case UserType.HEALTH_OFFICIAL:
                return new HealthOfficial(userData.id, userData.firstName, userData.lastName, userData.phoneNumber, userData.address);
            case UserType.ADMIN:
                return new Admin(userData.id, userData.firstName, userData.lastName, userData.phoneNumber, userData.address);
            default:
                return undefined;
        }
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            if (user) {
                idToken = await user.getIdToken();
                getCurrentUserProfile(user).then((profile) => {
                    setCurrentProfile(profile);
                    if (window.location.pathname === Pages.login || window.location.pathname === '/') {
                        window.location.pathname = PatientPages.home;
                    }
                    setLoading(false);
                }).catch((error) => {
                    if (window.location.pathname === Pages.register || window.location.pathname === '/register/2') {
                        return;
                    }
                    logout();
                    if (window.location.pathname !== Pages.login) {
                        window.location.pathname = Pages.login;
                    }
                    console.log(error);
                    present('Something went wrong!', 1500);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        currentProfile,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        isEmailUsed
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
