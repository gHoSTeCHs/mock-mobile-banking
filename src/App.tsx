import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Cards from './pages/Cards';
import Account from './pages/Account';
import Transfer from './pages/Transfer';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TransactionDetails from './pages/TransactionDetails';

import './App.css';

const App: React.FC = () => {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/welcome" replace />} />
					<Route path="/welcome" element={<Welcome />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/home" element={<Home />} />
					<Route path="/statistics" element={<Statistics />} />
					<Route path="/cards" element={<Cards />} />
					<Route path="/account" element={<Account />} />
					<Route path="/transfer" element={<Transfer />} />
					<Route path="/transaction/:id" element={<TransactionDetails />} />
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
};

export default App;
