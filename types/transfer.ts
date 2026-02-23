export type TransferStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'flagged';

export type TransferStatusFilter = 'all' | TransferStatus;

export interface TransferApiRow {
	id: number;
	transaction_id: string;
	sender_name: string;
	receiver_name: string;
	source_country: string;
	destination_country: string;
	corridor: string;
	source_amount: number;
	source_currency: string;
	destination_amount: number;
	destination_currency: string;
	fee_amount: number;
	status: TransferStatus;
	channel: string;
	risk_score: number;
	created_at: string;
	updated_at: string;
	failure_reason: string | null;
	note: string;
	sender_bank: string;
	receiver_bank: string;
}

export interface Transfer {
	id: number;
	transactionId: string;
	senderName: string;
	receiverName: string;
	sourceCountry: string;
	destinationCountry: string;
	corridor: string;
	sourceAmount: number;
	sourceCurrency: string;
	destinationAmount: number;
	destinationCurrency: string;
	feeAmount: number;
	status: TransferStatus;
	channel: string;
	riskScore: number;
	createdAt: string;
	updatedAt: string;
	failureReason: string | null;
	note: string;
	senderBank: string;
	receiverBank: string;
	createdAtMs: number;
	searchIndex: string;
}
