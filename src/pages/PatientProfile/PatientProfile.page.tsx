import { IonPage } from '@ionic/react';

import PatientInformation from '../../components/PatientInformation/PatientInformation';
import NavBar from '../../components/NavBar';
import { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import { TestResult } from '../../enum/TestResult.enum';

const PatientProfilePage: React.FC = () => {

    const {currentProfile} = useAuth();

    const [medicalNumber, setMedicalNumber] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [testResult, setTestResult] = useState(currentProfile.testResult);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        if (!currentProfile) {
            return;
        }
        if (currentProfile.getRole() === UserType.PATIENT) {
            setMedicalNumber(currentProfile.id);
        }
    }, []);

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
        switch (data.testResult) {
            case 'positive':
                setTestResult(TestResult.POSITIVE);
                break;
            case 'negative':
                setTestResult(TestResult.NEGATIVE);
                break;
            default:
                setTestResult(TestResult.PENDING);
        }
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setEmail(data.email);
        setDOB(data.dob);
        setGender(data.gender);
    }


    let handleCallBack = (medicalId: string) => {
        setMedicalNumber(medicalId);
    }

    let handleUpdate = (testResult: TestResult) => {
        setTestResult(testResult);
    }

    return (
        <IonPage>
            <NavBar callback = {handleCallBack}/>
            <PatientInformation patient={{medicalId: medicalNumber, firstName: firstName, lastName: lastName,
            testResult: testResult, address: address, email: email, phoneNumber: phoneNumber, dob: dob, gender: gender}} update={handleUpdate}/>
        </IonPage>
    );
};

export default PatientProfilePage;
