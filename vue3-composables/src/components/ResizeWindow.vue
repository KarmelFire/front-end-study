<template>
    <div>
        <p>当前窗口大小：{{ width }}px, 高:{{ height }}px</p>
        <div :class="{'mobile-layout': isMobile}"></div>
        <p>{{ isMobile ? "移动端布局" : "桌面端布局" }}</p>
    </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';
const { width, height } = useWindowSize();
const isMobile = computed(() => width.value < 768);
</script>

<style scoped>
div {
    text-align: center;
    margin-top: 20px;
}

.mobile-layout {
    background-color: lightcoral; /* 移动端视图时的背景颜色 */
}

.mobile-layout p {
    font-size: 36px;
}

/* 桌面端视图时的样式 */
@media (min-width: 768px) {
    .mobile-layout {
        background-color: lightblue; /* 桌面端视图时的背景颜色 */
    }

    .mobile-layout p {
        font-size: 24px;
    }
}
</style>