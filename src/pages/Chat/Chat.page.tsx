import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const ChatPage: React.FC = () => {
	const chatClient = StreamChat.getInstance('ztg8gkctsb6b');
	const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmVkLXZpb2xldC0zIn0.qiWxc2MXavsTE3BNyJ_iK5s81C5cdGjdcMZbeJtb0Bs';

	chatClient.connectUser(
		{
			id: 'red-violet-3',
			name: 'red-violet-3',
			image: 'https://getstream.io/random_png/?id=red-violet-3&name=red-violet-3',
		},
		userToken,
	);

	const channel = chatClient.channel('messaging', 'custom_channel_id', {
		// add as many custom fields as you'd like
		image: 'https://www.drupal.org/files/project-images/react.png',
		name: 'Talk about React',
		members: ['red-violet-3'],
	});

	return (
		<Chat client={chatClient} theme='messaging light'>
			<Channel channel={channel}>
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

export default ChatPage;
