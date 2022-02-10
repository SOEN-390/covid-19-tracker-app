import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { environment } from './src/environments/environment';

const app = firebase.initializeApp(environment.firebaseConfig);

export const auth = app.auth();
export default app;
