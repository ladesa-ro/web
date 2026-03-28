import { useMediaQuery } from '@vueuse/core';

export function useMonitorSize() {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return isMobile;
}
