<script setup>
import profilePicture from '~/assets/icons/profilePicture.svg';
import { useMonitorSize } from '~/composables/monitor-size';

const { isMobile } = useMonitorSize();
const emit = defineEmits(['toggle-hamburger']);

function toggleHamburger() {
	emit('toggle-hamburger');
}
</script>

<template>
	<IconsIconHamburger @click="toggleHamburger" class="" />
	<LogoLogoSisgha v-if="!isMobile" class="pl-5" />
	<div
		class="userInfo absolute inset-y-0 w-29"
		:class="{ 'right-3': isMobile, 'right-12': !isMobile }"
	>
		<IconsIconNotifications class="" />
		<VImg
			:class="{ 'ml-9': !isMobile, 'ml-12': isMobile }"
			:src="profilePicture"
			width="52"
		></VImg>
		<div class="">
			<p class="font-semibold">Danilo Escudero</p>
			<p class="font-normal">Professor</p>
		</div>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

.userInfo {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}
</style>
