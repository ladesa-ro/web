<script setup lang="ts">
import { ref } from 'vue';
import IconAdd from '~/components/Icons/IconAdd.vue';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';

const show = ref(false);

const openConfirm = () => {
	show.value = true;
};

const closeConfirm = () => {
	show.value = false;
};
</script>

<template>
	<v-container
		>
		<div class="container mx-auto max-w-[89%]">
				<div
					class="flex container-header mx-auto justify-between items-center  mb-5 gap-4 px-3"
				>
					<SearchBar />
          <div class="mr-[80px]">
            <IconAdd @click="openConfirm" />
          </div>
				</div>

				<div>
					<PagesDashboardUsersModalNewUser
						v-if="show"
						@close="closeConfirm"
					/>
				</div>

				<div>
					<PagesDashboardUsersUsersList />
				</div>
			</div>
	</v-container>
</template>
<style scoped>
.container-header {
	padding: 50px 0;
}
</style>