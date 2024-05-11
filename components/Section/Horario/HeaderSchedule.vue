<script setup>
import IconOthersItems from '~/components/Icons/IconOthersItems.vue';
</script>
<template>
	<div>
		<v-container class="flex justify-between mt-14">
			<span class="flex font-[600] items-center gap-2 ml-14">
				Março - day 06 a 11
				<IconsArrowIconArrow
					class="-rotate-90 cursor-pointer -icon-arrow fill-orange-500 text-orange-500"
				/>
			</span>
			<div class="flex cursor-pointer">
				<span
					class="flex gap-1 items-center border-2 border-[#118D3B] text-[#118D3B] bg-[#EBF8EF] p-3 font-[600] rounded-l-lg"
				>
					Horário geral
					<IconOthersItems />
				</span>
				<span
					class="flex gap-1 items-center border-2 border-[#9AB69E] p-3 font-[600] border-l-0 rounded-r-lg"
				>
					Horário do dia
					<IconsIconStopWatch />
				</span>
			</div>
		</v-container>
	</div>
</template>

<style scoped>
	/* Set color from "#118D3B" */
	.-icon-arrow {
		filter: invert(40%) sepia(20%) saturate(4635%) hue-rotate(110deg) brightness(94%) contrast(106%);
	}
</style>
