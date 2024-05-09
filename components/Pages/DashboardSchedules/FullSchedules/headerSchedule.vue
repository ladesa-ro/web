<script setup>
import IconOthersItems from '~/components/Icons/IconOthersItems.vue';
</script>
<template>
	<div>
		<v-container class="flex justify-between mt-14">
			<span class="flex font-[600] items-center gap-2 ml-14">
				Março - day 06 a 11
				<IconsIconDownArrow class="cursor-pointer" />
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
