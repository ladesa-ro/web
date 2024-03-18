<template>
	<v-footer :height="65" class="footbar" app>
	  <v-container>
		<v-row justify="center">
		  <v-col v-for="link in links" :key="link.title" class="link">
			<nuxt-link :to="link.to">
			  <img :src="link.icon" :width="link.width" class="iconBefore" alt="" />
			  <span>{{ link.title }}</span>
			</nuxt-link>
		  </v-col>
		</v-row>
	  </v-container>
	</v-footer>
  </template>
  
  <script setup>
  import calendarioIconWhite from "~/assets/icons/calendarioIconWhite.svg";
  import configuracoesIconWhite from "~/assets/icons/configuracoesIconWhite.svg";
  import disciplinaIconWhite from "~/assets/icons/disciplinaIconWhite.svg";
  import inicioIconWhite from "~/assets/icons/inicioIconWhite.svg";
  import outrosIconWhite from "~/assets/icons/outrosIconWhite.svg";
  import perfilIconWhite from "~/assets/icons/perfilIconWhite.svg";
  import turmasIconWhite from "~/assets/icons/turmasIconWhite.svg";
  import vinculoIconWhite from "~/assets/icons/vinculosIconWhite.svg";
  import cursosIconWhite from "~/assets/icons/cursoIconWhite.svg";
  import usuariosIconWhite from "~/assets/icons/usuariosIconWhite.svg";
	
  const links = [
	{
	  icon: inicioIconWhite,
	  to: "/",
	  width: "24",
	},
	{
	  icon: perfilIconWhite,
	  to: "/perfil",
	  width: "24",
	},
	{
	  icon: calendarioIconWhite,
	  to: "/calendario",
	  width: "24",
	},
	{
	  icon: usuariosIconWhite,
	  to: '/dashboard/usuarios',
	  width: "24",
	},
	{
	  icon: outrosIconWhite,
	  to: '/outros',
	  width: "24",
	},
  ];
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
  
  .iconBefore {
	margin-right: 20px;
  }
  
  span {
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	font-size: 15px;
  }
  
  .link {
	color: #ffffff;
	text-decoration: none;
  }
  
  .footbar {
	background-color: #39A048; /* Ajuste a cor de fundo conforme necessário */
	color: #ffffff; /* Ajuste a cor do texto conforme necessário */
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	border-top: 1px solid rgba(0, 0, 0, 0.12);
	z-index: 1000;
  }
  </style>
  