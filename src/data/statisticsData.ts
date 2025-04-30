import { Transaction, ExpenseCategory } from '../types';

const months = ['January', 'February', 'March', 'April', 'May', 'June'];

export const mockTransactions: Transaction[] = [
	{
		id: 'jan1',
		title: 'Gym Membership',
		amount: -50.0,
		date: new Date('2025-01-05T08:00:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: 'jan2',
		title: 'Winter Clothes',
		amount: -250.75,
		date: new Date('2025-01-15T16:30:00'),
		category: 'other',
		status: 'completed',
	},

	{
		id: 'feb1',
		title: "Valentine's Dinner",
		amount: -120.0,
		date: new Date('2025-02-14T20:00:00'),
		category: 'food',
		status: 'completed',
	},
	{
		id: 'feb2',
		title: 'Book Purchase',
		amount: -25.5,
		date: new Date('2025-02-20T11:00:00'),
		category: 'entertainment',
		status: 'completed',
	},

	{
		id: 'mar1',
		title: 'Concert Tickets',
		amount: -180.0,
		date: new Date('2025-03-10T19:30:00'),
		category: 'entertainment',
		status: 'completed',
	},
	{
		id: 'mar2',
		title: 'Freelance Payment Received',
		amount: 800.0,
		date: new Date('2025-03-25T10:00:00'),
		category: 'other',
		status: 'completed',
	},

	{
		id: 'apr1',
		title: 'Car Insurance',
		amount: -150.0,
		date: new Date('2025-04-01T09:00:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: 'apr2',
		title: 'Weekend Trip Gas',
		amount: -60.2,
		date: new Date('2025-04-18T14:00:00'),
		category: 'other',
		status: 'completed',
	},

	{
		id: '7',
		title: 'Spotify Premium',
		amount: -10.99,
		date: new Date('2025-05-25T10:00:00'),
		category: 'entertainment',
		status: 'completed',
	},
	{
		id: '8',
		title: 'Coffee Shop',
		amount: -5.5,
		date: new Date('2025-05-22T08:30:00'),
		category: 'food',
		status: 'completed',
	},
	{
		id: '9',
		title: 'Stock Purchase',
		amount: -500.0,
		date: new Date('2025-05-15T11:00:00'),
		category: 'investment',
		status: 'completed',
	},
	{
		id: '10',
		title: 'Transfer from Adrian',
		amount: 200.0,
		date: new Date('2025-05-10T16:20:00'),
		category: 'transfer',
		recipient: 'Me',
		status: 'completed',
	},

	{
		id: '1',
		title: 'Netflix Subscriptions',
		amount: -15.99,
		date: new Date('2025-06-20T13:50:00'),
		category: 'entertainment',
		status: 'completed',
	},
	{
		id: '2',
		title: 'Grocery Shopping',
		amount: -84.52,
		date: new Date('2025-06-19T15:23:00'),
		category: 'food',
		status: 'completed',
	},
	{
		id: '3',
		title: 'Investment Deposit',
		amount: 1250.0,
		date: new Date('2025-06-18T09:15:00'),
		category: 'investment',
		status: 'completed',
	},
	{
		id: '4',
		title: 'Transfer to Jaya',
		amount: -350.0,
		date: new Date('2025-06-17T14:30:00'),
		category: 'transfer',
		recipient: 'Jaya',
		status: 'completed',
	},
	{
		id: '5',
		title: 'Salary Deposit',
		amount: 3750.0,
		date: new Date('2025-06-15T08:00:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: '6',
		title: 'Restaurant Dinner',
		amount: -65.3,
		date: new Date('2025-06-10T19:45:00'),
		category: 'food',
		status: 'completed',
	},

	{
		id: '11',
		title: 'Movie Tickets',
		amount: -30.0,
		date: new Date('2025-07-02T20:15:00'),
		category: 'entertainment',
		status: 'completed',
	},
	{
		id: '12',
		title: 'Lunch',
		amount: -15.75,
		date: new Date('2025-07-01T12:30:00'),
		category: 'food',
		status: 'completed',
	},
	{
		id: 'jul3',
		title: 'Summer Sale Shopping',
		amount: -199.99,
		date: new Date('2025-07-15T17:00:00'),
		category: 'other',
		status: 'completed',
	},

	{
		id: 'aug1',
		title: 'Vacation Flight Booking',
		amount: -450.0,
		date: new Date('2025-08-05T10:00:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: 'aug2',
		title: 'Beachside Cafe',
		amount: -45.8,
		date: new Date('2025-08-20T13:00:00'),
		category: 'food',
		status: 'completed',
	},

	{
		id: 'sep1',
		title: 'New Phone Purchase',
		amount: -999.0,
		date: new Date('2025-09-12T11:30:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: 'sep2',
		title: 'Transfer to Enrico',
		amount: -100.0,
		date: new Date('2025-09-28T09:00:00'),
		category: 'transfer',
		recipient: 'Enrico',
		status: 'completed',
	},

	{
		id: 'oct1',
		title: 'Halloween Party Supplies',
		amount: -75.25,
		date: new Date('2025-10-25T15:00:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: 'oct2',
		title: 'Dividend Income',
		amount: 150.0,
		date: new Date('2025-10-15T12:00:00'),
		category: 'investment',
		status: 'completed',
	},

	{
		id: 'nov1',
		title: 'Black Friday Deals',
		amount: -320.5,
		date: new Date('2025-11-29T10:00:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: 'nov2',
		title: 'Thanksgiving Groceries',
		amount: -110.0,
		date: new Date('2025-11-25T16:45:00'),
		category: 'food',
		status: 'completed',
	},
	{
		id: 'dec1',
		title: 'Holiday Gifts',
		amount: -400.0,
		date: new Date('2025-12-10T18:00:00'),
		category: 'other',
		status: 'completed',
	},
	{
		id: 'dec2',
		title: "New Year's Eve Dinner",
		amount: -150.0,
		date: new Date('2025-12-31T21:00:00'),
		category: 'food',
		status: 'completed',
	},
	{
		id: 'dec3',
		title: 'End of Year Bonus',
		amount: 2000.0,
		date: new Date('2025-12-20T09:00:00'),
		category: 'other',
		status: 'completed',
	},
];

const generateMonthlyTransactions = (month: number): Transaction[] => {
	const transactions: Transaction[] = [];
	const categories = [
		'entertainment',
		'food',
		'investment',
		'transfer',
		'other',
	] as const;
	const daysInMonth = new Date(2024, month + 1, 0).getDate();

	for (let i = 0; i < 15; i++) {
		const day = Math.floor(Math.random() * daysInMonth) + 1;
		const category = categories[Math.floor(Math.random() * categories.length)];
		const amount = Math.floor(Math.random() * 900) + 100;

		transactions.push({
			id: `trans-${month}-${i}`,
			title: `${category.charAt(0).toUpperCase() + category.slice(1)} Expense`,
			amount,
			date: new Date(2024, month, day),
			category,
			status: 'completed',
			notes: `Transaction for ${months[month]}`,
		});
	}

	return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const generateMonthlyExpenses = (
	transactions: Transaction[]
): ExpenseCategory[] => {
	const categoryColors = {
		entertainment: 'bg-purple-500',
		food: 'bg-green-500',
		investment: 'bg-blue-500',
		transfer: 'bg-yellow-500',
		other: 'bg-gray-500',
	};

	const expensesByCategory = transactions.reduce((acc, transaction) => {
		acc[transaction.category] =
			(acc[transaction.category] || 0) + transaction.amount;
		return acc;
	}, {} as Record<string, number>);

	return Object.entries(expensesByCategory).map(([category, amount]) => ({
		category,
		amount,
		color: categoryColors[category as keyof typeof categoryColors],
	}));
};

export const monthlyData = months.map((_, index) => {
	const transactions = generateMonthlyTransactions(index);
	const expenses = generateMonthlyExpenses(transactions);
	const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

	return {
		month: months[index],
		transactions,
		expenses,
		totalSpent,
		percentageChange: (Math.random() * 30 - 15).toFixed(1),
	};
});
