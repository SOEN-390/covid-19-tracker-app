import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import environment from '../environments/environment';
import { Capacitor } from '@capacitor/core';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';

const app = firebase.initializeApp(environment.firebaseConfig);

if (Capacitor.isNativePlatform()) {
	initializeAuth(app, {
		persistence: indexedDBLocalPersistence
	});
}

export const auth = app.auth();
export default app;
