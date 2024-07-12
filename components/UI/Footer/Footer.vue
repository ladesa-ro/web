<template>
  <footer
    class="bg-gray-100/50 flex-grow-0 border-t-[1px] border-solid flex flex-col justify-stretch w-full"
  >
    <div
      class="grid justify-center items-center grid-cols-[repeat(auto-fit,_minmax(1px,_max-content))] gap-2 py-3"
    >
      <v-btn
        variant="text"
        target="_blank"
        prepend-icon="mdi-book"
        append-icon="mdi-open-in-new"
        href="https://docs.ladesa.com.br/user-guides/"
      >
        Documentação
      </v-btn>

      <span>|</span>

      <v-btn
        variant="text"
        target="_blank"
        prepend-icon="mdi-github"
        append-icon="mdi-open-in-new"
        href="https://github.com/ladesa-ro"
      >
        GitHub
      </v-btn>
    </div>

    <hr class="" />

    <div class="flex items-center justify-center bg-gray-100 px-3 py-2">
      <div>{{ new Date().getFullYear() }} — <strong>Ladesa</strong></div>
    </div>

    <!-- <div class="flex items-center justify-center px-3 py-3">
              <v-btn
                variant="link"
                target="_blank"
                prepend-icon="mdi-book"
                href="https://docs.ladesa.com.br"
              >
                Documentação
              </v-btn>

              <span class="mx-2">-</span>

              <v-btn
                variant="link"
                target="_blank"
                prepend-icon="mdi-github"
                href="https://github.com/ladesa-ro"
              >
                GitHub
              </v-btn>

              <span class="mx-4">|</span>

              <div>
                <div>
                  {{ new Date().getFullYear() }} — <strong>Ladesa</strong>
                </div>
              </div>
            </div> -->
  </footer>
</template>
