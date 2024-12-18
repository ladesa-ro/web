<template>
  <div>
    <!-- Cards de dias -->
    <div
      v-for="(day, index) in days"
      :key="index"
      class="flex flex-col items-center justify-between border border-gray-300 rounded-lg mb-4"
    >
      <div class="flex items-center justify-between w-full">
        <div
          class="GreenBox flex items-center justify-center bg-green-600 text-white p-5 w-24"
        >
          <span class="text-base">{{ day.name }}</span>
        </div>
        <div class="flex items-center">
          <button
            class="focus:outline-none mx-4"
            @click.prevent="prevDay(index)"
          >
            <IconsArrowIconArrow class="Icon h-6 w-6 rotate-0" />
          </button>
          <span class="text-sm font-bold flex items-center">
            Total de aulas:&nbsp;<span class="">{{ day.totalClasses }}</span>
          </span>
          <button
            class="focus:outline-none mx-4"
            @click.prevent="nextDay(index)"
          >
            <IconsArrowIconArrow class="Icon h-6 w-6 rotate-180" />
          </button>
          <button
            class="focus:outline-none mx-4"
            @click.prevent="removeDay(index)"
          >
            <v-icon small class="IconTrash h-6 w-6">mdi-trash-can</v-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <UIButtonModalAddDayClassButton @click.prevent="addDay" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [{ name: 'Dia 1', totalClasses: 1 }],
    };
  },
  methods: {
    addDay() {
      const nextDayNumber = this.days.length + 1;
      this.days.push({ name: `Dia ${nextDayNumber}`, totalClasses: 1 });
    },
    prevDay(index) {
      if (this.days[index].totalClasses > 1) {
        this.days[index].totalClasses--;
      }
    },
    nextDay(index) {
      this.days[index].totalClasses++;
    },
    removeDay(index) {
      if (this.days.length > 1) {
        this.days.splice(index, 1);
      }
    },
  },
};
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

span.text-sm {
  white-space: nowrap; /* Garante que o texto não quebre */
}
</style>
