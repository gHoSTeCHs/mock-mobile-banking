import React from 'react';
import { User } from '../types';

interface ContactBubbleProps {
	user: User;
	onClick?: () => void;
}

const ContactBubble: React.FC<ContactBubbleProps> = ({ user, onClick }) => {
	return (
		<div className="flex flex-col items-center mx-2" onClick={onClick}>
			<div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mb-1">
				<img
					src={user.avatar || `/api/placeholder/48/48`}
					alt={user.name}
					className="h-full w-full object-cover"
				/>
			</div>
			<span className="text-xs">{user.name}</span>
		</div>
	);
};

export default ContactBubble;
