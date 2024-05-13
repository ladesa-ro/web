<script lang="ts" setup>
definePageMeta({
	layout: 'empty',
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: '/',
	},
});
</script>

<template>
	<SectionLogin />
</template>
