<script lang="ts" setup>
    import dayjs from 'dayjs';

    const props = defineProps({
        _id: Number,
        name: String,
        num: Number
        // isElective: Boolean,
        // isHoliday: Boolean,
        // color: String
    });

    let isToday: Boolean = false;

    props.num == parseInt(dayjs(dayjs().startOf("day").toDate()).format("DD")) ? isToday = true : isToday = false;
</script>

<template>
    <div 
        class="w-12 h-12 flex justify-center items-center overflow-hidden border-solid rounded-lg bg-purple-600"
    >
        <p 
            v-bind:class="{'-today' : isToday}"
            class="mx-auto w-10 h-10 flex justify-center items-center text-center text-white font-semibold"
        >
            {{ num }}
        </p>
    </div>
</template>

<style scoped>
    .-today {
        border: 2px solid #fff;
        border-radius: 0.375rem;
    }

    .-empty-day, .-empty-day * {
        background-color: #9ab69e !important;
        color: #9ab69e !important;
    }
</style>