<template>
	<div class="pagination">
		<button :disabled="currentPage === 1" @click="emit('previous')">Prev</button>
		<span>Page {{ currentPage }} of {{ totalPages }} • {{ totalRecords }} records</span>
		<button :disabled="currentPage === totalPages" @click="emit('next')">Next</button>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	currentPage: number;
	totalPages: number;
	totalRecords: number;
}>();

const emit = defineEmits<{
	previous: [];
	next: [];
}>();
</script>

<style scoped lang="scss">
.pagination {
	margin-top: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.pagination button {
	border: 1px solid var(--line);
	border-radius: 8px;
	height: 2.5rem;
	padding: 0 0.75rem;
	background: #fff;
}

@media (max-width: 900px) {
	.pagination {
		gap: 0.75rem;
		flex-direction: column;
	}
}
</style>
