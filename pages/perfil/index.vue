<script lang="ts" setup>
import { HeadTitleContext } from '~/infrastructure/HeadTitleContext';

useTitle(HeadTitleContext.DASHBOARD, 'Perfil');
</script>
<template>
	<div>
		<DashboardProfile />
	</div>
</template>
