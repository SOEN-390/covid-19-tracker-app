import {
	InputChangeEventDetail,
	IonApp,
	IonButton,
	IonContent,
	IonHeader,
	IonImg,
	IonInput,
	IonLabel,
	setupIonicReact,
	useIonToast
} from '@ionic/react';
import React, { useState } from 'react';
import { useAuth } from '../../providers/auth.provider';
import './Register.page.css';
import { useHistory } from 'react-router-dom';

setupIonicReact();

const RegisterPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { signup } = useAuth();
	const [present] = useIonToast();
	const history = useHistory();

	async function register() {
		//validation
		if (email.trim() === '' || password.trim() === '') {
			present('Email and Password are required', 1500);
			return;
		}

		if (password !== confirmPassword) {
			present('The passwords do not match', 1500);
			return;
		}

		try {
			await signup(email, password);
			history.push('/register/2');
		} catch (error) {
			present((error as Error).message, 1500);
		}
	}

	return (
		<IonApp>
			<IonHeader>
			</IonHeader>

			<IonContent>
				<IonImg className="register__logo" src={'/assets/logo/covid-tracker-transparent.png'} alt={'logo'} />
				<h2 className="register__login-text">Sign Up</h2>

				<br />
				<div className={'ion-text-center'}>
					<IonLabel text-center className="register__login-text">Protect Yourself</IonLabel>
				</div>

				<div className="ion-align-items-center; register__form">
					<IonLabel className="register__login-text">Email</IonLabel>
					<IonInput data-cy="email" className="register__text-field" placeholder="Enter your email" type="text" required={true}
						data-testid={'register__email-field'} value={email}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setEmail(e.detail.value || '')} />

					<br /><br />
					<IonLabel className="register__login-text">New Password</IonLabel>
					<IonInput data-cy="password" className="register__text-field" placeholder="Enter a password" type="password" required={true}
						data-testid={'register__password-field'} value={password}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setPassword(e.detail.value || '')} />

					<br /><br />

					<IonLabel className="register__login-text">Confirm your password</IonLabel>
					<IonInput data-cy="confirmed_password" className="register__text-field" placeholder="Enter the same password" type="password" required={true}
						data-testid={'register__password-confirm-field'} value={confirmPassword}
						onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setConfirmPassword(e.detail.value || '')} />

					<br /><br />

					<IonButton className={'register__btn'} onClick={register} size="large" expand="block" fill="solid"
						data-testid={'register__button'} color={'dark-blue'}>
						Next
					</IonButton>
				</div>
			</IonContent>

		</IonApp>
	);
};

export default RegisterPage;
