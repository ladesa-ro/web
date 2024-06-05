<script setup lang="ts"></script>

<template>
	<v-container>
		<section class="m-0 p-0">
			<div class="flex flex-wrap gap-[36.59px]">
				<NuxtLink
					v-for="i in 10"
					:key="i"
					:to="`/usuarios/${i}`"
					class="grid bg w-[172px] h-[190px] border-2 border-[#9ab69e] rounded-lg no-underline p-0 m-0 overflow-hidden"
				>
					<span
						class="flex bg-[#F0F0F0] h-[100%] w-full rounded-t-lg items-center justify-center"
					>
						<IconsIconUser
							class="text-[#9ab69e] w-[42px] h-[42px]"
						/>
					</span>
					<div class="flex flex-col justify-center items-start ml-1 w-full" >
						<span class="flex font-bold text-sm items-center">Danilo Escudero
							<IconsIconEdit @click="teste" class="detail ml-6 w-[12px] h-[12px]"/>
					<div
						class="flex flex-col justify-center items-start ml-1 w-full"
					>
						<span class="flex font-bold text-sm items-center"
							>Danilo Escudero
							<IconsIconEdit class="ml-6" />
						</span>
						<span class="font-semibold text-[#9ab69e] text-sm"
							>Professor</span
						>
					</div>
				</NuxtLink>
			</div>
		</section>
	</v-container>
</template>

<style>
.nomesP {
	color: #000;
	font-size: 0.85rem;
	font-weight: 700;
}

.cargo {
	font-weight: 500;
	color: #9ab69e;
	font-size: 14px;
}

.bg {
	grid-template-rows: 65% auto;
}

.detail {
	cursor: pointer;
	z-index: 1000;
	margin-right: 10px;
}
</style>
