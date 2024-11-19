<template>
    <div>
        <p>当前计数器的值：{{ count }}</p>
        <button @Click="increament">增加</button>
        <button @Click="decreament">减少</button>
        <button @Click="clean">清空</button>
    </div>
</template>

<script setup lang="ts">
import { useCounter } from '../composables/useCounter';

const {count,increament,decreament,clean} = useCounter(10)
</script>

<style scoped>

</style>