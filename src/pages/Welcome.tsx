import React from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
	return (
		<div className="flex flex-col h-screen p-6">
			<div className="flex-1 flex flex-col justify-center items-center">
				<div className="w-full max-w-md">
					{/* Credit Card Graphics */}
					<div className="relative mb-6">
						<div className="absolute -top-4 left-4 w-full max-w-xs rounded-xl overflow-hidden shadow-lg z-10">
							<div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-white">
								<div className="flex justify-between mb-8">
									<div className="flex flex-col">
										<div className="mb-1">
											<div className="bg-yellow-300 w-8 h-5 rounded"></div>
										</div>
										<div className="text-xs opacity-80">
											1291 0298 3012 9434
										</div>
									</div>
									<div className="flex items-center">
										<div className="w-8 h-8">
											<svg viewBox="0 0 24 24" className="w-full h-full">
												<path
													fill="white"
													d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
												/>
												<path
													fill="white"
													d="M16 6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"
												/>
											</svg>
										</div>
									</div>
								</div>
								<div className="flex justify-between items-end">
									<div>
										<div className="text-xs opacity-80">D Marylandit</div>
										<div className="text-xs opacity-80">12/24</div>
									</div>
									<div className="flex">
										<div className="w-8 h-8 opacity-80">
											<svg viewBox="0 0 24 24" className="w-full h-full">
												<circle
													cx="7"
													cy="12"
													r="6"
													fill="white"
													opacity="0.6"
												/>
												<circle
													cx="17"
													cy="12"
													r="6"
													fill="white"
													opacity="0.6"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="absolute top-10 left-12 w-full max-w-xs rounded-xl overflow-hidden shadow-lg">
							<div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 text-white">
								<div className="flex justify-between mb-8">
									<div className="flex flex-col">
										<div className="mb-1">
											<div className="bg-yellow-300 w-8 h-5 rounded"></div>
										</div>
										<div className="text-xs opacity-80">
											1230 4320 2349 0298
										</div>
									</div>
									<div className="flex items-center">
										<div className="w-8 h-8">
											<svg viewBox="0 0 24 24" className="w-full h-full">
												<path
													fill="white"
													d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
												/>
												<path
													fill="white"
													d="M16 6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"
												/>
											</svg>
										</div>
									</div>
								</div>
								<div className="flex justify-between items-end">
									<div>
										<div className="text-xs opacity-80">Alejandro J</div>
										<div className="text-xs opacity-80">12/24</div>
									</div>
									<div className="flex">
										<div className="w-8 h-8 opacity-80">
											<svg viewBox="0 0 24 24" className="w-full h-full">
												<circle
													cx="7"
													cy="12"
													r="6"
													fill="white"
													opacity="0.6"
												/>
												<circle
													cx="17"
													cy="12"
													r="6"
													fill="white"
													opacity="0.6"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-32 text-center">
						<h1 className="text-3xl font-bold mb-2">Innovative Digital App</h1>
						<h2 className="text-2xl font-bold mb-4">Financial Planner</h2>
						<p className="text-gray-600 mb-8">
							Finano Help you to manage your financial
							<br />
							problem easily and efficiently
						</p>
					</div>
				</div>
			</div>

			<div className="mt-8">
				<Link
					to="/home"
					className="block w-full bg-blue-500 text-white rounded-lg py-3 text-center font-medium mb-4">
					Get Started
				</Link>
				<div className="text-center text-gray-500">
					Doesn't have an account?{' '}
					<Link to="/signup" className="text-blue-500 font-medium">
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
