<template>
	<aside class="details card">
		<div class="details-header">
			<h2>{{ transfer.transactionId }}</h2>
			<button @click="emit('close')">Close</button>
		</div>

		<StatusBadge :status="transfer.status" />

		<ul class="details-list">
			<li><b>Sender:</b> {{ transfer.senderName }} ({{ transfer.senderBank }})</li>
			<li><b>Receiver:</b> {{ transfer.receiverName }} ({{ transfer.receiverBank }})</li>
			<li><b>Route:</b> {{ transfer.sourceCountry }} -> {{ transfer.destinationCountry }}</li>
			<li>
				<b>Source amount:</b> {{ formatMoney(transfer.sourceAmount, transfer.sourceCurrency) }}
			</li>
			<li>
				<b>Destination amount:</b>
				{{ formatMoney(transfer.destinationAmount, transfer.destinationCurrency) }}
			</li>
			<li><b>Fee:</b> {{ formatMoney(transfer.feeAmount, transfer.sourceCurrency) }}</li>
			<li><b>Channel:</b> {{ transfer.channel }}</li>
			<li><b>Risk score:</b> {{ transfer.riskScore }}</li>
			<li><b>Created:</b> {{ formatDate(transfer.createdAt) }}</li>
			<li><b>Updated:</b> {{ formatDate(transfer.updatedAt) }}</li>
			<li><b>Note:</b> {{ transfer.note }}</li>
			<li v-if="transfer.failureReason"><b>Failure reason:</b> {{ transfer.failureReason }}</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
import type { Transfer } from '~/types/transfer';

defineProps<{
	transfer: Transfer;
}>();

const emit = defineEmits<{
	close: [];
}>();

const formatMoney = (value: number, currency: string) => {
	return `${currency} ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
};

const formatDate = (value: string) => {
	return new Date(value).toLocaleString('en-GB');
};
</script>

<style scoped lang="scss">
.card {
	background: var(--card);
	border: 1px solid var(--line);
	border-radius: 12px;
	padding: 1rem;
}

.details {
	position: sticky;
	bottom: 1rem;
}

.details-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.75rem;
}

.details-header h2 {
	margin: 0;
	font-size: 1rem;
}

.details-header button {
	border: 1px solid var(--line);
	border-radius: 8px;
	height: 2.5rem;
	padding: 0 0.75rem;
	background: #fff;
}

.details-list {
	list-style: none;
	margin: 0.75rem 0 0;
	padding: 0;
	display: grid;
	gap: 0.45rem;
}
</style>
