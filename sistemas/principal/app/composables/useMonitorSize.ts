import { useMediaQuery } from '@vueuse/core';

export function useMonitorSize() {
  const { value: isMobile } = useMediaQuery('(max-width: 600px)');

  return {
    isMobile,
  };
}
