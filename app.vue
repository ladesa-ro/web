<script setup>
const { isDark } = useCustomTheme();
</script>

<template>
	<Head>
		<Link rel="preconnect" href="https://fonts.googleapis.com" />
		<Link
			rel="preconnect"
			href="https://fonts.gstatic.com"
			crossorigin=""
		/>
		<Link
			href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
			rel="stylesheet"
		/>
	</Head>

	<div
		class="app"
		:class="isDark ? 'app-color-mode-dark' : 'app-color-mode-light'"
	>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
@import '~/assets/styles/themes/theme.css';
@import '~/assets/styles/fontePadrao.css';

body {
	font-family: 'Poppins', sans-serif;
}

img {
	display: block;
	max-width: 100%;
}

svg {
	max-width: 100%;
	height: auto;
	display: block;
}

.svg-fill-text path {
	fill: rgb(var(--sisgha-theme-text));
}

html {
	overflow: auto;
}
</style>
