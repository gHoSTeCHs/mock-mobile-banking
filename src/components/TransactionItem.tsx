import React from 'react';
import { Transaction } from '../types';
import { Link } from 'react-router-dom';

interface TransactionItemProps {
	transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
	const getTransactionIcon = () => {
		switch (transaction.category) {
			case 'entertainment':
				return (
					<div className="bg-blue-100 p-2 rounded">
						<span className="text-blue-600 text-xl">🎬</span>
					</div>
				);
			case 'food':
				return (
					<div className="bg-green-100 p-2 rounded">
						<span className="text-green-600 text-xl">🍔</span>
					</div>
				);
			case 'investment':
				return (
					<div className="bg-purple-100 p-2 rounded">
						<span className="text-purple-600 text-xl">📈</span>
					</div>
				);
			case 'transfer':
				return (
					<div className="bg-yellow-100 p-2 rounded">
						<span className="text-yellow-600 text-xl">↗️</span>
					</div>
				);
			default:
				return (
					<div className="bg-gray-100 p-2 rounded">
						<span className="text-gray-600 text-xl">💼</span>
					</div>
				);
		}
	};

	const formatDate = (date: Date) => {
		return `${date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})} at ${date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
		})}`;
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
		<Link
			to={`/transaction/${transaction.id}`}
			className="flex items-center justify-between py-3 border-b border-gray-100">
			<div className="flex items-center">
				{getTransactionIcon()}
				<div className="ml-3">
					<h4 className="font-medium text-gray-800">{transaction.title}</h4>
					<p className="text-xs text-gray-500">
						{formatDate(transaction.date)}
					</p>
					{transaction.status === 'processing' && (
						<span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
							Processing
						</span>
					)}
					{transaction.status === 'failed' && (
						<span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
							Failed
						</span>
					)}
				</div>
			</div>
			<div className={`font-medium ${getAmountColor()}`}>{formatAmount()}</div>
		</Link>
	);
};

export default TransactionItem;
