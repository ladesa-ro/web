<script setup></script>

<template>
	<v-form class="p-5 overflow-auto">
		<div class="modal">
			<span class="text-black font-bold text-[16px]">
				Cadastrar Usuário
			</span>

			<div class="flex flex-col gap-5">
				<VVSelectImage name="imagem" />

				<VVTextField
					v-model="nome"
					type="text"
					label="Nome"
					placeholder="Digite aqui"
					name="nome"
				/>

				<VVTextField
					v-model="email"
					type="text"
					label="Email"
					placeholder="Digite aqui"
					name="email"
				/>

				<div class="flex gap-5 items-center">
					<VVAutocompleteCampus name="campus" />
					<PagesDashboardUsersModalNewUserFuncao
						class="w-auto min-w-[10.65rem]"
					/>
				</div>
			</div>
			<div>
				<button class="Cancel" @click="($event) => $emit('close')">
					<span>Cancelar</span>
					<svg
						class="svgCancel"
						width="13"
						height="14"
						viewBox="0 0 13 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.23291 11.8824L10.9209 2.11755M10.9209 11.8824L1.23291 2.11755"
							:stroke="svgCancelColor"
							stroke-width="2.46588"
							stroke-linecap="round"
						/>
					</svg>
				</button>

				<button class="Cad" @click="($event) => $emit('close')">
					<span>Cadastrar</span>
					<svg
						class="svgCad"
						width="18"
						height="14"
						viewBox="0 0 18 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.4082 6.63384L6.59038 11.647L15.7719 2.35291"
							:stroke="svgColor"
							stroke-width="2.8164"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- <div class="modal2">
      <h1 class="hDispo">Disponibilidade</h1>

      <div>
        <PagesDashboardUsersFormsDisponibilidade />
      </div>
    </div> -->
	</v-form>
</template>

<style scoped>
h1 {
	font-size: 16px;
}

.modal {
	background-color: white;
	color: black;
	border-radius: 0.5rem;
	text-align: center;
}

.modal2 {
	background-color: white;
	color: black;
	border-radius: 0.5rem;
	text-align: center;
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 8px 10px -6px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
	width: 390px;
	z-index: 10000;
	margin-left: 20px;
	height: 600px;
}

.Cad,
.Cancel {
	font-weight: 700;
}

.Cancel {
	margin-right: 70px;
}

.Cad {
	margin-left: 110px;
}

.Cad:hover {
	color: #00d047;
	transition: stroke 0.3s ease;
}

.Cad:hover .svgCad {
	stroke: #00d047;
	transition: stroke 0.2s ease;
}

.svgCad,
.svgCancel {
	stroke: black;
	vertical-align: middle;
	margin-bottom: 2px;
	margin-left: 8px;
}

.Cancel:hover {
	color: #e9001c;
	transition: stroke 0.2s ease;
}

.Cancel:hover .svgCancel {
	stroke: #e9001c;
	transition: stroke 0.2s ease;
}

.hDispo {
	margin-left: 10px;
}

.form {
	overflow: auto;
}

.modal-form {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.main-title {
	font-size: 24px;
	font-weight: 700;
}

.form {
	display: flex;
	flex-direction: column;
	text-align: center;
	padding: 32px;
}

.button-group {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	margin-top: 20px;
	gap: 20px;
}

.button {
	font-weight: 700;
	margin-top: 20px;
	cursor: pointer;
	border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
	padding: 6px 20px;
	border-radius: 8px;
	height: auto;
	text-transform: none;
}

@media screen and (max-width: 450px) {
	.button-group {
		flex-direction: column;
		gap: 10px;
	}

	.v-btn.buttonCancelar,
	.v-btn.buttonCadastro {
		padding: 6px 20px;
	}
}
</style>
