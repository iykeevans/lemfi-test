<template>
	<section class="toolbar card">
		<h1>Transfers Monitoring Dashboard</h1>
		<p>Operational view for money transfers and exceptions.</p>

		<div class="toolbar-controls">
			<input
				:value="props.modelValueSearchTerm"
				type="text"
				placeholder="Search by transaction id, customer, bank, corridor..."
				@input="onSearchInput"
			/>

			<select :value="props.modelValueSelectedStatus" @change="onStatusChange">
				<option v-for="status in props.statusOptions" :key="status" :value="status">
					{{ status }}
				</option>
			</select>

			<select :value="props.modelValuePerPage" @change="onPerPageChange">
				<option :value="10">10 rows</option>
				<option :value="25">25 rows</option>
				<option :value="50">50 rows</option>
			</select>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { TransferStatusFilter } from '~/types/transfer';

const props = defineProps<{
	modelValueSearchTerm: string;
	modelValueSelectedStatus: TransferStatusFilter;
	modelValuePerPage: number;
	statusOptions: TransferStatusFilter[];
}>();

const emit = defineEmits<{
	'update:modelValueSearchTerm': [value: string];
	'update:modelValueSelectedStatus': [value: TransferStatusFilter];
	'update:modelValuePerPage': [value: number];
}>();

const onSearchInput = (event: Event) => {
	emit('update:modelValueSearchTerm', (event.target as HTMLInputElement).value);
};

const onStatusChange = (event: Event) => {
	emit(
		'update:modelValueSelectedStatus',
		(event.target as HTMLSelectElement).value as TransferStatusFilter,
	);
};

const onPerPageChange = (event: Event) => {
	emit('update:modelValuePerPage', Number((event.target as HTMLSelectElement).value));
};
</script>

<style scoped lang="scss">
.card {
	background: var(--card);
	border: 1px solid var(--line);
	border-radius: 12px;
	padding: 1rem;
}

.toolbar h1 {
	margin: 0;
}

.toolbar p {
	margin: 0.25rem 0 1rem;
	color: var(--muted);
}

.toolbar-controls {
	display: grid;
	grid-template-columns: minmax(220px, 1fr) 180px 120px;
	gap: 0.75rem;
}

.toolbar-controls input,
.toolbar-controls select {
	border: 1px solid var(--line);
	border-radius: 8px;
	height: 2.5rem;
	padding: 0 0.75rem;
	background: #fff;
}

@media (max-width: 900px) {
	.toolbar-controls {
		grid-template-columns: 1fr;
	}
}
</style>
