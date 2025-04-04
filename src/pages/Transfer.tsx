// File: src/pages/Transfer.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ContactBubble from '../components/ContactBubble';

const Transfer: React.FC = () => {
	const navigate = useNavigate();
	const { contacts, addTransaction, isProcessing } = useAppContext();
	const [amount, setAmount] = useState<string>('');
	const [selectedContact, setSelectedContact] = useState<string | null>(null);
	const [note, setNote] = useState<string>('');

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Allow only numbers and decimal point
		const value = e.target.value.replace(/[^0-9.]/g, '');
		setAmount(value);
	};

	const handleSubmit = async () => {
		if (!amount || parseFloat(amount) <= 0 || !selectedContact) return;

		const selectedUser = contacts.find(
			(contact) => contact.id === selectedContact
		);

		await addTransaction({
			title: `Transfer to ${selectedUser?.name || 'Unknown'}`,
			amount: -parseFloat(amount),
			category: 'transfer',
			recipient: selectedUser?.name,
		});

		navigate('/home');
	};

	return (
		<div className="p-5">
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
						isProcessing ||
						!amount ||
						parseFloat(amount) <= 0 ||
						!selectedContact
							? 'bg-blue-300'
							: 'bg-blue-500'
					}`}
					onClick={handleSubmit}
					disabled={
						isProcessing ||
						!amount ||
						parseFloat(amount) <= 0 ||
						!selectedContact
					}>
					{isProcessing ? (
						<div className="flex justify-center items-center">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Processing...
						</div>
					) : (
						'Send Money'
					)}
				</button>
			</div>
		</div>
	);
};

export default Transfer;
