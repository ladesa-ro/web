export const showIntervals = ref(true);

export const useShowIntervals = () => showIntervals;

export const useToggleShowIntervals = () =>
  (showIntervals.value = !showIntervals.value);
