<script lang="ts" setup>
    import dayjs from 'dayjs';

    const props = defineProps({
        _id: Number,
        day: String,
        date: String
        // isElective: Boolean,
        // isHoliday: Boolean,
        // color: String
    });

    let isToday: Boolean = false;

    dayjs(dayjs().startOf("day").toDate()).format("YYYY-MM-DD") == dayjs(dayjs(props.date).startOf("day").toDate()).format("YYYY-MM-DD")? isToday = true : isToday = false;
</script>

<template>
    <div 
        class="w-12 h-12 flex justify-center items-center overflow-hidden border-solid rounded-lg bg-green-700"
    >
        <p 
            :class="{'border-2 border-solid border-white rounded-md' : isToday}"
            class="mx-auto w-10 h-10 flex justify-center items-center text-center text-white font-semibold"
        >
            {{ dayjs(date).format("DD") }}
        </p>
    </div>
</template>