export const useParsedResourceId = (resourceIdRef: MaybeRef<unknown>) => {
  const parsedResourceId = computed(() => {
    const resourceId = unref(resourceIdRef);

    if (typeof resourceId === "string" || typeof resourceId === "number") {
      const asNumber = parseInt(String(resourceId));

      if (!Number.isNaN(asNumber) && asNumber > 0) {
        return asNumber;
      }
    }

    return -1;
  });

  return parsedResourceId;
};
