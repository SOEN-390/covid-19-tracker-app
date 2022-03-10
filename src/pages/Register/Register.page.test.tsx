import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ionFireEvent } from '@ionic/react-test-utils';
import RegisterPage from './Register.page';
import { useAuth } from '../../providers/auth.provider';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		signup: jest.fn()
	}),
}));


test('RegisterPage: Renders without crashing', () => {
	const {baseElement} = render(<RegisterPage />);
	expect(baseElement).toBeDefined();
});

describe('Register: Test register form', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<RegisterPage />);
	});

	test('Insert email', () => {
		const emailField = renderedPage.queryByTestId('register__email-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(emailField, 'demo@demo.com');
		expect(emailField.value).toBe('demo@demo.com');
	});

	test('Insert null email', () => {
		const emailField = renderedPage.queryByTestId('register__email-field') as HTMLIonInputElement;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ionFireEvent.ionChange(emailField, null!);
		expect(emailField.value).toBe('');
	});

	test('Insert password', () => {
		const passwordField = renderedPage.queryByTestId('register__password-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(passwordField, 'Demo123');
		expect(passwordField.value).toBe('Demo123');
	});

	test('Insert null password', () => {
		const passwordField = renderedPage.queryByTestId('register__password-field') as HTMLIonInputElement;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ionFireEvent.ionChange(passwordField, null!);
		expect(passwordField.value).toBe('');
	});

	test('Insert confirm password', () => {
		const confirmPasswordField = renderedPage.queryByTestId('register__password-confirm-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(confirmPasswordField, 'Demo123');
		expect(confirmPasswordField.value).toBe('Demo123');
	});

	test('Insert null confirm password', () => {
		const confirmPasswordField = renderedPage.queryByTestId('register__password-confirm-field') as HTMLIonInputElement;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ionFireEvent.ionChange(confirmPasswordField, null!);
		expect(confirmPasswordField.value).toBe('');
	});

	test('Register with empty password data', async () => {
		const emailField = renderedPage.queryByTestId('register__email-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(emailField, 'demo@demo.com');

		const loginButton = renderedPage.queryByTestId('register__button') as HTMLIonButtonElement;
		fireEvent.click(loginButton);

		expect(useAuth().signup).toBeCalledTimes(0);
	});

	test('Register with empty email data', async () => {
		const passwordField = renderedPage.queryByTestId('register__password-confirm-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(passwordField, 'Demo123');

		const loginButton = renderedPage.queryByTestId('register__button') as HTMLIonButtonElement;
		fireEvent.click(loginButton);

		expect(useAuth().signup).toBeCalledTimes(0);
	});

});
