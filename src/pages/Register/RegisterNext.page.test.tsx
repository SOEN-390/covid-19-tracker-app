import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ionFireEvent } from '@ionic/react-test-utils';
import RegisterPageNext from './RegisterNext.page';
import { Gender } from '../../enum/Gender.enum';
import { TestResult } from '../../enum/TestResult.enum';
import HttpService from '../../providers/http.service';

const mockLogoutFn = jest.fn();

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		logout: mockLogoutFn
	})
}));

jest.mock('../../config/firebase', () => ({
	auth: {
		currentUser: {
			email: 'demo@demo.com'
		}
	}
}));

const mockPushHistoryFn = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockPushHistoryFn
	})
}));

const mockHttpPostFn = jest.spyOn(HttpService, 'post');

test('RegisterNextPage: Renders without crashing', () => {
	const { baseElement } = render(<RegisterPageNext />);
	expect(baseElement).toBeDefined();
});

describe('RegisterNextPage: Test register form', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		jest.useFakeTimers();
		renderedPage = render(<RegisterPageNext />);
		mockLogoutFn.mockImplementation(() => {
			return true;
		});
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mockHttpPostFn.mockImplementation((path: string, data?: any) => {
			if (path === 'patients/create') {
				// data is the user passed
				if (data.medicalId === '55') {
					throw Error('Medical Id already taken');
				}
				return true;
			}
		});
		mockPushHistoryFn.mockReturnValue(true);
	});

	test('Insert First Name', () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'Beshoy');
		expect(fNameField.value).toBe('Beshoy');
	});

	test('Insert null First Name', () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, null!);
		expect(fNameField.value).toBe('');
	});

	test('Insert Last Name', () => {
		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'Soliman');
		expect(lNameField.value).toBe('Soliman');
	});

	test('Insert null Last Name', () => {
		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, null!);
		expect(lNameField.value).toBe('');
	});

	test('Insert Medical Card Number', () => {
		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '1111');
		expect(medicalCardField.value).toBe('1111');
	});

	test('Insert null Medical Card Number', () => {
		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, null!);
		expect(medicalCardField.value).toBe('');
	});

	test('Insert Date of birth', () => {
		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');
		expect(dobField.value).toBe('1998-22-08');
	});

	test('Insert null Date of birth', () => {
		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, null!);
		expect(dobField.value).toBe('');
	});

	test('Insert Address', () => {
		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');
		expect(addressField.value).toBe('Canada');
	});

	test('Insert null Address', () => {
		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, null!);
		expect(addressField.value).toBe('');
	});

	test('Insert Phone Number', () => {
		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');
		expect(phoneField.value).toBe('5141111111');
	});

	test('Insert null Phone Number', () => {
		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, null!);
		expect(phoneField.value).toBe('');
	});

	test('Select Gender', () => {
		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);
		expect(genderField.value).toBe(Gender.MALE);
	});

	test('Select null Gender', () => {
		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, null!);
		expect(genderField.value).toBe(Gender.NONE);
	});

	test('Select Test Result', () => {
		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);
		expect(resultField.value).toBe(TestResult.NEGATIVE);
	});

	test('Select null Test Result', () => {
		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, null!);
		expect(resultField.value).toBe(TestResult.PENDING);
	});

	test('Register with empty first name data', async () => {
		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'soliman');

		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '111');

		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(registerButton);

		expect(mockHttpPostFn).toBeCalledTimes(0);
	});

	test('Register with empty last name data', async () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'beshoy');

		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '111');

		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(registerButton);

		expect(mockHttpPostFn).toBeCalledTimes(0);
	});

	test('Register with empty medical card id data', async () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'beshoy');

		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'soliman');

		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(registerButton);

		expect(mockHttpPostFn).toBeCalledTimes(0);
	});

	test('Register with empty date of birth data', async () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'beshoy');

		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'soliman');

		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '111');

		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(registerButton);

		expect(mockHttpPostFn).toBeCalledTimes(0);
	});

	test('Register with empty address data', async () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'beshoy');

		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'soliman');

		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '111');

		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(registerButton);

		expect(mockHttpPostFn).toBeCalledTimes(0);
	});

	test('Register with empty phone', async () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'beshoy');

		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'soliman');

		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '111');

		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(registerButton);

		expect(mockHttpPostFn).toBeCalledTimes(0);
	});

	// test('Register with empty gender data', async () => {
	// 	const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(fNameField, 'beshoy');
	//
	// 	const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(lNameField, 'soliman');
	//
	// 	const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(medicalCardField, '111');
	//
	// 	const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(dobField, '1998-22-08');
	//
	// 	const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(addressField, 'Canada');
	//
	// 	const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(phoneField, '5141111111');
	//
	// 	const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
	// 	ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);
	//
	// 	const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
	// 	ionFireEvent.click(registerButton);
	//
	// 	expect(mockPostFn).toBeCalledTimes(0);
	// });
	//
	// test('Register with empty result data', async () => {
	// 	const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(fNameField, 'beshoy');
	//
	// 	const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(lNameField, 'soliman');
	//
	// 	const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(medicalCardField, '111');
	//
	// 	const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(dobField, '1998-22-08');
	//
	// 	const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(addressField, 'Canada');
	//
	// 	const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
	// 	ionFireEvent.ionChange(phoneField, '5141111111');
	//
	// 	const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
	// 	ionFireEvent.ionChange(genderField, Gender.MALE);
	//
	// 	const registerButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
	// 	ionFireEvent.click(registerButton);
	//
	// 	expect(mockPostFn).toBeCalledTimes(0);
	// });

	test('Register with correct data', async () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'beshoy');

		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'soliman');

		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '1111');

		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const loginButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(loginButton);

		expect(mockHttpPostFn).toReturnWith(true);
	});

	test('Register with taken medical id error', async () => {
		const fNameField = renderedPage.queryByTestId('register-next__first_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(fNameField, 'Beshoy');

		const lNameField = renderedPage.queryByTestId('register-next__last_name-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(lNameField, 'Soliman');

		const medicalCardField = renderedPage.queryByTestId('register-next__medicalCard-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(medicalCardField, '55');

		const dobField = renderedPage.queryByTestId('register-next__dob-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(dobField, '1998-22-08');

		const addressField = renderedPage.queryByTestId('register-next__address-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(addressField, 'Canada');

		const phoneField = renderedPage.queryByTestId('register-next__phone-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(phoneField, '5141111111');

		const genderField = renderedPage.queryByTestId('register-next__gender-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(genderField, Gender.MALE);

		const resultField = renderedPage.queryByTestId('register-next__result-field') as HTMLIonSelectOptionElement;
		ionFireEvent.ionChange(resultField, TestResult.NEGATIVE);

		const loginButton = renderedPage.queryByTestId('register-next__button') as HTMLIonButtonElement;
		ionFireEvent.click(loginButton);

		expect(mockHttpPostFn.mock.results[0].value).toStrictEqual(Error('Medical Id already taken'));
	});


});
