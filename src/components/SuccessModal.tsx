import React from 'react';

interface SuccessModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
	isOpen,
	onClose,
	message,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-6 w-11/12 max-w-sm text-center">
				<div className="mb-4">
					<svg
						className="h-12 w-12 text-green-500 mx-auto"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h2 className="text-lg font-semibold mb-2">Success!</h2>
				<p className="text-gray-600 mb-4">{message}</p>
				<button
					className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					onClick={onClose}
					title="Close Button">
					OK
				</button>
			</div>
		</div>
	);
};

export default SuccessModal;
