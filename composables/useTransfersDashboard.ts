import type {
  Transfer,
  TransferApiRow,
  TransferStatus,
  TransferStatusFilter,
} from '~/types/transfer';

export const STATUS_OPTIONS: TransferStatusFilter[] = [
  'all',
  'pending',
  'processing',
  'completed',
  'failed',
  'flagged',
];

const STATUS_CARDS: { key: TransferStatus; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'completed', label: 'Completed' },
  { key: 'failed', label: 'Failed' },
  { key: 'flagged', label: 'Flagged' },
];

const normalizeTransfer = (row: TransferApiRow): Transfer => {
  const searchIndex = [
    row.transaction_id,
    row.sender_name,
    row.receiver_name,
    row.source_country,
    row.destination_country,
    row.corridor,
    row.sender_bank,
    row.receiver_bank,
    row.channel,
  ]
    .join(' ')
    .toLowerCase();

  return {
    id: row.id,
    transactionId: row.transaction_id,
    senderName: row.sender_name,
    receiverName: row.receiver_name,
    sourceCountry: row.source_country,
    destinationCountry: row.destination_country,
    corridor: row.corridor,
    sourceAmount: row.source_amount,
    sourceCurrency: row.source_currency,
    destinationAmount: row.destination_amount,
    destinationCurrency: row.destination_currency,
    feeAmount: row.fee_amount,
    status: row.status,
    channel: row.channel,
    riskScore: row.risk_score,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    failureReason: row.failure_reason,
    note: row.note,
    senderBank: row.sender_bank,
    receiverBank: row.receiver_bank,
    createdAtMs: new Date(row.created_at).getTime(),
    searchIndex,
  };
};

export const useTransfersDashboard = (rows: TransferApiRow[]) => {
  const transfers = ref<Transfer[]>(rows.map(normalizeTransfer));
  const searchTerm = ref('');
  const selectedStatus = ref<TransferStatusFilter>('all');
  const perPage = ref(25);
  const currentPage = ref(1);
  const selectedTransfer = ref<Transfer | null>(null);

  const normalizedSearchTerm = computed(() => searchTerm.value.trim().toLowerCase());

  const searchMatchedTransfers = computed(() => {
    if (!normalizedSearchTerm.value) {
      return transfers.value;
    }

    return transfers.value.filter((item) => item.searchIndex.includes(normalizedSearchTerm.value));
  });

  const filteredTransfers = computed(() => {
    const source =
      selectedStatus.value === 'all'
        ? searchMatchedTransfers.value
        : searchMatchedTransfers.value.filter((item) => item.status === selectedStatus.value);

    return [...source].sort((a, b) => b.createdAtMs - a.createdAtMs);
  });

  const statusCounts = computed(() => {
    const counts: Record<TransferStatus, number> = {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      flagged: 0,
    };

    for (const transfer of searchMatchedTransfers.value) {
      counts[transfer.status] += 1;
    }

    return counts;
  });

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredTransfers.value.length / perPage.value)),
  );

  const paginatedTransfers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredTransfers.value.slice(start, start + perPage.value);
  });

  watch([searchTerm, selectedStatus, perPage], () => {
    currentPage.value = 1;
  });

  watch(totalPages, (value) => {
    if (currentPage.value > value) {
      currentPage.value = value;
    }
  });

  const openDetails = (transfer: Transfer) => {
    selectedTransfer.value = transfer;
  };

  const closeDetails = () => {
    selectedTransfer.value = null;
  };

  return {
    closeDetails,
    currentPage,
    filteredTransfers,
    openDetails,
    paginatedTransfers,
    perPage,
    searchTerm,
    selectedStatus,
    selectedTransfer,
    statusCards: STATUS_CARDS,
    statusCounts,
    statusOptions: STATUS_OPTIONS,
    totalPages,
  };
};
