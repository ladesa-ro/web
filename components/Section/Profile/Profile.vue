<script setup lang="ts">
import Availability from '@/components/Section/Profile/Availability/Availability.vue';
import Teaching from '@/components/Section/Profile/Teaching/Teaching.vue';
import { ref } from 'vue';
import ModalImage from '~/components/Modais/ModalImage.vue';
import { ApiImageResource, useApiImageRoute } from '~/integrations';

//

type Props = {
  userId: string;
};

const props = defineProps<Props>();

//

const show = ref(false);

//

const apiClient = useApiClient();

const usuario = await apiClient.usuarios.usuarioFindById({ id: props.userId });

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);
</script>

<template>
  <div class="py-14 px-4">
    <v-container class="container-image pa-0 gap-5">
      <div class="card-profile ml-5 mt-5 md:ml-8 md:mt-8">
        <div class="container-content items-center overflow-hidden gap-5">
          <v-img
            :width="118"
            aspect-ratio="1/1"
            cover
            class="rounded-lg"
            v-if="profilePicureUrl"
            :src="profilePicureUrl ?? ''"
          >
          </v-img>

          <div
            v-else
            class="flex py-6 bg-[#F0F0F0] h-[118px] w-[118px] rounded-lg items-center justify-center"
          >
            <IconsIconUser class="text-[#9ab69e] w-[54px] h-[54px]" />
          </div>

          <div class="text text-wrap overflow-hidden">
            <p class="font-bold">{{ usuario.nome }}</p>

            <p class="email font-medium text-wrap break-words max-w-full">
              {{ usuario.email }}
            </p>

            <p class="font-medium">Professor</p>
          </div>
        </div>
        <IconsIconEdit
          class="cursor-pointer flex-shrink-0 mt-4 mr-5 self-start"
        />
      </div>
      <div
        class="self-start flex-shrink-0 flex items-center justify-center ml-auto mr-4 mt-4 cursor-pointer bg-[#00000030] h-8 w-8 rounded-full"
      >
        <IconsIconEdit class="text-white" />
        <ModalImage v-if="show" />
      </div>
    </v-container>

    <v-container
      class="my-7 pa-0 flex-col lg:flex-row flex items-stretch gap-x-[12px] gap-y-11"
    >
      <Availability />
      <Teaching class="flex-1" />
    </v-container>
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

  background-color: #fff;

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
  color: #9ab69e;
}

.cont {
  border: 2px solid #9ab69e;
  border-radius: 8px;
}
</style>
