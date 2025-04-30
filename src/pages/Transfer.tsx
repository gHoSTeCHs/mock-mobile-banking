import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ContactBubble from '../components/ContactBubble';
import ConfirmationModal from '../components/ConfirmationModal';

const Transfer: React.FC = () => {
	const navigate = useNavigate();
	const { contacts, addTransaction, isProcessing } = useAppContext();
	const [amount, setAmount] = useState<string>('');
	const [selectedContact, setSelectedContact] = useState<string | null>(null);
	const [note, setNote] = useState<string>('');
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/[^0-9.]/g, '');
		const decimalCount = value.split('.').length - 1;
		if (decimalCount > 1) {
			value = value.substring(0, value.lastIndexOf('.'));
		}

		if (value.includes('.')) {
			const parts = value.split('.');
			if (parts[1] && parts[1].length > 2) {
				value = `${parts[0]}.${parts[1].substring(0, 2)}`;
			}
		}
		setAmount(value);
	};

	const handleInitiateTransfer = () => {
		if (!amount || parseFloat(amount) <= 0 || !selectedContact) return;
		setShowConfirmation(true);
	};

	const handleConfirmTransfer = async () => {
		setShowConfirmation(false);
		if (!amount || parseFloat(amount) <= 0 || !selectedContact) return;

		const selectedUser = contacts.find(
			(contact) => contact.id === selectedContact
		);

		await addTransaction({
			title: `Transfer to ${selectedUser?.name || 'Unknown'}`,
			amount: -parseFloat(amount),
			category: 'transfer',
			recipient: selectedUser?.name,
			notes: note || undefined,
		});

		navigate('/home');
	};

	const handleCancelTransfer = () => {
		setShowConfirmation(false);
	};

	const selectedUserDetails = contacts.find((c) => c.id === selectedContact);

	return (
		<div className="p-5 pb-28">
			{' '}
			<div className="flex items-center mb-6">
				<button
					className="mr-2 text-blue-500"
					onClick={() => navigate(-1)}
					title="button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<h1 className="text-xl font-medium flex-1 text-center">Send Money</h1>
			</div>
			<div className="mb-8">
				<label className="block text-gray-700 mb-2">Select Contact</label>
				<div className="flex overflow-x-auto pb-4 -mx-2">
					{contacts.map((contact) => (
						<div
							key={contact.id}
							onClick={() => setSelectedContact(contact.id)}
							className={`transform transition-transform ${
								selectedContact === contact.id ? 'scale-110' : ''
							}`}>
							<ContactBubble user={contact} />
							{selectedContact === contact.id && (
								<div className="h-1 w-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="mb-8">
				<label className="block text-gray-700 mb-2">Amount</label>
				<div className="relative">
					<span className="absolute left-4 top-4 text-xl font-medium text-gray-500">
						$
					</span>
					<input
						type="text"
						className="w-full h-14 bg-gray-100 rounded-xl px-10 text-2xl font-bold"
						placeholder="0.00"
						value={amount}
						onChange={handleAmountChange}
					/>
				</div>
			</div>
			<div className="mb-8">
				<label className="block text-gray-700 mb-2">Note (optional)</label>
				<input
					type="text"
					className="w-full h-12 bg-gray-100 rounded-xl px-4"
					placeholder="What's this for?"
					value={note}
					onChange={(e) => setNote(e.target.value)}
				/>
			</div>
			<div className="fixed bottom-8 left-5 right-5">
				<button
					className={`w-full py-4 rounded-xl text-white font-medium ${
						!amount || parseFloat(amount) <= 0 || !selectedContact
							? 'bg-blue-300 cursor-not-allowed'
							: 'bg-blue-500 hover:bg-blue-600'
					}`}
					onClick={handleInitiateTransfer}
					disabled={!amount || parseFloat(amount) <= 0 || !selectedContact}>
					Send Money
				</button>
			</div>
			{/* Confirmation Modal */}
			{showConfirmation && selectedUserDetails && (
				<ConfirmationModal
					isOpen={showConfirmation}
					onClose={handleCancelTransfer}
					onConfirm={handleConfirmTransfer}
					amount={parseFloat(amount)}
					recipientName={selectedUserDetails.name}
					recipientAvatar={selectedUserDetails.avatar}
					note={note}
					isProcessing={isProcessing}
				/>
			)}
		</div>
	);
};

export default Transfer;
