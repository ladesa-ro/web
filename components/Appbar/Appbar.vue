<script setup lang="ts">
// import profilePicture from '~/assets/icons/profilePicture.svg';

const hamburgerActive = defineModel({
	required: true,
	type: Boolean,
});

function toggleHamburger() {
	hamburgerActive.value = !hamburgerActive.value;
}
</script>

<template>
	<div class="flex w-full items-center">
		<div @click="toggleHamburger">
			<IconsIconMenuOpen class="pa-3 w-[60px]" v-if="hamburgerActive" />
			<IconsIconHamburger class="pa-3 w-[60px]" v-else />
		</div>

		<div
			class="flex items-center gap-3 cursor-pointer rounded-lg inset-y-0 w-29 bg-[#EBF8EF] pl-3 pr-6 py-2"
		>
			<VImg :width="48" :height="48" class="rounded-full bg-emerald-500" />

			<div class="">
				<p class="font-semibold">Danilo Escudero</p>
				<p class="font-normal">DAPE</p>
			</div>
		</div>

		<div class="flex-1"></div>

		<IconsIconNotifications
			class="cursor-pointer pa-2 mr-3 w-[50px] h-[50px]"
		/>

		<LogoSisghaBolder class="mr-8 w-40 hidden sm:block" />
	</div>
</template>
