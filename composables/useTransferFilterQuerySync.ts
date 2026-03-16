import type { TransferStatusFilter } from '~/types/transfer';
import { STATUS_OPTIONS } from '~/composables/useTransfersDashboard';
import { normalizeQueryEnum, normalizeQueryNumber, normalizeQueryString } from '~/utils';

export const useTransferFilterQuerySync = (
  searchTerm: Ref<string>,
  selectedStatus: Ref<TransferStatusFilter>,
  perPage: Ref<number>,
) => {
  const route = useRoute();
  const router = useRouter();

  const routeSearchTerm = computed(() =>
    normalizeQueryString(route.query.searchTerm, searchTerm.value),
  );

  const routeSelectedStatus = computed<TransferStatusFilter>(() =>
    normalizeQueryEnum(route.query.selectedStatus, STATUS_OPTIONS, selectedStatus.value ?? 'all'),
  );

  const routePerPage = computed(() =>
    normalizeQueryNumber(route.query.perPage, perPage.value, { min: 1, max: 100 }),
  );

  watch(
    routeSearchTerm,
    (value) => {
      searchTerm.value = value;
    },
    { immediate: true },
  );

  watch(
    routeSelectedStatus,
    (value) => {
      selectedStatus.value = value;
    },
    { immediate: true },
  );

  watch(
    routePerPage,
    (value) => {
      perPage.value = value;
    },
    { immediate: true },
  );

  const handleSearchTermUpdate = (value: string) => {
    searchTerm.value = value;
    router.replace({ query: { ...route.query, searchTerm: value } });
  };

  const handleSelectedStatusUpdate = (value: TransferStatusFilter) => {
    selectedStatus.value = value;
    router.replace({ query: { ...route.query, selectedStatus: value } });
  };

  const handlePerPageUpdate = (value: number) => {
    perPage.value = value;
    router.replace({ query: { ...route.query, perPage: value } });
  };

  return {
    routeSearchTerm,
    routeSelectedStatus,
    routePerPage,
    handleSearchTermUpdate,
    handleSelectedStatusUpdate,
    handlePerPageUpdate,
  };
};
