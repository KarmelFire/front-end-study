<template>
  <button @click="toggleDarkMode()">
    {{ isDark ? '启用白天模式' : '启用夜间模式' }}
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

// 使用 useDark 创建昼夜模式切换逻辑
const isDark = useDark()

// 使用 useToggle 创建一个切换函数
const toggleDarkMode = useToggle(isDark)
</script>

<style>
/* 你的白天/夜间模式的样式 */
html.dark {
  background-color: #333;
  color: #fff;
}
</style>