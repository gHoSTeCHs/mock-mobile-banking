import React from 'react';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/BottomNavigation';
import CreditCard from '../components/CreditCard';

const Cards: React.FC = () => {
	const { cards } = useAppContext();

	return (
		<div className="pb-20">
			<div className="p-5">
				<div className="flex items-center mb-6">
					<button className="mr-2 text-blue-500" title="buttom">
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
					<h1 className="text-xl font-medium flex-1 text-center">Your Cards</h1>
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
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</button>
				</div>

				<div className="space-y-6">
					{cards.map((card) => (
						<CreditCard key={card.id} card={card} />
					))}
				</div>

				<div className="mt-8">
					<h3 className="font-medium mb-4">Card Settings</h3>

					<div className="bg-white rounded-lg shadow-sm overflow-hidden">
						<div className="p-4 border-b flex justify-between items-center">
							<div className="flex items-center">
								<div className="bg-blue-100 p-2 rounded-lg mr-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<span>Block Card</span>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>

						<div className="p-4 border-b flex justify-between items-center">
							<div className="flex items-center">
								<div className="bg-purple-100 p-2 rounded-lg mr-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-purple-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<span>Change PIN</span>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>

						<div className="p-4 flex justify-between items-center">
							<div className="flex items-center">
								<div className="bg-green-100 p-2 rounded-lg mr-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-green-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
										/>
									</svg>
								</div>
								<span>Set Spending Limits</span>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<BottomNavigation />
		</div>
	);
};

export default Cards;
