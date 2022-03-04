import './ContactTracingTable.css';
import './PatientInformation.css';


import React, { useState } from 'react';
import { IonCard, IonContent } from '@ionic/react';
import HttpService from '../../providers/http.service';
import { useAuth } from '../../providers/auth.provider';


const ContactTracingTable: React.FC = () => {
    return (
        <IonCard>
            <table className='blueTable'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Breathing</th>
                        <th>Other Symptoms</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>cell1_1</td>
                        <td>cell2_1</td>
                        <td>cell3_1</td>
                        <td>cell4_1</td>
                    </tr>
                    <tr>
                        <td>cell1_2</td>
                        <td>cell2_2</td>
                        <td>cell3_2</td>
                        <td>cell4_2</td>
                    </tr>
                    <tr>
                        <td>cell1_3</td>
                        <td>cell2_3</td>
                        <td>cell3_3</td>
                        <td>cell4_3</td>
                    </tr>
                </tbody>
            </table>
        </IonCard>


    );
};

export default ContactTracingTable;
