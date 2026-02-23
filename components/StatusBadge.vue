<template>
	<span class="badge" :class="statusClass">
		{{ status }}
	</span>
</template>

<script setup lang="ts">
import type { TransferStatus } from '~/types/transfer';

const props = defineProps<{
	status: TransferStatus;
}>();

const statusClass = computed(() => {
	if (props.status === 'completed') {
		return 'badge-success';
	}

	if (props.status === 'failed') {
		return 'badge-danger';
	}

	if (props.status === 'processing') {
		return 'badge-info';
	}

	if (props.status === 'flagged') {
		return 'badge-warning';
	}

	return 'badge-muted';
});
</script>

<style scoped lang="scss">
.badge {
	padding: 0.25rem 0.5rem;
	border-radius: 999px;
	font-size: 0.78rem;
	font-weight: 600;
	text-transform: capitalize;
}

.badge-success {
	background: #d8f3e8;
	color: #126149;
}

.badge-danger {
	background: #fde5e5;
	color: var(--danger);
}

.badge-info {
	background: #dff2ff;
	color: #1d4d72;
}

.badge-warning {
	background: #fff2d8;
	color: var(--warning);
}

.badge-muted {
	background: #e9eef4;
	color: #5a6777;
}
</style>
