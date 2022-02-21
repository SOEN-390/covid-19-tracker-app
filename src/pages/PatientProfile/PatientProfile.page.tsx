import { IonPage } from '@ionic/react';

import PatientInformation from '../../components/PatientInformation/PatientInformation';
import NavBar from '../../components/NavBar';
import { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';

const PatientProfilePage: React.FC = () => {

    const [medicalNumber, setMedicalNumber] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [testResult, setTestResult] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        getPatientWithId();
    }, [medicalNumber]);

    async function getPatientWithId() {
        try {
            const data = await HttpService.get(`patients/${medicalNumber}`);
            setData(data);
        } catch (e) {
            console.log(e);
        }
    }

    function setData(data: any) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setTestResult(data.testResult);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setEmail(data.email);
        setDOB(data.dob);
        setGender(data.gender);
    }


    let handleCallBack = (medicalId: string) => {;
        setMedicalNumber(medicalId);
    }

    return (
        <IonPage>
            <NavBar callback = {handleCallBack}/>
            <PatientInformation patient={{medicalId: medicalNumber, firstName: firstName, lastName: lastName,
            testResult: testResult, address: address, email: email, phoneNumber: phoneNumber, dob: dob, gender: gender}}/>
        </IonPage>
    );
};

export default PatientProfilePage;
