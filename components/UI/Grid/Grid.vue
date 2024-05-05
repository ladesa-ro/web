<script setup lang="ts">
const props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},
});

const items = toRef(props, 'items');
</script>

<template>
	<v-container>
		<v-row v-if="items">
			<v-col
				sm="6"
				md="4"
				lg="4"
				cols="12"
				class="px-2"
				v-for="item in items"
			>
				<slot name="item" v-bind="{ item }"></slot>
			</v-col>
		</v-row>
	</v-container>
</template>
