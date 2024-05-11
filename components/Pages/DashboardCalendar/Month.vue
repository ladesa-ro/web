<script lang="ts" setup>
    // Import 
    import dayjs from 'dayjs';
    import "dayjs/locale/pt-br";
    dayjs.locale("pt-br");

    // Props
    const props = defineProps({
        year: Number,
        toggleMonth: Boolean
    });
    
    // Interface and types
    type Day = {
        num: number,
        day: string,
        date: string
    }

    // Month
    const daysInTheWeek = [
	    "Dom", 
        "Seg", 
        "Ter", 
        "Qua", 
	    "Qui", 
        "Sex", 
        "Sáb"
	];
    
    let monthNum = ref<number>(dayjs().month());

    let calendarDays = {
        daysInMonth: ref<Day[]>([]),
        emptyDays: {
            before: ref<number>(0),
            after: ref<number>(0)
        }
    }

    // Functions

    // Set days from this month
    async function setDaysInMonth(): Promise<void> {
        try {
            // Set empty days
            async function setEmptyDays(): Promise<boolean> {
                try {
                    // Calc before days
                    calendarDays.emptyDays.before.value = dayjs(`${props.year}-${monthNum.value + 1}-01`).day();
                    
                    // Calc after days
                    if(calendarDays.daysInMonth.value.length + calendarDays.emptyDays.before.value > (7 * 5)) {
                        calendarDays.emptyDays.after.value = (7 * 6) - (calendarDays.emptyDays.before.value + calendarDays.daysInMonth.value.length);
                    } else {
                        calendarDays.emptyDays.after.value = (7 * 5) - (calendarDays.emptyDays.before.value + calendarDays.daysInMonth.value.length);
                    }

                    return true;
                }
                catch(error) {
                    return false;
                }
            }

            // Set days
            async function setDays(): Promise<boolean> {
                try {
                    calendarDays.daysInMonth.value = [];
        
                    // Set days
                    for(let i = 0; i < dayjs(dayjs(`${props.year}-${monthNum.value + 1}-01`).format("YYYY-MM-DD")).daysInMonth(); i++) {
                        calendarDays.daysInMonth.value.push({
                            num: i,
                            day: dayjs(`${props.year}-${monthNum.value + 1}-${i + 1}`).format("dddd"),
                            date: `${props.year}-${monthNum.value + 1}-${i + 1}`
                        });
                    }

                    await setEmptyDays();

                    return true;
                }
                catch(error) {
                    return false
                }
            }
            await setDays();
        }
        catch(error) {
        }
    }
    
    // Toggle month
    async function toggleMonth(num: number): Promise<void> {
        try {
            // Toggle
            monthNum.value += num;
            
            if(monthNum.value > 11) monthNum.value = 0;
            else if (monthNum.value < 0) monthNum.value = 11;
            
            await setDaysInMonth();
            
        }
        catch(error) {
        }
    }
    
    onMounted(async () => {
        await setDaysInMonth();
    });


</script>

<template>
    <v-card class="-month mx-auto rounded-lg" max-width="500px">
        <div class="bg-green-700 text-white flex justify-between items-center p-3 w-full">
            <!-- Toggle for before month -->
            <button class="w-5 h-5 bg-white" @click="toggleMonth(-1)">
            </button>
            <!-- Month name -->
            <h1 class="font-medium text-center text-xl w-full">
                {{ 
                    dayjs(`${props.year}-${monthNum + 1}-01`).format("MMMM")[0].toUpperCase() + 
                    dayjs(`${props.year}-${monthNum + 1}-01`).format("MMMM").slice(1).toLowerCase()
                }}
            </h1>
            
            <!-- Toggle for after month -->
            <button class="w-5 h-5 bg-white" @click="toggleMonth(1)">
            </button>
        </div>
      
        <!-- Calendar -->
        <v-container class="grid grid-cols-7 gap-4 justify-center items-center m-0">
            <!-- Days of the week -->
                <p
                    class="text-center font-semibold"
                    v-for="dayInTheWeek in daysInTheWeek"
                >
                    {{ dayInTheWeek }}
                </p>
      
            <!-- Days -->
            <!-- Before -->
            <div 
                class="-empty-day w-12 h-12 rounded-lg"
                v-for="daysBefore in calendarDays.emptyDays.before.value" :key="daysBefore"
            ></div>

            <!-- In month -->
            <div
                v-for="(dayInMonth, index) in calendarDays.daysInMonth.value"
                :key="index"
                class="w-12 h-12 flex justify-center items-center overflow-hidden border-solid rounded-lg bg-green-700"
            >
                <p 
                :class="{'border-2 border-solid border-white rounded-md' : dayjs(dayjs().startOf('day').toDate()).format('YYYY-MM-DD') == dayjs(dayjs(dayInMonth.date).startOf('day').toDate()).format('YYYY-MM-DD')}"
                class="mx-auto w-10 h-10 flex justify-center items-center text-center text-white font-semibold"
                >
                    {{ dayjs(dayInMonth.date).format("DD") }}
                </p>
            
            </div>
            <!-- After -->
            <div 
                class="-empty-day w-12 h-12 rounded-lg"
                v-for="daysAfter in calendarDays.emptyDays.after.value" :key="daysAfter"
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