<script setup lang="ts">
import type { ISidebarItem } from './ISidebarItem';

const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
}) as { item: ISidebarItem };

const { item } = toRefs(props);
</script>

<template>
	<nuxt-link
		:to="item.to"
		:key="item.title"
		class="text-white"
		v-if="item.type === 'link'"
	>
		<v-list-item
			class="!mt-0 hover:bg-green-600"
			:class="{ active: $route.path === item.to }"
		>
			<template v-slot:prepend>
				<img
					:width="24"
					class="mr-4 -icon-white"
					:src="item.icon"
					alt="Ícone da funcionalidade."
				/>
			</template>

			<v-list-item-title class="link">
				<span>{{ item.title }}</span>
			</v-list-item-title>
		</v-list-item>
	</nuxt-link>
</template>
