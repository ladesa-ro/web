export const showIntervalos = ref(true);

export const toggleShowIntervalos = () =>
  (showIntervalos.value = !showIntervalos.value);

export const defineShowIntervalosValue = (bool: boolean) =>
  (showIntervalos.value = bool);
