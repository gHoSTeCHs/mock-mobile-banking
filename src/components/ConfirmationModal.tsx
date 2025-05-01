import React from 'react';
import { images } from '../constants';

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	amount: number;
	recipientName: string;
	recipientAvatar?: string;
	note?: string;
	isProcessing: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	amount,
	recipientName,
	recipientAvatar,
	note,
	isProcessing,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
				<h2 className="text-lg font-semibold mb-4 text-center">
					Confirm Transfer
				</h2>

				<div className="flex flex-col items-center mb-4">
					<img
						src={recipientAvatar || images.defaultAvatar}
						alt={recipientName}
						className="w-16 h-16 rounded-full mb-2 object-cover"
					/>
					<p className="font-medium">To: {recipientName}</p>
				</div>

				<div className="text-center mb-4">
					<p className="text-gray-600">Amount</p>
					<p className="text-2xl font-bold">
						$
						{amount.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</p>
				</div>

				{note && (
					<div className="text-center mb-4">
						<p className="text-gray-600">Note</p>
						<p className="text-sm italic">{note}</p>
					</div>
				)}

				<div className="flex justify-between space-x-3">
					<button
						className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50"
						onClick={onClose}
						disabled={isProcessing}
						title="Cancel Button">
						Cancel
					</button>
					<button
						className={`flex-1 py-2 px-4 rounded-lg text-white ${
							isProcessing ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
						}`}
						onClick={onConfirm}
						disabled={isProcessing}
						title="Confirm Button">
						{isProcessing ? (
							<div className="flex justify-center items-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Processing...
							</div>
						) : (
							'Confirm'
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
