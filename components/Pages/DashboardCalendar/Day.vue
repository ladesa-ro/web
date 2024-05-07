<script lang="ts" setup>
    const props = defineProps({
        day: Number
        // id: String,
        // isElective: Boolean,
        // isHoliday: Boolean,
        // color: String
    });
</script>

<template>
    <div 
        class="w-12 h-12 flex justify-center items-center overflow-hidden border-solid rounded-lg bg-purple-600"
    >
        <p class="mx-auto w-10 h-10 flex justify-center items-center text-center text-white font-semibold">
            {{ day }}
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