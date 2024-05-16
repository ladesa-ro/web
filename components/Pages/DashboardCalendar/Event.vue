<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Dayjs config
dayjs.locale('pt-br');

// Interface and types
</script>

<template>
    <v-card class="-event mx-auto rounded-lg h-32 w-[500px]">
        <div class="w-2 h-full bg-green-700"></div>
		<v-container>
            
        </v-container>
	</v-card>
</template>

<style scoped>
.-event {
	border-top-left-radius: 0px !important;
	border-bottom-left-radius: 0px !important;
	border: solid 2px #9ab69e;
	box-shadow: none;
}
</style>
