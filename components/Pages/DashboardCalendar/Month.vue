<script lang="ts" setup>
    // Import 
    import dayjs from 'dayjs';
    import "dayjs/locale/pt-br";
    dayjs.locale("pt-br");

    // Create structures
    interface Day {
        id: Number;
        name: String;
        num: Number;
    };

    interface CalendarDays {
        daysInMonth: Day[];
        emptyDays: {
            before: Number;
            after: Number;
        }
    };
    
    // Month
    const calendarInfos: Object = {
        monthNames: [
            "Janeiro", "Fevereiro", "Marco", "Abril", 
            "Maio", "Junho", "Julho", "Agosto", 
            "Septembro", "Outubro","Novembro","Dezembro"
        ],
        daysWeek: [
		    {name:"domingo", shortName:"Dom"}, 
            {name:"segunda-feira", shortName:"Seg"}, 
            {name:"terça-feira", shortName:"Ter"}, 
            {name:"quarta-feira", shortName:"Qua"}, 
		    {name:"quinta-feira", shortName:"Qui"}, 
            {name:"sexta-feira", shortName:"Sex"}, 
            {name:"sábado", shortName:"Sáb"}
	    ],
        monthActually: {
            monthNum: dayjs(dayjs().startOf("day").toDate()).format("DD"),
            dayNum: dayjs(dayjs().startOf("day").toDate()).format("MM")
        }
    };

    let calendarDays: CalendarDays =  {
        daysInMonth: [{id: 0, name: "", num: 0}],
        emptyDays: {
            before: 0,
            after: 0
        },
    };

    // Functions
    async function setDaysInMonth() {
        async function setDays() {
            calendarDays.daysInMonth.shift();

            for(let i = 1; i < dayjs(`${calendarInfos.monthActually.monthNum}`).daysInMonth() + 1; i++) {
                calendarDays.daysInMonth.push({
                    id: i,
                    name: dayjs(`${dayjs(dayjs().startOf("day").toDate()).format("YYYY")}-${dayjs(dayjs().startOf("day").toDate()).format("MM")}-${i}`).format("dddd"),
                    num: i
                });
            }
        };
        
        await setDays();
    }

    setDaysInMonth();
    
</script>

<template>
  <v-card class="-month mx-auto rounded-lg" max-width="500px">
      <v-card-title class="bg-purple-600 text-white text-center justify-between" max-width="100%">
          {{ calendarInfos.monthNames[parseInt(calendarInfos.monthActually.monthNum)] }}
      </v-card-title>
      
      <!-- Calendar -->
      <div class="grid grid-cols-7 gap-4 justify-center items-center m-8 mt-4">
          <!-- Days of the week -->
          <p
              class="text-center font-semibold"
              v-for="daysInTheWeek in calendarInfos.daysWeek"
          >
              {{ daysInTheWeek.shortName }}
          </p>
      
          <!-- Days -->
          <PagesDashboardCalendarDay
            v-for="dayInMonth in calendarDays.daysInMonth"
            :name="dayInMonth.name"
            :num="dayInMonth.num"
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