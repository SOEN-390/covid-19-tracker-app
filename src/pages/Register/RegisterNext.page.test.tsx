import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import { ionFireEvent } from '@ionic/react-test-utils';
import RegisterPageNext from './RegisterNext.page';
import { Gender } from '../../enum/Gender.enum';
import { TestResult } from '../../enum/TestResult.enum';

const mockSignUpFn = jest.fn();

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		signup: mockSignUpFn
	})
}));

test('RegisterPageNext: Renders without crashing', () => {
	const { baseElement } = render(<RegisterPageNext />);
	expect(baseElement).toBeDefined();
});


describe('Register: Test register form', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<RegisterPageNext />);
		mockSignUpFn.mockImplementation((firstName: string, lastName: string, medicalId: string, birth: string, address: string, phoneNumber: string, gender: Gender, testResult: TestResult) => {
			if (medicalId === '55') {
				throw Error('Medical Id already taken');
			}
			return true;
		});
	});

	test('Insert First Name', () => {
		const fNameField = renderedPage.queryByTestId('register__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'Beshoy');
		expect(fNameField.value).toBe('Beshoy');
	});

	test('Insert null First Name', () => {
		const fNameField = renderedPage.queryByTestId('register__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, null!);
		expect(fNameField.value).toBe('');
	});


	test('Insert Last Name', () => {
		const lNameField = renderedPage.queryByTestId('register__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'Soliman');
		expect(lNameField.value).toBe('Soliman');
	});

	test('Insert null Last Name', () => {
		const lNameField = renderedPage.queryByTestId('register__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, null!);
		expect(lNameField.value).toBe('');
	});

	test('Insert Medical Card Number', () => {
		const medicalCardField = renderedPage.queryByTestId('register__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '111');
		expect(medicalCardField.value).toBe('111');
	});

	test('Insert null Medical Card Number', () => {
		const medicalCardField = renderedPage.queryByTestId('register__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, null!);
		expect(medicalCardField.value).toBe('');
	});

	test('Insert Date of birth', () => {
		const dobField = renderedPage.queryByTestId('register__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');
		expect(dobField.value).toBe('1998-22-08');
	});

	test('Insert null Date of birth', () => {
		const dobField = renderedPage.queryByTestId('register__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, null!);
		expect(dobField.value).toBe('yyyy-mm-dd');
	});

	test('Insert Address', () => {
		const addressField = renderedPage.queryByTestId('register__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');
		expect(addressField.value).toBe('Canada');
	});

	test('Insert null Address', () => {
		const addressField = renderedPage.queryByTestId('register__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, null!);
		expect(addressField.value).toBe('');
	});

	test('Insert Phone Number', () => {
		const phoneField = renderedPage.queryByTestId('register__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');
		expect(phoneField.value).toBe('5141111111');
	});

	test('Insert null Phone Number', () => {
		const phoneField = renderedPage.queryByTestId('register__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, null!);
		expect(phoneField.value).toBe('');
	});

	test('Select Gender', () => {
		const genderField = renderedPage.queryByTestId('register__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);
		expect(genderField.value).toBe(Gender.MALE);
	});

	test('Select null Gender', () => {
		const genderField = renderedPage.queryByTestId('register__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, null!);
		expect(genderField.value).toBe(Gender);
	});

	test('Select Test Result', () => {
		const resultField = renderedPage.queryByTestId('register__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);
		expect(resultField.value).toBe(TestResult.NEGATIVE);
	});

	test('Select null Test Result', () => {
		const resultField = renderedPage.queryByTestId('register__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, null!);
		expect(resultField.value).toBe(Gender);
	});

	test('Register with correct data', async () => {
		const fNameField = renderedPage.queryByTestId('register__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'beshoy');

		const lNameField = renderedPage.queryByTestId('register__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'soliman');

		const medicalCardField = renderedPage.queryByTestId('register__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '111');

		const dobField = renderedPage.queryByTestId('register__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const addressField = renderedPage.queryByTestId('register__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const phoneField = renderedPage.queryByTestId('register__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);




		const loginButton = renderedPage.queryByTestId('register__button') as HTMLIonButtonElement;
		ionFireEvent.click(loginButton);

		expect(mockSignUpFn).toReturnWith(true);
	});


});
