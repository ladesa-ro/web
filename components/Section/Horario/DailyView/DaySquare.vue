<script setup>
defineProps({
	active: {
		type: Boolean,
	},
	dayWeek: {
		type: String,
	},
	dayMonth: {
		type: String,
	},
});
</script>

<template>
	<div
		class="flex-1 flex flex-col cursor-pointer justify-center items-center gap-2 rounded-[10px] border-2 border-[#118D3B] p-4 max-w-28 max-h-28"
		:class="{ active: active }"
	>
		<!--w-[85px] h-[75px] // w-[106.25px] h-[100px]-->
		<p
			class="border-b-2 border-b-[#118D3B] p-0 pb-[5px] font-[600] text-[#118D3B]"
		>
			{{ dayWeek }}
		</p>
		<p class="font-[600] text-[#118D3B]">
			{{ dayMonth }}
		</p>
	</div>
</template>

<style scoped>
.active {
	background-color: #118d3b;
}

div.active p {
	color: white;
}

div.active p:first-child {
	border-bottom-color: white;
}
</style>
