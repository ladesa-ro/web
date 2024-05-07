<script lang="ts" setup>
    const props = defineProps({
        id: String,
        month: String
    });
    
    // Test for the create calendar
    let daysWeek = [
		"Dom", "Seg", "Ter", "Qua", 
		"Qui", "Sex", "Sáb"
	];

	const daysInMonth = [
	{ day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, 
	{ day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, 
	{ day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, 
	{ day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, 
	{ day: 31 },  { day: 32 }, { day: 33 }, { day: 34 }, { day: 35 }
	];
</script>

<template>
  <v-card class="-month mx-auto rounded-lg" max-width="500px">
      <v-card-title class="bg-purple-600 text-white text-center justify-between" max-width="100%">
          Janeiro
      </v-card-title>
      
      <!-- Calendar -->
      <div class="grid grid-cols-7 gap-4 justify-center items-center m-8 mt-4">
          <!-- Days of the week -->
          <p
              class="text-center font-semibold"
              v-for="day in daysWeek"
          >
              {{ day }}
          </p>
      
          <!-- Days -->
          <PagesDashboardCalendarDay 
            v-for="dayInMonth in daysInMonth"
            :day="dayInMonth.day"
          />
      </div>
    </v-card>
</template>


<style scoped>
    .-month {
    	border: solid 2px #9ab69e;
	    box-shadow: none;
    }
</style>