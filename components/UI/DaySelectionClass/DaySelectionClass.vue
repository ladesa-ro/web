<template>
    <div>
      <!-- Cards de dias -->
      <div v-for="(day, index) in days" :key="index" class="flex flex-col items-center justify-between border border-gray-300 rounded-lg mb-4">
        <div class="flex items-center justify-between w-full">
          <div class="GreenBox flex items-center justify-center bg-green-600 text-white p-5 w-24">
            <span class="text-base">{{ day }}</span>
          </div>
          <div class="flex items-center">
            <button @click.prevent="prevDay" class="focus:outline-none mx-4">
              <IconsArrowIconArrow class="Icon h-6 w-6 rotate-0"/>
            </button>
            <span class="text-sm font-bold">Total de aulas: {{ days.length }}</span>
            <button @click.prevent="nextDay" class="focus:outline-none mx-4">
              <IconsArrowIconArrow class="Icon h-6 w-6 rotate-180"/>
            </button>
            <button @click.prevent="removeDay(index)" class="focus:outline-none mx-4">
                <v-icon small class="IconTrash  h-6 w-6"
                  >mdi-trash-can</v-icon
                >
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <UIButtonModalAddDayClassButton @click.prevent="addDay"/>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        days: ['Dia 1']
      };
    },
    methods: {
      addDay() {
        const nextDayNumber = this.days.length + 1;
        this.days.push(`Dia ${nextDayNumber}`);
      },
      prevDay() {
      },
      nextDay() {
      },
      removeDay(index) {
        if (this.days.length > 1) {
          this.days.splice(index, 1);
        }
      },
      close() {
      }
    }
  }
  </script>
  
  <style scoped>
  .GreenBox {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .Icon {
    color: green;
  }

  .IconTrash {
    color: black;
  }
  </style>
  