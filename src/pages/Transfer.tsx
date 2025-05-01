import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ContactBubble from '../components/ContactBubble';
import ConfirmationModal from '../components/ConfirmationModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

const Transfer: React.FC = () => {
	const navigate = useNavigate();
	const { contacts, addTransaction, isProcessing, dailyTransferTotal } =
		useAppContext();
	const [amount, setAmount] = useState<string>('');
	const [selectedContact, setSelectedContact] = useState<string | null>(null);
	const [note, setNote] = useState<string>('');
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const DAILY_TRANSFER_LIMIT = 1000;

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

		const transferAmount = parseFloat(amount);
		const remainingLimit = DAILY_TRANSFER_LIMIT - dailyTransferTotal;
		if (transferAmount > remainingLimit) {
			setErrorMessage(
				`Transfer amount ($${transferAmount.toFixed(
					2
				)}) exceeds remaining daily limit ($${remainingLimit.toFixed(2)}).`
			);
			setShowErrorModal(true);
			return;
		}

		setShowConfirmation(true);
	};

	const handleConfirmTransfer = async () => {
		if (!amount || parseFloat(amount) <= 0 || !selectedContact) return;

		const selectedUser = contacts.find(
			(contact) => contact.id === selectedContact
		);

		const result = await addTransaction({
			title: `Transfer to ${selectedUser?.name || 'Unknown'}`,
			amount: -parseFloat(amount),
			category: 'transfer',
			recipient: selectedUser?.name,
			notes: note || undefined,
		});

		setShowConfirmation(false);

		if (result.success) {
			setSuccessMessage(
				`Transfer initiated. $${parseFloat(amount).toFixed(2)} to ${
					selectedUser?.name || 'Unknown'
				} is processing.`
			);
			setShowSuccessModal(true);

			setAmount('');
			setNote('');
			setSelectedContact(null);
		} else {
			setErrorMessage(result.message);
			setShowErrorModal(true);
		}
	};

	const handleCancelTransfer = () => {
		setShowConfirmation(false);
	};

	const handleCloseSuccessModal = () => {
		setShowSuccessModal(false);
		navigate('/home');
	};

	const handleCloseErrorModal = () => {
		setShowErrorModal(false);
	};

	const selectedUserDetails = contacts.find((c) => c.id === selectedContact);
	const remainingDailyLimit = DAILY_TRANSFER_LIMIT - dailyTransferTotal;

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
			{/* Display Remaining Daily Limit */}
			<div className="mb-4 text-center text-sm text-gray-600">
				Remaining Daily Transfer Limit: ${remainingDailyLimit.toFixed(2)}
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
						!amount ||
						parseFloat(amount) <= 0 ||
						!selectedContact ||
						isProcessing
							? 'bg-blue-300 cursor-not-allowed'
							: 'bg-blue-500 hover:bg-blue-600'
					}`}
					onClick={handleInitiateTransfer}
					disabled={
						!amount ||
						parseFloat(amount) <= 0 ||
						!selectedContact ||
						isProcessing
					}>
					{isProcessing ? 'Processing...' : 'Send Money'}
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
			{/* Success Modal */}
			<SuccessModal
				isOpen={showSuccessModal}
				onClose={handleCloseSuccessModal}
				message={successMessage}
			/>
			{/* Error Modal */}
			<ErrorModal
				isOpen={showErrorModal}
				onClose={handleCloseErrorModal}
				message={errorMessage}
			/>
		</div>
	);
};

export default Transfer;
