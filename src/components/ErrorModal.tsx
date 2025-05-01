import React from 'react';

interface ErrorModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
	isOpen,
	onClose,
	message,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex justify-center items-center z-50">
			<div
				className="absolute inset-0 bg-black opacity-50"
				onClick={onClose}></div>

			<div className="bg-white rounded-lg p-6 w-11/12 max-w-sm text-center relative z-10">
				<div className="mb-4">
					<svg
						className="h-12 w-12 text-red-500 mx-auto"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h2 className="text-lg font-semibold mb-2">Error!</h2>
				<p className="text-gray-600 mb-4">{message}</p>
				<button
					className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
					onClick={onClose}
					title="Close Button">
					OK
				</button>
			</div>
		</div>
	);
};

export default ErrorModal;
