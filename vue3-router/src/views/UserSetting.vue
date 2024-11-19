<template>
    <div>
        <h2>用户设置</h2>
        <button @click="handelLogout">退出登录</button>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

const handelLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
}
</script>