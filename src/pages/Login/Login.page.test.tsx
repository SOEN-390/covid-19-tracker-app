import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ionFireEvent } from '@ionic/react-test-utils';
import LoginPage from './Login.page';

const mockFn = jest.fn();

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		login: mockFn
	})
}));

test('LoginPage: Renders without crashing', () => {
	const {baseElement} = render(<LoginPage/>);
	expect(baseElement).toBeDefined();
});

describe('LoginPage: Test login form', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<LoginPage/>);
		mockFn.mockImplementation((email: string, password: string) => {
			if (email === 'demo@demo.com' && password === 'Demo123') {
				return true;
			}
			throw Error('Account not found');
		});
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
		ionFireEvent.click(loginButton);

		expect(mockFn).toReturnWith(true);
	});

	test('Login with wrong data', async () => {
		const emailField = renderedPage.queryByTestId('login__email-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(emailField, 'wrong-demo@demo.com');

		const passwordField = renderedPage.queryByTestId('login__password-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(passwordField, 'Demo123');

		const loginButton = renderedPage.queryByTestId('login__button') as HTMLIonButtonElement;
		ionFireEvent.click(loginButton);

		expect(mockFn).toThrowError(Error('Account not found'));
	});
});
