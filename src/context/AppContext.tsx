import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Card, Transaction, ExpenseCategory } from '../types';
import { images } from '../constants';
import { mockTransactions } from '../data/statisticsData';

const DAILY_TRANSFER_LIMIT = 1000;

interface AppContextType {
	currentUser: User;
	cards: Card[];
	transactions: Transaction[];
	contacts: User[];
	expenses: ExpenseCategory[];
	addTransaction: (
		transaction: Omit<Transaction, 'id' | 'date' | 'status'>
	) => Promise<{ success: boolean; message: string }>;
	isProcessing: boolean;
	dailyTransferTotal: number;
	toggleCardFreeze: (cardId: string) => void;
}

const defaultContext: AppContextType = {
	currentUser: {
		id: '1',
		name: 'Ronaldinho Fazio',
		avatar: images.user1,
	},
	cards: [],
	transactions: [],
	contacts: [],
	expenses: [],
	addTransaction: async () => ({ success: false, message: 'Not implemented' }),
	isProcessing: false,
	dailyTransferTotal: 0,
	toggleCardFreeze: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentUser] = useState<User>(defaultContext.currentUser);
	const [cards, setCards] = useState<Card[]>([]);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [contacts, setContacts] = useState<User[]>([]);
	const [expenses, setExpenses] = useState<ExpenseCategory[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);
	const [dailyTransferTotal, setDailyTransferTotal] = useState(0);

	const calculateTodaysTransfers = (currentTransactions: Transaction[]) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		return currentTransactions
			.filter(
				(tx) =>
					tx.category === 'transfer' &&
					tx.amount < 0 &&
					tx.status !== 'failed' &&
					tx.date >= today
			)
			.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
	};

	useEffect(() => {
		setCards([
			{
				id: '1',
				number: '1291 0298 3012 9434',
				expiryDate: '12/24',
				cardHolder: 'D Marylandit',
				type: 'mastercard',
				balance: 12893.84,
				color: 'blue',
				isFrozen: false,
			},
			{
				id: '2',
				number: '1230 4320 2349 0298',
				expiryDate: '12/24',
				cardHolder: 'Alejandro J',
				type: 'mastercard',
				balance: 7562.45,
				color: 'dark-blue',
				isFrozen: true,
			},
		]);

		setContacts([
			{ id: '2', name: 'Adrian', avatar: images.user2 },
			{ id: '3', name: 'Jaya', avatar: images.user3 },
			{ id: '4', name: 'Enrico', avatar: images.user4 },
			{ id: '5', name: 'Malik', avatar: images.user5 },
			{ id: '6', name: 'Adit', avatar: images.user6 },
		]);

		const initialTransactions = mockTransactions;
		setTransactions(initialTransactions);
		setDailyTransferTotal(calculateTodaysTransfers(initialTransactions));

		setExpenses([
			{ category: 'Investment', amount: 6345.6, color: 'bg-blue-500' },
			{ category: 'Entertainment', amount: 3172.8, color: 'bg-teal-500' },
			{ category: 'Food & Beverages', amount: 1057.6, color: 'bg-green-500' },
		]);
	}, []);

	useEffect(() => {
		setDailyTransferTotal(calculateTodaysTransfers(transactions));
	}, [transactions]);

	const addTransaction = async (
		transactionData: Omit<Transaction, 'id' | 'date' | 'status'>
	): Promise<{ success: boolean; message: string }> => {
		setIsProcessing(true);

		if (transactionData.category === 'transfer' && transactionData.amount < 0) {
			const potentialTotal =
				dailyTransferTotal + Math.abs(transactionData.amount);
			if (potentialTotal > DAILY_TRANSFER_LIMIT) {
				setIsProcessing(false);
				return {
					success: false,
					message: `Transfer failed. Exceeds daily limit of $${DAILY_TRANSFER_LIMIT.toFixed(
						2
					)}. Today's total: $${dailyTransferTotal.toFixed(2)}`,
				};
			}
		}

		const newTransaction: Transaction = {
			...transactionData,
			id: `tx-${Date.now()}`,
			date: new Date(),
			status: 'pending',
		};

		setTransactions((prev) => [newTransaction, ...prev]);

		await new Promise((resolve) =>
			setTimeout(resolve, Math.random() * 2000 + 3000)
		);

		const finalStatus = Math.random() > 0.1 ? 'completed' : 'failed';

		setTransactions((prev) =>
			prev.map((tx) => {
				if (tx.id === newTransaction.id) {
					const updatedTx = {
						...tx,
						status: finalStatus as Transaction['status'],
					};

					if (
						finalStatus === 'completed' &&
						updatedTx.category === 'transfer' &&
						updatedTx.amount < 0
					) {
						setCards((prevCards) =>
							prevCards.map((card) =>
								card.id === '1'
									? {
											...card,
											balance: card.balance + updatedTx.amount,
									  }
									: card
							)
						);
					} else if (finalStatus === 'completed' && updatedTx.amount > 0) {
						setCards((prevCards) =>
							prevCards.map((card) =>
								card.id === '1'
									? { ...card, balance: card.balance + updatedTx.amount }
									: card
							)
						);
					}

					return updatedTx;
				}
				return tx;
			})
		);

		setIsProcessing(false);

		return {
			success: finalStatus === 'completed',
			message:
				finalStatus === 'completed'
					? 'Transaction completed successfully.'
					: 'Transaction failed.',
		};
	};

	const toggleCardFreeze = (cardId: string) => {
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id === cardId ? { ...card, isFrozen: !card.isFrozen } : card
			)
		);
	};

	return (
		<AppContext.Provider
			value={{
				currentUser,
				cards,
				transactions,
				contacts,
				expenses,
				addTransaction,
				isProcessing,
				dailyTransferTotal,
				toggleCardFreeze,
			}}>
			{children}
		</AppContext.Provider>
	);
};
