import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { environment } from '../environments/environment';
import  { useState } from "react"
import { type, userInfo } from 'os';

firebase.initializeApp(environment.firebaseConfig);

export async function loginUser(email: string, password: string) {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(res);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function registerUser(email: string, password: string) {
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log(res); // show massage in a toast for user
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function signOutUser() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('done right');
        return true;
    }).catch(function (error) {
        // An error happened.
        console.log('didnt worked');
        return false;
    });
}

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const sub = firebase.auth().onAuthStateChanged(function (user) {
            console.log(user)
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
            sub();
        });
    }).catch((error) => {
        console.log('Error happened at getCurrentUser(): firebase');
    });
}

export function GetCurrentUserObject() {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>()
    firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            if(user)
            setCurrentUser(user)
        })
        console.log(currentUser)
        return currentUser;
        console.log('Error happened at getCurrentUser(): firebase');
    }

