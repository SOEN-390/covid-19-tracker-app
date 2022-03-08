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
		const emailField = renderedPage.queryByTestId('login__email-field');
		if (!emailField) {
			throw Error('No email IonInput found.');
		}
		fireEvent.change(emailField, {
			target: {value: 'demo@demo.com'}
		});
		expect((emailField as any).value).toBe('demo@demo.com');
	});

	test('Insert password', () => {
		const passwordField = renderedPage.queryByTestId('login__password-field');
		if (!passwordField) {
			throw Error('No password IonInput found.');
		}
		fireEvent.change(passwordField, {
			target: {value: 'Demo123'}
		});
		expect((passwordField as any).value).toBe('Demo123');
	});

	test('Login with correct data', async () => {
		const emailField = renderedPage.queryByTestId('login__email-field');
		if (!emailField) {
			throw Error('No email IonInput found.');
		}
		ionFireEvent.ionChange(emailField, 'demo@demo.com');
		// emailField.dispatchEvent(
		// 	new CustomEvent('ionChange', { detail: { value: "demo@demo.com" } })
		// );
		const passwordField = renderedPage.queryByTestId('login__password-field');
		if (!passwordField) {
			throw Error('No password IonInput found.');
		}
		ionFireEvent.ionChange(passwordField, 'Demo123');
		const loginButton = renderedPage.queryByTestId('login__button');
		if (!loginButton) {
			throw Error('No login button found.');
		}
		fireEvent.click(loginButton);
		// Validate that
		// expect(useAuth().login.mock).toBe(true)
	});

	test('Login with wrong data', async () => {
		const emailField = renderedPage.queryByTestId('login__email-field');
		if (!emailField) {
			throw Error('No email IonInput found.');
		}
		ionFireEvent.ionChange(emailField, 'wrong-demo@demo.com');
		const passwordField = renderedPage.queryByTestId('login__password-field');
		if (!passwordField) {
			throw Error('No password IonInput found.');
		}
		ionFireEvent.ionChange(passwordField, 'Demo123');
		const loginButton = renderedPage.queryByTestId('login__button');
		if (!loginButton) {
			throw Error('No login button found.');
		}
		fireEvent.click(loginButton);
		// expect(await renderedPage.findByText("Something went wrong. Please try again.")).toBeInTheDocument()
		// await useAuth().login('', '');

		// expect(Error('Account not found'));
	});
});
