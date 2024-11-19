<!--
 * @Author: shy 1533103845@qq.com
 * @Date: 2024-09-14 14:30:21
 * @LastEditors: shy 1533103845@qq.com
 * @LastEditTime: 2024-09-14 19:54:46
 * @FilePath: \zhihu-app\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <h2>
        知乎热榜
    </h2>
    <Specials/>
</template>

<script setup lang="ts">
import Specials from './components/Specials.vue';
</script>

<style scoped>
h2{
    text-align: center;
}
</style>