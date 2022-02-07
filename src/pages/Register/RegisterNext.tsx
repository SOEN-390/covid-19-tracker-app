import {
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonLabel,
    setupIonicReact,
    useIonToast
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';
import { useHistory } from 'react-router-dom';
import './Register.css';
import { Pages } from '../../providers/pages.enum';
import { useState } from 'react';

setupIonicReact();

const RegisterNext: React.FC = () => {
    enum testResults {
        POSITIVE  = "positive",
        NEGATIVE = "negative"
    }
    const [fname, setfName] = useState('')
    const [lName, setlastName] = useState('')
    const [address, setaddress] = useState('')

    interface IUser  {
        id: string, 
        firstName: string,
        lastName: string,
        testResults: testResults
        address: string
        email: string
        phoneNumber: string
    }
    let user : IUser 


    let history = useHistory();
    const [present] = useIonToast();
    
    
    function registration() {
        console.log("here is the information",fname)
      //  user.firstName = fname
      //  console.log("attribuer ", user.firstName)

        present('Successfully registered.');
        history.push(Pages.login);
    }
   

    return (
        <IonApp>
            <IonHeader>
            </IonHeader>

            <IonContent>
                <IonImg className="login-logo" src={CovidTrackerTransparent}/>
                <div className="sign-in-center">
                    <h2 className="login-text">Sign Up</h2>
                </div>
                <div className="ion-align-items-center; login-form-center">
                    <IonLabel className="login-text">Protect Yourself</IonLabel>

                    <br/><br/>

                    <IonLabel className="login-text">First Name </IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your First Name" type="text"
                      onIonChange={(e: any) => setfName(e.target.value)} />

                    <br/><br/>

                    <IonLabel className="login-text">Last Name</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Last Name" type="text"/>

                    <br/><br/>

                    <IonLabel className="login-text">Test Results</IonLabel>
                    <IonInput className="login-text-field" placeholder="positive or negative" type="text"/>

                    <br/><br/>

                    <IonLabel className="login-text">Your Address</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your Address" type="text" />

                    <br/><br/>

                    <IonLabel className="login-text">Medical card number</IonLabel>
                    <IonInput className="login-text-field" placeholder="Enter your medical card number" type="text"/>
                    <br/><br/>
                    

                    <IonButton size="large" expand="block" fill="solid" color={'dark-blue'}
                               onClick={registration}>Register</IonButton>
                </div>
            </IonContent>

        </IonApp>
    );
};

export default RegisterNext;
