<template>
	<v-navigation-drawer
		app
		:absolute="true"
		:clipped="true"
		:permanent="true"
		class="navigation-drawer"
		:rail-width="drawer ? null : 64"
		:rail="!drawer"
		:expand-on-hover="!drawer"
	>
		<v-list
			class="flex-column justify-space-between h-full"
			style="height: 100%"
		>
			<v-list-item-group class="">
				<nuxt-link
					class="text-white"
					v-for="(link, index) in links"
					:key="link.title"
					:to="link.to"
				>
					<v-list-item
						:class="{ active: $route.path === link.to }"
						class="mt-3 hover:bg-green-600"
					>
						<template v-slot:prepend>
							<img
								:src="link.icon"
								:width="link.width"
								class="mr-4"
								alt=""
							/>
						</template>
						<v-list-item-title class="link">
							<span> {{ link.title }}</span>
						</v-list-item-title>
					</v-list-item>
				</nuxt-link>
			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

import calendarioIconWhite from '~/assets/icons/calendarioIconWhite.svg';
import configuracoesIconWhite from '~/assets/icons/configuracoesIconWhite.svg';
import disciplinaIconWhite from '~/assets/icons/disciplinaIconWhite.svg';
import inicioIconWhite from '~/assets/icons/inicioIconWhite.svg';
import perfilIconWhite from '~/assets/icons/perfilIconWhite.svg';
import turmasIconWhite from '~/assets/icons/turmasIconWhite.svg';
import vinculoIconWhite from '~/assets/icons/vinculosIconWhite.svg';
import cursosIconWhite from '~/assets/icons/cursoIconWhite.svg';
import usuariosIconWhite from '~/assets/icons/usuariosIconWhite.svg';

const links = [
	{
		title: 'Início',
		icon: inicioIconWhite,
		to: '/',
		width: '24',
	},
	{
		title: 'Turmas',
		icon: turmasIconWhite,
		to: '/dashboard/turmas',
		width: '24',
	},
	{
		title: 'Disciplinas',
		icon: disciplinaIconWhite,
		to: '/dashboard/disciplinas',
		width: '24',
	},
	{
		title: 'Perfil',
		icon: perfilIconWhite,
		to: '/perfil',
		width: '24',
	},
	{
		title: 'Vínculos',
		icon: vinculoIconWhite,
		to: '/vinculos',
		width: '24',
	},
	{
		title: 'Calendário',
		icon: calendarioIconWhite,
		to: '/calendario',
		width: '24',
	},
	{
		title: 'Usuários',
		icon: usuariosIconWhite,
		to: '/dashboard/usuarios',
		width: '24',
	},
	{
		title: 'Cursos',
		icon: cursosIconWhite,
		to: '/dashboard/cursos',
		width: '24',
	},
	{
		title: 'Configurações',
		icon: configuracoesIconWhite,
		to: '/configuracoes',
		width: '24',
	},
];

const drawer = ref(false);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

span {
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
	font-size: 15px;
}

.navigation-drawer {
	@apply bg-green-700 text-white caret-white;
}

.active {
	@apply bg-green-600 rounded-lg;
}
</style>
