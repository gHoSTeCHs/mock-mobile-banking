export interface User {
	id: string;
	name: string;
	avatar: string;
}

export interface Card {
	id: string;
	number: string;
	expiryDate: string;
	cardHolder: string;
	type: 'mastercard' | 'visa';
	balance: number;
	color: 'blue' | 'dark-blue';
}

export interface Transaction {
	id: string;
	title: string;
	amount: number;
	date: Date;
	category: 'entertainment' | 'food' | 'investment' | 'transfer' | 'other';
	recipient?: string;
	status: 'completed' | 'processing' | 'failed';
	notes?: string;
}

export interface ExpenseCategory {
	category: string;
	amount: number;
	color: string;
}
