import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const TransactionDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { transactions } = useAppContext();

	const transaction = transactions.find((tx) => tx.id === id);

	if (!transaction) {
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
					<h1 className="text-xl font-medium flex-1 text-center">
						Transaction Not Found
					</h1>
				</div>
				<div className="text-center mt-10">
					<p>Sorry, we couldn't find this transaction.</p>
					<button
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
						onClick={() => navigate(-1)}>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	const getStatusColor = () => {
		switch (transaction.status) {
			case 'completed':
				return 'bg-green-100 text-green-800';
			case 'processing':
				return 'bg-yellow-100 text-yellow-800';
			case 'failed':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const getCategoryIcon = () => {
		switch (transaction.category) {
			case 'entertainment':
				return '🎬';
			case 'food':
				return '🍔';
			case 'investment':
				return '📈';
			case 'transfer':
				return '↗️';
			default:
				return '💼';
		}
	};

	const getCategoryName = () => {
		switch (transaction.category) {
			case 'entertainment':
				return 'Entertainment';
			case 'food':
				return 'Food & Beverages';
			case 'investment':
				return 'Investment';
			case 'transfer':
				return 'Transfer';
			default:
				return 'Other';
		}
	};

	const getAmountColor = () => {
		if (transaction.status === 'failed') return 'text-red-500';
		return transaction.amount >= 0 ? 'text-green-500' : 'text-red-500';
	};

	const formatAmount = () => {
		const prefix = transaction.amount >= 0 ? '+' : '';
		return `${prefix}$${Math.abs(transaction.amount).toFixed(2)}`;
	};

	return (
		<div className="p-5">
			<div className="flex items-center mb-6">
				<button
					className="mr-2 text-blue-500"
					onClick={() => navigate(-1)}
					title="title">
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
				<h1 className="text-xl font-medium flex-1 text-center">
					Transaction Details
				</h1>
			</div>

			<div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center mb-6">
				<div className="bg-blue-100 text-blue-600 text-2xl p-4 rounded-full mb-4">
					{getCategoryIcon()}
				</div>

				<h2 className="text-xl font-medium mb-1">{transaction.title}</h2>
				<p
					className={`text-sm px-3 py-1 rounded-full ${getStatusColor()} mb-4`}>
					{transaction.status.charAt(0).toUpperCase() +
						transaction.status.slice(1)}
				</p>

				<div className={`text-2xl font-bold ${getAmountColor()} mb-6`}>
					{formatAmount()}
				</div>

				<div className="w-full border-t border-gray-100 pt-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-gray-500">Date</p>
							<p className="font-medium">{formatDate(transaction.date)}</p>
						</div>

						<div>
							<p className="text-sm text-gray-500">Category</p>
							<p className="font-medium">{getCategoryName()}</p>
						</div>

						{transaction.recipient && (
							<div>
								<p className="text-sm text-gray-500">Recipient</p>
								<p className="font-medium">{transaction.recipient}</p>
							</div>
						)}

						<div>
							<p className="text-sm text-gray-500">Transaction ID</p>
							<p className="font-medium text-xs">{transaction.id}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
				<h3 className="font-medium mb-4">Transaction Notes</h3>
				<p className="text-gray-600 text-sm">
					{transaction.notes || 'No notes available for this transaction.'}
				</p>
			</div>

			<div className="flex gap-3">
				<button
					className="flex-1 py-3 border border-blue-500 text-blue-500 rounded-lg font-medium"
					onClick={() => navigate('/statistics')}>
					View Statistics
				</button>

				<button
					className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium"
					onClick={() => navigate('/home')}>
					Back to Home
				</button>
			</div>
		</div>
	);
};

export default TransactionDetails;
