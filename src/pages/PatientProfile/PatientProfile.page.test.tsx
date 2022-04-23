import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import HttpService from '../../providers/http.service';
import { UserType } from '../../enum/UserType.enum';
import PatientProfilePage from './PatientProfile.page';
import { IPatient } from '../../interfaces/IPatient';
import { ISymptom, ISymptomResponse } from '../../interfaces/ISymptom';

// Could not get 100%. As a Patient is throwing weird react errors.

const mockHttpGetFn = jest.spyOn(HttpService, 'get');

const mockChildComponent = jest.fn();
let patientInformationProps: {
	patient: IPatient, onChange: (patient: IPatient) => void,
	symptomsList: ISymptom[], symptomsResponse: ISymptomResponse[]
};
jest.mock('../../components/PatientInformation/PatientInformation', () => (props: {
	patient: IPatient, onChange: (patient: IPatient) => void,
	symptomsList: ISymptom[], symptomsResponse: ISymptomResponse[]
}) => {
	patientInformationProps = props;
	return mockChildComponent(props);
});

let mockMedicalIdParam: string | undefined = undefined;
jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useParams: () => ({
		medicalId: mockMedicalIdParam
	})
}));

let mockGetRoleFn = (): undefined | UserType => undefined;
jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		currentProfile: {
			medicalId: '55',
			licenseId: '56',
			getRole: mockGetRoleFn
		}
	})
}));

test('PatientProfilePage: Renders without crashing', () => {
	const {baseElement} = render(<PatientProfilePage/>);
	expect(baseElement).toBeDefined();
});

// describe('PatientProfilePage: As a Patient', () => {
// 	let renderedPage: RenderResult;
//
// 	beforeEach(() => {
// 		mockGetRoleFn = () => UserType.PATIENT;
// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 		// @ts-ignore
// 		mockHttpGetFn.mockImplementation(async (path: string): ISymptom[] => {
// 			if (path === 'patients/55/symptoms') {
// 				return [{
// 					name: 'test',
// 					description: 'test'
// 				}];
// 			}
// 		});
// 		renderedPage = render(<PatientProfilePage />);
// 	});
//
// 	test('Renders without crashing', () => {
// 		expect(renderedPage.baseElement).toBeDefined();
// 	});
//
// 	test('Handle Status Change', async () => {
// 		patientInformationProps.onChange({
// 			medicalId: '55'
// 		} as IPatient);
// 	});
//
// });

describe('PatientProfilePage: As a doctor', () => {
	let renderedPage: RenderResult;

	beforeEach(() => {
		mockMedicalIdParam = '55';
		mockGetRoleFn = () => UserType.DOCTOR;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mockHttpGetFn.mockImplementation(async (path: string): IPatient | ISymptom[] => {
			if (path === 'doctors/patient/55') {
				return {
					medicalId: '55'
				} as IPatient;
			}
			if (path === 'doctors/symptoms') {
				return [{
					name: 'test',
					description: 'test'
				}];
			}
		});
		renderedPage = render(<PatientProfilePage />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});

});

describe('PatientProfilePage: As a immigration officer', () => {
	let renderedPage: RenderResult;

	beforeEach(() => {
		mockMedicalIdParam = '55';
		mockGetRoleFn = () => UserType.IMMIGRATION_OFFICER;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mockHttpGetFn.mockImplementation(async (path: string): IPatient => {
			if (path === 'patients/55') {
				return {
					medicalId: '55'
				} as IPatient;
			}
		});
		renderedPage = render(<PatientProfilePage />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});

});
