<script lang="ts" setup>
    // Import 
    import dayjs from 'dayjs';
    import "dayjs/locale/pt-br";
    dayjs.locale("pt-br");

    // Props
    const props = defineProps({
        year: Number
    });
    
    // Month
    let daysWeek = [
	    {day:"domingo", shortDay:"Dom"}, 
        {day:"segunda-feira", shortDay:"Seg"}, 
        {day:"terça-feira", shortDay:"Ter"}, 
        {day:"quarta-feira", shortDay:"Qua"}, 
	    {day:"quinta-feira", shortDay:"Qui"}, 
        {day:"sexta-feira", shortDay:"Sex"}, 
        {day:"sábado", shortDay:"Sáb"}
	];
    
    let monthNum = dayjs().month();

    let calendarDays = {
        daysInMonth: [{id: 0, day: "", date: ""}],
        emptyDays: {
            before: dayjs(`2024-${monthNum + 1}-01`).day(),
            after: 35 
        }
    }

    // Functions
    async function setDaysInMonth() {
        async function setDays() {
            calendarDays.daysInMonth.shift();

            for(let i = 0; i < dayjs(dayjs(`${dayjs().year()}-${monthNum + 1}-01`).format("YYYY-MM-DD")).daysInMonth(); i++) {
                calendarDays.daysInMonth.push({
                    id: i,
                    day: dayjs(`${dayjs().year()}-${monthNum + 1}-${i + 1}`).format("dddd"),
                    date: `${dayjs().year()}-${monthNum + 1}-${i + 1}`
                });
            }

            calendarDays.emptyDays.after = calendarDays.emptyDays.after - (calendarDays.emptyDays.before + calendarDays.daysInMonth.length);
        };
        
        await setDays();
    }

    setDaysInMonth();
</script>

<template>
    <v-card class="-month mx-auto rounded-lg" max-width="500px">
        <div class="bg-green-700 text-white flex justify-between items-center p-3 w-full">
            <h1 class="font-medium text-center text-xl w-full">
                {{ 
                    dayjs(`${dayjs().year()}-${monthNum + 1}-01`).format("MMMM")[0].toUpperCase() + 
                    dayjs(`${dayjs().year()}-${monthNum + 1}-01`).format("MMMM").slice(1).toLowerCase()
                }}
            </h1>
        </div>
      
        <!-- Calendar -->
        <v-container class="grid grid-cols-7 gap-4 justify-center items-center m-0">
            <!-- Days of the week -->
                <p
                    class="text-center font-semibold"
                    v-for="daysInTheWeek in daysWeek"
                >
                    {{ daysInTheWeek.shortDay }}
                </p>
      
            <!-- Days -->
            <!-- Before -->
            <div 
                class="-empty-day w-12 h-12 flex justify-center items-center overflow-hidden border-solid rounded-lg"
                v-for="daysBefore in calendarDays.emptyDays.before"
            ></div>

            <!-- In month -->
            <PagesDashboardCalendarDay
            v-for="dayInMonth in calendarDays.daysInMonth"
            :key="dayInMonth.id"
            :_id="dayInMonth.id"
            :day="dayInMonth.day"
            :date="dayInMonth.date"
            />

            <!-- After -->
            <div 
                class="-empty-day w-12 h-12 flex justify-center items-center overflow-hidden border-solid rounded-lg"
                v-for="daysBefore in calendarDays.emptyDays.after"
            ></div>
        </v-container>
    </v-card>
</template>


<style scoped>
    .-month {
    	border: solid 2px #9ab69e;
	    box-shadow: none;
    }

    .-empty-day {
        background-color: #9ab69e;
    }
</style>