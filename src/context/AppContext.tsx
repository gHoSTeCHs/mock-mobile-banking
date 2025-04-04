import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Card, Transaction, ExpenseCategory } from '../types';

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
		avatar: '/avatars/user.png',
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
			{ id: '2', name: 'Adrian', avatar: '/avatars/adrian.png' },
			{ id: '3', name: 'Jaya', avatar: '/avatars/jaya.png' },
			{ id: '4', name: 'Enrico', avatar: '/avatars/enrico.png' },
			{ id: '5', name: 'Malik', avatar: '/avatars/malik.png' },
			{ id: '6', name: 'Adit', avatar: '/avatars/adit.png' },
		]);

		const mockTransactions: Transaction[] = [
			{
				id: '1',
				title: 'Netflix Subscriptions',
				amount: -150.0,
				date: new Date('2024-06-20T13:50:00'),
				category: 'entertainment',
				status: 'completed',
			},
			{
				id: '2',
				title: 'Grocery Shopping',
				amount: -84.52,
				date: new Date('2024-06-19T15:23:00'),
				category: 'food',
				status: 'completed',
			},
			{
				id: '3',
				title: 'Investment Deposit',
				amount: 1250.0,
				date: new Date('2024-06-18T09:15:00'),
				category: 'investment',
				status: 'completed',
			},
			{
				id: '4',
				title: 'Transfer to Jaya',
				amount: -350.0,
				date: new Date('2024-06-17T14:30:00'),
				category: 'transfer',
				recipient: 'Jaya',
				status: 'completed',
			},
			{
				id: '5',
				title: 'Salary Deposit',
				amount: 3750.0,
				date: new Date('2024-06-15T08:00:00'),
				category: 'other',
				status: 'completed',
			},
		];
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
			status: Math.random() > 0.1 ? 'completed' : 'failed', // 10% chance of failure for demo
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
