import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/BottomNavigation';
import CreditCard from '../components/CreditCard';
import ContactBubble from '../components/ContactBubble';
import TransactionItem from '../components/TransactionItem';
import { images } from '../constants';

const Home: React.FC = () => {
	const { currentUser, cards, transactions, contacts } = useAppContext();

	return (
		<div className="pb-20 h-screen">
			<div className="p-5">
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center">
						<div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
							<img
								src={currentUser.avatar || images.user1}
								alt={currentUser.name}
								className="h-full w-full object-cover"
							/>
						</div>
						<div>
							<p className="text-sm text-gray-500">Welcome Back 👋</p>
							<h2 className="font-medium">{currentUser.name}</h2>
						</div>
					</div>
					<div className="flex">
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
									d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
								/>
							</svg>
						</button>
						<button className="text-blue-500" title="buttom">
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
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</button>
					</div>
				</div>

				{cards.length > 0 && <CreditCard card={cards[0]} />}

				<div className="grid grid-cols-3 gap-4 mt-4">
					<Link
						to="/transfer"
						className="bg-blue-500 text-white rounded-xl p-4 flex flex-col items-center justify-center">
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
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
						<span className="text-sm mt-1">Request</span>
					</Link>

					<Link
						to="/transfer"
						className="bg-blue-600 text-white rounded-xl p-4 flex flex-col items-center justify-center">
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
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
						<span className="text-sm mt-1">Transfer</span>
					</Link>

					<Link
						to="/cards"
						className="bg-blue-700 text-white rounded-xl p-4 flex flex-col items-center justify-center">
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
						<span className="text-sm mt-1">Other</span>
					</Link>
				</div>

				<div className="mt-8">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-medium">Latest People</h3>
						<Link to="/transfer" className="text-blue-500 text-sm">
							See All
						</Link>
					</div>

					<div className="flex overflow-x-auto pb-2 -mx-2">
						<div className="flex flex-col items-center mx-2">
							<div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-blue-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4v16m8-8H4"
									/>
								</svg>
							</div>
							<span className="text-xs mt-1">Add</span>
						</div>

						{contacts.map((contact) => (
							<ContactBubble key={contact.id} user={contact} />
						))}
					</div>
				</div>

				<div className="mt-8">
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-medium">Recent Transactions</h3>
						<Link to="/statistics" className="text-blue-500 text-sm">
							See All
						</Link>
					</div>

					<div>
						{transactions.slice(0, 3).map((transaction) => (
							<TransactionItem key={transaction.id} transaction={transaction} />
						))}
					</div>
				</div>
			</div>

			<BottomNavigation />
		</div>
	);
};

export default Home;
