import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ionFireEvent } from '@ionic/react-test-utils';
import LoginPage from './Login.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		login: jest.fn(async (email: string, password: string) => {
			if (email === 'demo@demo.com' && password === 'Demo123') {
				return true;
			}
			throw Error('Account not found');
		})
	}),
}));


test('LoginPage: Renders without crashing', () => {
	const {baseElement} = render(<LoginPage/>);
	expect(baseElement).toBeDefined();
});

describe('LoginPage: Test login form', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<LoginPage/>);
	});

	test('Insert email', () => {
		const emailField = renderedPage.queryByTestId('login__email-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(emailField, 'demo@demo.com');
		expect(emailField.value).toBe('demo@demo.com');
	});

	test('Insert null email', () => {
		const emailField = renderedPage.queryByTestId('login__email-field') as HTMLIonInputElement;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ionFireEvent.ionChange(emailField, null!);
		expect(emailField.value).toBe('');
	});

	test('Insert password', () => {
		const passwordField = renderedPage.queryByTestId('login__password-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(passwordField, 'Demo123');
		expect(passwordField.value).toBe('Demo123');
	});

	test('Insert null password', () => {
		const passwordField = renderedPage.queryByTestId('login__password-field') as HTMLIonInputElement;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ionFireEvent.ionChange(passwordField, null!);
		expect(passwordField.value).toBe('');
	});

	test('Login with correct data', async () => {

		const emailField = renderedPage.queryByTestId('login__email-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(emailField, 'demo@demo.com');

		const passwordField = renderedPage.queryByTestId('login__password-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(passwordField, 'Demo123');

		const loginButton = renderedPage.queryByTestId('login__button') as HTMLIonButtonElement;
		fireEvent.click(loginButton);

		// Validate that
		// expect(useAuth().login.mock).toBe(true)
	});

	test('Login with wrong data', async () => {
		const emailField = renderedPage.queryByTestId('login__email-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(emailField, 'wrong-demo@demo.com');

		const passwordField = renderedPage.queryByTestId('login__password-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(passwordField, 'Demo123');

		const loginButton = renderedPage.queryByTestId('login__button') as HTMLIonButtonElement;
		fireEvent.click(loginButton);

		// expect(await renderedPage.findByText("Something went wrong. Please try again.")).toBeInTheDocument()
		// await useAuth().login('', '');
		// expect(Error('Account not found'));
	});
});
