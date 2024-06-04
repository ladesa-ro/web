<script setup lang="ts">
import { type Vinculo } from './FormUser';

const props = defineProps<{ vinculo: Vinculo }>();

const { campus, query } = await useApiCampusFindOne(props.vinculo.campus.id);

await query.suspense();
</script>
<template>
	<v-expansion-panel :value="vinculo.campus.id">
		<v-expansion-panel-title
			expand-icon="mdi-menu-down"
			class="font-medium"
		>
			{{ campus?.apelido }}
		</v-expansion-panel-title>

		<v-expansion-panel-text>
			<section class="flex gap-6 justify-between">
				<div>
					<span>Matutino</span>
					<v-checkbox
						hide-details
						density="compact"
						color="success"
						label="Manhã"
						v-for="i in 7"
						name="disponibilidade"
					/>
				</div>
				<div>
					<span>Vespertino</span>
					<v-checkbox
						hide-details
						density="compact"
						color="success"
						label="Manhã"
						v-for="i in 7"
						name="disponibilidade"
					/>
				</div>
				<div>
					<span>Noturno</span>
					<v-checkbox
						hide-details
						density="compact"
						color="success"
						label="Manhã"
						v-for="i in 7"
						name="disponibilidade"
					/>
				</div>
			</section>
		</v-expansion-panel-text>
	</v-expansion-panel>
</template>
