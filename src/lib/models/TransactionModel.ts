import type { User } from "./UserModel";

export interface Transaction {
	collectionId: string;
	collectionName: string;
	id: string;
	customer: string;
	expand: {customer: User}; 
	trash_type: string;
	trash_amount: number;
	unit: string;
	created: string;
	updated: string;
}
