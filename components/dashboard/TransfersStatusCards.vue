<template>
	<section class="status-grid">
		<article v-for="status in statusCards" :key="status.key" class="status-card card">
			<span>{{ status.label }}</span>
			<strong>{{ statusCounts[status.key] }}</strong>
		</article>
	</section>
</template>

<script setup lang="ts">
import type { TransferStatus } from '~/types/transfer';

defineProps<{
	statusCards: { key: TransferStatus; label: string }[];
	statusCounts: Record<TransferStatus, number>;
}>();
</script>

<style scoped lang="scss">
.card {
	background: var(--card);
	border: 1px solid var(--line);
	border-radius: 12px;
	padding: 1rem;
}

.status-grid {
	display: grid;
	grid-template-columns: repeat(5, minmax(100px, 1fr));
	gap: 0.75rem;
}

.status-card {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.status-card span {
	font-size: 0.85rem;
	color: var(--muted);
}

.status-card strong {
	font-size: 1.25rem;
}

@media (max-width: 900px) {
	.status-grid {
		grid-template-columns: repeat(2, minmax(100px, 1fr));
	}
}
</style>
