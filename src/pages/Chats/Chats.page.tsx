import React, { useEffect, useState } from 'react';
import {
	Chat,
	Channel,
	ChannelList,
	ChannelHeader,
	MessageInput,
	MessageList,
	Thread,
	Window
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import HttpService from '../../providers/http.service';
import { Patient } from '../../objects/Patient.class';
import './Chats.page.scss';
import ChatService, { chatClient } from '../../providers/chat.service';
import { Doctor } from '../../objects/Doctor.class';
import { IonAvatar, IonCol, IonContent, IonIcon, IonItem, IonPage, IonTitle, useIonToast } from '@ionic/react';
import { flag } from 'ionicons/icons';

const ChatsPage: React.FC = () => {

	const {currentProfile} = useAuth();
	const [presentToast] = useIonToast();

	const filters = {type: 'messaging', members: {$in: [currentProfile.id]}};
	const sort = {last_message_at: -1};

	const [doctorPatients, setDoctorPatients] = useState<{ patient: Patient, channelId: string }[]>([]);
	const [patientChannel, setPatientChannel] = useState<any>();
	const [flagClassName, setFlagClassName] = useState<string>('chats__flag__no-priority');

	useEffect(() => {
		setFlagClassName(currentProfile.flagged ? 'chats__flag__high-priority' : 'chats__flag__no-priority');
	}, [currentProfile]);

	useEffect(() => {
		if (!chatClient.clientID) {
			return;
		}
		if (currentProfile.id !== chatClient.clientID.split('--')[0]) {
			ChatService.connectUser(currentProfile).then(() => {
				getChats();
			});
			return;
		}
		getChats();
	}, [chatClient.clientID]);

	async function getChats() {
		if (currentProfile.getRole() === UserType.PATIENT) {
			HttpService.get(`patients/${currentProfile.medicalId}/doctor`).then(async (doctor: Doctor) => {
				await chatClient.upsertUser({
					id: doctor.id,
					name: doctor.firstName + ' ' + doctor.lastName,
					role: 'user',
					image: '/assets/avatar/doctor-avatar.png',
				});
				setPatientChannel(chatClient.channel('messaging', {
					name: doctor.firstName + ' ' + doctor.lastName,
					members: [doctor.id, currentProfile.id],
					image: '/assets/avatar/doctor-avatar.png'
				}));
				await patientChannel.create();
				// await patientChannel.update({
				// 	name: doctor.firstName + ' ' + doctor.lastName,
				// 	image: '/assets/avatar/doctor-avatar.png'
				// });
			}).catch((error) => {
				console.log('ERROR: ', error);
			});
		}

		if (currentProfile.getRole() === UserType.DOCTOR) {
			HttpService.get(`doctors/${currentProfile.licenseId}/patients/assigned`).then(async (patients: Patient[]) => {
				const channelsIds: string[] = [];
				for (const patient of patients) {
					await chatClient.upsertUser({
						id: patient.id,
						name: patient.firstName + ' ' + patient.lastName,
						role: 'user',
						image: '/assets/avatar/user-icon.png',
					});
					const channel = chatClient.channel('messaging', {
						name: patient.firstName + ' ' + patient.lastName,
						members: [currentProfile.id, patient.id]
					});
					await channel.create();
					await channel.update({
						name: patient.firstName + ' ' + patient.lastName,
						image: '/assets/avatar/user-icon.png'
					});
					if (channel.id) {
						channelsIds.push(channel.id);
						doctorPatients.push({patient: patient, channelId: channel.id});
						setDoctorPatients([...doctorPatients]);
					}
				}
				const channel = chatClient.channel('messaging', {
					members: [currentProfile.id]
				});
				Object.entries(channel._client.activeChannels).forEach((array) => {
					array.forEach((key) => {
						if (typeof key === 'string' || !key.id) {
							return;
						}
						if (!channelsIds.includes(key.id)) {
							key.delete();
						}
						// for (const patient of patients) {
						// 	// if (patient.id === key.data?.members?[0])
						// }
					});
				});
			}).catch((error) => {
				console.log('ERROR: ', error);
			});
		}
	}

	function flagChat() {
		currentProfile.flagged = !currentProfile.flagged;
		HttpService.post(
			`patients/${currentProfile.medicalId}/${currentProfile.flagged ? 'flag' : 'unflag'}`,
			{role: currentProfile.getRole()}
		).then(() => {
			setFlagClassName(currentProfile.flagged ? 'chats__flag__high-priority' : 'chats__flag__no-priority');
			presentToast(`Successfully ${currentProfile.flagged ? 'FLAGGED' : 'UNFLAGGED'} patient.`, 1000);
		}).catch(() => {
			presentToast('An error has occurred. Please try again.', 1000);
		});
	}

	const CustomChannelPreview = (props: any) => {
		const {channel, setActiveChannel} = props;

		const {messages} = channel.state;
		const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

		const [flagClassName, setFlagClassName] = useState<string>('chats__flag__no-priority');

		useEffect(() => {
			for (const {patient, channelId} of doctorPatients) {
				if (channel.id === channelId && patient.flagged) {
					setFlagClassName('chats__flag__high-priority');
					return;
				}
			}
			setFlagClassName('chats__flag__no-priority');
		}, [doctorPatients]);

		function flagPatient(channel: any) {
			for (const {patient, channelId} of doctorPatients) {
				if (channel.id === channelId) {
					patient.flagged = !patient.flagged;
					HttpService.post(
						`patients/${patient.medicalId}/${patient.flagged ? 'flag' : 'unflag'}`,
						{role: currentProfile.getRole()}
					).then(() => {
						setFlagClassName(patient.flagged ? 'chats__flag__high-priority' : 'chats__flag__no-priority');
						presentToast(`Successfully ${patient.flagged ? 'FLAGGED' : 'UNFLAGGED'} patient.`, 1000);
					}).catch(() => {
						presentToast('An error has occurred. Please try again.', 1000);
					});
					return;
				}
			}
		}

		return (
			<div onClick={() => setActiveChannel(channel)} style={{margin: '12px'}}>
				<IonItem className={'chats__patients'}>
					<IonCol>
						<IonAvatar className={'chats__patient-avatar'}>
							<img src={channel.data.image}/>
						</IonAvatar>
					</IonCol>
					<IonCol>
						<div>{channel.data.name || 'Unnamed Channel'}</div>
						<div style={{fontSize: '11px'}}>{messagePreview}</div>
					</IonCol>
					<IonCol>
						<IonIcon
							size={'large'}
							className={flagClassName}
							icon={flag} onClick={() => flagPatient(channel)}
						/>
					</IonCol>
				</IonItem>
			</div>
		);
	};

	return (
		<IonPage>
			{/*<IonToolbar>*/}
			{/*	<NavBar/>*/}
			{/*</IonToolbar>*/}
			<IonContent>
				{
					chatClient.clientID &&
					currentProfile.id === chatClient.clientID.split('--')[0] &&
					<>
						<Chat client={chatClient} theme="messaging light">
							{
								(
									currentProfile.getRole() === UserType.DOCTOR ?
										<>
											<div className="messaging__sidebar" id="mobile-channel-list">
												<ChannelList filters={filters} Preview={CustomChannelPreview}/>
											</div>
											<Channel>
												<Window>
													<ChannelHeader/>
													<MessageList/>
													<MessageInput/>
												</Window>
												<Thread/>
											</Channel>
										</> :
										<></>
								)
							}
							{
								(
									currentProfile.getRole() === UserType.PATIENT ?
										(
											patientChannel ?
												<>
													<Channel channel={patientChannel}>
														<Window>
															<ChannelHeader />
															<div className={'chats__patients-flag'}>
																<IonIcon
																	size={'large'}
																	className={flagClassName}
																	icon={flag} onClick={() => flagChat()}
																  />
															</div>
															<MessageList/>
															<MessageInput/>
														</Window>
														<Thread/>
													</Channel>
												</> :
												<>
													<IonTitle className={'chats__title'}>You do not have a doctor</IonTitle>
												</>
										) :
										<></>
								)
							}
						</Chat>
					</>
				}
			</IonContent>
		</IonPage>
	);
};

export default ChatsPage;
