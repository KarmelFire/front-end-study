<template>
  <div class="dashboard-container">
    <nav class="dashboard-nav">
      <router-link to="/user/profile" class="nav-link">用户信息</router-link>
      <router-link to="/user/setting" class="nav-link">用户设置</router-link>
    </nav>
    <router-view class="dashboard-content"></router-view>
  </div>
</template>

<script setup lang="ts">
// JavaScript logic here if needed
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.dashboard-nav {
  background-color: #333;
  padding: 10px 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #555;
}

.dashboard-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>