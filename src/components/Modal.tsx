import React from 'react';

interface BaseModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex justify-center items-center z-50">
			<div
				className="absolute inset-0 bg-black opacity-50"
				onClick={onClose}></div>

			<div className="bg-white rounded-lg p-6 w-11/12 max-w-sm relative z-10">
				{children}
			</div>
		</div>
	);
};

export default BaseModal;
