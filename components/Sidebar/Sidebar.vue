<template>
	<v-navigation-drawer
		app
		absolute
		clipped="true"
		:mobile-breakpoint="0"
		disable-resize-watcher
		:temporary="isMobile"
		:permanent="!isMobile"
		class="navigation-drawer"
		:rail="!isMobile && !hamburgerActive"
		:model-value="isMobile ? hamburgerActive : true"
		:expand-on-hover="!isMobile && !hamburgerActive"
		@update:model-value="($val) => (hamburgerActive = $val)"
	>
		<v-list class="flex-column justify-space-between h-full">
			<v-list-item-group class="flex flex-col gap-3 h-full">
				<SidebarItem
					:key="index"
					:item="item"
					v-for="(item, index) in items"
				/>
			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { useMonitorSize } from '~/composables/monitor-size';

import calendarioIconWhite from '~/assets/icons/calendarioIconWhite.svg';
import configuracoesIconWhite from '~/assets/icons/configuracoesIconWhite.svg';
import cursosIconWhite from '~/assets/icons/cursoIconWhite.svg';
import disciplinaIconWhite from '~/assets/icons/disciplinaIconWhite.svg';
import inicioIconWhite from '~/assets/icons/inicioIconWhite.svg';
import outrosIconWhite from '~/assets/icons/outrosIconWhite.svg';
import perfilIconWhite from '~/assets/icons/perfilIconWhite.svg';
import turmasIconWhite from '~/assets/icons/turmasIconWhite.svg';
import usuariosIconWhite from '~/assets/icons/usuariosIconWhite.svg';
import vinculoIconWhite from '~/assets/icons/vinculosIconWhite.svg';
import type { ISidebarItem } from './ISidebarItem';

const items: ISidebarItem[] = [
	{
		type: 'link',
		title: 'Início',
		icon: inicioIconWhite,
		to: '/',
	},
	{
		type: 'link',
		title: 'Turmas',
		icon: turmasIconWhite,
		to: '/dashboard/turmas',
	},
	{
		type: 'link',
		title: 'Disciplinas',
		icon: disciplinaIconWhite,
		to: '/dashboard/disciplinas',
	},
	{
		type: 'link',
		title: 'Perfil',
		icon: perfilIconWhite,
		to: '/perfil',
	},
	{
		type: 'link',
		title: 'Diários',
		icon: vinculoIconWhite,
		to: '/vinculos',
	},
	{
		type: 'link',
		title: 'Calendário',
		icon: calendarioIconWhite,
		to: '/calendario',
	},
	{
		type: 'group',
		title: 'Outros',
		icon: outrosIconWhite,
		items: [
			{
				type: 'link',
				title: 'Usuários',
				icon: usuariosIconWhite,
				to: '/dashboard/usuarios',
			},
			{
				type: 'link',
				title: 'Cursos',
				icon: cursosIconWhite,
				to: '/dashboard/cursos',
			},
		],
	},
	{
		type: 'spacer',
	},
	{
		type: 'link',
		title: 'Configurações',
		icon: configuracoesIconWhite,
		to: '/configuracoes',
	},
];

const { isMobile } = useMonitorSize();

const hamburgerActive = defineModel({
	required: true,
	type: Boolean,
});
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
