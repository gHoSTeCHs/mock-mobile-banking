import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

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
				<h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
				<p className="text-gray-600 mb-8">Login to your account</p>

				<form onSubmit={handleSubmit}>
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
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="remember"
								className="h-4 w-4 text-blue-500"
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
							/>
							<label htmlFor="remember" className="ml-2 text-sm text-gray-600">
								Remember me
							</label>
						</div>
						<Link to="/forgot-password" className="text-sm text-blue-500">
							Forgot Password?
						</Link>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white rounded-lg py-3 font-medium mb-4">
						Login
					</button>
				</form>
			</div>

			<div className="mb-8 text-center">
				<p className="text-gray-600">
					Don't have an account?{' '}
					<Link to="/signup" className="text-blue-500 font-medium">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
