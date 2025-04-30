import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Card, Transaction, ExpenseCategory } from '../types';
import { images } from '../constants';
import { mockTransactions } from '../data/statisticsData';

interface AppContextType {
	currentUser: User;
	cards: Card[];
	transactions: Transaction[];
	contacts: User[];
	expenses: ExpenseCategory[];
	addTransaction: (
		transaction: Omit<Transaction, 'id' | 'date' | 'status'>
	) => Promise<void>;
	isProcessing: boolean;
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
	addTransaction: async () => {},
	isProcessing: false,
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
			},
			{
				id: '2',
				number: '1230 4320 2349 0298',
				expiryDate: '12/24',
				cardHolder: 'Alejandro J',
				type: 'mastercard',
				balance: 7562.45,
				color: 'dark-blue',
			},
		]);

		setContacts([
			{ id: '2', name: 'Adrian', avatar: images.user2 },
			{ id: '3', name: 'Jaya', avatar: images.user3 },
			{ id: '4', name: 'Enrico', avatar: images.user4 },
			{ id: '5', name: 'Malik', avatar: images.user5 },
			{ id: '6', name: 'Adit', avatar: images.user6 },
		]);

		setTransactions(mockTransactions);

		setExpenses([
			{ category: 'Investment', amount: 6345.6, color: 'bg-blue-500' },
			{ category: 'Entertainment', amount: 3172.8, color: 'bg-teal-500' },
			{ category: 'Food & Beverages', amount: 1057.6, color: 'bg-green-500' },
		]);
	}, []);

	const addTransaction = async (
		transactionData: Omit<Transaction, 'id' | 'date' | 'status'>
	) => {
		setIsProcessing(true);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		const newTransaction: Transaction = {
			...transactionData,
			id: `tx-${Date.now()}`,
			date: new Date(),
			status: Math.random() > 0.1 ? 'completed' : 'failed',
		};

		if (newTransaction.status === 'completed' && newTransaction.amount < 0) {
			setCards((prevCards) =>
				prevCards.map((card) =>
					card.id === '1'
						? { ...card, balance: card.balance + newTransaction.amount }
						: card
				)
			);
		}

		setTransactions((prev) => [newTransaction, ...prev]);
		setIsProcessing(false);

		return Promise.resolve();
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
			}}>
			{children}
		</AppContext.Provider>
	);
};
