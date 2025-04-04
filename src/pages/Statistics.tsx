import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/BottomNavigation';
import TransactionItem from '../components/TransactionItem';

const Statistics: React.FC = () => {
	const { transactions, expenses } = useAppContext();
	const [timeFilter, setTimeFilter] = useState<'week' | 'month'>('week');

	const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

	const getDayLabel = (day: number) => {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return days[day];
	};

	// Generate mock data for weekly spending
	const weeklyData = Array.from({ length: 7 }, (_, i) => {
		const day = new Date();
		day.setDate(day.getDate() - (6 - i));
		const amount = Math.random() * 400 + 200;
		return {
			day: getDayLabel(day.getDay()),
			amount,
			highlighted: i === 3, // Highlight Wednesday
		};
	});

	const maxAmount = Math.max(...weeklyData.map((item) => item.amount));

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
								d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1000-2 1 1 0 010 2z"
							/>
						</svg>
					</button>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-gray-500 text-sm">Spent Overview</h3>
						<div className="flex items-center">
							<select
								className="text-sm bg-white border-none text-gray-700 appearance-none pr-6"
								title="select">
								<option>January</option>
								<option>February</option>
								<option>March</option>
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

					<div className="flex items-center">
						<h2 className="text-2xl font-bold">
							$
							{totalSpent.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</h2>
						<span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
							+10%
						</span>
					</div>

					<div className="flex mt-4 gap-1">
						{expenses.map((expense, index) => (
							<div
								key={index}
								className={`${expense.color} h-2 rounded-full`}
								style={{
									width: `${(expense.amount / totalSpent) * 100}%`,
								}}></div>
						))}
					</div>

					<div className="mt-4">
						{expenses.map((expense, index) => (
							<div
								key={index}
								className="flex justify-between items-center mb-2">
								<div className="flex items-center">
									<div
										className={`w-3 h-3 rounded-full ${expense.color} mr-2`}></div>
									<span className="text-sm">{expense.category}</span>
								</div>
								<span className="text-sm font-medium">
									$
									{expense.amount.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
						))}
					</div>
				</div>

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

					<div className="flex items-center">
						<h2 className="text-2xl font-bold">$7,416.00</h2>
						<span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
							+12.8%
						</span>
					</div>

					<div className="flex items-end h-40 mt-6 justify-between">
						{weeklyData.map((item, index) => (
							<div key={index} className="flex flex-col items-center">
								<div
									className={`w-8 ${
										item.highlighted ? 'bg-blue-500' : 'bg-blue-400'
									} rounded-md relative`}
									style={{ height: `${(item.amount / maxAmount) * 100}%` }}>
									{item.highlighted && (
										<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded whitespace-nowrap">
											$450.00
										</div>
									)}
								</div>
								<span className="text-xs mt-2">{item.day}</span>
							</div>
						))}
					</div>
				</div>

				<div className="mt-4">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-medium">Transactions</h3>
						<button className="text-blue-500 text-sm px-3 py-1 border border-blue-200 rounded-lg">
							Filter
						</button>
					</div>

					<div>
						{transactions.map((transaction) => (
							<TransactionItem key={transaction.id} transaction={transaction} />
						))}
					</div>
				</div>
			</div>

			<BottomNavigation />
		</div>
	);
};

export default Statistics;
