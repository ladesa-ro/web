<script lang="ts" setup>
</script>

<template>
	<v-container>
		<div class="container">
			<div>
				<!-- Content -->
				<div class="grid grid-cols-2 gap-4 justify-center items-center">
					<PagesDashboardCalendarMonth/>

					<v-card class="-month mx-auto rounded-lg" max-width="500px">
						
					</v-card>
				</div>
			</div>
		</div>
	</v-container>
</template>

<style scoped>
.container {
	margin: 0 auto;
	max-width: 89%;
}

.container-header {
	padding: 50px 0;

	margin: 0 auto;
	display: flex;

	gap: 1rem;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.container-header-actions {
	flex-shrink: 0;

	display: flex;
	align-items: center;
}
</style>
