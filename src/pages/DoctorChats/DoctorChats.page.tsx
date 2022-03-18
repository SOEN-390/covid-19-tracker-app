import React, { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import { useAuth, idToken } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import HttpService from '../../providers/http.service';
import { Patient } from '../../objects/Patient.class';
import './DoctorChats.page.scss';

const DoctorChatsPage: React.FC = () => {

	const { currentProfile } = useAuth();
	const chatClient = StreamChat.getInstance('ztg8gkctsb6b');

	const filters = { type: 'messaging', members: { $in: [currentProfile.id] } };
	const sort = { last_message_at: -1 };

	chatClient.connectUser(
		{
			id: currentProfile.id,
			name: currentProfile.getFullName(),
			user_details: '',
			image: currentProfile.getRole() === UserType.PATIENT ?
				'/assets/avatar/user-avatar.png' : '/assets/avatar/doctor-avatar.png',
		},
		chatClient.devToken(currentProfile.id)
	);
	// const channel = chatClient.channel('messaging', 'custom_channel_id', {
	// 	// add as many custom fields as you'd like
	// 	image: 'https://www.drupal.org/files/project-images/react.png',
	// 	name: 'Talk about React',
	// });

	HttpService.get(`doctors/${currentProfile.licenseId}/patients/assigned`).then((patients: Patient[]) => {
		patients.forEach(async (patient) => {
			await chatClient.upsertUser({
				id: patient.id,
				name: patient.firstName + ' ' + patient.lastName,
				role: 'user',
				image: '/assets/avatar/user-avatar.png',
			});
			const channel = chatClient.channel('messaging', {
				name: patient.firstName + ' ' + patient.lastName,
				members: [currentProfile.id, patient.id]
			});
			await channel.create();
			await channel.update({
				name: patient.firstName + ' ' + patient.lastName,
				image: '/assets/avatar/user-avatar.png'
			});
		});
	}).catch((error) => {
		console.log('ERROR: ', error);
	});

	const CustomChannelPreview = (props: any) => {
		const { channel, setActiveChannel } = props;

		const { messages } = channel.state;
		const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

		return (
			<div onClick={() => setActiveChannel(channel)} style={{ margin: '12px' }}>
				<div>{channel.data.name || 'Unnamed Channel'}</div>
				<div style={{ fontSize: '14px' }}>{messagePreview}</div>
			</div>
		);
	};

	return (
		<Chat client={chatClient} theme='messaging light'>
			<div className='messaging__sidebar' id='mobile-channel-list'>
				<ChannelList filters={filters} Preview={CustomChannelPreview} />
			</div>
			<Channel>
				<Window>
					<ChannelHeader />
					<MessageList />
					<MessageInput />
				</Window>
				<Thread />
			</Channel>
		</Chat>
	);
};

export default DoctorChatsPage;
