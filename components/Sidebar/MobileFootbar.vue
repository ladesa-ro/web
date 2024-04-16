<template>
	<v-footer :height="65" class="footbar" app>
		<v-container>
			<v-row justify="center">
				<v-col
					v-for="(link, index) in links"
					:key="index"
					class="link"
					:class="{ active: $route.path === link.to }"
				>
					<nuxt-link :to="link.to" class="link-container">
						<img
							:src="link.icon"
							:width="link.width"
							class="iconBefore"
							alt=""
						/>
						<span>{{ link.title }}</span>
					</nuxt-link>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script setup>
import calendarioIconWhite from '~/assets/icons/calendarioIconWhite.svg';
import inicioIconWhite from '~/assets/icons/inicioIconWhite.svg';
import outrosIconWhite from '~/assets/icons/outrosIconWhite.svg';
import perfilIconWhite from '~/assets/icons/perfilIconWhite.svg';
import usuariosIconWhite from '~/assets/icons/usuariosIconWhite.svg';

const links = [
	{
		icon: inicioIconWhite,
		to: '/',
		width: '24',
	},
	{
		icon: perfilIconWhite,
		to: '/',
		width: '24',
	},
	{
		icon: calendarioIconWhite,
		to: '/',
		width: '24',
	},
	{
		icon: usuariosIconWhite,
		to: '/',
		width: '24',
	},
	{
		icon: outrosIconWhite,
		to: '/',
		width: '24',
	},
];
</script>

<style scoped>
.iconBefore {
	margin-right: 10px; /* Ajusta o espaçamento entre o ícone e o texto */
	width: 32px;
}

span {
	font-family: 'Poppins', sans-serif;
	font-weight: 600;
	font-size: 18px;
}

.link {
	color: #ffffff;
	text-decoration: none;
	padding: 10px 0;
	display: flex; /* Adiciona display flex para permitir alinhamento flexível */
	align-items: center; /* Centraliza verticalmente os itens filhos */
	justify-content: center; /* Centraliza horizontalmente os itens filhos */
}

.link-container {
	display: flex;
	align-items: center;
	justify-content: center;
}

.footbar {
	background-color: #39a048;
	color: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: 1px solid rgba(0, 0, 0, 0.12);
	z-index: 1000;
}

.active {
	background-color: #1bba47;
	border-radius: 10px;
}

.active .link {
	color: #ffffff;
}

.link img {
	vertical-align: middle; /* Garante que o ícone esteja centralizado verticalmente */
	margin-left: auto; /* Centraliza horizontalmente a imagem dentro do contêiner */
	margin-right: auto;
}
</style>
