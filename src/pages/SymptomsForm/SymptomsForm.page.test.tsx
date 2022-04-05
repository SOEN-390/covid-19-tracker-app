import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import SymptomsFormPage from './SymptomsForm.page';
import HttpService from '../../providers/http.service';
import { UserType } from '../../enum/UserType.enum';
import { ISymptom } from '../../interfaces/ISymptom';

const mockHttpGetFn = jest.spyOn(HttpService, 'get');

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

const mockChildComponent = jest.fn();
let symptomsProps: {symptomsList: ISymptom[], handleSubmit: () => void};
jest.mock('../../components/Symptom/Symptom', () => (props: {symptomsList: ISymptom[], handleSubmit: () => void}) => {
	symptomsProps = props;
	return mockChildComponent(props);
});

const mockGetRoleFn = () => UserType.PATIENT;
jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		currentProfile: {
			medicalId: '55',
			getRole: mockGetRoleFn
		}
	})
}));

test('SymptomsFormPage: Renders without crashing', () => {
	const {baseElement} = render(<SymptomsFormPage/>);
	expect(baseElement).toBeDefined();
});

describe('SymptomsFormPage: Test symptoms form', () => {
	let renderedPage: RenderResult;

	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mockHttpGetFn.mockImplementation(async (path: string): ISymptom[] => {
			if (path === 'patients/55/symptoms') {
				return [{
					name: 'test',
					description: 'test'
				}];
			}
		});
		renderedPage = render(<SymptomsFormPage />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});

	test('Handle Symptom Child Submit', async () => {
		symptomsProps.handleSubmit();

	});

});
