import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonModal } from '@ionic/react';
import './PatientsTable.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';
import { UserType } from '../../enum/UserType.enum';
import { adminColumns, doctorColumns, healthOfficialColumns, PatientsTableColumn } from './patientsTableColumn';
import { flag} from 'ionicons/icons';

const PatientsTable: React.FC<{ currentUserType: UserType, patientTableRows: IPatientTableRow[] }> = (props) => {

    const [columns, setColumns] = useState<readonly PatientsTableColumn[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [symptomsIndex, setSymptomsIndex] = useState<number>();

    useEffect(() => {
        switch (props.currentUserType) {
            case UserType.DOCTOR:
                setColumns(doctorColumns);
                break;
            case UserType.HEALTH_OFFICIAL:
                setColumns(healthOfficialColumns);
                break;
            case UserType.ADMIN:
                setColumns(adminColumns);
                break;
        }
    }, []);

    
    function getRow(row: IPatientTableRow, index: number): JSX.Element | null {
        switch (props.currentUserType) {
            case UserType.DOCTOR:
                return (
                    <Tr id="tableRow" key={index}>
                        <Td key={index} id="colName">{row.firstName + ' ' + row.lastName}</Td>
                        <Td key={index}>
                            <div key={index} id={row.testResult === 'positive' ? 'PosStatus' : 'NegStatus'}>
                                {row.testResult === 'positive' ? 'Positive' : 'Negative'}
                            </div>
                        </Td>
                        <Td key={index} id="lastUpdate">
                            March 17, 2021
                        </Td>
                        <Td key={index} id="col">
                            <IonButton color="favorite" shape="round" size="large">
                                No-Action needed
                            </IonButton></Td>
                        <Td key={index} id="col"> {row.priority}
                            <IonButton>
                                <IonIcon ios={flag} md={flag}/>
                            </IonButton>
                        </Td>
                    </Tr>
                );
            case UserType.HEALTH_OFFICIAL:
                return (
                    <Tr id="tableRow" key={index}>
                        <Td key={index} id="colName">{row.firstName + ' ' + row.lastName}</Td>
                        <Td key={index}>
                            <div key={index} id={row.testResult === 'positive' ? 'PosStatus' : 'NegStatus'}>
                                {row.testResult === 'positive' ? 'Positive' : 'Negative'}
                            </div>
                        </Td>
                        <Td key={index} id="lastUpdate">
                            March 17, 2021
                        </Td>
                        <Td key={index} id="colDoc">
                            Dr.Sue
                        </Td>
                        <Td key={index} id="col">
                            <IonButton color="medium" shape="round" size="large">
                                No-Action needed
                            </IonButton></Td>
                        <Td key={index} id="col"> 
                            <IonButton>
                                <IonIcon ios={flag} md={flag}/>
                            </IonButton>
                        </Td>
                        <Td key={index} id="col">
                            <IonButton color="favorite" shape="round" size="large" onClick={() => {
                                setShowModal(true); 
                                setSymptomsIndex(index)
                                }}>  
                                Monitor Symptoms
                            </IonButton>
                        </Td>
                                
                        {symptomsIndex!==undefined?
                            <IonModal isOpen={showModal}>
                            <IonContent fullscreen>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>{props.patientTableRows[symptomsIndex].firstName + ' ' + props.patientTableRows[symptomsIndex].lastName}</IonCardTitle>
                                        <IonCardSubtitle >Temperature</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        37.8 Celsius
                                    </IonCardContent>
                                    <IonCardHeader>
                                    <IonCardSubtitle >Breathing</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Severe difficulty breathing
                                    </IonCardContent>
                                    <IonCardHeader>
                                    <IonCardSubtitle >Other Symptoms</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Fever along with running nose
                                    </IonCardContent>
                                </IonCard>
                            </IonContent>        
                            <IonButton onClick={() => setShowModal(false)}>Close Symptoms Form</IonButton>
                        </IonModal>  
                        :<></>} 
                    </Tr>
                );
            case UserType.ADMIN:
                return (
                    <Tr id="tableRow" key={index}>
                        <Td key={index} id="colName">{row.firstName + ' ' + row.lastName}</Td>
                        <Td key={index}>
                            <div key={index} id={row.testResult === 'positive' ? 'PosStatus' : 'NegStatus'}>
                                {row.testResult === 'positive' ? 'Positive' : 'Negative'}
                            </div>
                        </Td>
                        <Td key={index} id="lastUpdate">
                            March 17, 2021
                        </Td>
                        <Td key={index} id="colDoc">
                            Dr.Sue
                        </Td>                        
                        <Td key={index} id="col">
                            <IonButton color="favorite" shape="round" size="large">
                                No-Action needed
                            </IonButton>
                        </Td>
                        <Td key={index} id="col"> 
                            <IonButton>
                                <IonIcon ios={flag} md={flag}/>
                            </IonButton>
                        </Td>
                    </Tr>
                );
            default:
                return null;
        }
    }

    return (
        <Table>
            <Thead>
                <Tr id="tableHead">
                    {
                        columns.map((column, index) => (
                            <Th key={index} id="headCol">
                                {column.label}
                            </Th>
                        ))
                    }
                </Tr>
            </Thead>
            <Tbody>
                {
                    props.patientTableRows.map((row, index) => {
                        return getRow(row, index);
                    })
                }
            </Tbody>
        </Table>
    );
}

export default PatientsTable;
