export const useInit = () => {
  const init = ref(false);

  onMounted(() => {
    init.value = true;
  });

  return init;
};
