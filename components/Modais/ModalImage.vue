<script setup></script>

<template>
	<div>
		<div class="overlay">
			<div class="modal">
				<h1 class="main-title mb-5">Mudar Imagem de Fundo</h1>
				<div>
					<VVSelectImage name="aa" />
				</div>
				<div class="flex justify-between mt-10">
					<UIButtonModalCancelButton
					 @click="$emit('close')" />
					<UIButtonModalSaveButton />
					
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.main-title {
	font-size: 24px;
	font-weight: 700;
}
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	z-index: 10000;
}

.modal {
	background-color: white;
	color: black;
	border-radius: 0.5rem;
	text-align: center;
	box-shadow:
		0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 8px 10px -6px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
	width: 430px;
	z-index: 10000;
	margin-right: 20px;
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
</style>
