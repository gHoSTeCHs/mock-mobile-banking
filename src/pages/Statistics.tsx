import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/BottomNavigation';
import TransactionItem from '../components/TransactionItem';
import {
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from 'recharts';

const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#AF19FF',
	'#FF1919',
	'#19FFD5',
];

const getMonthName = (monthIndex: number) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return months[monthIndex];
};

const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month + 1, 0).getDate();
};

const Statistics: React.FC = () => {
	const { transactions } = useAppContext();
	const [timeFilter, setTimeFilter] = useState<'week' | 'month'>('month');
	const currentYear = new Date().getFullYear();
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth()
	);

	const processedData = useMemo(() => {
		const monthlyTransactions = transactions.filter((t) => {
			const transactionDate = new Date(t.date);
			return (
				transactionDate.getMonth() === selectedMonth &&
				transactionDate.getFullYear() === currentYear
			);
		});

		const totalSpent = monthlyTransactions
			.filter((t) => t.amount < 0)
			.reduce((sum, t) => sum + Math.abs(t.amount), 0);

		const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
		const prevYear = selectedMonth === 0 ? currentYear - 1 : currentYear;
		const prevMonthlyTransactions = transactions.filter((t) => {
			const transactionDate = new Date(t.date);
			return (
				transactionDate.getMonth() === prevMonth &&
				transactionDate.getFullYear() === prevYear
			);
		});
		const prevTotalSpent = prevMonthlyTransactions
			.filter((t) => t.amount < 0)
			.reduce((sum, t) => sum + Math.abs(t.amount), 0);

		let percentageChange: number | null = null;
		if (prevTotalSpent > 0) {
			percentageChange = ((totalSpent - prevTotalSpent) / prevTotalSpent) * 100;
		} else if (totalSpent > 0) {
			percentageChange = 100;
		}

		const expensesByCategory = monthlyTransactions
			.filter((t) => t.amount < 0)
			.reduce((acc, t) => {
				const category = t.category || 'other';
				acc[category] = (acc[category] || 0) + Math.abs(t.amount);
				return acc;
			}, {} as { [key: string]: number });

		const pieChartData = Object.entries(expensesByCategory).map(
			([name, value]) => ({
				name,
				value,
			})
		);

		let barChartData: { name: string; amount: number }[] = [];
		const today = new Date();

		if (timeFilter === 'week') {
			const weekStart = new Date(today);
			weekStart.setDate(today.getDate() - today.getDay());
			weekStart.setHours(0, 0, 0, 0);

			const weekEnd = new Date(weekStart);
			weekEnd.setDate(weekStart.getDate() + 6);
			weekEnd.setHours(23, 59, 59, 999);

			const weeklyTransactions = transactions.filter((t) => {
				const transactionDate = new Date(t.date);
				return (
					transactionDate >= weekStart &&
					transactionDate <= weekEnd &&
					t.amount < 0
				);
			});

			const dailyTotals: { [key: string]: number } = {};
			const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			daysOfWeek.forEach((day) => (dailyTotals[day] = 0));

			weeklyTransactions.forEach((t) => {
				const dayIndex = new Date(t.date).getDay();
				dailyTotals[daysOfWeek[dayIndex]] += Math.abs(t.amount);
			});

			barChartData = daysOfWeek.map((day) => ({
				name: day,
				amount: dailyTotals[day],
			}));
		} else {
			const daysInSelectedMonth = getDaysInMonth(currentYear, selectedMonth);
			const dailyTotals: { [key: number]: number } = {};
			for (let i = 1; i <= daysInSelectedMonth; i++) {
				dailyTotals[i] = 0;
			}

			monthlyTransactions
				.filter((t) => t.amount < 0)
				.forEach((t) => {
					const dayOfMonth = new Date(t.date).getDate();
					dailyTotals[dayOfMonth] += Math.abs(t.amount);
				});

			barChartData = Object.entries(dailyTotals).map(([day, amount]) => ({
				name: day,
				amount,
			}));
		}

		return {
			totalSpent,
			percentageChange,
			pieChartData,
			barChartData,
			monthlyTransactions,
		};
	}, [transactions, selectedMonth, currentYear, timeFilter]);

	const {
		totalSpent,
		percentageChange,
		pieChartData,
		barChartData,
		monthlyTransactions,
	} = processedData;

	const monthOptions = Array.from({ length: 12 }, (_, i) => ({
		value: i,
		label: getMonthName(i),
	}));

	return (
		<div className="pb-20">
			<div className="p-5">
				<div className="flex items-center mb-6">
					<button className="mr-2 text-blue-500" title="button">
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
						Account Statistics
					</h1>
					<button className="text-blue-500" title="button">
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
								d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
							/>
						</svg>
					</button>
				</div>

				{/* Spent Overview Card */}
				<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-gray-500 text-sm">Spent Overview</h3>
						<div className="flex items-center">
							<select
								className="text-sm bg-white border-none text-gray-700 appearance-none pr-6"
								title="select month"
								value={selectedMonth}
								onChange={(e) => setSelectedMonth(Number(e.target.value))}>
								{monthOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
							<svg
								className="w-4 h-4 -ml-5 text-gray-500 pointer-events-none"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>

					<div className="flex items-center mb-4">
						<h2 className="text-2xl font-bold">
							$
							{totalSpent.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</h2>
						{/* Percentage change removed for simplicity */}
						{/* Display Percentage Change */}
						{percentageChange !== null && (
							<span
								className={`ml-2 text-sm font-medium flex items-center ${
									percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
								}`}>
								{percentageChange >= 0 ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 10l7-7m0 0l7 7m-7-7v18"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 14l-7 7m0 0l-7-7m7 7V3"
										/>
									</svg>
								)}
								{Math.abs(percentageChange).toFixed(1)}%
							</span>
						)}
					</div>

					{/* Pie Chart for Expenses */}
					<div style={{ width: '100%', height: 250 }}>
						<ResponsiveContainer>
							<PieChart>
								<Pie
									data={pieChartData}
									innerRadius={60}
									outerRadius={80}
									fill="#8884d8"
									paddingAngle={5}
									dataKey="value">
									{pieChartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip
									formatter={(value: number) => `$${value.toFixed(2)}`}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Expenses Bar Chart Card */}
				<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-gray-500 text-sm">Total Expenses</h3>
						<div className="flex items-center">
							<select
								title="Time Filter"
								className="text-sm bg-white border-none text-gray-700 appearance-none pr-6"
								value={timeFilter}
								onChange={(e) =>
									setTimeFilter(e.target.value as 'week' | 'month')
								}>
								<option value="week">This Week</option>
								<option value="month">This Month</option>
							</select>
							<svg
								className="w-4 h-4 -ml-5 text-gray-500 pointer-events-none"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>

					{/* Bar Chart */}
					<div style={{ width: '100%', height: 200 }}>
						<ResponsiveContainer>
							<BarChart data={barChartData}>
								<XAxis dataKey="name" fontSize={10} />
								<YAxis fontSize={10} />
								<Tooltip
									formatter={(value: number) => `$${value.toFixed(2)}`}
								/>
								<Bar dataKey="amount" fill="#8884d8" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Transaction List */}
				<div className="mt-4">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-medium">
							Transactions ({getMonthName(selectedMonth)})
						</h3>
						{/* Filter button can be added later if needed */}
					</div>

					<div>
						{monthlyTransactions.length > 0 ? (
							monthlyTransactions.map((transaction) => (
								<TransactionItem
									key={transaction.id}
									transaction={transaction}
								/>
							))
						) : (
							<p className="text-gray-500 text-center py-4">
								No transactions for {getMonthName(selectedMonth)}.
							</p>
						)}
					</div>
				</div>
			</div>

			<BottomNavigation />
		</div>
	);
};

export default Statistics;
