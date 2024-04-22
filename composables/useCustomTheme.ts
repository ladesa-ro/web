import { useDark, useToggle } from '@vueuse/core';

// composables/useCustomTheme.ts
export function useCustomTheme() {
	const { $vuetify } = useNuxtApp();

	const isDark = useDark({
		valueDark: 'dark',
		valueLight: 'light',
		initialValue: 'light',
		onChanged: (dark: boolean) => {
			$vuetify.theme.global.name.value = dark ? 'dark' : 'light';
		},
	});

	const toggle = useToggle(isDark);

	return { isDark, toggle };
}
