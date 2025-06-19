import type { Transaction } from '$lib/models/TransactionModel';

export class TransactionController {
	aggregateType(transactions: Transaction[]) {
		const trashData: Record<string, { amount: number; unit: string }> = {};

		transactions.forEach(({ trash_type, trash_amount, unit }) => {
			trashData[trash_type] = trashData[trash_type] || { amount: 0, unit };
			trashData[trash_type].amount += trash_amount;
		});

		return trashData;
	}

	aggregateUnit(transactions: Transaction[]) {
		const trashAmount: Record<string, number> = {};

		transactions.forEach(({ unit, trash_amount }) => {
			trashAmount[unit] = trashAmount[unit] || 0;
			trashAmount[unit] += trash_amount;
		});

		return trashAmount;
	}
}
