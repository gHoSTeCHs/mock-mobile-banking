import React from 'react';
import { Card } from '../types';

interface CreditCardProps {
	card: Card;
	showBalance?: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({
	card,
	showBalance = true,
}) => {
	const getCardColor = () => {
		switch (card.color) {
			case 'blue':
				return 'bg-gradient-to-r from-blue-400 to-blue-600';
			case 'dark-blue':
				return 'bg-gradient-to-r from-blue-800 to-blue-900';
			default:
				return 'bg-gradient-to-r from-blue-400 to-blue-600';
		}
	};

	const getCardIcon = () => {
		switch (card.type) {
			case 'mastercard':
				return (
					<div className="flex">
						<div className="w-8 h-8 bg-red-500 rounded-full opacity-80 -mr-3"></div>
						<div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80"></div>
					</div>
				);
			case 'visa':
				return <div className="text-white font-bold text-2xl italic">VISA</div>;
			default:
				return null;
		}
	};

	return (
		<div
			className={`${getCardColor()} rounded-xl p-5 w-full h-56 shadow-lg relative overflow-hidden mb-4`}>
			<div className="flex justify-between">
				<div className="h-10 w-10 rounded-md bg-yellow-100/30 backdrop-blur-sm flex items-center justify-center">
					<div className="h-6 w-8 bg-yellow-300/80 rounded-sm"></div>
				</div>

				{showBalance && (
					<div className="absolute top-4 right-5 text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 ml-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</div>
				)}
			</div>

			{showBalance && (
				<div className="mt-8 text-white">
					<p className="text-sm font-light opacity-80">Your Balance</p>
					<h2 className="text-2xl font-bold">
						$
						{card.balance.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</h2>
				</div>
			)}

			<div className="absolute bottom-5 left-5 text-white">
				<p className="text-xs opacity-80">{card.number}</p>
				<div className="flex justify-between mt-2">
					<span className="text-xs opacity-80">{card.cardHolder}</span>
					<span className="text-xs opacity-80 ml-8">{card.expiryDate}</span>
				</div>
			</div>

			<div className="absolute bottom-5 right-5">{getCardIcon()}</div>

			<div className="absolute right-0 top-0 opacity-20">
				<svg
					width="100"
					height="100"
					viewBox="0 0 100 100"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<circle cx="80" cy="20" r="50" fill="white" fillOpacity="0.2" />
				</svg>
			</div>
			<div className="absolute left-10 top-20 opacity-10">
				<svg
					width="60"
					height="60"
					viewBox="0 0 60 60"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<circle cx="30" cy="30" r="30" fill="white" fillOpacity="0.2" />
				</svg>
			</div>
		</div>
	);
};

export default CreditCard;
