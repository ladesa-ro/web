<script setup lang="ts">
import Availability from '@/components/Section/Profile/Availability/Availability.vue';
import Teaching from '@/components/Section/Profile/Teaching/Teaching.vue';
import ModalImage from '~/components/Modais/ModalImage.vue';
import { ApiImageResource, useApiImageRoute } from '~/integrations';

type Props = {
  userId: string;
};
const props = defineProps<Props>();

//

const apiClient = useApiClient();

const usuario = await apiClient.usuarios.usuarioFindOneById({
  id: props.userId,
});

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);

//

const show = ref(false);
</script>

<template>
  <div class="flex flex-col justify-center px-20">

    <!-- cabeçalho do perfil -->
    <section class="container-image">

      <div class="card-profile ml-5 mt-5 md:ml-8 md:mt-8">
        <div class="container-content items-center overflow-hidden gap-5">

          <!-- show profile picture -->
          <v-img
            v-if="!profilePicureUrl"
            class="profile-card-style"
            :src="profilePicureUrl ?? ''"
            aspect-ratio="1/1"
            cover
          />

          <div
            v-else
            class="flex items-center justify-center profile-card-style py-6 bg-ldsa-green-1/10"
          >
            <IconsIconUser class="text-ldsa-green-1/50 w-[54px] h-[54px]" />
          </div>


          <!-- profile's metadata -->
          <section class="flex flex-col gap-2.5 overflow-hidden font-medium">
            <span class="font-bold">{{ usuario.nome }}</span>

            <span class="text-ldsa-grey dark:ldsa-grey-2"> {{ usuario.email }} </span>

            <span>Professor</span> <!-- usar rota de perfil para puxar da api!! -->
          </section>


        </div>
        <IconsIconEdit
          class="cursor-pointer flex-shrink-0 mt-4 mr-5 self-start"
        />
      </div>


      <div
        class="self-start flex-shrink-0 flex items-center justify-center ml-auto mr-4 mt-4 cursor-pointer bg-black/35 h-8 w-8 rounded-full"
      >
        <IconsIconEdit class="text-ldsa-white" />
        <ModalImage v-if="show" />
      </div>

    </section>



    <!-- disponibilidade + ensino -->
    <section
      class="my-7 pa-0 flex-col lg:flex-row flex items-stretch gap-x-[12px] gap-y-11"
    >
      <Availability />
      <Teaching class="flex-1" />
    </section>
  </div>

</template>

<style>
.border-card {
  border: 2px solid #9ab69e;
  border-radius: 8px;
  overflow: hidden;
}
</style>

<style scoped>
.profile-card-style {
  @apply h-[118px] w-[118px] rounded-lg;
}
















.container-image {
  display: flex;
  align-items: flex-end;
  justify-content: start;
  background-image: url('@/imgs/Usuario.jpg');
  background-size: 100% auto;
  height: 200px;
  border-radius: 8px;
}

.edit-w {
  align-self: flex-start;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 2%;
}

.card-profile {
  display: flex;

  min-height: 150px;

  overflow: hidden;

  @apply bg-ldsa-bg;

  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
  padding: 5px;
  top: 300px;
}

.container-content {
  display: flex;
  padding: 20px;
}

.text {
  gap: 10px;
}

.text h2,
.text h4,
.text .email {
  width: max-content;
}

.card-profile h2 {
  display: block;
  font-size: 17px;
}

.text .email {
  @apply text-ldsa-grey dark:text-ldsa-grey-2;
  /* color: #9ab69e; */
}

.cont {
  border: 2px solid #9ab69e;
  border-radius: 8px;
}
</style>
