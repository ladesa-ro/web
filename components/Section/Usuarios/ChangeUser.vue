<script setup lang="ts"></script>

<template>
	<div class="m-12 flex flex-col justify-between items-center w-[19.75rem] h-[18.125rem] px-8 py-6 border-2 border-[#9AB69E] rounded-lg">
		<span class="font-[600]">Alternar versão</span>
		
		<section class="flex flex-row justify-between w-full">
			<div class="flex flex-col justify-end items-center w-28 h-36 border-2 rounded-lg border-[#9AB69E] px-0 py-8 gap-2 text-center cursor-pointer">
				<IconsUser/>
				<p class="font-[600]">DAPE</p>
			</div>

			<div class="flex flex-col justify-end items-center w-28 h-36 border-2 rounded-lg border-[#118D3B] px-0 py-8 gap-2 bg-[#118D3B] text-center cursor-pointer">
				<IconsUserTeacher class="-icon-white"/>
				<p class="font-[600] text-white">Professor</p>
			</div>
		</section>
		
		<span class="flex flex-row justify-between min-w-24 font-[600] cursor-pointer">
			Cancelar
			<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.89957 8.62899L9.10044 1.37097M9.10044 8.62899L1.89957 1.37097" stroke="black" stroke-width="1.83283" stroke-linecap="round"/>
			</svg>
		</span>
	</div>
</template>

<style scoped></style> <!--ainda irei adicionar estilo de checked-->