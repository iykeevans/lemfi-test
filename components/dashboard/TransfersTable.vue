<template>
	<table>
		<thead>
			<tr>
				<th>Transaction</th>
				<th>Parties</th>
				<th>Corridor</th>
				<th>Amount</th>
				<th>Status</th>
				<th>Risk</th>
				<th>Created</th>
			</tr>
		</thead>
		<tbody v-if="rows.length">
			<tr
				v-for="transfer in rows"
				:key="transfer.id"
				class="clickable"
				@click="emit('select', transfer)"
			>
				<td>{{ transfer.transactionId }}</td>
				<td>
					<div>{{ transfer.senderName }}</div>
					<small>to {{ transfer.receiverName }}</small>
				</td>
				<td>{{ transfer.sourceCountry }} -> {{ transfer.destinationCountry }}</td>
				<td>
					{{ formatMoney(transfer.sourceAmount, transfer.sourceCurrency) }}
				</td>
				<td>
					<StatusBadge :status="transfer.status" />
				</td>
				<td>{{ transfer.riskScore }}</td>
				<td>{{ formatDate(transfer.createdAt) }}</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr>
				<td colspan="7" class="empty-state">No transfers match the current filters.</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import type { Transfer } from '~/types/transfer';

defineProps<{
	rows: Transfer[];
}>();

const emit = defineEmits<{
	select: [transfer: Transfer];
}>();

const formatMoney = (value: number, currency: string) => {
	return `${currency} ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
};

const formatDate = (value: string) => {
	return new Date(value).toLocaleString('en-GB');
};
</script>

<style scoped lang="scss">
table {
	width: 100%;
	border-collapse: collapse;
}

th,
td {
	padding: 0.75rem;
	border-bottom: 1px solid var(--line);
	text-align: left;
	font-size: 0.92rem;
}

th {
	font-size: 0.78rem;
	text-transform: uppercase;
	color: var(--muted);
}

small {
	color: var(--muted);
}

.clickable {
	cursor: pointer;
}

.clickable:hover {
	background: #f9fcff;
}

.empty-state {
	text-align: center;
	color: var(--muted);
	padding: 2rem 1rem;
}
</style>
