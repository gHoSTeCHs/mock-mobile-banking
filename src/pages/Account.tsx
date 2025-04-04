import React from 'react';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/BottomNavigation';

const Account: React.FC = () => {
	const { currentUser } = useAppContext();

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
					<h1 className="text-xl font-medium flex-1 text-center">Account</h1>
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
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</button>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center mb-8">
					<div className="h-20 w-20 rounded-full bg-gray-200 overflow-hidden mb-4">
						<img
							src={currentUser.avatar || `/api/placeholder/80/80`}
							alt={currentUser.name}
							className="h-full w-full object-cover"
						/>
					</div>
					<h2 className="text-xl font-medium">{currentUser.name}</h2>
					<p className="text-gray-500">Premium Member</p>
				</div>

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
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>
							<span>Personal Information</span>
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
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<span>Password & Security</span>
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
										d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
									/>
								</svg>
							</div>
							<span>Notifications</span>
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
							<div className="bg-red-100 p-2 rounded-lg mr-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-red-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
							</div>
							<span>Logout</span>
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

			<BottomNavigation />
		</div>
	);
};

export default Account;
