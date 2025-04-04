import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [agreeTerms, setAgreeTerms] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		navigate('/home');
	};

	return (
		<div className="flex flex-col h-screen p-6">
			<div className="mb-10 mt-6">
				<button
					className="p-2 rounded-full bg-gray-100"
					onClick={() => navigate(-1)}
					title="button">
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
			</div>

			<div className="flex-1">
				<h1 className="text-3xl font-bold mb-2">Create Account</h1>
				<p className="text-gray-600 mb-8">Sign up to get started</p>

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="fullName"
							className="block text-sm font-medium text-gray-700 mb-1">
							Full Name
						</label>
						<input
							type="text"
							id="fullName"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="John Doe"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="example@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Create a password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<p className="text-xs text-gray-500 mt-1">
							Password must be at least 8 characters
						</p>
					</div>

					<div className="flex items-center mb-6">
						<input
							type="checkbox"
							id="terms"
							className="h-4 w-4 text-blue-500"
							checked={agreeTerms}
							onChange={() => setAgreeTerms(!agreeTerms)}
							required
						/>
						<label htmlFor="terms" className="ml-2 text-sm text-gray-600">
							I agree to the{' '}
							<Link to="/terms" className="text-blue-500">
								Terms & Conditions
							</Link>
						</label>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white rounded-lg py-3 font-medium mb-4"
						disabled={!agreeTerms}>
						Create Account
					</button>
				</form>
			</div>

			<div className="mb-8 text-center">
				<p className="text-gray-600">
					Already have an account?{' '}
					<Link to="/login" className="text-blue-500 font-medium">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
