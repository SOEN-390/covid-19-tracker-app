import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyCc5OVW6IMigjStRF4UImwwYwgadQ9Up_o",
    authDomain: "cvoid-19-app.firebaseapp.com",
    projectId: "cvoid-19-app",
    storageBucket: "cvoid-19-app.appspot.com",
    messagingSenderId: "462027331949",
    appId: "1:462027331949:web:a9e9c7517a1bf40fb8a264",
    measurementId: "G-SR3XXFC56M"

};

firebase.initializeApp(config)

export async function loginUser(email: string, password: string) {

    try{
        const res = await firebase.auth().signInWithEmailAndPassword(email , password)
        console.log(res)
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
    
}
export async function registerUser(email: string, password: string) {
    try{
        const res = await firebase.auth().createUserWithEmailAndPassword(email,password)
        console.log(res) // show massage in a toast for user
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}

export function getCurrentUser() {
return new Promise((resolve, reject)=> {
 const sub = firebase.auth().onAuthStateChanged(function(user){
        if(user){
            resolve(user)
        }
        else{
            resolve(null)
        }
        sub()
    })
})
}