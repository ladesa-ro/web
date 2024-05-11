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
	<v-list-group
		class="group hover:bg-green-600"
		:value="item.title"
		v-if="item.type === 'group'"
	>
		<template v-slot:activator="{ props }">
			<v-list-item v-bind="props" :ripple="false" class="!mt-0">
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
		</template>

		<v-divider class="my-2" />

		<div :style="{ '--indent-padding': '0px' }">
			<SidebarItem
				child
				:key="index"
				:item="item"
				v-for="(item, index) in item.items"
			/>
		</div>
	</v-list-group>
</template>

<style scoped>
.group :global(.v-list-group--open) {
	@apply bg-green-600;
}
</style>
