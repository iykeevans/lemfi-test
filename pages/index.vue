<template>
  <main class="container dashboard">
    <TransfersToolbar
      :model-value-search-term="routeSearchTerm"
      :model-value-selected-status="routeSelectedStatus"
      :model-value-per-page="routePerPage"
      :status-options="statusOptions"
      @update:model-value-search-term="handleSearchTermUpdate"
      @update:model-value-selected-status="handleSelectedStatusUpdate"
      @update:model-value-per-page="handlePerPageUpdate"
    />

    <TransfersStatusCards :status-cards="statusCards" :status-counts="statusCounts" />

    <section class="table-wrap card">
      <TransfersTable :rows="paginatedTransfers" @select="openDetails" />

      <TransfersPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-records="filteredTransfers.length"
        @previous="currentPage = currentPage - 1"
        @next="currentPage = currentPage + 1"
      />
    </section>

    <TransferDetailsPanel
      v-if="selectedTransfer"
      :transfer="selectedTransfer"
      @close="closeDetails"
    />
  </main>
</template>

<script setup lang="ts">
import transfersJson from '~/data/transfers.json';
import { useTransfersDashboard } from '~/composables/useTransfersDashboard';
import type { TransferApiRow, TransferStatusFilter } from '~/types/transfer';

const {
  closeDetails,
  currentPage,
  filteredTransfers,
  openDetails,
  paginatedTransfers,
  perPage,
  searchTerm,
  selectedStatus,
  selectedTransfer,
  statusCards,
  statusCounts,
  statusOptions,
  totalPages,
} = useTransfersDashboard(transfersJson as TransferApiRow[]);
const {
  routeSearchTerm,
  routeSelectedStatus,
  routePerPage,
  handleSearchTermUpdate,
  handleSelectedStatusUpdate,
  handlePerPageUpdate,
} = useTransferFilterQuerySync(searchTerm, selectedStatus, perPage);
</script>

<style scoped lang="scss">
.dashboard {
  display: grid;
  gap: 1rem;
}

.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1rem;
}

.table-wrap {
  overflow-x: auto;
}
</style>
