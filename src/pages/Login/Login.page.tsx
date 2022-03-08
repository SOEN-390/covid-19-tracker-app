import {
	IonApp,
	IonButton,
	IonCheckbox,
	IonContent,
	IonImg,
	IonInput,
	IonItem,
	IonLabel,
	IonRouterLink,
	setupIonicReact,
	useIonToast
} from '@ionic/react';
import CovidTrackerTransparent from '../../assets/images/CovidTrackerTransparent.png';
import React, { useState } from 'react';
import './Login.page.scss';
import { Pages } from '../../providers/pages.enum';
import { useAuth } from '../../providers/auth.provider';

setupIonicReact();

const LoginPage: React.FC = () => {
	const {login} = useAuth();
	const [checked] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState('');
	const [present] = useIonToast();

	async function loginUser() {
		login(email, password).then(() => {
			present('Successfully logged in.', 1500);
		}).catch(() => {
			present('Something went wrong. Please try again.', 1500);
		});
	}

	return (
		<IonApp>
			<IonContent>
				<IonImg className="login__logo" src={CovidTrackerTransparent}/>
				<h2 className="login__text">Sign In</h2>
				<div className="ion-align-items-center; login__form">
					<IonLabel className="login__text">Email</IonLabel>
					<IonInput data-testid={'login__email-field'} className="login__text-field"
							  placeholder="Enter your Email" type="email" value={email}
							  onIonChange={(e: any) => setEmail(e.detail.value)}/>

					<br/><br/>
					<IonLabel className="login__text">Password</IonLabel>
					<IonInput data-testid={'login__password-field'} className="login__text-field"
							  placeholder="Enter your password" type="password" value={password}
							  onIonChange={(e: any) => setPassword(e.detail.value)}/>

					<IonItem className="login__ion-item" lines="none">
						<div slot="start">
							<IonCheckbox slot="end" className={'custom-checkbox'} checked={checked}/>
						</div>
						<IonLabel>Remember me</IonLabel>
						<IonRouterLink href="#" color="#4D4D4D" className="underline">Forgot Password?</IonRouterLink>
					</IonItem>
					<br/>
					<IonButton onClick={loginUser} className={'login__btn'} size="large" expand="block" fill="solid"
							   data-testid={'login__button'} color={'dark-blue'}>LOGIN</IonButton>
					<br/>
					<p className={'login__register-text'}> Do not have an account? <br/>
						<a href={Pages.register} className={'.login__register-btn'}>Register</a>
					</p>
				</div>
			</IonContent>
		</IonApp>
	);
};

export default LoginPage;
