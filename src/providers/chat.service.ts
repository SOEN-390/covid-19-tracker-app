import { StreamChat } from 'stream-chat';
import { UserType } from '../enum/UserType.enum';
import { User } from '../objects/User.class';

export const chatClient = StreamChat.getInstance('ztg8gkctsb6b');

const ChatService = {

	connectUser: async (currentProfile: User) => {
		if (!currentProfile || !currentProfile.id) {
			return;
		}
		// await chatClient.disconnectUser();
		await chatClient.connectUser(
			{
				id: currentProfile.id,
				name: currentProfile.getFullName(),
				image: currentProfile.getRole() === UserType.PATIENT ?
					'/assets/avatar/user-icon.png' : '/assets/avatar/doctor-avatar.png',
			},
			chatClient.devToken(currentProfile.id)
		);
	}


};

export default ChatService;
